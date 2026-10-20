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
 * Welcome email, sent once a subscriber confirms (double opt-in). The promise
 * — "once a quarter" — matches the site footer's own "Get quarterly strategic
 * insights and technical briefs"; don't change one without the other.
 *
 * `headline` returns `{ before, highlight, after }` because the gradient-
 * highlighted word sits at a different position in each language's natural
 * phrasing (see WelcomeEmail.js). There's no name in it: the newsletter form
 * collects none, and an English fallback like "there" produced mixed-language
 * greetings ("Välkommen ombord, there!") that read as spam.
 */
const welcome = {
  sv: {
    subject: 'Du prenumererar nu på RoshaLink Insights',
    previewText: 'Det här kan du förvänta dig — och en titt på vad vi har byggt.',
    badge: 'Prenumeration bekräftad',
    headline: () => ({ before: 'Nu är du ', highlight: 'med', after: '!' }),
    subtitle: 'Tack för att du bekräftade. En gång i kvartalet skickar vi korta, praktiska insikter om digital strategi, design och teknik — skrivna för företagare, inte för utvecklare.',
    whatToExpect: 'Det här får du',
    features: [
      { title: 'Insikter värda din tid', body: 'Trender inom strategi, design och teknik, sammanfattade på några minuters läsning.' },
      { title: 'Lärdomar från riktiga projekt', body: 'Vad som fungerade, vad som inte gjorde det och varför — direkt från vårt arbete med kunder.' },
      { title: 'Aldrig spam', body: 'Vi hör bara av oss när vi har något användbart att dela. Avsluta prenumerationen med ett klick när du vill.' },
    ],
    cta: 'Se våra senaste projekt',
    replyNote: 'Planerar du ett projekt? Svara bara på det här mejlet — det går direkt till vårt team.',
  },
  en: {
    subject: "You're subscribed to RoshaLink Insights",
    previewText: "Here's what to expect — and a look at what we've been building.",
    badge: 'Subscription confirmed',
    headline: () => ({ before: "You're ", highlight: 'in', after: '!' }),
    subtitle: "Thanks for confirming. Once a quarter, we'll send you short, practical insights on digital strategy, design and technology — written for business owners, not engineers.",
    whatToExpect: "What you'll get",
    features: [
      { title: 'Insights worth your time', body: 'Strategy, design and tech trends, distilled into a few minutes of reading.' },
      { title: 'Lessons from real projects', body: "What worked, what didn't, and why — straight from our client work." },
      { title: 'No spam, ever', body: 'We only write when we have something useful to share. Unsubscribe in one click, any time.' },
    ],
    cta: 'See our latest work',
    replyNote: 'Planning a project? Just reply to this email — it goes straight to our team.',
  },
  fa: {
    subject: 'عضویت شما در خبرنامه روشالینک تأیید شد',
    previewText: 'آنچه در انتظار شماست — و نگاهی به کارهای اخیر ما.',
    badge: 'عضویت تأیید شد',
    headline: () => ({ before: 'به جمع ما ', highlight: 'خوش آمدید', after: '!' }),
    subtitle: 'از تأیید شما سپاسگزاریم. هر سه ماه یک بار، نکات کوتاه و کاربردی درباره استراتژی دیجیتال، طراحی و فناوری برایتان می‌فرستیم — نوشته‌شده برای صاحبان کسب‌وکار، نه برنامه‌نویسان.',
    whatToExpect: 'آنچه دریافت خواهید کرد',
    features: [
      { title: 'نکاتی که ارزش وقتتان را دارد', body: 'روندهای استراتژی، طراحی و فناوری، خلاصه‌شده در چند دقیقه مطالعه.' },
      { title: 'درس‌هایی از پروژه‌های واقعی', body: 'چه چیزی جواب داد، چه چیزی نه، و چرا — مستقیماً از تجربه کار با مشتریانمان.' },
      { title: 'بدون هرزنامه', body: 'فقط زمانی ایمیل می‌زنیم که حرف مفیدی برای گفتن داشته باشیم. هر زمان خواستید با یک کلیک لغو اشتراک کنید.' },
    ],
    cta: 'آخرین نمونه‌کارهای ما را ببینید',
    replyNote: 'پروژه‌ای در ذهن دارید؟ کافی است به همین ایمیل پاسخ دهید — مستقیماً به دست تیم ما می‌رسد.',
  },
  ar: {
    subject: 'تم تأكيد اشتراكك في نشرة روشالينك',
    previewText: 'إليك ما يمكنك توقعه — ونظرة على ما نعمل عليه مؤخراً.',
    badge: 'تم تأكيد الاشتراك',
    headline: () => ({ before: 'أنت ', highlight: 'معنا الآن', after: '!' }),
    subtitle: 'شكراً لتأكيد اشتراكك. مرة كل ثلاثة أشهر، سنرسل إليك رؤى قصيرة وعملية حول الاستراتيجية الرقمية والتصميم والتقنية — مكتوبة لأصحاب الأعمال، لا للمبرمجين.',
    whatToExpect: 'ما الذي ستحصل عليه',
    features: [
      { title: 'رؤى تستحق وقتك', body: 'أبرز اتجاهات الاستراتيجية والتصميم والتقنية، في دقائق قليلة من القراءة.' },
      { title: 'دروس من مشاريع حقيقية', body: 'ما الذي نجح، وما الذي لم ينجح، ولماذا — مباشرةً من عملنا مع عملائنا.' },
      { title: 'بلا رسائل مزعجة', body: 'لا نراسلك إلا عندما يكون لدينا ما يفيدك. يمكنك إلغاء الاشتراك بنقرة واحدة في أي وقت.' },
    ],
    cta: 'شاهد أحدث أعمالنا',
    replyNote: 'تخطط لمشروع؟ ما عليك سوى الرد على هذه الرسالة — ستصل مباشرةً إلى فريقنا.',
  },
};

/** "Confirm your subscription" email — the first step of double opt-in. */
const subscribeConfirm = {
  sv: {
    subject: 'Bekräfta din prenumeration på RoshaLink Insights',
    previewText: 'Ett klick så är du med.',
    badge: 'Ett sista steg',
    heading: 'Bekräfta din prenumeration',
    body: 'Någon — förhoppningsvis du — har bett om att få RoshaLinks nyhetsbrev till den här adressen. Tryck på knappen nedan för att bekräfta.',
    button: 'Bekräfta prenumeration',
    expiry: (days) => `Länken gäller i ${days} dagar.`,
    fallbackLabel: 'Fungerar inte knappen? Kopiera och klistra in den här länken i din webbläsare:',
    ignore: 'Har du inte anmält dig? Ignorera bara det här mejlet — du läggs inte till och vi mejlar dig inte igen.',
  },
  en: {
    subject: 'Confirm your subscription to RoshaLink Insights',
    previewText: "One click and you're in.",
    badge: 'One last step',
    heading: 'Confirm your subscription',
    body: "Someone — hopefully you — asked to receive RoshaLink's newsletter at this address. Tap the button below to confirm.",
    button: 'Confirm subscription',
    expiry: (days) => `This link is valid for ${days} days.`,
    fallbackLabel: "Button not working? Copy and paste this link into your browser:",
    ignore: "Didn't sign up? Just ignore this email — you won't be subscribed and we won't email you again.",
  },
  fa: {
    subject: 'عضویت خود را در خبرنامه روشالینک تأیید کنید',
    previewText: 'فقط یک کلیک تا عضویت فاصله دارید.',
    badge: 'آخرین مرحله',
    heading: 'عضویت خود را تأیید کنید',
    body: 'شخصی — امیدواریم خود شما — درخواست کرده است که خبرنامه روشالینک به این آدرس ارسال شود. برای تأیید، روی دکمه زیر بزنید.',
    button: 'تأیید عضویت',
    expiry: (days) => `این لینک به مدت ${days} روز معتبر است.`,
    fallbackLabel: 'دکمه کار نمی‌کند؟ این لینک را کپی کرده و در مرورگر خود باز کنید:',
    ignore: 'ثبت‌نام نکرده‌اید؟ کافی است این ایمیل را نادیده بگیرید — عضو نخواهید شد و دیگر ایمیلی از ما دریافت نمی‌کنید.',
  },
  ar: {
    subject: 'أكّد اشتراكك في نشرة روشالينك',
    previewText: 'نقرة واحدة وتصبح معنا.',
    badge: 'خطوة أخيرة',
    heading: 'أكّد اشتراكك',
    body: 'طلب أحدهم — ونأمل أن تكون أنت — استلام النشرة الإخبارية من روشالينك على هذا العنوان. اضغط على الزر أدناه للتأكيد.',
    button: 'تأكيد الاشتراك',
    expiry: (days) => `هذا الرابط صالح لمدة ${days} أيام.`,
    fallbackLabel: 'الزر لا يعمل؟ انسخ هذا الرابط والصقه في متصفحك:',
    ignore: 'لم تشترك؟ تجاهل هذه الرسالة ببساطة — لن يتم اشتراكك ولن نراسلك مرة أخرى.',
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

/**
 * Cold outreach template (ColdOutreachEmail.js). Unlike the templates above,
 * this one is never sent by any api/ route — it's rendered manually (see
 * AGENTS.md's "Cold outreach template" note) and copy-pasted into a real
 * mailbox one recipient at a time. `observation` (the personalized hook) is
 * always hand-written per recipient regardless of locale, so it isn't a key
 * here; everything else is the reusable, generic part of the email.
 */
const coldOutreach = {
  sv: {
    footerTagline: 'Strategisk Design & Teknikbyrå · Stockholm, Sverige',
    greeting: (name) => `Hej ${name},`,
    intro: 'Vi är RoshaLink — ett litet, senior team baserat i Stockholm. Vi är fem personer, så du jobbar direkt med den som faktiskt bygger din lösning, inte via en projektledare.',
    focusAreas: [
      { title: 'Skräddarsydda webb- & e-handelslösningar', body: 'Skräddarsydda webbappar, butiker och mobilappar, byggda och levererade från start till mål.' },
      { title: 'Dashboards & interna verktyg', body: 'CRM/ERP-integrationer, analysdashboards och driftverktyg byggda utifrån hur teamet faktiskt arbetar.' },
      { title: 'AI-assisterade arbetsflöden', body: 'Smarta assistenter och automation för de repetitiva delarna av verksamheten.' },
    ],
    ctaIntro: (company) => `Om det är intressant hjälper vi gärna till med en kort, kostnadsfri titt på ${company ? `${company}s` : 'er'} webbplats och skickar över vad vi hade ändrat — helt utan säljpitch.`,
    ctaLabel: 'Boka ett kostnadsfritt uppstartssamtal',
    replyNote: (firstName) => `Oavsett — svara bara på det här mejlet och säg till ${firstName} om du hellre inte vill höra från oss igen, inga hårda känslor.`,
    signOff: 'Vänliga hälsningar,',
    previewText: (company) => (company ? `En snabb notering om ${company}` : 'En snabb notering till dig'),
  },
  en: {
    footerTagline: 'Strategic Design & Tech Agency · Stockholm, Sweden',
    greeting: (name) => `Hi ${name},`,
    intro: "We're RoshaLink — a small, senior team based in Stockholm. Five of us, so you'd work directly with whoever is building your thing rather than through account managers.",
    focusAreas: [
      { title: 'Custom web & e-commerce', body: 'Bespoke web apps, storefronts and mobile apps, built and shipped end to end.' },
      { title: 'Dashboards & internal tools', body: 'CRM/ERP integrations, analytics dashboards and operations tooling built around how the team actually works.' },
      { title: 'AI-assisted workflows', body: 'Smart assistants and automation for the repetitive parts of the business.' },
    ],
    ctaIntro: (company) => `If that's useful, happy to do a short, no-obligation look at ${company ? `${company}'s` : 'your'} site and send over what we'd change — no pitch attached.`,
    ctaLabel: 'Book a free discovery call',
    replyNote: (firstName) => `Either way — just reply and let ${firstName} know if you'd rather not hear from us again, no hard feelings.`,
    signOff: 'Best,',
    previewText: (company) => (company ? `A quick note about ${company}` : 'A quick note for you'),
  },
  fa: {
    footerTagline: 'آژانس طراحی استراتژیک و فناوری · استکهلم، سوئد',
    greeting: (name) => `${name} عزیز،`,
    intro: 'ما روشالینک هستیم — یک تیم کوچک و باتجربه در استکهلم. پنج نفریم، پس مستقیماً با کسی که کار شما را می‌سازد در ارتباط خواهید بود، نه از طریق مدیر پروژه.',
    focusAreas: [
      { title: 'وب‌سایت و فروشگاه اینترنتی اختصاصی', body: 'اپلیکیشن‌های وب، فروشگاه‌های آنلاین و اپلیکیشن‌های موبایل، طراحی و تحویل‌شده به‌صورت کامل.' },
      { title: 'داشبورد و ابزارهای داخلی', body: 'یکپارچه‌سازی CRM/ERP، داشبوردهای تحلیلی و ابزارهای عملیاتی متناسب با روش کار واقعی تیم شما.' },
      { title: 'گردش‌کارهای مبتنی بر هوش مصنوعی', body: 'دستیارهای هوشمند و اتوماسیون برای بخش‌های تکراری کسب‌وکار.' },
    ],
    ctaIntro: (company) => `اگر مفید باشد، خوشحال می‌شویم یک بررسی کوتاه و رایگان از وب‌سایت ${company || 'شما'} انجام دهیم و آنچه تغییر می‌دادیم را برایتان بفرستیم — بدون هیچ پیشنهاد فروشی.`,
    ctaLabel: 'رزرو یک مشاوره رایگان',
    replyNote: (firstName) => `در هر صورت — کافی است به همین ایمیل پاسخ دهید و به ${firstName} بگویید اگر ترجیح می‌دهید دیگر از ما پیامی دریافت نکنید، بدون هیچ مشکلی.`,
    signOff: 'با احترام،',
    previewText: (company) => (company ? `یک یادداشت کوتاه درباره ${company}` : 'یک یادداشت کوتاه برای شما'),
  },
  ar: {
    footerTagline: 'وكالة التصميم الاستراتيجي والتقنية · ستوكهولم، السويد',
    greeting: (name) => `مرحباً ${name}،`,
    intro: 'نحن روشالينك — فريق صغير وذو خبرة مقره ستوكهولم. نحن خمسة أشخاص فقط، لذا ستعمل مباشرة مع من يقوم فعلياً ببناء مشروعك، وليس عبر مدير حسابات.',
    focusAreas: [
      { title: 'مواقع ومتاجر إلكترونية مخصصة', body: 'تطبيقات ويب مخصصة، متاجر إلكترونية وتطبيقات جوال، مبنية ومسلَّمة من الألف إلى الياء.' },
      { title: 'لوحات تحكم وأدوات داخلية', body: 'تكامل أنظمة CRM/ERP، لوحات تحليلات، وأدوات تشغيلية مصممة حسب طريقة عمل فريقك فعلياً.' },
      { title: 'سير عمل مدعوم بالذكاء الاصطناعي', body: 'مساعدون أذكياء وأتمتة للمهام المتكررة في العمل.' },
    ],
    ctaIntro: (company) => `إن كان هذا مفيداً، يسعدنا إلقاء نظرة سريعة ومجانية على موقع ${company || 'موقعكم'} وإرسال ما كنا سنغيّره — دون أي عرض مبيعات.`,
    ctaLabel: 'احجز مكالمة استكشافية مجانية',
    replyNote: (firstName) => `على أي حال — يكفي أن ترد على هذه الرسالة وتخبر ${firstName} إن كنت تفضل عدم التواصل معك مرة أخرى، دون أي حرج.`,
    signOff: 'مع أطيب التحيات،',
    previewText: (company) => (company ? `ملاحظة سريعة حول ${company}` : 'ملاحظة سريعة لك'),
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

/** Copy for the HTML pages `api/confirm-subscription.js` renders in the browser. */
const subscribePage = {
  sv: {
    pageTitle: 'Bekräfta prenumeration — RoshaLink',
    confirmHeading: 'Bekräfta din prenumeration',
    confirmBody: (email) => `Vill du börja få RoshaLinks nyhetsbrev till ${email}?`,
    confirmButton: 'Ja, prenumerera',
    doneHeading: 'Nu prenumererar du!',
    doneBody: 'Välkommen! Vi har precis skickat ett välkomstmejl till dig — titta i din inkorg.',
    invalidHeading: 'Länken är ogiltig',
    invalidBody: 'Den här bekräftelselänken är ofullständig eller har ändrats. Anmäl dig igen på roshalink.com.',
    expiredHeading: 'Länken har gått ut',
    expiredBody: (days) => `Bekräftelselänkar gäller i ${days} dagar. Anmäl dig igen på roshalink.com — det tar bara en sekund.`,
    errorHeading: 'Något gick fel',
    errorBody: 'Vi kunde inte bekräfta din prenumeration just nu. Försök igen om en stund, eller mejla support@roshalink.com så hjälper vi dig.',
    backToSite: 'Till roshalink.com',
  },
  en: {
    pageTitle: 'Confirm subscription — RoshaLink',
    confirmHeading: 'Confirm your subscription',
    confirmBody: (email) => `Start receiving RoshaLink's newsletter at ${email}?`,
    confirmButton: 'Yes, subscribe me',
    doneHeading: "You're subscribed!",
    doneBody: "Welcome aboard. We've just sent you a welcome email — check your inbox.",
    invalidHeading: 'This link is not valid',
    invalidBody: 'This confirmation link is incomplete or has been changed. Please sign up again on roshalink.com.',
    expiredHeading: 'This link has expired',
    expiredBody: (days) => `Confirmation links are valid for ${days} days. Please sign up again on roshalink.com — it only takes a second.`,
    errorHeading: 'Something went wrong',
    errorBody: "We couldn't confirm your subscription right now. Please try again in a moment, or email support@roshalink.com and we'll take care of it.",
    backToSite: 'Go to roshalink.com',
  },
  fa: {
    pageTitle: 'تأیید عضویت — روشالینک',
    confirmHeading: 'عضویت خود را تأیید کنید',
    confirmBody: (email) => `آیا می‌خواهید خبرنامه روشالینک به ${email} ارسال شود؟`,
    confirmButton: 'بله، عضو می‌شوم',
    doneHeading: 'عضویت شما تأیید شد!',
    doneBody: 'خوش آمدید. همین حالا یک ایمیل خوشامدگویی برایتان فرستادیم — صندوق ایمیل خود را بررسی کنید.',
    invalidHeading: 'این لینک معتبر نیست',
    invalidBody: 'این لینک تأیید ناقص است یا تغییر کرده است. لطفاً دوباره در roshalink.com عضو شوید.',
    expiredHeading: 'این لینک منقضی شده است',
    expiredBody: (days) => `لینک‌های تأیید ${days} روز اعتبار دارند. لطفاً دوباره در roshalink.com عضو شوید — فقط چند ثانیه طول می‌کشد.`,
    errorHeading: 'مشکلی پیش آمد',
    errorBody: 'در حال حاضر نتوانستیم عضویت شما را تأیید کنیم. لطفاً کمی بعد دوباره امتحان کنید یا به support@roshalink.com ایمیل بزنید تا پیگیری کنیم.',
    backToSite: 'رفتن به roshalink.com',
  },
  ar: {
    pageTitle: 'تأكيد الاشتراك — روشالينك',
    confirmHeading: 'أكّد اشتراكك',
    confirmBody: (email) => `هل تريد البدء في استلام نشرة روشالينك على ${email}؟`,
    confirmButton: 'نعم، اشترك',
    doneHeading: 'تم اشتراكك!',
    doneBody: 'أهلاً بك. أرسلنا إليك للتو رسالة ترحيب — تحقّق من بريدك الوارد.',
    invalidHeading: 'هذا الرابط غير صالح',
    invalidBody: 'رابط التأكيد هذا غير مكتمل أو تم تغييره. يرجى الاشتراك مجدداً عبر roshalink.com.',
    expiredHeading: 'انتهت صلاحية هذا الرابط',
    expiredBody: (days) => `روابط التأكيد صالحة لمدة ${days} أيام. يرجى الاشتراك مجدداً عبر roshalink.com — لن يستغرق الأمر سوى لحظة.`,
    errorHeading: 'حدث خطأ ما',
    errorBody: 'لم نتمكن من تأكيد اشتراكك الآن. يرجى المحاولة مرة أخرى بعد قليل، أو مراسلتنا على support@roshalink.com وسنتولى الأمر.',
    backToSite: 'الانتقال إلى roshalink.com',
  },
};

/** All strings, already resolved for one locale. */
export function emailCopy(lang) {
  const locale = resolveLocale(lang);
  return {
    locale,
    common: common[locale],
    welcome: welcome[locale],
    subscribeConfirm: subscribeConfirm[locale],
    confirmation: confirmation[locale],
    coldOutreach: coldOutreach[locale],
    unsubscribe: unsubscribe[locale],
    subscribePage: subscribePage[locale],
  };
}
