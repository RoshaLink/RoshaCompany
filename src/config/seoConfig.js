/**
 * Comprehensive Multilingual SEO Metadata Matrix for RoshaLink (https://roshalink.com)
 * Optimized for Scandinavian (Sweden primary), European, and Middle Eastern markets.
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

export const seoPages = {
  home: {
    sv: {
      title: 'RoshaLink — Ledande Digitalbyrå för Webbutveckling & Apputveckling i Stockholm',
      description: 'Skräddarsydd webbutveckling, mobila applikationer och molnlösningar. Vi bygger snabba, skalbara digitala produkter med 100% anpassad kod utan mallar.',
      keywords: 'webbutveckling Stockholm, apputveckling Sverige, skräddarsydd webbdesign, bygga app iOS Android, digitalbyrå Stockholm, fullstack utvecklare, UI UX design',
      ogImage: '/og-image-sv.jpg',
    },
    en: {
      title: 'RoshaLink — Strategic Web & Mobile App Development Agency',
      description: 'Bespoke web development, high-performance mobile apps, and scalable cloud architecture. Built by senior engineers with 100% custom code for maximum ROI.',
      keywords: 'custom web development, mobile app development agency, bespoke software engineering, React Node.js developers, enterprise UI UX design, SaaS platform development',
      ogImage: '/og-image-en.jpg',
    },
    fa: {
      title: 'روشالینک — آژانس تخصصی طراحی وب‌سایت، وب‌اپلیکیشن و اپلیکیشن موبایل',
      description: 'طراحی سایت اختصاصی، توسعه اپلیکیشن‌های موبایل iOS و اندروید و سیستم‌های ابری مقیاس‌پذیر با کدنویسی ۱۰۰٪ اختصاصی و معماری مدرن.',
      keywords: 'طراحی سایت اختصاصی, توسعه اپلیکیشن موبایل, ساخت وب اپلیکیشن, برنامه نویسی فول استک, آژانس دیجیتال مارکتینگ, طراحی UI UX حرفه ای',
      ogImage: '/og-image-fa.jpg',
    },
    ar: {
      title: 'روشا لينك — وكالة رائدة في تصميم وتطوير مواقع الويب وتطبيقات الجوال',
      description: 'تطوير مواقع الويب المخصصة، برمجة تطبيقات الهاتف المحمول وتصميم الأنظمة السحابية المتقدمة بأعلى معايير الأداء والسرعة وبدون قوالب جاهزة.',
      keywords: 'تصميم مواقع الكترونية, تطوير تطبيقات الجوال, برمجة مواقع ويب مخصصة, وكالة برمجيات رقمية, تصميم واجهات المستخدم UI UX',
      ogImage: '/og-image-ar.jpg',
    },
  },

  about: {
    sv: {
      title: 'Om RoshaLink — Seniora Ingenjörer & Produktarkitekter',
      description: 'Lär känna teamet bakom RoshaLink. 5 seniora partners med expertis inom företagsanalys, avancerad molninfrastruktur och skottsäker mjukvaruarkitektur.',
      keywords: 'om RoshaLink, digitalbyrå team, seniora utvecklare Stockholm, mjukvaruarkitekter, affärsanalys IT',
      ogImage: '/og-image-about.jpg',
    },
    en: {
      title: 'About RoshaLink — Elite Software Engineers & Product Architects',
      description: 'Meet the senior partners behind RoshaLink. We combine rigorous business analysis with bulletproof software engineering to build transformative digital products.',
      keywords: 'about RoshaLink, software development team, senior tech consultants, cloud architects Sweden, digital agency founders',
      ogImage: '/og-image-about.jpg',
    },
    fa: {
      title: 'درباره روشالینک — تیم مهندسین ارشد و معماران محصولات دیجیتال',
      description: 'با تیم متخصص و ۵ شریک ارشد روشالینک آشنا شوید. ترکیب تحلیل دقیق کسب‌وکار و مهندسی نرم‌افزار برای خلق محصولات برتر دیجیتال.',
      keywords: 'درباره روشالینک, تیم توسعه نرم افزار, معماران ابری, مهندسین نرم افزار, آژانس فناوری اطلاعات',
      ogImage: '/og-image-about.jpg',
    },
    ar: {
      title: 'عن روشا لينك — نخبة من مهندسي البرمجيات وخبراء المنتجات الرقمية',
      description: 'تعرف على الشركاء والمهندسين في روشا لينك. نجمع بين التحليل الاستراتيجي للأعمال والبرمجة فائقة الجودة لتحقيق أقصى نمو لمشروعك.',
      keywords: 'عن روشا لينك, فريق تطوير برمجيات, مهندسو سحابيون, استشارات تكنولوجيا المعلومات',
      ogImage: '/og-image-about.jpg',
    },
  },

  services: {
    sv: {
      title: 'Tjänster — Skräddarsydd Webbutveckling, Appar & Molnsystem | RoshaLink',
      description: 'Våra tekniska kapaciteter: Full-Stack Webbutveckling, Mobilappar (iOS & Android), Affärsanalys, SEO-optimering och Skalbar Molninfrastruktur.',
      keywords: 'webbutveckling tjänster, mobilapp utveckling, molninfrastruktur AWS, SEO analys Sverige, UI UX strategi',
      ogImage: '/og-image-services.jpg',
    },
    en: {
      title: 'Services — Custom Web Solutions, Mobile Apps & Cloud Systems | RoshaLink',
      description: 'Full-cycle engineering services: Custom Web Development, iOS & Android Apps, Business Architecture, SEO Growth Strategy, and High-Availability Cloud Systems.',
      keywords: 'web development services, mobile app engineering, enterprise cloud solutions, SEO optimization agency, UI UX design services',
      ogImage: '/og-image-services.jpg',
    },
    fa: {
      title: 'خدمات تخصصی — توسعه وب، اپلیکیشن موبایل، سیستم‌های ابری و سئو | روشالینک',
      description: 'طیف کامل خدمات مهندسی: طراحی و برنامه‌نویسی وب‌سایت‌های پیشرفته، اپلیکیشن موبایل، تحلیل سیستم‌های کسب‌وکار، سئو و بهینه‌سازی فروش.',
      keywords: 'خدمات طراحی سایت, خدمات برنامه نویسی موبایل, خدمات سئو وب سایت, توسعه نرم افزار اختصاصی, بهینه سازی سرعت سایت',
      ogImage: '/og-image-services.jpg',
    },
    ar: {
      title: 'خدماتنا — تصميم مواقع الويب، تطبيقات الجوال والحلول السحابية | روشا لينك',
      description: 'خدمات برمجية شاملة: تطوير مواقع الويب المخصصة، تطبيقات الهواتف الذكية، تحليل الأعمال، تحسين محركات البحث SEO، والبنية السحابية.',
      keywords: 'خدمات تصميم مواقع, خدمات برمجة تطبيقات, تحسين السيو SEO, حلول برمجية سحابية',
      ogImage: '/og-image-services.jpg',
    },
  },

  portfolio: {
    sv: {
      title: 'Vår Portfölj — Framgångsrika Projekt & Digitala Fallstudier | RoshaLink',
      description: 'Utforska våra senaste leveranser inom e-handel, SaaS-plattformar, mobila applikationer och anpassade företagsportaler med mätbara resultat.',
      keywords: 'webbutveckling portfolio, apputveckling case studies, tidigare projekt RoshaLink, digitala kundcase',
      ogImage: '/og-image-portfolio.jpg',
    },
    en: {
      title: 'Portfolio & Case Studies — Proven Digital Solutions | RoshaLink',
      description: 'Explore our latest enterprise work in web applications, mobile products, fintech platforms, and scalable digital architectures.',
      keywords: 'web development portfolio, mobile app case studies, digital agency work, SaaS project examples, client showcase',
      ogImage: '/og-image-portfolio.jpg',
    },
    fa: {
      title: 'نمونه کارها — پروژه‌های موفق و دستاوردهای دیجیتال | روشالینک',
      description: 'مشاهده جدیدترین پروژه‌های طراحی وب‌سایت، اپلیکیشن‌های موبایل، پلتفرم‌های SaaS و سیستم‌های سفارش مشتری روشالینک.',
      keywords: 'نمونه کارهای طراحی سایت, نمونه کارهای اپلیکیشن, پروژه‌های موفق روشالینک, نمونه کار برنامه نویسی',
      ogImage: '/og-image-portfolio.jpg',
    },
    ar: {
      title: 'أعمالنا ومشاريعنا — حلول رقمية وقصص نجاح | روشا لينك',
      description: 'استعرض أحدث أعمالنا في تطوير مواقع وتطبيقات الويب والجوال ومنصات الخدمات السحابية للشركات الرائدة.',
      keywords: 'معرض اعمال تصميم مواقع, مشاريع برمجة تطبيقات, قصص نجاح روشا لينك, نماذج أعمال برمجية',
      ogImage: '/og-image-portfolio.jpg',
    },
  },

  contact: {
    sv: {
      title: 'Kontakta Oss — Starta Ditt Projekt med RoshaLink Digitalbyrå',
      description: 'Redo att bygga er nästa digitala produkt? Kontakta vårt seniora arkitektteam i Stockholm för kostnadsfri rådgivning och teknisk analys.',
      keywords: 'kontakta digitalbyrå Stockholm, boka projektmöte, offert webbutveckling, offert apputveckling',
      ogImage: '/og-image-contact.jpg',
    },
    en: {
      title: 'Contact Us — Start Your Project with RoshaLink Digital Agency',
      description: 'Ready to build your next web or mobile application? Get in touch with our senior partner team in Stockholm for a free consultation and project estimate.',
      keywords: 'contact web agency, hire React developers, project consultation Stockholm, request software quote',
      ogImage: '/og-image-contact.jpg',
    },
    fa: {
      title: 'تماس با ما — شروع پروژه طراحی سایت و اپلیکیشن با روشالینک',
      description: 'برای مشاوره رایگان، تحلیل فنی و شروع پروژه با تیم مهندسین ارشد روشالینک تماس بگیرید یا فرم درخواست را تکمیل فرمایید.',
      keywords: 'تماس با روشالینک, سفارش طراحی سایت, سفارش ساخت اپلیکیشن, مشاوره رایگان برنامه نویسی, ثبت درخواست پروژه',
      ogImage: '/og-image-contact.jpg',
    },
    ar: {
      title: 'اتصل بنا — ابدأ مشروعك الرقمي مع وكالة روشا لينك',
      description: 'هل أنت مستعد لتطوير موقعك أو تطبيقك القادم؟ تواصل مع مهندسينا للحصول على استشارة فنية مجانية وعرض سعر مخصص.',
      keywords: 'اتصل بنا روشا لينك, طلب عرض سعر برمجة, استشارة تقنية مجانية, حجز موعد تطوير تطبيق',
      ogImage: '/og-image-contact.jpg',
    },
  },

  privacy: {
    sv: {
      title: 'Integritetspolicy & GDPR — RoshaLink',
      description: 'Läs om hur RoshaLink behandlar personuppgifter och efterlever GDPR och gällande dataskyddslagar.',
      keywords: 'integritetspolicy, GDPR Sverige, dataskydd RoshaLink',
      ogImage: '/og-image.jpg',
    },
    en: {
      title: 'Privacy Policy & GDPR Compliance — RoshaLink',
      description: 'Learn how RoshaLink protects your personal data in full compliance with GDPR and international data privacy regulations.',
      keywords: 'privacy policy, GDPR compliance, data protection RoshaLink',
      ogImage: '/og-image.jpg',
    },
    fa: {
      title: 'سیاست حفظ حریم خصوصی و قوانین داده‌ها — روشالینک',
      description: 'مطالعه قوانین حفظ اطلاعات شخصی و رعایت استانداردهای بین‌المللی امنیت داده در روشالینک.',
      keywords: 'حریم خصوصی, قوانین داده, سیاست محرمانگی روشالینک',
      ogImage: '/og-image.jpg',
    },
    ar: {
      title: 'سياسة الخصوصية وحماية البيانات — روشا لينك',
      description: 'تعرف على سياسة حماية البيانات والخصوصية المتبعة في وكالة روشا لينك وفق المعايير الدولية.',
      keywords: 'سياسة الخصوصية, حماية البيانات روشا لينك, معايير الأمان',
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
