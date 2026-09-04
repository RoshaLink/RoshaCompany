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
      title: 'Tjänster — Skräddarsydd Webbutveckling, Appar & Molnsystem | RoshaLink Stockholm',
      description: 'Våra tekniska kapaciteter: Full-Stack Webbutveckling, Mobilappar (iOS & Android), Affärsanalys, SEO-optimering och Skalbar Molninfrastruktur. Prova kostnadsfri teknisk analys.',
      keywords: 'webbutveckling tjänster Stockholm, mobilapp-utveckling Sverige, molninfrastruktur AWS Azure, SEO-analys Sverige, UI UX strategi Norden, full-stack webbutveckling, React-utvecklare Stockholm, Node.js-konsult Sverige',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'Services — Custom Web Solutions, Mobile Apps & Cloud Systems | RoshaLink',
      description: 'Full-cycle engineering services: Custom Web Development, iOS & Android Apps, Business Architecture, SEO Growth Strategy, and High-Availability Cloud Systems. Free technical analysis included.',
      keywords: 'web development services Stockholm, mobile app engineering Scandinavia, enterprise cloud solutions Europe, SEO optimization agency Sweden, UI UX design services, React development agency, Node.js consulting Stockholm, full-stack development Europe',
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
};

/**
 * Helper to get page SEO config safely.
 */
export function getSeoMetadata(pageKey, lang) {
  const currentLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  const page = seoPages[pageKey] || seoPages.home;
  return page[currentLang] || page[DEFAULT_LANG];
}
