import React from 'react';
import { BASE_URL, DEFAULT_LANG } from '../../config/seoConfig';

export const JsonLdSchema = ({ page = 'home', lang = DEFAULT_LANG }) => {
  const currentLang = ['sv', 'en', 'fa', 'ar'].includes(lang) ? lang : DEFAULT_LANG;

  // 1. Organization & ProfessionalService Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${BASE_URL}/#organization`,
    name: 'RoshaLink',
    alternateName: ['RoshaLink Digital Agency', 'Rosha Link Tech', 'آژانس دیجیتال روشالینک', 'وكالة روشا لينك'],
    url: `${BASE_URL}/${currentLang}`,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/favicon.svg`,
      width: '512',
      height: '512',
    },
    image: `${BASE_URL}/og-image.jpg`,
    description:
      currentLang === 'sv'
        ? 'Ledande digitalbyrå i Stockholm för skräddarsydd webbutveckling, mobila appar och skalbar molninfrastruktur.'
        : currentLang === 'fa'
        ? 'آژانس دیجیتال تخصصی در زمینه طراحی وب‌سایت، وب‌اپلیکیشن، اپلیکیشن موبایل و سیستم‌های ابری.'
        : currentLang === 'ar'
        ? 'وكالة رقمية متخصصة في تصميم وتطوير مواقع الويب وتطبيقات الجوال والحلول السحابية المتقدمة.'
        : 'Leading digital agency for custom web development, mobile apps, and high-performance cloud architecture.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stockholm',
      addressCountry: 'SE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'roshalinkcompany@gmail.com',
      availableLanguage: ['Swedish', 'English', 'Persian', 'Arabic'],
    },
    founder: [
      { '@type': 'Person', name: 'Morteza', jobTitle: 'CEO & Principal Architect' },
      { '@type': 'Person', name: 'Bella', jobTitle: 'Head of Product & Brand' },
      { '@type': 'Person', name: 'Sam', jobTitle: 'Senior Cloud Engineer' },
      { '@type': 'Person', name: 'Mina', jobTitle: 'Senior Business Analyst' },
      { '@type': 'Person', name: 'Milad', jobTitle: 'Senior Full-Stack Engineer' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/roshalink',
      'https://github.com/roshalink',
    ],
    priceRange: '$$$$',
    inLanguage: currentLang,
  };

  // 2. WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'RoshaLink',
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: ['sv', 'en', 'fa', 'ar'],
  };

  // 3. Service Schemas
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Service',
        name: currentLang === 'sv' ? 'Skräddarsydd Webbutveckling' : currentLang === 'fa' ? 'طراحی سایت و وب‌اپلیکیشن اختصاصی' : currentLang === 'ar' ? 'تطوير مواقع الويب المخصصة' : 'Custom Web Development',
        serviceType: 'Web Development',
        provider: { '@id': `${BASE_URL}/#organization` },
        description: 'Bespoke, high-performance web applications built with React, Node.js, and modern cloud stacks.',
      },
      {
        '@type': 'Service',
        name: currentLang === 'sv' ? 'Mobilapputveckling (iOS & Android)' : currentLang === 'fa' ? 'توسعه اپلیکیشن موبایل iOS و اندروید' : currentLang === 'ar' ? 'برمجة وتطوير تطبيقات الجوال' : 'Mobile App Development',
        serviceType: 'Mobile Development',
        provider: { '@id': `${BASE_URL}/#organization` },
        description: 'Native and cross-platform high-speed mobile applications with fluid UI/UX.',
      },
      {
        '@type': 'Service',
        name: currentLang === 'sv' ? 'Molnarkitektur & Prestandaoptimering' : currentLang === 'fa' ? 'معماری سیستم‌های ابری و مقیاس‌پذیری' : currentLang === 'ar' ? 'الحلول السحابية وهندسة النظم' : 'Cloud Architecture & Scaling',
        serviceType: 'Cloud Engineering',
        provider: { '@id': `${BASE_URL}/#organization` },
        description: 'Distributed cloud systems with sub-20ms latency and 99.99% uptime guarantees.',
      },
    ],
  };

  // 4. FAQ Schema for Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name:
          currentLang === 'sv'
            ? 'Hur bygger RoshaLink skräddarsydda webbplatser och appar?'
            : currentLang === 'fa'
            ? 'روشالینک چگونه پروژه‌های طراحی سایت و اپلیکیشن را اجرا می‌کند؟'
            : currentLang === 'ar'
            ? 'كيف تقوم روشا لينك بتطوير المواقع والتطبيقات المخصصة؟'
            : 'How does RoshaLink develop custom websites and applications?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            currentLang === 'sv'
              ? 'Vi bygger alla digitala produkter från grunden med 100 % anpassad kod och senior ingenjörskonst utan färdiga mallar eller genvägar.'
              : currentLang === 'fa'
              ? 'روشالینک تمام محصولات را با کدنویسی ۱۰۰٪ اختصاصی و با همکاری مستقیم ۵ شریک ارشد مهندسی بدون استفاده از قالب‌های آماده توسعه می‌دهد.'
              : currentLang === 'ar'
              ? 'نقوم بتطوير جميع الحلول البرمجية بأكواد مخصصة 100% وبدون قوالب جاهزة لضمان أعلى أداء واستقرار.'
              : 'We engineer every digital solution with 100% custom, bespoke code and senior architectural leadership without relying on pre-made templates.',
        },
      },
      {
        '@type': 'Question',
        name:
          currentLang === 'sv'
            ? 'Vilka teknologier använder RoshaLink?'
            : currentLang === 'fa'
            ? 'روشالینک از چه تکنولوژی‌هایی استفاده می‌کند؟'
            : currentLang === 'ar'
            ? 'ما هي التقنيات التي تعتمد عليها روشا لينك؟'
            : 'What technologies does RoshaLink specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'React, Node.js, Next.js, Vite, Tailwind CSS, TypeScript, MongoDB, PostgreSQL, AWS, and Cloud Architecture.',
        },
      },
    ],
  };

  // 5. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/${currentLang}`,
      },
      ...(page !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: page.charAt(0).toUpperCase() + page.slice(1),
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
