import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import GetStartedModal from './components/GetStartedModal/GetStartedModal';
import RoshaChatWidget from './components/RoshaChatWidget/RoshaChatWidget';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import ContactPage from './pages/ContactPage/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage/PrivacyPolicyPage';
import { SEOHead } from './components/SEO/SEOHead';
import { SUPPORTED_LANGS, DEFAULT_LANG } from './config/seoConfig';

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
        <Routes>
          {/* Root redirect to current/default language */}
          <Route path="/" element={<Navigate to={`/${activeLang}`} replace />} />

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

          {/* Legacy non-prefixed fallback redirects for backward compatibility */}
          <Route path="/home" element={<Navigate to={`/${activeLang}`} replace />} />
          <Route path="/about" element={<Navigate to={`/${activeLang}/about`} replace />} />
          <Route path="/services" element={<Navigate to={`/${activeLang}/services`} replace />} />
          <Route path="/portfolio" element={<Navigate to={`/${activeLang}/portfolio`} replace />} />
          <Route path="/contact" element={<Navigate to={`/${activeLang}/contact`} replace />} />
          <Route path="/privacy" element={<Navigate to={`/${activeLang}/privacy`} replace />} />
          <Route path="/privacy-policy" element={<Navigate to={`/${activeLang}/privacy`} replace />} />

          {/* 404 / Catch-all */}
          <Route 
            path="*" 
            element={<Navigate to={`/${activeLang}`} replace />} 
          />
        </Routes>
      </main>

      <Footer setActivePage={handlePageChange} />

      <GetStartedModal 
        isOpen={isGetStartedOpen} 
        onClose={() => setIsGetStartedOpen(false)} 
      />

      <RoshaChatWidget onOpenGetStarted={() => setIsGetStartedOpen(true)} />
    </div>
  );
}
