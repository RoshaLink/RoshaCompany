import React from 'react';
import { BASE_URL, DEFAULT_LANG, GEO, AREA_SERVED, getSeoMetadata } from '../../config/seoConfig';

/**
 * JsonLdSchema — injects all structured data <script type="application/ld+json"> tags.
 *
 * Schemas included:
 *  1. Organization + ProfessionalService (with LocalBusiness geo & areaServed)
 *  2. WebSite (with SearchAction potentialAction for sitelinks searchbox)
 *  3. WebPage  (per-page, with datePublished/dateModified)
 *  4. ItemList of Services
 *  5. FAQPage  (rich snippet, ≥ 5 Q&A per language)
 *  6. BreadcrumbList
 *
 * NOTE: AggregateRating is commented out because Google penalises self-serving
 * ratings that cannot be verified. Add it back once you have third-party review
 * data (e.g. Google Business Profile, Clutch.co).
 */
export const JsonLdSchema = ({ page = 'home', lang = DEFAULT_LANG }) => {
  const currentLang = ['sv', 'en', 'fa', 'ar'].includes(lang) ? lang : DEFAULT_LANG;
  const ogImage = getSeoMetadata(page, currentLang).ogImage;

  // ── Build date strings ─────────────────────────────────────────────────
  const publishedDate = '2024-01-15';
  const modifiedDate  = '2026-08-29';

  // ── 1. Organization / ProfessionalService / LocalBusiness ─────────────
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
    '@id': `${BASE_URL}/#organization`,
    name: 'RoshaLink',
    alternateName: [
      'RoshaLink Digital Agency',
      'Rosha Link Tech',
      'آژانس دیجیتال روشالینک',
      'وكالة روشا لينك',
      'RoshaLink Digitalbyrå',
    ],
    url: `${BASE_URL}/${currentLang}`,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: '512',
      height: '512',
    },
    image: `${BASE_URL}${ogImage}`,
    description:
      currentLang === 'sv'
        ? 'Ledande digitalbyrå i Stockholm för skräddarsydd webbutveckling, mobilappar och skalbar molninfrastruktur. Vi betjänar kunder i hela Norden och Europa.'
        : currentLang === 'fa'
        ? 'آژانس دیجیتال تخصصی در استکهلم در زمینه طراحی وب‌سایت، وب‌اپلیکیشن، اپلیکیشن موبایل و سیستم‌های ابری برای مشتریان سراسر اروپا.'
        : currentLang === 'ar'
        ? 'وكالة رقمية متخصصة في ستوكهولم لتصميم وتطوير مواقع الويب وتطبيقات الجوال والحلول السحابية للعملاء في أوروبا والشرق الأوسط.'
        : 'Leading digital agency in Stockholm for custom web development, mobile apps, and high-performance cloud architecture serving clients across Scandinavia and Europe.',

    // ── Address ──────────────────────────────────────────────────────────
    address: {
      '@type': 'PostalAddress',
      // TODO: replace with exact street address when confirmed
      streetAddress: 'Stockholm',
      addressLocality: 'Stockholm',
      addressRegion: 'Stockholm County',
      postalCode: '111 20',
      addressCountry: 'SE',
    },

    // ── Geo coordinates (Stockholm) ───────────────────────────────────────
    geo: {
      '@type': 'GeoCoordinates',
      latitude:  GEO.latitude,
      longitude: GEO.longitude,
    },

    // ── Area served ───────────────────────────────────────────────────────
    areaServed: AREA_SERVED.map((countryCode) => ({
      '@type': 'Country',
      name: countryCode,
    })),

    // ── Contact ───────────────────────────────────────────────────────────
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'roshalinkcompany@gmail.com',
      // TODO: add telephone once confirmed: telephone: '+46-XX-XXX-XXXX',
      availableLanguage: ['Swedish', 'English', 'Persian', 'Arabic'],
    },

    // ── Founders ─────────────────────────────────────────────────────────
    founder: [
      { '@type': 'Person', name: 'Morteza', jobTitle: 'CEO & Principal Architect' },
      { '@type': 'Person', name: 'Bella',   jobTitle: 'Head of Product & Brand' },
      { '@type': 'Person', name: 'Sam',     jobTitle: 'Senior Cloud Engineer' },
      { '@type': 'Person', name: 'Mina',    jobTitle: 'Senior Business Analyst' },
      { '@type': 'Person', name: 'Milad',   jobTitle: 'Senior Full-Stack Engineer' },
    ],

    // ── Social profiles (sameAs) ──────────────────────────────────────────
    sameAs: [
      'https://www.linkedin.com/company/roshalink',
      'https://github.com/roshalink',
      // TODO: add Twitter/X, Instagram, Facebook once confirmed
    ],

    priceRange: '$$$$',
    currenciesAccepted: 'SEK, EUR, USD',
    paymentAccepted: 'Invoice, Bank transfer',
    inLanguage: ['sv', 'en', 'fa', 'ar'],

    /*
     * AggregateRating — uncomment and populate once you have verified
     * third-party reviews (e.g. Google Business, Clutch, Trustpilot).
     * Google penalises fabricated self-ratings.
     *
     * aggregateRating: {
     *   '@type': 'AggregateRating',
     *   ratingValue: '5',
     *   bestRating: '5',
     *   worstRating: '1',
     *   ratingCount: '12',
     *   reviewCount: '12',
     * },
     */
  };

  // ── 2. WebSite (with SearchAction for Google Sitelinks Searchbox) ──────
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'RoshaLink',
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: ['sv', 'en', 'fa', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/en?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // ── 3. WebPage (per-page) ──────────────────────────────────────────────
  const pageMeta = getSeoMetadata(page, currentLang);
  const pageUrl = page === 'home'
    ? `${BASE_URL}/${currentLang}`
    : `${BASE_URL}/${currentLang}/${page}`;

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageMeta.title,
    description: pageMeta.description,
    inLanguage: currentLang,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization` },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
  };

  // ── 4. Services ItemList ───────────────────────────────────────────────
  const t = (sv, fa, ar, en) =>
    currentLang === 'sv' ? sv : currentLang === 'fa' ? fa : currentLang === 'ar' ? ar : en;

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Service',
        position: 1,
        name: t(
          'Skräddarsydd Webbutveckling',
          'طراحی سایت و وب‌اپلیکیشن اختصاصی',
          'تطوير مواقع الويب المخصصة',
          'Custom Web Development'
        ),
        serviceType: 'Web Development',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: AREA_SERVED,
        description: t(
          'Skräddarsydda, högpresterande webbapplikationer byggda med React, Node.js och moderna molnstackar utan färdiga mallar.',
          'وب‌اپلیکیشن‌های اختصاصی و پرسرعت که با React، Node.js و زیرساخت‌های ابری مدرن بدون قالب آماده ساخته می‌شوند.',
          'تطبيقات ويب مخصصة وعالية الأداء مبنية باستخدام React وNode.js وأحدث الحلول السحابية.',
          'Bespoke, high-performance web applications built with React, Node.js, and modern cloud stacks — no templates, no shortcuts.'
        ),
      },
      {
        '@type': 'Service',
        position: 2,
        name: t(
          'Mobilapputveckling (iOS & Android)',
          'توسعه اپلیکیشن موبایل iOS و اندروید',
          'برمجة وتطوير تطبيقات الجوال',
          'Mobile App Development'
        ),
        serviceType: 'Mobile Development',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: AREA_SERVED,
        description: t(
          'Native och plattformsoberoende mobilappar med hög prestanda och flytande användarupplevelse för iOS och Android.',
          'اپلیکیشن‌های موبایل نیتیو و کراس‌پلتفرم با سرعت بالا و رابط کاربری روان برای iOS و اندروید.',
          'تطبيقات جوال أصلية ومتعددة المنصات بسرعة عالية وتجربة استخدام سلسة لنظامي iOS وأندرويد.',
          'Native and cross-platform high-performance mobile applications with fluid UI/UX for iOS and Android.'
        ),
      },
      {
        '@type': 'Service',
        position: 3,
        name: t(
          'Molnarkitektur & Prestandaoptimering',
          'معماری سیستم‌های ابری و مقیاس‌پذیری',
          'الحلول السحابية وهندسة النظم',
          'Cloud Architecture & Scaling'
        ),
        serviceType: 'Cloud Engineering',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: AREA_SERVED,
        description: t(
          'Distribuerade molnsystem med under 20 ms latens och 99,99 % drifttidsgaranti på AWS och Azure.',
          'سیستم‌های ابری توزیع‌شده با تأخیر کمتر از ۲۰ میلی‌ثانیه و تضمین ۹۹.۹۹٪ زمان کارکرد روی AWS و Azure.',
          'أنظمة سحابية موزعة بزمن استجابة أقل من 20 مللي ثانية وضمان توفر 99.99٪ على AWS وAzure.',
          'Distributed cloud systems with sub-20ms latency and 99.99% uptime guarantees on AWS and Azure.'
        ),
      },
      {
        '@type': 'Service',
        position: 4,
        name: t(
          'SEO & Digital Synlighet',
          'سئو و بهینه‌سازی موتور جستجو',
          'تحسين محركات البحث SEO',
          'SEO & Digital Visibility'
        ),
        serviceType: 'SEO Consulting',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: AREA_SERVED,
        description: t(
          'Teknisk SEO, flerspråkig optimering och datadriven synlighetsstrategi för Norden och globala marknader.',
          'سئو فنی، بهینه‌سازی چندزبانه و استراتژی دیده‌شدن در موتورهای جستجو برای بازارهای اسکاندیناوی و جهانی.',
          'تحسين SEO التقني والتعددي اللغات وتطوير استراتيجية الظهور الرقمي للأسواق الإسكندنافية والعالمية.',
          'Technical SEO, multilingual optimization, and data-driven visibility strategy for Nordic and global markets.'
        ),
      },
      {
        '@type': 'Service',
        position: 5,
        name: t(
          'Affärsanalys & IT-strategi',
          'تحلیل کسب‌وکار و استراتژی IT',
          'تحليل الأعمال واستراتيجية تقنية المعلومات',
          'Business Analysis & IT Strategy'
        ),
        serviceType: 'Business Consulting',
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: AREA_SERVED,
        description: t(
          'Rigorös företagsanalys och strategisk IT-rådgivning som eliminerar onödig teknisk skuld och maximerar affärsvärdet.',
          'تحلیل دقیق کسب‌وکار و مشاوره IT استراتژیک که بدهی فنی غیرضروری را حذف و ارزش تجاری را به حداکثر می‌رساند.',
          'تحليل أعمال دقيق واستشارات IT استراتيجية تقضي على الديون التقنية غير الضرورية وتعظم القيمة التجارية.',
          'Rigorous business analysis and strategic IT consulting that eliminates unnecessary technical debt and maximises business value.'
        ),
      },
    ],
  };

  // ── 5. FAQPage (≥ 5 Q&A per language for rich snippet eligibility) ─────
  const faqItems = [
    {
      q: t(
        'Hur bygger RoshaLink skräddarsydda webbplatser och appar?',
        'روشالینک چگونه پروژه‌های طراحی سایت و اپلیکیشن را اجرا می‌کند؟',
        'كيف تقوم روشا لينك بتطوير المواقع والتطبيقات المخصصة؟',
        'How does RoshaLink develop custom websites and applications?'
      ),
      a: t(
        'Vi bygger alla digitala produkter från grunden med 100 % anpassad kod och senior ingenjörskonst utan färdiga mallar eller genvägar. Varje kund samarbetar direkt med våra 5 seniora partners.',
        'روشالینک تمام محصولات را با کدنویسی ۱۰۰٪ اختصاصی و با همکاری مستقیم ۵ شریک ارشد مهندسی بدون استفاده از قالب‌های آماده توسعه می‌دهد.',
        'نقوم بتطوير جميع الحلول البرمجية بأكواد مخصصة 100% وبدون قوالب جاهزة لضمان أعلى أداء واستقرار، مع تعاون مباشر مع الشركاء الكبار.',
        'We engineer every digital solution with 100% custom, bespoke code and senior architectural leadership without relying on pre-made templates. Every client works directly with our 5 senior partners.'
      ),
    },
    {
      q: t(
        'Vilka teknologier använder RoshaLink?',
        'روشالینک از چه تکنولوژی‌هایی استفاده می‌کند؟',
        'ما هي التقنيات التي تعتمد عليها روشا لينك؟',
        'What technologies does RoshaLink specialize in?'
      ),
      a: t(
        'React, Node.js, Next.js, Vite, Tailwind CSS, TypeScript, MongoDB, PostgreSQL, AWS, Azure och modern molnarkitektur — alltid 100 % skräddarsytt.',
        'React، Node.js، Next.js، Vite، Tailwind CSS، TypeScript، MongoDB، PostgreSQL، AWS، Azure و معماری ابری مدرن — همیشه ۱۰۰٪ اختصاصی.',
        'React وNode.js وNext.js وVite وTailwind CSS وTypeScript وMongoDB وPostgreSQL وAWS وAzure والهندسة السحابية الحديثة.',
        'React, Node.js, Next.js, Vite, Tailwind CSS, TypeScript, MongoDB, PostgreSQL, AWS, Azure, and modern Cloud Architecture — always 100% custom.'
      ),
    },
    {
      q: t(
        'Hur mycket kostar det att anlita RoshaLink?',
        'هزینه همکاری با روشالینک چقدر است؟',
        'كم تكلفة التعاون مع روشا لينك؟',
        'How much does it cost to hire RoshaLink?'
      ),
      a: t(
        'Varje projekt är unikt. Vi erbjuder kostnadsfri rådgivning och teknisk analys. Kontakta oss för en skräddarsydd offert baserad på dina specifika behov och mål.',
        'هر پروژه منحصر به فرد است. ما مشاوره و تحلیل فنی رایگان ارائه می‌دهیم. برای دریافت پیشنهاد قیمت متناسب با نیازهای خود با ما تماس بگیرید.',
        'كل مشروع فريد من نوعه. نقدم استشارة وتحليلًا تقنيًا مجانيًا. تواصل معنا للحصول على عرض سعر مخصص يناسب احتياجاتك وأهدافك.',
        'Every project is unique. We offer free consultation and technical analysis. Contact us for a bespoke quote tailored to your specific needs and goals.'
      ),
    },
    {
      q: t(
        'Hur lång tid tar det att bygga en webbplats eller app?',
        'ساخت وب‌سایت یا اپلیکیشن چقدر طول می‌کشد؟',
        'كم يستغرق تطوير موقع ويب أو تطبيق؟',
        'How long does it take to build a website or app?'
      ),
      a: t(
        'En enklare webbplats kan levereras på 3–6 veckor. Komplexa SaaS-plattformar, mobila appar och enterprise-system tar 3–6 månader beroende på scope. Vi ger alltid en detaljerad tidslinje under rådgivningen.',
        'یک وب‌سایت ساده معمولاً ۳ تا ۶ هفته طول می‌کشد. پلتفرم‌های SaaS پیچیده، اپلیکیشن‌های موبایل و سیستم‌های enterprise بسته به scope ۳ تا ۶ ماه نیاز دارند.',
        'موقع ويب بسيط يستغرق من 3 إلى 6 أسابيع. المنصات المعقدة وتطبيقات الجوال والأنظمة المؤسسية تستغرق من 3 إلى 6 أشهر حسب النطاق.',
        'A simple website can be delivered in 3–6 weeks. Complex SaaS platforms, mobile apps, and enterprise systems take 3–6 months depending on scope. We always provide a detailed timeline during consultation.'
      ),
    },
    {
      q: t(
        'Jobbar RoshaLink med kunder utanför Sverige?',
        'آیا روشالینک با مشتریان خارج از سوئد کار می‌کند؟',
        'هل تعمل روشا لينك مع عملاء خارج السويد؟',
        'Does RoshaLink work with clients outside Sweden?'
      ),
      a: t(
        'Ja, vi betjänar kunder i hela Norden (Sverige, Norge, Danmark, Finland), Europa och Mellanöstern. Alla projektmöten sker digitalt och vi kommunicerar på svenska, engelska, persiska och arabiska.',
        'بله، ما با مشتریان در سراسر اسکاندیناوی (سوئد، نروژ، دانمارک، فنلاند)، اروپا و خاورمیانه همکاری می‌کنیم. تمام جلسات پروژه به صورت دیجیتال برگزار می‌شود.',
        'نعم، نخدم عملاء في جميع أنحاء إسكندنافيا (السويد والنرويج والدنمارك وفنلندا) وأوروبا والشرق الأوسط. جميع اجتماعات المشاريع تتم رقميًا.',
        'Yes, we serve clients across Scandinavia (Sweden, Norway, Denmark, Finland), Europe, and the Middle East. All project meetings are conducted digitally and we communicate in Swedish, English, Persian, and Arabic.'
      ),
    },
    {
      q: t(
        'Erbjuder RoshaLink SEO-tjänster?',
        'آیا روشالینک خدمات سئو ارائه می‌دهد؟',
        'هل تقدم روشا لينك خدمات SEO؟',
        'Does RoshaLink offer SEO services?'
      ),
      a: t(
        'Ja, vi erbjuder teknisk SEO, flerspråkig optimering (svenska, engelska, persiska, arabiska), Core Web Vitals-optimering och datadriven synlighetsstrategi för nordiska och globala marknader.',
        'بله، ما سئو فنی، بهینه‌سازی چندزبانه، بهینه‌سازی Core Web Vitals و استراتژی دیده‌شدن در بازارهای اسکاندیناوی و جهانی ارائه می‌دهیم.',
        'نعم، نقدم خدمات SEO التقني والتحسين متعدد اللغات وتحسين Core Web Vitals واستراتيجية الظهور الرقمي للأسواق الإسكندنافية والعالمية.',
        'Yes, we offer technical SEO, multilingual optimization (Swedish, English, Persian, Arabic), Core Web Vitals optimization, and data-driven visibility strategies for Nordic and global markets.'
      ),
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  // ── 6. BreadcrumbList ──────────────────────────────────────────────────
  const homeLabel = t('Hem', 'صفحه اصلی', 'الرئيسية', 'Home');
  const pageLabels = {
    about:     t('Om oss',          'درباره ما',      'من نحن',          'About Us'),
    services:  t('Tjänster',        'خدمات',          'خدماتنا',         'Services'),
    portfolio: t('Portfölj',        'نمونه‌کارها',    'أعمالنا',         'Portfolio'),
    contact:   t('Kontakt',         'تماس با ما',     'تواصل معنا',      'Contact'),
    privacy:   t('Integritetspolicy', 'حریم خصوصی',  'سياسة الخصوصية',  'Privacy Policy'),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${BASE_URL}/${currentLang}`,
      },
      ...(page !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: pageLabels[page] || page.charAt(0).toUpperCase() + page.slice(1),
              item: `${BASE_URL}/${currentLang}/${page}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};
