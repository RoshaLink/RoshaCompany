/**
 * Detects visitor contact info (email or phone) from Rosha AI chat turns
 * and automatically registers qualified leads into the backend database & notifications.
 */

const RESEND_URL = 'https://api.resend.com/emails';
const UPSTREAM_TIMEOUT_MS = 15_000;
const MAX_FIELD_CHARS = 200;
const MAX_MESSAGE_CHARS = 4000;

export function normalizeDigits(str = '') {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
}

const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const PHONE_REGEX = /(?:(?:\+|00)[1-9]\d{0,2}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}/g;

export function extractContactInfo(text = '') {
  if (typeof text !== 'string') return null;

  // 1. Check for email
  const emailMatch = text.match(EMAIL_REGEX);
  if (emailMatch) {
    return { type: 'email', value: emailMatch[0].trim() };
  }

  // 2. Normalize Persian/Arabic digits and check for phone numbers
  const normalized = normalizeDigits(text);
  const potentialPhones = normalized.match(PHONE_REGEX);
  if (potentialPhones) {
    for (const rawPhone of potentialPhones) {
      const digitsOnly = rawPhone.replace(/\D/g, '');
      // Valid phone numbers are between 7 and 15 digits
      if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
        return { type: 'phone', value: rawPhone.trim() };
      }
    }
  }

  return null;
}

export function extractName(text = '') {
  if (typeof text !== 'string') return null;

  const patterns = [
    /(?:my name is|i am|i'm|this is)\s+([A-Za-zÅÄÖåäö]{2,20}(?:\s+[A-Za-zÅÄÖåäö]{2,20})?)/i,
    /(?:jag heter|mitt namn är)\s+([A-Za-zÅÄÖåäö]{2,20}(?:\s+[A-Za-zÅÄÖåäö]{2,20})?)/i,
    /(?:من|نام من|اسم من)\s+([\u0600-\u06FF]{2,20}(?:\s+[\u0600-\u06FF]{2,20})?)\s*(?:هستم|است|هست)?/u,
    /(?:اسمي|أنا)\s+([\u0600-\u06FF]{2,20}(?:\s+[\u0600-\u06FF]{2,20})?)/u,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].trim();
      if (!/^(here|there|interested|contact|looking|need|ready|info)$/i.test(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

export function inferService(fullText = '') {
  const lower = fullText.toLowerCase();

  if (/ios|android|mobile app|flutter|react native|اپلیکیشن|اپ فروشگاهی|اپ استارتاپ|موبایل|تطبيق/.test(lower)) {
    return 'E-commerce & Startup Mobile Apps';
  }
  if (/dashboard|crm|erp|admin panel|portal|داشبورد|پنل مدیریت|سامانه|لوحة تحكم/.test(lower)) {
    return 'Management Dashboards & Internal Platforms';
  }
  if (/ai|artificial intelligence|bot|automation|هوش مصنوعی|اتوماسیون|خودکارسازی|ذكاء اصطناعي/.test(lower)) {
    return 'AI Automation & Intelligent Workflows';
  }
  if (/web|website|web app|react|nextjs|وب|وب‌سایت|وب‌اپلیکیشن|سایت|موقع/.test(lower)) {
    return 'Advanced Web Applications';
  }
  if (/seo|google rank|سئو|رتبه گوگل/.test(lower)) {
    return 'SEO & Performance Engineering';
  }

  return 'Consultation & Strategy';
}

function clean(value, maxChars) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxChars);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Submits lead data to MongoDB via backend API and notifies via Resend.
 */
export async function forwardLeadToBackendAndNotify(lead, { clientIp = '' } = {}) {
  const { RESEND_API_KEY, LEAD_TO_EMAIL, BACKEND_API_URL } = process.env;
  const isTest = process.env.NODE_ENV === 'test' || Boolean(process.env.VITEST);
  const backendUrl = BACKEND_API_URL || (!isTest ? 'https://roshacompany-backend.onrender.com' : null);

  let savedToBackend = false;
  if (backendUrl) {
    try {
      const backendRes = await fetch(`${backendUrl}/api/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': clientIp,
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      if (backendRes.ok) {
        savedToBackend = true;
      } else {
        console.error('[chat-lead] backend error status:', backendRes.status);
      }
    } catch (err) {
      console.error('[chat-lead] error forwarding to backend:', err instanceof Error ? err.message : err);
    }
  }

  // Dispatch email notification via Resend if credentials are present
  if (RESEND_API_KEY && LEAD_TO_EMAIL) {
    const rows = [
      ['Name', lead.name],
      ['Email / Phone', lead.email],
      ['Primary focus', lead.service],
      ['Source', 'Rosha AI Chat Widget'],
      ['Language', lead.lang],
    ].filter(([, value]) => value);

    const html = `
      <h2>New Lead captured via Rosha AI Chat</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(label)}</strong></td>` +
              `<td style="border:1px solid #ddd">${escapeHtml(value)}</td></tr>`
          )
          .join('')}
      </table>
      <h3>Chat Context / Transcript</h3>
      <p style="white-space:pre-wrap">${escapeHtml(lead.message || '(none)')}</p>
    `;

    const text =
      rows.map(([label, value]) => `${label}: ${value}`).join('\n') +
      `\n\nChat Context / Transcript:\n${lead.message || '(none)'}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    try {
      await fetch(RESEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL || 'onboarding@resend.dev',
          to: [LEAD_TO_EMAIL],
          subject: `New Lead via Rosha AI Chat: ${lead.name}`,
          html,
          text,
        }),
        signal: controller.signal,
      });
    } catch (err) {
      console.error('[chat-lead] resend error:', err instanceof Error ? err.message : err);
    } finally {
      clearTimeout(timer);
    }
  }

  return savedToBackend;
}

/**
 * Inspects a chat turn for contact details, and if present, dispatches the lead.
 */
export async function detectAndCaptureChatLead({ message, history = [], uiLang = 'sv', clientIp = '' }) {
  const contact = extractContactInfo(message);
  if (!contact) return { captured: false };

  // Aggregate all conversation text to understand context
  const fullText = [...history.map((h) => h.content), message].join('\n');
  const extractedName = extractName(message) || extractName(fullText) || 'Website Visitor';
  const service = inferService(fullText);

  // Format message with clear transcript
  const transcriptLines = history
    .slice(-6)
    .map((h) => `${h.role === 'user' ? 'User' : 'Rosha'}: ${h.content.trim()}`);
  transcriptLines.push(`User: ${message.trim()}`);

  const formattedMessage = clean(
    `[Inquiry via Rosha AI Chat]\nDetected Contact: ${contact.value}\nService: ${service}\n\nRecent Transcript:\n` +
      transcriptLines.join('\n\n'),
    MAX_MESSAGE_CHARS
  );

  const leadPayload = {
    name: clean(extractedName, MAX_FIELD_CHARS),
    email: clean(contact.value, MAX_FIELD_CHARS),
    service: clean(service, MAX_FIELD_CHARS),
    budget: '',
    company: '',
    lang: clean(uiLang, 10),
    source: 'chat',
    message: formattedMessage,
  };

  try {
    await forwardLeadToBackendAndNotify(leadPayload, { clientIp });
  } catch (err) {
    console.error('[chat-lead] dispatch exception:', err);
  }

  return { captured: true, lead: leadPayload };
}
