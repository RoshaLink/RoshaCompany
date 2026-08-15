import { buildSystemPrompt } from './_lib/systemPrompt.js';
import { rateLimit } from './_lib/rateLimit.js';
import { readJsonBody, clientIp, send, originAllowed } from './_lib/http.js';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

// Verify the current id at https://platform.openai.com/docs/models — OpenAI's
// lineup moves quickly. Overridable via the OPENAI_MODEL env var so the model
// can be changed from the Vercel dashboard without touching code.
const DEFAULT_MODEL = 'gpt-5.4-mini';

const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY = 12;
const MAX_OUTPUT_TOKENS = 400;
const TEMPERATURE = 0.6;
const UPSTREAM_TIMEOUT_MS = 25_000;

const UI_LANGS = ['sv', 'en', 'fa', 'ar'];

/**
 * Older model families (gpt-4*, gpt-3.5*) take `max_tokens` and a custom
 * `temperature`. Newer ones take `max_completion_tokens` and may reject any
 * non-default temperature. Guessing wrong is a 400 with a message most people
 * won't connect to the model they just swapped in the dashboard, so we pick by
 * family and then self-correct once (see `callOpenAI`).
 */
function usesLegacyParams(model) {
  return /^(gpt-4|gpt-3\.5|chatgpt-4)/.test(model);
}

function buildPayload(model, messages, legacy) {
  const payload = { model, messages };
  if (legacy) {
    payload.max_tokens = MAX_OUTPUT_TOKENS;
    payload.temperature = TEMPERATURE;
  } else {
    payload.max_completion_tokens = MAX_OUTPUT_TOKENS;
  }
  return payload;
}

/** Did OpenAI reject us specifically over the token/temperature parameters? */
function isParamShapeError(status, body) {
  if (status !== 400) return false;
  return /max_tokens|max_completion_tokens|temperature|unsupported_parameter/i.test(body);
}

/**
 * The subset of the OpenAI chat-completions response this handler reads.
 * Declared so the optional-chaining below is type-checked rather than being
 * an unchecked reach into `unknown` (see `npm run typecheck`).
 *
 * @typedef  {{choices?: Array<{message?: {content?: string}}>}} ChatCompletion
 */

/**
 * @param   {string} model
 * @param   {Array<{role: string, content: string}>} messages
 * @param   {AbortSignal} signal
 * @returns {Promise<{ok: true, data: ChatCompletion} | {ok: false, status: number, body: string}>}
 */
async function callOpenAI(model, messages, signal) {
  const attempt = async (legacy) =>
    fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(buildPayload(model, messages, legacy)),
      signal,
    });

  const legacy = usesLegacyParams(model);
  let response = await attempt(legacy);

  if (!response.ok) {
    const body = await response.text();
    if (isParamShapeError(response.status, body)) {
      // The model wants the other parameter shape. Retry once, and log loudly
      // so the constant above can be corrected rather than rediscovered.
      console.warn(
        `[chat] model "${model}" rejected the ${legacy ? 'legacy' : 'modern'} parameter ` +
          `shape; retrying with the other one. Consider updating usesLegacyParams(). ` +
          `Upstream said: ${body.slice(0, 300)}`
      );
      response = await attempt(!legacy);
      if (!response.ok) {
        return { ok: false, status: response.status, body: await response.text() };
      }
    } else {
      return { ok: false, status: response.status, body };
    }
  }

  return { ok: true, data: /** @type {ChatCompletion} */ (await response.json()) };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
  if (!originAllowed(req)) return send(res, 403, { error: 'forbidden' });

  const { ok: withinLimit, retryAfter } = rateLimit(clientIp(req));
  if (!withinLimit) {
    res.setHeader('Retry-After', String(retryAfter));
    return send(res, 429, { error: 'rate_limited', retryAfter });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('[chat] OPENAI_API_KEY is not set');
    return send(res, 500, { error: 'server_error' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return send(res, 400, { error: 'bad_request' });
  }

  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  if (!message) return send(res, 400, { error: 'bad_request' });
  if (message.length > MAX_MESSAGE_CHARS) return send(res, 400, { error: 'too_long' });

  const uiLang = UI_LANGS.includes(body?.lang) ? body.lang : 'sv';

  // Sanitise client-supplied history. Note `system` is dropped on purpose:
  // without this a client could inject its own system prompt and override
  // every grounding and safety rule. Client-only fields (e.g. `id`) are
  // stripped too, since unknown keys are rejected upstream.
  const history = Array.isArray(body?.history) ? body.history : [];
  const safeHistory = history
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim()
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));

  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const result = await callOpenAI(
      model,
      [
        { role: 'system', content: buildSystemPrompt({ uiLang }) },
        ...safeHistory,
        { role: 'user', content: message },
      ],
      controller.signal
    );

    if (!result.ok) {
      // Upstream error bodies stay in the logs. They can echo request details,
      // so they must never be forwarded to the browser.
      console.error('[chat] openai_error', result.status, result.body?.slice(0, 500));
      return result.status === 429
        ? send(res, 429, { error: 'rate_limited' })
        : send(res, 502, { error: 'upstream_error' });
    }

    const reply = result.data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      console.error('[chat] empty completion', JSON.stringify(result.data)?.slice(0, 500));
      return send(res, 502, { error: 'upstream_error' });
    }

    return send(res, 200, { reply });
  } catch (err) {
    // `instanceof Error` before reading .name: a throw of a non-Error value
    // would otherwise crash the catch block itself and turn a handled timeout
    // into an unhandled rejection.
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[chat] upstream timeout after', UPSTREAM_TIMEOUT_MS, 'ms');
      return send(res, 504, { error: 'timeout' });
    }
    console.error('[chat] handler_error', err);
    return send(res, 500, { error: 'server_error' });
  } finally {
    clearTimeout(timer);
  }
}
