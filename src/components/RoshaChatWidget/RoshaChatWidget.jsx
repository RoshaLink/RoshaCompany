import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import roshaChatVideo from '../../assets/Rosha/ChatWithus/Roshachatwithus.mp4';
import './RoshaChatWidget.css';

// How many prior messages travel with each request. The server caps this too;
// this is about payload size and cost, not trust.
const HISTORY_LIMIT = 12;
const MAX_MESSAGE_CHARS = 1000;
const REQUEST_TIMEOUT_MS = 30000;

// Deliberately not crypto.randomUUID(): that requires a secure context and
// throws when the dev server is opened over plain HTTP on a LAN IP, which is
// how people test on a phone.
let messageCounter = 0;
const nextId = () => `m${++messageCounter}`;

/** Map the API's coded errors onto translation keys. */
function errorKeyFor(status, code) {
  if (code === 'rate_limited' || status === 429) return 'chat.errorRateLimit';
  if (code === 'too_long') return 'chat.errorTooLong';
  return 'chat.errorGeneric';
}

export default function RoshaChatWidget({ onOpenGetStarted }) {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [errorKey, setErrorKey] = useState(null);

  const scrollRef = useRef(null);
  const abortRef = useRef(null);
  // The scroll listener needs to know whether a conversation is in progress,
  // but must not be re-bound on every message. A ref keeps the listener stable;
  // it is synced in an effect rather than during render, because writing to a
  // ref while rendering is not a safe React pattern.
  const hasConversationRef = useRef(false);

  useEffect(() => {
    hasConversationRef.current = messages.length > 0;
  }, [messages]);

  // NOTE: the `isVisible` gate lives inside this component on purpose. The
  // widget itself never unmounts, which is what lets the conversation survive
  // scrolling and route changes. Moving this check up into App.jsx would
  // unmount the component and silently discard every conversation.
  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.75;
      if (window.scrollY > heroThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Only auto-close an empty chat. Closing a conversation in progress
        // because someone scrolled up to re-read the page loses their thread.
        if (!hasConversationRef.current) setIsChatOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Abort any in-flight request when the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  // Pin to the newest message. Setting scrollTop on the container rather than
  // calling scrollIntoView(): inside a position:fixed panel, scrollIntoView
  // can scroll the page behind the widget, which reads as the panel jumping.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isSending, errorKey]);

  const requestReply = useCallback(
    async (text, history) => {
      setErrorKey(null);
      setIsSending(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            message: text,
            lang: i18n.language,
            history: history
              .slice(-HISTORY_LIMIT)
              .map(({ role, content }) => ({ role, content })),
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setErrorKey(errorKeyFor(res.status, data.error));
          return;
        }

        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'assistant', content: data.reply },
        ]);
      } catch (err) {
        if (err.name !== 'AbortError') setErrorKey('chat.errorNetwork');
      } finally {
        clearTimeout(timer);
        setIsSending(false);
      }
    },
    [i18n.language]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    // Snapshot the history before appending, so the current turn isn't sent
    // twice (once as history, once as `message`).
    const history = messages;
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', content: text }]);
    setInput('');
    void requestReply(text, history);
  };

  // Retry re-sends the last thing the visitor typed. Their message is never
  // removed from the transcript on failure — losing what someone wrote is the
  // most frustrating way for a chat widget to fail.
  const handleRetry = () => {
    const lastUserIndex = messages.findLastIndex((m) => m.role === 'user');
    if (lastUserIndex === -1 || isSending) return;
    void requestReply(messages[lastUserIndex].content, messages.slice(0, lastUserIndex));
  };

  const closeChat = () => {
    abortRef.current?.abort();
    setIsChatOpen(false);
  };

  const isRTL = ['fa', 'ar'].includes((i18n.language || '').toLowerCase());
  const hasReply = messages.some((m) => m.role === 'assistant');
  const canSend = input.trim().length > 0 && !isSending;

  return (
    <AnimatePresence>
      {isVisible && (
        // rosha-chat-widget-root: a real, stable hook for other components to
        // target -- the rest of this className is Tailwind (loaded via the
        // CDN script in index.html), which nothing outside this file can
        // reference by name. Footer.jsx uses this hook to fade the widget out
        // while its own newsletter form is in the widget's fixed-position
        // corner (see Footer.css's html.footer-form-visible rule).
        <div className="rosha-chat-widget-root fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none">

          {/* Chat Window */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                dir={isRTL ? 'rtl' : 'ltr'}
                className={`relative w-[calc(100vw-2rem)] max-w-[380px] bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-[0_20px_50px_rgba(56,189,248,0.15)] mb-3 sm:mb-4 overflow-hidden pointer-events-auto ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                {/* Ambient orb, same treatment the marketing sections use */}
                <div className="absolute -top-16 -right-10 w-48 h-48 bg-sky-300/20 rounded-full blur-[80px] pointer-events-none" />

                {/* Header */}
                <div className="relative bg-gradient-to-b from-sky-50/80 to-white/40 border-b border-slate-200/80 p-4 flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse min-w-0">
                    <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-sm shrink-0">
                      <video
                        src={roshaChatVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain p-0.5"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold font-headline-md text-slate-900 leading-tight tracking-tight truncate">
                        {t('chat.title')}
                      </h4>
                      <span className="flex items-center space-x-1.5 rtl:space-x-reverse text-[11px] font-label-sm text-slate-500 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{t('chat.status')}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={closeChat}
                    aria-label={t('chat.close')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Badge strip — mirrors the eyebrow badge every site section uses */}
                <div className="relative px-4 pt-3">
                  <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-[10px] font-label-sm text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                    <Sparkles className="w-3 h-3" />
                    <span>{t('chat.badge')}</span>
                  </span>
                </div>

                {/* Messages */}
                <div
                  ref={scrollRef}
                  role="log"
                  aria-live="polite"
                  className="relative p-4 h-[320px] max-h-[45vh] overflow-y-auto space-y-3"
                >
                  {/* The greeting is rendered rather than stored in `messages`:
                      it retranslates instantly on a language switch, and never
                      takes up a slot in the history sent to the model. */}
                  <div className="flex items-start space-x-2 rtl:space-x-reverse">
                    <div className="p-2 rounded-xl bg-slate-100/90 text-sky-600 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div
                      dir="auto"
                      className="bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-2xl px-3.5 py-2.5 text-sm font-body-md text-slate-600 shadow-sm max-w-[85%] leading-relaxed text-start"
                    >
                      {t('chat.greeting')}
                    </div>
                  </div>

                  {messages.map((m) =>
                    m.role === 'assistant' ? (
                      <div key={m.id} className="flex items-start space-x-2 rtl:space-x-reverse">
                        <div className="p-2 rounded-xl bg-slate-100/90 text-sky-600 shrink-0 mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                        {/* dir="auto" per bubble: Rosha replies in whatever
                            language the visitor writes, so an Arabic reply can
                            land in an otherwise Swedish (LTR) UI. The browser
                            infers direction from the first strong character. */}
                        <div
                          dir="auto"
                          className="bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-2xl px-3.5 py-2.5 text-sm font-body-md text-slate-600 shadow-sm max-w-[85%] leading-relaxed whitespace-pre-wrap text-start"
                        >
                          {m.content}
                        </div>
                      </div>
                    ) : (
                      <div key={m.id} className="flex justify-end">
                        <div
                          dir="auto"
                          className="bg-sky-500 text-white rounded-2xl px-3.5 py-2.5 text-sm font-body-md shadow-[0_4px_20px_rgba(56,189,248,0.35)] max-w-[85%] leading-relaxed whitespace-pre-wrap text-start"
                        >
                          {m.content}
                        </div>
                      </div>
                    )
                  )}

                  {isSending && (
                    <div className="flex items-start space-x-2 rtl:space-x-reverse">
                      <div className="p-2 rounded-xl bg-slate-100/90 text-sky-600 shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-2xl px-3.5 py-3 shadow-sm flex items-center space-x-1.5 rtl:space-x-reverse">
                        <span className="sr-only">{t('chat.typing')}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                      </div>
                    </div>
                  )}

                  {errorKey && (
                    <div className="flex flex-col items-start space-y-2 bg-rose-50/90 backdrop-blur-md border border-rose-200 rounded-2xl px-3.5 py-3">
                      <p className="text-xs font-body-md text-rose-700 leading-relaxed">{t(errorKey)}</p>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-label-sm font-bold text-rose-700 hover:text-rose-900 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{t('chat.retry')}</span>
                      </button>
                    </div>
                  )}

                  {hasReply && onOpenGetStarted && (
                    <button
                      type="button"
                      onClick={onOpenGetStarted}
                      className="w-full inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-sky-500 hover:bg-sky-600 text-white text-xs font-label-md font-bold rounded-lg py-3 transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] cursor-pointer"
                    >
                      <span>{t('chat.cta')}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  )}
                </div>

                {/* Composer. A real <form> handles Enter natively and shows a
                    "Go" key on mobile keyboards. Using onKeyDown instead would
                    require checking event.nativeEvent.isComposing, or Farsi,
                    Arabic and any IME user sends their message mid-composition
                    when they press Enter to accept a candidate. */}
                <form
                  onSubmit={handleSubmit}
                  className="relative p-3 bg-white/60 border-t border-slate-200/80 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isSending}
                    maxLength={MAX_MESSAGE_CHARS}
                    aria-label={t('chat.placeholder')}
                    placeholder={t('chat.placeholder')}
                    className="flex-grow bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-body-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={!canSend}
                    aria-label={t('chat.send')}
                    className="p-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-[0_4px_20px_rgba(56,189,248,0.35)] active:scale-95 cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sky-500 disabled:shadow-none"
                  >
                    {isSending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 rtl:rotate-180" />
                    )}
                  </button>
                </form>

                <p className="relative px-3 pb-3 -mt-0.5 text-[10px] font-body-md text-slate-400 leading-snug bg-white/60">
                  {t('chat.disclaimer')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Video Avatar Button */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => (isChatOpen ? closeChat() : setIsChatOpen(true))}
              className="group relative flex items-center justify-center cursor-pointer outline-none focus:outline-none"
              aria-label={t('chat.hoverLabel')}
              title={t('chat.hoverLabel')}
            >
              {/* Soft ambient halo, matching the blurred orbs used site-wide */}
              <div className="absolute -inset-3 bg-gradient-to-r from-sky-400/25 to-blue-500/25 rounded-3xl blur-2xl opacity-80 group-hover:opacity-100 transition duration-500" />

              {/* Avatar card — rounded-3xl and the glass border used by the
                  site's cards, rather than a circle that matches nothing else.
                  The sky wash keeps it from disappearing against the white
                  sections it floats over. */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-sky-50/95 to-white/85 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(56,189,248,0.2)] overflow-hidden transition-all duration-300 group-hover:border-sky-300 group-hover:-translate-y-0.5">
                <video
                  src={roshaChatVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain p-1"
                />
              </div>

              {/* Live dot, echoing the "Online" indicator in the panel header */}
              <span className="absolute top-1 right-1 rtl:right-auto rtl:left-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
              </span>

              {/* Hover Label — same white pill the showcase sections use */}
              <span className="absolute right-full rtl:right-auto rtl:left-full mr-3 rtl:mr-0 rtl:ml-3 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 text-slate-700 text-xs font-label-sm font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {t('chat.hoverLabel')}
              </span>
            </button>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
