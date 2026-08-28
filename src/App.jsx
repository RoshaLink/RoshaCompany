import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Map route path to active page id for navigation component
  const getActivePage = () => {
    const path = location.pathname.toLowerCase();
    if (path === '/' || path === '/home') return 'home';
    if (path.includes('about')) return 'about';
    if (path.includes('services')) return 'services';
    if (path.includes('portfolio')) return 'portfolio';
    if (path.includes('contact')) return 'contact';
    if (path.includes('privacy')) return 'privacy';
    return 'home';
  };

  const activePage = getActivePage();

  const handlePageChange = (pageId) => {
    const targetRoute = pageId === 'home' ? '/' : `/${pageId}`;
    navigate(targetRoute);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md flex flex-col justify-between selection:bg-secondary selection:text-surface">
      <ScrollToTop />

      <Navbar 
        activePage={activePage} 
        setActivePage={handlePageChange} 
        onOpenGetStarted={() => setIsGetStartedOpen(true)} 
      />

      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage setActivePage={handlePageChange} onOpenGetStarted={() => setIsGetStartedOpen(true)} />} 
          />
          <Route 
            path="/home" 
            element={<HomePage setActivePage={handlePageChange} onOpenGetStarted={() => setIsGetStartedOpen(true)} />} 
          />
          <Route 
            path="/about" 
            element={<AboutPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />} 
          />
          <Route 
            path="/services" 
            element={<ServicesPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />} 
          />
          <Route 
            path="/portfolio" 
            element={<PortfolioPage onOpenGetStarted={() => setIsGetStartedOpen(true)} />} 
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route 
            path="*" 
            element={<HomePage setActivePage={handlePageChange} onOpenGetStarted={() => setIsGetStartedOpen(true)} />} 
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
