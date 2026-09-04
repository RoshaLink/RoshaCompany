import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { SEOHead } from './components/SEO/SEOHead';
import { SUPPORTED_LANGS, DEFAULT_LANG } from './config/seoConfig';

import HomePage from './pages/HomePage/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage/PortfolioPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage/PrivacyPolicyPage'));
const RoshaChatWidget = lazy(() => import('./components/RoshaChatWidget/RoshaChatWidget'));
const GetStartedModal = lazy(() => import('./components/GetStartedModal/GetStartedModal'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

/**
 * Wrapper component to synchronize language from URL param :lang with i18next
 */
function LocalizedPageWrapper({ pageId, children }) {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  const currentLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      const isRtl = ['fa', 'ar'].includes(lang);
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  return (
    <>
      <SEOHead page={pageId} lang={currentLang} />
      {children}
    </>
  );
}

export default function App() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  // Extract active lang and page from current path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pathLang = pathParts[0];
  const activeLang = SUPPORTED_LANGS.includes(pathLang) ? pathLang : (i18n.language || DEFAULT_LANG);

  const getActivePage = () => {
    const pageSegment = (SUPPORTED_LANGS.includes(pathLang) ? pathParts[1] : pathParts[0]) || 'home';
    const lower = pageSegment.toLowerCase();
    if (lower === '' || lower === 'home') return 'home';
    if (lower.includes('about')) return 'about';
    if (lower.includes('services')) return 'services';
    if (lower.includes('portfolio')) return 'portfolio';
    if (lower.includes('contact')) return 'contact';
    if (lower.includes('privacy')) return 'privacy';
    return 'home';
  };

  const activePage = getActivePage();

  const handlePageChange = (pageId) => {
    const targetRoute = pageId === 'home' ? `/${activeLang}` : `/${activeLang}/${pageId}`;
    navigate(targetRoute);
  };

  const handleLanguageChange = (newLang) => {
    const targetPage = activePage === 'home' ? '' : `/${activePage}`;
    navigate(`/${newLang}${targetPage}`);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md flex flex-col justify-between selection:bg-secondary selection:text-surface">
      <ScrollToTop />

      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        onLanguageChange={handleLanguageChange}
      />

      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" /></div>}>
          <Routes>
            {/* Root route renders default language (Swedish) directly */}
            <Route
              path="/"
              element={
                <LocalizedPageWrapper pageId="home">
                  <HomePage setActivePage={handlePageChange} onOpenGetStarted={() => setIsGetStartedOpen(true)} />
                </LocalizedPageWrapper>
              }
            />

            {/* Multilingual Routes */}
            <Route
              path="/:lang"
              element={
                <LocalizedPageWrapper pageId="home">
                  <HomePage setActivePage={handlePageChange} onOpenGetStarted={() => setIsGetStartedOpen(true)} />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/:lang/about"
              element={
                <LocalizedPageWrapper pageId="about">
                  <AboutPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/:lang/services"
              element={
                <LocalizedPageWrapper pageId="services">
                  <ServicesPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/:lang/portfolio"
              element={
                <LocalizedPageWrapper pageId="portfolio">
                  <PortfolioPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/:lang/contact"
              element={
                <LocalizedPageWrapper pageId="contact">
                  <ContactPage />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/:lang/privacy"
              element={
                <LocalizedPageWrapper pageId="privacy">
                  <PrivacyPolicyPage />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/:lang/privacy-policy"
              element={
                <LocalizedPageWrapper pageId="privacy">
                  <PrivacyPolicyPage />
                </LocalizedPageWrapper>
              }
            />

            {/* Legacy non-prefixed routes */}
            <Route
              path="/about"
              element={
                <LocalizedPageWrapper pageId="about">
                  <AboutPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/services"
              element={
                <LocalizedPageWrapper pageId="services">
                  <ServicesPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/portfolio"
              element={
                <LocalizedPageWrapper pageId="portfolio">
                  <PortfolioPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <LocalizedPageWrapper pageId="contact">
                  <ContactPage />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/privacy"
              element={
                <LocalizedPageWrapper pageId="privacy">
                  <PrivacyPolicyPage />
                </LocalizedPageWrapper>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <LocalizedPageWrapper pageId="privacy">
                  <PrivacyPolicyPage />
                </LocalizedPageWrapper>
              }
            />

            {/* 404 / Catch-all */}
            <Route
              path="*"
              element={<Navigate to={`/${activeLang}`} replace />}
            />
          </Routes>
        </Suspense>
      </main>

      <Footer setActivePage={handlePageChange} />

      {isGetStartedOpen && (
        <Suspense fallback={null}>
          <GetStartedModal
            isOpen={isGetStartedOpen}
            onClose={() => setIsGetStartedOpen(false)}
          />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <RoshaChatWidget onOpenGetStarted={() => setIsGetStartedOpen(true)} />
      </Suspense>
    </div>
  );
}
