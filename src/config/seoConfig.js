/**
 * Comprehensive Multilingual SEO Metadata Matrix for RoshaLink (https://roshalink.com)
 * Optimized for Scandinavian (Sweden primary), European, and Middle Eastern markets.
 *
 * Nordic hreflang strategy:
 *   - sv / sv-SE → /sv  (primary: Sweden)
 *   - sv-FI       → /sv  (Swedish-speaking Finland)
 *   - nb / nn     → /sv  (Norway — nearest match)
 *   - da          → /sv  (Denmark — nearest match)
 *   - en / en-GB / en-US → /en
 *   - fa / fa-IR  → /fa
 *   - ar / ar-AE  → /ar
 *   - x-default   → /sv
 */

export const BASE_URL = 'https://roshalink.com';

export const SUPPORTED_LANGS = ['sv', 'en', 'fa', 'ar'];
export const DEFAULT_LANG = 'sv'; // Primary Scandinavian market focus

export const LOCALE_MAP = {
  sv: 'sv_SE',
  en: 'en_US',
  fa: 'fa_IR',
  ar: 'ar_AE',
};

/**
 * Extended hreflang entries beyond the four core locales.
 * Injected as <link rel="alternate"> in SEOHead and index.html
 * to capture the full Nordic + international audience.
 * Format: { hreflang: string, lang: string } where lang is a SUPPORTED_LANGS key.
 */
export const EXTENDED_HREFLANG = [
  { hreflang: 'sv-SE', lang: 'sv' },
  { hreflang: 'sv-FI', lang: 'sv' }, // Swedish-speaking Finland
  { hreflang: 'nb',    lang: 'sv' }, // Norwegian Bokmål → Swedish version
  { hreflang: 'nn',    lang: 'sv' }, // Norwegian Nynorsk → Swedish version
  { hreflang: 'da',    lang: 'sv' }, // Danish → Swedish version
  { hreflang: 'en-GB', lang: 'en' },
  { hreflang: 'en-US', lang: 'en' },
  { hreflang: 'fa-IR', lang: 'fa' },
  { hreflang: 'ar-AE', lang: 'ar' },
  { hreflang: 'ar-SA', lang: 'ar' },
];

/** Stockholm coordinates for geo schema */
export const GEO = {
  latitude: 59.3293,
  longitude: 18.0686,
  region: 'SE-AB',
  placename: 'Stockholm, Sweden',
};

/** Markets we actively serve (used in LocalBusiness areaServed schema) */
export const AREA_SERVED = ['SE', 'NO', 'DK', 'FI', 'GB', 'DE', 'NL', 'IR', 'AE', 'SA'];

/** Service sub-route slugs (/:lang/services/:slug). Order matches servicesList in i18n.js. */
export const SERVICE_SLUGS = [
  'discovery',
  'web-architecture',
  'cloud-backend',
  'ai-automation',
  'mobile-apps',
  'seo-performance',
];

/**
 * Last meaningful content change for the static (non-blog) pages. Feeds the
 * sitemap <lastmod>. Bump it when page copy actually changes — Google ignores
 * lastmod values it learns are not trustworthy (e.g. "today" on every build).
 */
export const SITE_LASTMOD = '2026-10-20';

/**
 * Every indexable static page, per language. Single source of truth for both
 * scripts/prerender.js (which routes get static HTML) and
 * scripts/generate-sitemap.js (which URLs go in sitemap.xml), so the two can
 * never drift apart. Blog posts are added from src/data/insightsData.js.
 */
export const SITE_PAGES = [
  { page: 'home',      changefreq: 'weekly',  priority: '1.0' },
  { page: 'services',  changefreq: 'weekly',  priority: '0.9' },
  ...SERVICE_SLUGS.map((slug) => ({ page: `services/${slug}`, changefreq: 'monthly', priority: '0.8' })),
  { page: 'portfolio', changefreq: 'monthly', priority: '0.8' },
  { page: 'insights',  changefreq: 'weekly',  priority: '0.7' },
  { page: 'about',     changefreq: 'monthly', priority: '0.7' },
  { page: 'contact',   changefreq: 'monthly', priority: '0.7' },
  { page: 'privacy',   changefreq: 'yearly',  priority: '0.3' },
];

export const seoPages = {
  home: {
    sv: {
      title: 'RoshaLink — Ledande Webbyrå för Webbutveckling & Apputveckling i Stockholm',
      description: 'Skräddarsydd webbutveckling, mobilappar och molnlösningar i Stockholm. Vi bygger snabba, skalbara digitala produkter med 100% anpassad kod — inga mallar, inga genvägar. Kontakta oss för kostnadsfri rådgivning.',
      keywords: 'webbutveckling Stockholm, webbyrå Stockholm, app-utvecklare Sverige, apputveckling Sverige, skräddarsydd webbdesign, hemsida pris, anlita webbutvecklare, digitalbyrå Stockholm, fullstack utvecklare Sverige, UI UX design Stockholm, SaaS-plattform Sverige, digital byrå Norden',
      ogImage: '/og-image-sv.jpg',
    },
    en: {
      title: 'RoshaLink — Strategic Web & Mobile App Development Agency in Stockholm',
      description: 'Bespoke web development, high-performance mobile apps, and scalable cloud architecture based in Stockholm. Built by senior engineers with 100% custom code for maximum ROI. Free consultation available.',
      keywords: 'custom web development Stockholm, mobile app development agency Sweden, bespoke software engineering, React Node.js developers Scandinavia, enterprise UI UX design, SaaS platform development Europe, digital agency Stockholm, hire web developers Sweden',
      ogImage: '/og-image-en.jpg',
    },
    fa: {
      title: 'روشالینک — آژانس تخصصی طراحی وب‌سایت، وب‌اپلیکیشن و اپلیکیشن موبایل در استکهلم',
      description: 'طراحی سایت اختصاصی، توسعه اپلیکیشن‌های موبایل iOS و اندروید و سیستم‌های ابری مقیاس‌پذیر در سوئد با کدنویسی ۱۰۰٪ اختصاصی. مشاوره رایگان برای پروژه‌های شما.',
      keywords: 'طراحی سایت اختصاصی سوئد, توسعه اپلیکیشن موبایل, ساخت وب اپلیکیشن, برنامه نویسی فول استک, آژانس دیجیتال فارسی زبان, آژانس دیجیتال مارکتینگ, طراحی UI UX حرفه ای, توسعه اپ در سوئد, شرکت برنامه نویسی ایرانی سوئد',
      ogImage: '/og-image-fa.jpg',
    },
    ar: {
      title: 'روشا لينك — وكالة رائدة في تصميم وتطوير مواقع الويب وتطبيقات الجوال في ستوكهولم',
      description: 'تطوير مواقع الويب المخصصة، برمجة تطبيقات الهاتف المحمول وتصميم الأنظمة السحابية المتقدمة في السويد بأعلى معايير الأداء والسرعة وبدون قوالب جاهزة. استشارة مجانية.',
      keywords: 'تصميم مواقع الكترونية السويد, تطوير تطبيقات الجوال, برمجة مواقع ويب مخصصة, وكالة برمجيات رقمية, شركة تصميم مواقع عربية, تطوير تطبيقات جوال عربي, تصميم واجهات المستخدم UI UX ستوكهولم',
      ogImage: '/og-image-ar.jpg',
    },
  },

  about: {
    sv: {
      title: 'Om RoshaLink — Seniora Ingenjörer & Produktarkitekter i Stockholm',
      description: 'Lär känna teamet bakom RoshaLink. 5 seniora partners med expertis inom företagsanalys, avancerad molninfrastruktur och skottsäker mjukvaruarkitektur. Baserade i Stockholm med globala leveranser.',
      keywords: 'om RoshaLink, digitalbyrå team Stockholm, seniora utvecklare Sverige, mjukvaruarkitekter Norden, affärsanalys IT, tech-konsulter Stockholm, CTO konsult Sverige',
      ogImage: '/og-image-about.jpg',
    },
    en: {
      title: 'About RoshaLink — Elite Software Engineers & Product Architects in Stockholm',
      description: 'Meet the senior partners behind RoshaLink. We combine rigorous business analysis with bulletproof software engineering to build transformative digital products. Headquartered in Stockholm, serving clients globally.',
      keywords: 'about RoshaLink, software development team Stockholm, senior tech consultants Scandinavia, cloud architects Sweden, digital agency founders, CTO consulting Sweden, tech partners Stockholm',
      ogImage: '/og-image-about.jpg',
    },
    fa: {
      title: 'درباره روشالینک — تیم مهندسین ارشد و معماران محصولات دیجیتال در استکهلم',
      description: 'با تیم متخصص و ۵ شریک ارشد روشالینک در سوئد آشنا شوید. ترکیب تحلیل دقیق کسب‌وکار و مهندسی نرم‌افزار برای خلق محصولات برتر دیجیتال. شرکت ایرانی-سوئدی.',
      keywords: 'درباره روشالینک, تیم توسعه نرم افزار سوئد, معماران ابری, مهندسین نرم افزار ایرانی سوئد, آژانس فناوری اطلاعات فارسی زبان, شرکت IT ایرانی',
      ogImage: '/og-image-about.jpg',
    },
    ar: {
      title: 'عن روشا لينك — نخبة من مهندسي البرمجيات وخبراء المنتجات الرقمية في ستوكهولم',
      description: 'تعرف على الشركاء والمهندسين في روشا لينك السويد. نجمع بين التحليل الاستراتيجي للأعمال والبرمجة فائقة الجودة لتحقيق أقصى نمو لمشروعك. شركة سويدية متعددة اللغات.',
      keywords: 'عن روشا لينك, فريق تطوير برمجيات السويد, مهندسو سحابيون ستوكهولم, استشارات تكنولوجيا المعلومات, شركة برمجيات عربية السويد',
      ogImage: '/og-image-about.jpg',
    },
  },

  services: {
    sv: {
      title: 'Tjänster: Webbutveckling, Appar & SEO i Stockholm | RoshaLink',
      description: 'Webbyrå i Stockholm för skräddarsydd webbutveckling i React och GraphQL, mobilappar för iOS och Android, molnbackend, AI-automation och teknisk SEO. Boka en kostnadsfri genomgång.',
      keywords: 'webbyrå stockholm, webbutveckling stockholm, react webbyrå stockholm, graphql webbyrå stockholm, apputveckling stockholm, teknisk seo stockholm, full-stack utveckling stockholm',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'Web, App & SEO Development Services in Stockholm | RoshaLink',
      description: 'Full-stack development services in Stockholm: custom React and GraphQL web apps, iOS and Android apps, cloud backends, AI automation and technical SEO. Free initial consultation.',
      keywords: 'full-stack development services stockholm, web development agency stockholm, react graphql agency stockholm, mobile app development stockholm, technical seo stockholm',
      ogImage: '/og-image-services.jpg',
    },
    fa: {
      title: 'خدمات تخصصی — توسعه وب، اپلیکیشن موبایل، سیستم‌های ابری و سئو | روشالینک سوئد',
      description: 'طیف کامل خدمات مهندسی در سوئد: طراحی و برنامه‌نویسی وب‌سایت‌های پیشرفته، اپلیکیشن موبایل، تحلیل سیستم‌های کسب‌وکار، سئو و بهینه‌سازی فروش. تحلیل فنی رایگان.',
      keywords: 'خدمات طراحی سایت سوئد, خدمات برنامه نویسی موبایل, خدمات سئو وب سایت, توسعه نرم افزار اختصاصی ایرانی, بهینه سازی سرعت سایت, React توسعه, Node.js مشاور',
      ogImage: '/og-image-services.jpg',
    },
    ar: {
      title: 'خدماتنا — تصميم مواقع الويب، تطبيقات الجوال والحلول السحابية | روشا لينك السويد',
      description: 'خدمات برمجية شاملة في السويد: تطوير مواقع الويب المخصصة، تطبيقات الهواتف الذكية، تحليل الأعمال، تحسين محركات البحث SEO، والبنية السحابية. تحليل تقني مجاني.',
      keywords: 'خدمات تصميم مواقع السويد, خدمات برمجة تطبيقات عربية, تحسين السيو SEO, حلول برمجية سحابية أوروبا, تطوير React ستوكهولم',
      ogImage: '/og-image-services.jpg',
    },
  },

  portfolio: {
    sv: {
      title: 'Vår Portfölj — Framgångsrika Projekt & Digitala Fallstudier | RoshaLink Stockholm',
      description: 'Utforska våra senaste leveranser inom e-handel, SaaS-plattformar, mobila applikationer och anpassade företagsportaler med mätbara och dokumenterade resultat.',
      keywords: 'webbutveckling portfolio Stockholm, apputveckling case studies Sverige, tidigare projekt RoshaLink, digitala kundcase Norden, SaaS-portfölj, e-handel-projekt Sverige',
      ogImage: '/og-image-portfolio.jpg',
    },
    en: {
      title: 'Portfolio & Case Studies — Proven Digital Solutions | RoshaLink Stockholm',
      description: 'Explore our latest enterprise work in web applications, mobile products, fintech platforms, and scalable digital architectures — with measurable results and live demos.',
      keywords: 'web development portfolio Stockholm, mobile app case studies Scandinavia, digital agency work Europe, SaaS project examples, client showcase, fintech development Sweden',
      ogImage: '/og-image-portfolio.jpg',
    },
    fa: {
      title: 'نمونه کارها — پروژه‌های موفق و دستاوردهای دیجیتال | روشالینک سوئد',
      description: 'مشاهده جدیدترین پروژه‌های طراحی وب‌سایت، اپلیکیشن‌های موبایل، پلتفرم‌های SaaS و سیستم‌های سفارشی مشتری روشالینک در سوئد — با نتایج قابل اندازه‌گیری.',
      keywords: 'نمونه کارهای طراحی سایت سوئد, نمونه کارهای اپلیکیشن, پروژه‌های موفق روشالینک, نمونه کار برنامه نویسی ایرانی, پورتفولیو طراحی وب فارسی',
      ogImage: '/og-image-portfolio.jpg',
    },
    ar: {
      title: 'أعمالنا ومشاريعنا — حلول رقمية وقصص نجاح | روشا لينك ستوكهولم',
      description: 'استعرض أحدث أعمالنا في تطوير مواقع وتطبيقات الويب والجوال ومنصات الخدمات السحابية للشركات الرائدة في أوروبا والشرق الأوسط.',
      keywords: 'معرض اعمال تصميم مواقع السويد, مشاريع برمجة تطبيقات عربية, قصص نجاح روشا لينك, نماذج أعمال برمجية أوروبا',
      ogImage: '/og-image-portfolio.jpg',
    },
  },

  contact: {
    sv: {
      title: 'Kontakta Oss — Starta Ditt Projekt med RoshaLink | Digitalbyrå Stockholm',
      description: 'Redo att bygga er nästa digitala produkt? Kontakta vårt seniora arkitektteam i Stockholm för kostnadsfri rådgivning, teknisk analys och projektoffert. Svar inom 24 timmar.',
      keywords: 'kontakta digitalbyrå Stockholm, boka projektmöte Sverige, offert webbutveckling, offert apputveckling, anlita webbutvecklare Stockholm, tech-konsult Sverige, kostnadsfri IT-rådgivning',
      ogImage: '/og-image-contact.jpg',
    },
    en: {
      title: 'Contact Us — Start Your Project with RoshaLink Digital Agency Stockholm',
      description: 'Ready to build your next web or mobile application? Get in touch with our senior partner team in Stockholm for a free consultation and project estimate. We respond within 24 hours.',
      keywords: 'contact web agency Stockholm, hire React developers Sweden, project consultation Scandinavia, request software quote, tech consultancy Stockholm, free IT consultation Sweden',
      ogImage: '/og-image-contact.jpg',
    },
    fa: {
      title: 'تماس با ما — شروع پروژه طراحی سایت و اپلیکیشن با روشالینک | استکهلم',
      description: 'برای مشاوره رایگان، تحلیل فنی و شروع پروژه با تیم مهندسین ارشد روشالینک در سوئد تماس بگیرید یا فرم درخواست را تکمیل فرمایید. پاسخ در ۲۴ ساعت.',
      keywords: 'تماس با روشالینک سوئد, سفارش طراحی سایت, سفارش ساخت اپلیکیشن, مشاوره رایگان برنامه نویسی, ثبت درخواست پروژه IT, آژانس دیجیتال فارسی زبان سوئد',
      ogImage: '/og-image-contact.jpg',
    },
    ar: {
      title: 'اتصل بنا — ابدأ مشروعك الرقمي مع وكالة روشا لينك | ستوكهولم',
      description: 'هل أنت مستعد لتطوير موقعك أو تطبيقك القادم؟ تواصل مع مهندسينا في ستوكهولم للحصول على استشارة فنية مجانية وعرض سعر مخصص. نرد خلال 24 ساعة.',
      keywords: 'اتصل بنا روشا لينك السويد, طلب عرض سعر برمجة, استشارة تقنية مجانية أوروبا, حجز موعد تطوير تطبيق ستوكهولم',
      ogImage: '/og-image-contact.jpg',
    },
  },

  privacy: {
    sv: {
      title: 'Integritetspolicy & GDPR-efterlevnad — RoshaLink',
      description: 'Läs om hur RoshaLink behandlar personuppgifter och efterlever GDPR och gällande dataskyddslagar i Sverige och EU.',
      keywords: 'integritetspolicy, GDPR Sverige, dataskydd RoshaLink, EU-dataskydd, personuppgiftsbehandling',
      ogImage: '/og-image.jpg',
    },
    en: {
      title: 'Privacy Policy & GDPR Compliance — RoshaLink',
      description: 'Learn how RoshaLink protects your personal data in full compliance with GDPR and international data privacy regulations in Sweden and the EU.',
      keywords: 'privacy policy, GDPR compliance Sweden, data protection RoshaLink, EU data privacy',
      ogImage: '/og-image.jpg',
    },
    fa: {
      title: 'سیاست حفظ حریم خصوصی و قوانین داده‌ها — روشالینک',
      description: 'مطالعه قوانین حفظ اطلاعات شخصی و رعایت استانداردهای GDPR اتحادیه اروپا در روشالینک سوئد.',
      keywords: 'حریم خصوصی, GDPR, قوانین داده روشالینک, امنیت اطلاعات',
      ogImage: '/og-image.jpg',
    },
    ar: {
      title: 'سياسة الخصوصية وحماية البيانات — روشا لينك',
      description: 'تعرف على سياسة حماية البيانات والخصوصية المتبعة في روشا لينك وفق معايير GDPR الأوروبية.',
      keywords: 'سياسة الخصوصية, GDPR حماية البيانات, روشا لينك',
      ogImage: '/og-image.jpg',
    },
  },

  insights: {
    sv: {
      title: 'Guider om Webbutveckling, Appar & SEO | RoshaLink Insikter',
      description: 'Praktiska guider från RoshaLinks seniora team i Stockholm: välja webbyrå, kostnader för skräddarsydd utveckling, React, GraphQL, apputveckling och teknisk SEO.',
      keywords: 'webbutveckling guide, välja webbyrå stockholm, kostnad webbutveckling, react graphql, teknisk seo',
      ogImage: '/og-image-sv.jpg',
    },
    en: {
      title: 'Web Development, App & SEO Guides | RoshaLink Insights',
      description: 'Practical guides from RoshaLink\'s senior team in Stockholm: choosing a development agency, custom software costs, React, GraphQL, mobile apps and technical SEO.',
      keywords: 'web development guide, hire development agency stockholm, custom web development cost sweden, react graphql, technical seo',
      ogImage: '/og-image-en.jpg',
    },
    fa: {
      title: 'مقالات و راهنمای طراحی سایت، اپلیکیشن و سئو | روشالینک',
      description: 'راهنماهای کاربردی تیم ارشد روشالینک در استکهلم درباره طراحی سایت اختصاصی، طراحی اپلیکیشن موبایل، هزینه‌ها و سئو فنی.',
      keywords: 'مقالات طراحی سایت, راهنمای طراحی اپلیکیشن, هزینه طراحی سایت اختصاصی, سئو فنی',
      ogImage: '/og-image-fa.jpg',
    },
    ar: {
      title: 'مقالات وأدلة تطوير الويب والتطبيقات | روشا لينك',
      description: 'أدلة عملية من فريق روشا لينك في ستوكهولم حول تطوير المواقع المخصصة وتطبيقات الجوال والتكاليف وتحسين محركات البحث التقني.',
      keywords: 'مقالات تطوير الويب, دليل تطوير التطبيقات, تكلفة تطوير المواقع, السيو التقني',
      ogImage: '/og-image-ar.jpg',
    },
  },

  'services/discovery': {
    sv: {
      title: 'Strategisk Affärsanalys & Teknisk Roadmap — RoshaLink Stockholm',
      description: 'Djupgående verksamhetsanalys och teknisk förstudie som eliminerar teknisk skuld och optimerar investeringskalkylen för era digitala produkter.',
      keywords: 'affärsanalys IT Stockholm, teknisk roadmap, förstudie mjukvara, IT-strategi Sverige',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'Strategic Business Analysis & Technical Roadmap — RoshaLink Stockholm',
      description: 'Comprehensive business discovery and technical roadmap architecture that prevents technical debt and maximizes digital product ROI.',
      keywords: 'business analysis IT Stockholm, technical roadmap, software feasibility study, enterprise IT strategy',
      ogImage: '/og-image-services.jpg',
    },
    fa: {
      title: 'تحلیل استراتژیک کسب‌وکار و نقشه راه معماری نرم‌افزار — روشالینک',
      description: 'تحلیل عمیق تجاری و تدوین نقشه راه فنی نرم‌افزار جهت حذف ریسک‌های توسعه و بازگشت حداکثری سرمایه.',
      keywords: 'تحلیل کسب و کار IT, نقشه راه فنی نرم افزار, مشاوره معماری نرم افزار',
      ogImage: '/og-image-services.jpg',
    },
    ar: {
      title: 'التحليل الاستراتيجي للأعمال وخريطة الطريق التقنية — روشا لينك',
      description: 'تحليل دقيق لمتطلبات الأعمال وبناء خارطة طريق تقنية تعزز استقرار الأنظمة وتضمن أعلى عائد استثماري.',
      keywords: 'تحليل أعمال تقني ستوكهولم, خريطة طريق البرمجيات, استشارات معمارية تقنية',
      ogImage: '/og-image-services.jpg',
    },
  },

  'services/web-architecture': {
    sv: {
      title: 'React- & GraphQL-webbyrå i Stockholm | RoshaLink',
      description: 'Webbyrå i Stockholm som bygger snabba, skräddarsydda webbapplikationer med React, TypeScript och GraphQL-API:er. Inga mallar – du pratar direkt med utvecklarna som skriver koden.',
      keywords: 'react webbyrå stockholm, graphql webbyrå stockholm, graphql byrå stockholm, react utvecklare stockholm, skräddarsydd webbapplikation, webbutveckling react',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'React & GraphQL Development Agency in Stockholm | RoshaLink',
      description: 'High-performance web applications built with React, TypeScript and GraphQL by a senior full-stack team in Stockholm. Custom code, no templates, direct access to the engineers.',
      keywords: 'react agency stockholm, graphql agency stockholm, full-stack development stockholm, high-performance web app development, custom web application stockholm',
      ogImage: '/og-image-services.jpg',
    },
    fa: {
      title: 'معماری اختصاصی وب و توسعه پورتال با React — روشالینک',
      description: 'طراحی و توسعه وب‌اپلیکیشن‌ها و پورتال‌های سازمانی فوق‌سریع با معماری ماژولار React و بهینه‌سازی کامل Core Web Vitals.',
      keywords: 'توسعه وب اختصاصی, برنامه نویسی React, وب اپلیکیشن سازمانی, معماری فرانت اند',
      ogImage: '/og-image-services.jpg',
    },
    ar: {
      title: 'هندسة الويب المخصصة وتطوير تطبيقات React — روشا لينك',
      description: 'تطوير تطبيقات وب متقدمة وبوابات رقمية فائقة السرعة بأكواد React نقية ومعمارية ماژولار عالية الأداء.',
      keywords: 'تطوير مواقع مخصصة ستوكهولم, مبرمجين React السويد, هندسة تطبيقات الويب',
      ogImage: '/og-image-services.jpg',
    },
  },

  'services/cloud-backend': {
    sv: {
      title: 'Skalbar Molninfrastruktur & Resilient Backend — RoshaLink Stockholm',
      description: 'Högpresterande mikrotjänster, serverless arkitektur och feltolerant molndrift på AWS och Azure med Zero-Trust-säkerhet.',
      keywords: 'molninfrastruktur Stockholm, backend utveckling Node.js, AWS arkitektur Sverige, Zero Trust moln',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'Scalable Cloud Infrastructure & Resilient Backend — RoshaLink',
      description: 'High-availability microservices, serverless cloud platforms, and resilient database architectures on AWS and Azure with Zero-Trust security.',
      keywords: 'cloud infrastructure Stockholm, resilient backend engineering, AWS Azure architects Sweden, microservices consulting',
      ogImage: '/og-image-services.jpg',
    },
    fa: {
      title: 'زیرساخت ابری مقیاس‌پذیر و توسعه بک‌اند پایدار — روشالینک',
      description: 'معماری مایکروسرویس، سیستم‌های توزیع‌شده ابری با پایداری حداکثری روی AWS و امنیت پیشرفته Zero-Trust.',
      keywords: 'زیرساخت ابری, توسعه بک اند, مهندسی میکروسرویس, کلود AWS روشالینک',
      ogImage: '/og-image-services.jpg',
    },
    ar: {
      title: 'البنية التحتية السحابية والأنظمة الخلفية المرنة — روشا لينك',
      description: 'هندسة سحابية مرنة، خوادم بدون خادم وميكروسيرفس عالية التوفر ومقاومة للأعطال على AWS مع أمان Zero-Trust.',
      keywords: 'بنية تحتية سحابية ستوكهولم, تطوير خوادم سحابية, أنظمة موزعة AWS',
      ogImage: '/og-image-services.jpg',
    },
  },

  'services/ai-automation': {
    sv: {
      title: 'AI-assistenter & Intelligent Processautomatisering — RoshaLink',
      description: 'Integrera kundanpassade AI-assistenter, intelligenta RAG-system och automatiserade verksamhetsflöden med full datasäkerhet och GDPR-kontroll.',
      keywords: 'AI-utveckling Stockholm, intelligent automatisering Sverige, enterprise AI assistent, RAG modeller IT',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'Enterprise AI Assistants & Workflow Automation — RoshaLink',
      description: 'Integrate custom AI assistants, intelligent RAG pipelines, and automated business workflows with enterprise security and strict GDPR compliance.',
      keywords: 'enterprise AI development Stockholm, AI workflow automation, custom AI assistant Europe, generative AI integration',
      ogImage: '/og-image-services.jpg',
    },
    fa: {
      title: 'یکپارچه‌سازی هوش مصنوعی اختصاصی و اتوماسیون سازمانی — روشالینک',
      description: 'پیاده‌سازی چت‌بات‌ها و دستیاران هوشمند سازمانی، سیستم‌های RAG و اتوماسیون فرآیندهای کسب‌وکار با امنیت کامل داده‌ها.',
      keywords: 'هوش مصنوعی سازمانی, دستیار هوشمند اختصاصی, اتوماسیون فرآیند کسب و کار, مدل های زبانی',
      ogImage: '/og-image-services.jpg',
    },
    ar: {
      title: 'مساعدات الذكاء الاصطناعي وأتمتة العمليات — روشا لينك',
      description: 'تطوير ودمج مساعدات الذكاء الاصطناعي التوليدي وأنظمة RAG المخصصة لرفع كفاءة الأعمال مع الالتزام الكامل بالأمان والخصوصية.',
      keywords: 'حلول الذكاء الاصطناعي ستوكهولم, أتمتة الأعمال الذكية, مساعدات AI مخصصة',
      ogImage: '/og-image-services.jpg',
    },
  },

  'services/mobile-apps': {
    sv: {
      title: 'Apputveckling i Stockholm – iOS- & Android-appar | RoshaLink',
      description: 'Vi designar och bygger skräddarsydda mobilappar för iOS och Android med React Native – från idé och prototyp till publicering i App Store och Google Play.',
      keywords: 'apputveckling stockholm, apputvecklare stockholm, mobilappar iOS Android, React Native utvecklare, app utvecklingsbyrå',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'Mobile App Development in Stockholm (iOS & Android) | RoshaLink',
      description: 'Custom iOS and Android apps built with React Native by a senior team in Stockholm – from discovery and prototype to App Store and Google Play release.',
      keywords: 'mobile app development stockholm, iOS Android app agency Sweden, React Native developers stockholm, custom mobile app',
      ogImage: '/og-image-services.jpg',
    },
    fa: {
      title: 'طراحی اپلیکیشن اختصاصی موبایل (iOS و اندروید) | روشالینک',
      description: 'روشالینک، شرکت ساخت اپلیکیشن موبایل در استکهلم: طراحی اپلیکیشن اختصاصی iOS و اندروید با React Native، از تحلیل ایده تا انتشار در App Store و Google Play. مشاوره رایگان به زبان فارسی.',
      keywords: 'طراحی اپلیکیشن اختصاصی, شرکت ساخت اپلیکیشن موبایل, سفارش ساخت اپلیکیشن, برنامه نویسی اپلیکیشن اندروید و iOS, ساخت اپلیکیشن در سوئد',
      ogImage: '/og-image-services.jpg',
    },
    ar: {
      title: 'تطوير تطبيقات الجوال المخصصة iOS وأندرويد — روشا لينك',
      description: 'تصميم وبرمجة تطبيقات الهواتف الذكية بنظامي iOS وأندرويد بأداء فائق وتجربة مستخدم عصرية تلبي تطلعات عملائك.',
      keywords: 'تطوير تطبيقات الجوال ستوكهولم, تطبيقات آيفون وأندرويد السويد, برمجة تطبيقات مخصصة',
      ogImage: '/og-image-services.jpg',
    },
  },

  'services/seo-performance': {
    sv: {
      title: 'Automatiserad SEO-tjänst & Teknisk SEO i Stockholm | RoshaLink',
      description: 'Teknisk och automatiserad SEO inbyggd i koden: strukturerad data, automatiska sitemaps, förrenderade sidor, Core Web Vitals-övervakning och uppföljning i Search Console.',
      keywords: 'automatiserad seo tjänst stockholm, teknisk seo stockholm, seo byrå stockholm, core web vitals optimering, sökmotoroptimering stockholm',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'Technical & Automated SEO Services in Stockholm | RoshaLink',
      description: 'Technical SEO engineered into your codebase: structured data, automated sitemaps, prerendering, Core Web Vitals monitoring and Search Console follow-up. Based in Stockholm.',
      keywords: 'technical seo stockholm, automated seo service, core web vitals optimization, seo agency stockholm, structured data implementation',
      ogImage: '/og-image-services.jpg',
    },
    fa: {
      title: 'بهینه‌سازی پیشرفته فنی سئو و استاندارد Core Web Vitals — روشالینک',
      description: 'معماری فنی وب‌سایت برای فتح رتبه‌های نخست گوگل، رندرینگ سریع و بهینه‌سازی بنیادین فاکتورهای حیاتی وب گوگل.',
      keywords: 'سئو فنی تکنیکال, بهینه سازی Core Web Vitals, رتبه اول گوگل, افزایش سرعت سایت',
      ogImage: '/og-image-services.jpg',
    },
    ar: {
      title: 'تحسين معايير Core Web Vitals والسيو التقني المتقدم — روشا لينك',
      description: 'تحسين شامل للبنية التقنية لموقعك لتصدر نتائج البحث في محركات جوجل وتحقيق أعلى سرعة تحميل وتجربة مستخدم خالية من العيوب.',
      keywords: 'سيو تقني متقدم ستوكهولم, تحسين Core Web Vitals, تصدر نتائج بحث جوجل',
      ogImage: '/og-image-services.jpg',
    },
  },
};

/**
 * Helper to get page SEO config safely.
 */
export function getSeoMetadata(pageKey, lang) {
  const currentLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  const page = seoPages[pageKey] || 
               seoPages[pageKey?.replace('services/', 'service-')] || 
               (pageKey?.startsWith('services') ? seoPages.services : null) || 
               seoPages.home;
  return page[currentLang] || page[DEFAULT_LANG];
}
