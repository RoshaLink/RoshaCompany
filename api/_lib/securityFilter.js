/**
 * Server-side deterministic output guardrails for Rosha AI Chat.
 * Ensures that even in the case of novel jailbreaks, forbidden outputs
 * (such as source code generation or prompt leakage) never reach the user.
 */

const ZERO_CODE_REFUSAL = {
  sv: 'Jag genererar inte kod i den här chatten. RoshaLinks ingenjörsteam bygger kompletta, skräddarsydda digitala produkter för företag. Berätta gärna om ditt projekt så sätter vi dig i kontakt med teamet!',
  en: "I don't generate or review code in this chat. RoshaLink's engineering team builds full-scale, custom software solutions for businesses. We'd love to help you build your project — feel free to tell me what you have in mind!",
  fa: 'من در این چت کد یا اسکریپت تولید نمی‌کنم. تیم فنی و مهندسی روشالینک پروژه‌ها و نرم‌افزارهای اختصاصی رو به طور کامل پیاده‌سازی می‌کنن. اگر پروژه‌ای در نظر دارید، خوشحال می‌شم کمکتون کنم تا با تیم فنی در ارتباط باشید!',
  ar: 'أنا لا أقوم بكتابة أو توليد الأكواد البرمجية هنا. فريق مهندسي روشالينك يطور الأنظمة والبرمجيات المخصصة بالكامل. يسعدنا التعاون معك في مشروعك!',
};

const PROMPT_LEAK_REFUSAL = {
  sv: 'Jag är Rosha, RoshaLinks digitala rådgivare. Hur kan jag hjälpa dig med era webb- eller mobilprojekt?',
  en: "I am Rosha, RoshaLink's digital assistant. How can we assist with your web, mobile, or software project?",
  fa: 'من رُشا، همراه دیجیتال روشالینک هستم. چطور می‌تونم در زمینه پروژه‌های وب، اپلیکیشن یا هوش مصنوعی کمکتون کنم؟',
  ar: 'أنا رُشا، المستشار الرقمي لروشالينك. كيف يمكنني مساعدتك في مشروعك الرقمي؟',
};

const CODE_BLOCK_REGEX = /```[\s\S]*?```/;
const INDENTED_CODE_REGEX = /^(?: {4}|\t)(?:def |function |const |import |class |SELECT |<script)/m;
const COMMON_CODE_PATTERNS = [
  /\bdef\s+[a-zA-Z_]\w*\s*\(/,
  /\bfunction\s+[a-zA-Z_]\w*\s*\(/,
  /\b(?:const|let|var)\s+[a-zA-Z_]\w*\s*=\s*(?:require\(|(?:\([^)]*\)|[a-zA-Z_]\w*)\s*=>|\{|\[)/,
  /<script\b[^>]*>[\s\S]*?<\/script>/i,
  /\bconsole\.log\s*\(/,
  /\bprint\s*\(["'].*?["']\)/,
  /\bSELECT\s+.+\s+FROM\s+/i,
  /\b(?:import|export)\s+(?:\{|\*|default|[a-zA-Z_]\w*)\s+from\s+['"]/,
];

const LEAK_SIGNATURES = [
  /# ROLE & IDENTITY/i,
  /# STRICT ZERO-CODE POLICY/i,
  /# ANTI-PROMPT-INJECTION/i,
  /Things you must never state/i,
  /COMPANY_FACTS/i,
  /buildSystemPrompt/i,
];

/**
 * Checks whether an assistant's generated reply contains code or prompt leakage,
 * and replaces it deterministically with a safe refusal if detected.
 */
export function sanitizeAssistantReply(reply = '', uiLang = 'sv') {
  if (typeof reply !== 'string') return '';
  const lang = ['sv', 'en', 'fa', 'ar'].includes(uiLang) ? uiLang : 'sv';

  // 1. Check for system prompt leakage
  for (const sig of LEAK_SIGNATURES) {
    if (sig.test(reply)) {
      return PROMPT_LEAK_REFUSAL[lang];
    }
  }

  // 2. Check for markdown code blocks (```code```)
  if (CODE_BLOCK_REGEX.test(reply)) {
    return ZERO_CODE_REFUSAL[lang];
  }

  // 3. Check for indented code blocks
  if (INDENTED_CODE_REGEX.test(reply)) {
    return ZERO_CODE_REFUSAL[lang];
  }

  // 4. Check for distinct programming language patterns
  for (const pattern of COMMON_CODE_PATTERNS) {
    if (pattern.test(reply)) {
      return ZERO_CODE_REFUSAL[lang];
    }
  }

  return reply;
}
