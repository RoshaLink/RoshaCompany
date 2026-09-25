// @ts-nocheck -- see tsconfig.api.json's compilerOptions comment: variadic
// React.createElement(...) children don't type-check cleanly under `strict`
// without JSX. This file has no JSX itself, but api/lead.js pulls plain
// strings out of it alongside the templates it does affect, and keeping the
// same pragma across every file in this folder avoids a one-off exception.

/**
 * Locale strings for the two visitor-facing email templates (WelcomeEmail,
 * ContactConfirmationEmail). LeadNotificationEmail is intentionally NOT
 * localized here — it's read by the RoshaLink team, not the visitor, so it
 * always renders in English regardless of the lead's `lang`.
 *
 * Mirrors the site's own locale set and its 'sv' fallback convention (see
 * ContactPage.jsx's `i18n.language || 'sv'`, newsletter.js's `lang || 'sv'`).
 * These are original, email-specific strings, not pulled from src/i18n.js —
 * that file's `contactPage`/`footer` keys are UI copy for the SPA, not
 * transactional-email copy, and api/ never imports from src/ (kept mutual:
 * see AGENTS.md's "Never import anything from api/_lib/ into src/").
 */

const SUPPORTED_LOCALES = ['sv', 'en', 'fa', 'ar'];
const RTL_LOCALES = new Set(['fa', 'ar']);

/** Normalizes an arbitrary `lang` value ('en-US', 'EN', undefined, ...) to one of the four supported locales, falling back to 'sv'. */
export function resolveLocale(lang) {
  const code = String(lang || '').slice(0, 2).toLowerCase();
  return SUPPORTED_LOCALES.includes(code) ? code : 'sv';
}

export function isRtl(locale) {
  return RTL_LOCALES.has(locale);
}

export function dirFor(locale) {
  return isRtl(locale) ? 'rtl' : 'ltr';
}

const common = {
  sv: {
    tagline: 'Strategisk Design & Teknikbyrå',
    footerPrivacy: 'Integritetspolicy',
    footerContact: 'Kontakt',
    footerWebsite: 'Webbplats',
    footerUnsubscribe: 'Avsluta prenumeration',
    copyright: (year) => `© ${year} RoshaLink. Alla rättigheter förbehållna.`,
  },
  en: {
    tagline: 'Strategic Design & Tech Agency',
    footerPrivacy: 'Privacy Policy',
    footerContact: 'Contact',
    footerWebsite: 'Website',
    footerUnsubscribe: 'Unsubscribe',
    copyright: (year) => `© ${year} RoshaLink. All rights reserved.`,
  },
  fa: {
    tagline: 'آژانس طراحی استراتژیک و فناوری',
    footerPrivacy: 'حریم خصوصی',
    footerContact: 'تماس با ما',
    footerWebsite: 'وب‌سایت',
    footerUnsubscribe: 'لغو اشتراک',
    copyright: (year) => `© ${year} روشالینک. تمامی حقوق محفوظ است.`,
  },
  ar: {
    tagline: 'وكالة التصميم الاستراتيجي والتقنية',
    footerPrivacy: 'سياسة الخصوصية',
    footerContact: 'اتصل بنا',
    footerWebsite: 'الموقع الإلكتروني',
    footerUnsubscribe: 'إلغاء الاشتراك',
    copyright: (year) => `© ${year} روشالينك. جميع الحقوق محفوظة.`,
  },
};

/**
 * The welcome-email headline is a highlighted single word/phrase inside a
 * bigger sentence (see WelcomeEmail.js's gradient-text span), and where a
 * name naturally lands in that sentence differs by language — Swedish/
 * English put it at the end ("Welcome aboard, {name}!"), a natural Farsi/
 * Arabic greeting puts it before the highlighted word instead. `headline`
 * is a function returning `{ before, highlight, after }` so each locale can
 * choose its own word order rather than forcing one template shape.
 *
 * `firstName` is optional: the newsletter form collects no name, and a
 * hardcoded English fallback like "there" produced "Välkommen ombord, there!"
 * and "there عزیز" — mixed-language greetings that read as spam.
 */
const welcome = {
  sv: {
    subject: "Välkommen till RoshaLink — låt oss bygga något fantastiskt",
    previewText: "Välkommen till RoshaLink — låt oss bygga något fantastiskt",
    badge: 'Välkommen',
    headline: (firstName) => ({ before: 'Välkommen ', highlight: 'ombord', after: firstName ? `, ${firstName}!` : '!' }),
    subtitle: "Tack för att du valde RoshaLink. Vi ser fram emot att samarbeta med dig i ditt nästa digitala projekt.",
    features: [
      { title: 'Boka ditt uppstartsmöte', body: 'Välj en tid som passar och träffa teamet som leder ditt projekt.' },
      { title: 'Träffa ditt projektteam', body: 'Bli presenterad för designers och utvecklare bakom ditt projekt.' },
      { title: 'Följ framstegen i realtid', body: 'Följ varje milstolpe via en delad projektdashboard.' },
    ],
    cta: 'Kom igång',
  },
  en: {
    subject: "Welcome to RoshaLink — let's build something great",
    previewText: "Welcome to RoshaLink — let's build something great",
    badge: 'Welcome',
    headline: (firstName) => ({ before: 'Welcome ', highlight: 'aboard', after: firstName ? `, ${firstName}!` : '!' }),
    subtitle: "Thanks for choosing RoshaLink. We're excited to partner with you on your next digital project.",
    features: [
      { title: 'Book your kickoff call', body: 'Pick a time that works and meet the team leading your project.' },
      { title: 'Meet your project team', body: 'Get introduced to the designers and engineers behind your build.' },
      { title: 'Track progress in real time', body: 'Follow every milestone from a shared project dashboard.' },
    ],
    cta: 'Get Started',
  },
  fa: {
    subject: 'به روشالینک خوش آمدید — بیایید چیزی فوق‌العاده بسازیم',
    previewText: 'به روشالینک خوش آمدید — بیایید چیزی فوق‌العاده بسازیم',
    badge: 'خوش آمدید',
    headline: (firstName) => ({ before: firstName ? `${firstName} عزیز، ` : '', highlight: 'خوش آمدید', after: firstName ? '' : '!' }),
    subtitle: 'از اینکه روشالینک را انتخاب کردید سپاسگزاریم. مشتاقانه منتظریم تا در پروژه دیجیتال بعدی شما همکاری کنیم.',
    features: [
      { title: 'زمان جلسه شروع پروژه را رزرو کنید', body: 'زمانی مناسب انتخاب کنید و با تیمی که پروژه شما را هدایت می‌کند آشنا شوید.' },
      { title: 'با تیم پروژه خود آشنا شوید', body: 'با طراحان و مهندسانی که پروژه شما را می‌سازند آشنا شوید.' },
      { title: 'پیشرفت پروژه را به‌صورت لحظه‌ای دنبال کنید', body: 'هر مرحله از پروژه را از طریق داشبورد مشترک پروژه دنبال کنید.' },
    ],
    cta: 'شروع کنید',
  },
  ar: {
    subject: 'مرحباً بك في روشالينك — لنبنِ شيئاً رائعاً معاً',
    previewText: 'مرحباً بك في روشالينك — لنبنِ شيئاً رائعاً معاً',
    badge: 'أهلاً بك',
    headline: (firstName) => ({ before: '', highlight: 'أهلاً بك', after: firstName ? `، ${firstName}!` : '!' }),
    subtitle: 'شكراً لاختيارك روشالينك. يسعدنا التعاون معك في مشروعك الرقمي القادم.',
    features: [
      { title: 'احجز مكالمة الانطلاق', body: 'اختر موعداً يناسبك وتعرف على الفريق الذي سيقود مشروعك.' },
      { title: 'تعرف على فريق مشروعك', body: 'تعرف على المصممين والمهندسين الذين يعملون على مشروعك.' },
      { title: 'تابع التقدم لحظة بلحظة', body: 'تابع كل مرحلة من خلال لوحة معلومات مشتركة للمشروع.' },
    ],
    cta: 'ابدأ الآن',
  },
};

const confirmation = {
  sv: {
    subject: 'Vi har tagit emot ditt meddelande — RoshaLink',
    previewText: 'Tack för att du hörde av dig — här är en kopia av det du skickade',
    headline: (firstName) => `Tack för att du hörde av dig, ${firstName}!`,
    subtitle: 'Vi har tagit emot din förfrågan och vårt team hör av sig inom 1 arbetsdag.',
    yourSubmission: 'Din inskickade information',
    fieldName: 'Namn',
    fieldEmail: 'E-post',
    fieldService: 'Tjänst',
    fieldMessage: 'Meddelande',
    cta: 'Utforska vårt arbete',
  },
  en: {
    subject: "We've received your message — RoshaLink",
    previewText: "Thanks for reaching out — here's a copy of what you sent us",
    headline: (firstName) => `Thanks for reaching out, ${firstName}!`,
    subtitle: "We've received your enquiry and our team will be in touch within 1 business day.",
    yourSubmission: 'Your submission',
    fieldName: 'Name',
    fieldEmail: 'Email',
    fieldService: 'Service',
    fieldMessage: 'Message',
    cta: 'Explore Our Work',
  },
  fa: {
    subject: 'پیام شما دریافت شد — روشالینک',
    previewText: 'از تماس شما سپاسگزاریم — این کپی پیامی است که ارسال کردید',
    headline: (firstName) => `${firstName} عزیز، از تماس شما سپاسگزاریم!`,
    subtitle: 'درخواست شما دریافت شد و تیم ما ظرف ۱ روز کاری با شما تماس خواهد گرفت.',
    yourSubmission: 'اطلاعات ارسالی شما',
    fieldName: 'نام',
    fieldEmail: 'ایمیل',
    fieldService: 'خدمت مورد نظر',
    fieldMessage: 'پیام',
    cta: 'نمونه‌کارهای ما را ببینید',
  },
  ar: {
    subject: 'لقد استلمنا رسالتك — روشالينك',
    previewText: 'شكراً لتواصلك معنا — إليك نسخة مما أرسلته',
    headline: (firstName) => `شكراً لتواصلك معنا، ${firstName}!`,
    subtitle: 'لقد استلمنا استفسارك وسيتواصل معك فريقنا خلال يوم عمل واحد.',
    yourSubmission: 'المعلومات المُرسلة',
    fieldName: 'الاسم',
    fieldEmail: 'البريد الإلكتروني',
    fieldService: 'الخدمة',
    fieldMessage: 'الرسالة',
    cta: 'استعرض أعمالنا',
  },
};

/** Copy for the small HTML pages `api/unsubscribe.js` renders in the browser. */
const unsubscribe = {
  sv: {
    pageTitle: 'Avsluta prenumeration — RoshaLink',
    confirmHeading: 'Avsluta prenumerationen?',
    confirmBody: (email) => `Du kommer inte längre att få nyhetsbrev från RoshaLink till ${email}.`,
    confirmButton: 'Ja, avsluta prenumerationen',
    doneHeading: 'Du är avregistrerad',
    doneBody: 'Du kommer inte att få fler nyhetsbrev från oss. Ångrat dig? Anmäl dig igen när som helst på roshalink.com.',
    invalidHeading: 'Länken är ogiltig',
    invalidBody: 'Den här avregistreringslänken är ofullständig eller har ändrats. Använd länken i det senaste mejlet, eller kontakta oss på support@roshalink.com.',
    errorHeading: 'Något gick fel',
    errorBody: 'Vi kunde inte avsluta din prenumeration just nu. Försök igen om en stund, eller mejla support@roshalink.com så hjälper vi dig.',
    backToSite: 'Till roshalink.com',
  },
  en: {
    pageTitle: 'Unsubscribe — RoshaLink',
    confirmHeading: 'Unsubscribe?',
    confirmBody: (email) => `You will no longer receive RoshaLink newsletters at ${email}.`,
    confirmButton: 'Yes, unsubscribe me',
    doneHeading: "You're unsubscribed",
    doneBody: "You won't receive any more newsletters from us. Changed your mind? You can sign up again any time at roshalink.com.",
    invalidHeading: 'This link is not valid',
    invalidBody: 'This unsubscribe link is incomplete or has been changed. Please use the link in our most recent email, or contact us at support@roshalink.com.',
    errorHeading: 'Something went wrong',
    errorBody: "We couldn't unsubscribe you right now. Please try again in a moment, or email support@roshalink.com and we'll take care of it.",
    backToSite: 'Go to roshalink.com',
  },
  fa: {
    pageTitle: 'لغو اشتراک — روشالینک',
    confirmHeading: 'اشتراک خود را لغو می‌کنید؟',
    confirmBody: (email) => `دیگر خبرنامه‌های روشالینک به ${email} ارسال نخواهد شد.`,
    confirmButton: 'بله، اشتراک من را لغو کنید',
    doneHeading: 'اشتراک شما لغو شد',
    doneBody: 'دیگر خبرنامه‌ای از ما دریافت نخواهید کرد. نظرتان تغییر کرد؟ هر زمان می‌توانید دوباره در roshalink.com عضو شوید.',
    invalidHeading: 'این لینک معتبر نیست',
    invalidBody: 'این لینک لغو اشتراک ناقص است یا تغییر کرده است. لطفاً از لینک آخرین ایمیل ما استفاده کنید یا با support@roshalink.com تماس بگیرید.',
    errorHeading: 'مشکلی پیش آمد',
    errorBody: 'در حال حاضر نتوانستیم اشتراک شما را لغو کنیم. لطفاً کمی بعد دوباره امتحان کنید یا به support@roshalink.com ایمیل بزنید تا پیگیری کنیم.',
    backToSite: 'رفتن به roshalink.com',
  },
  ar: {
    pageTitle: 'إلغاء الاشتراك — روشالينك',
    confirmHeading: 'هل تريد إلغاء الاشتراك؟',
    confirmBody: (email) => `لن تتلقى بعد الآن النشرات الإخبارية من روشالينك على ${email}.`,
    confirmButton: 'نعم، ألغِ اشتراكي',
    doneHeading: 'تم إلغاء اشتراكك',
    doneBody: 'لن تتلقى أي نشرات إخبارية أخرى منا. غيّرت رأيك؟ يمكنك الاشتراك مجدداً في أي وقت عبر roshalink.com.',
    invalidHeading: 'هذا الرابط غير صالح',
    invalidBody: 'رابط إلغاء الاشتراك هذا غير مكتمل أو تم تغييره. يرجى استخدام الرابط الموجود في أحدث رسالة منا، أو التواصل معنا عبر support@roshalink.com.',
    errorHeading: 'حدث خطأ ما',
    errorBody: 'لم نتمكن من إلغاء اشتراكك الآن. يرجى المحاولة مرة أخرى بعد قليل، أو مراسلتنا على support@roshalink.com وسنتولى الأمر.',
    backToSite: 'الانتقال إلى roshalink.com',
  },
};

/** `{ common, welcome, confirmation, unsubscribe }` strings already resolved for one locale. */
export function emailCopy(lang) {
  const locale = resolveLocale(lang);
  return {
    locale,
    common: common[locale],
    welcome: welcome[locale],
    confirmation: confirmation[locale],
    unsubscribe: unsubscribe[locale],
  };
}
