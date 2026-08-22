import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Globe, Share2, MessageSquare, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/Logo/RoshaLink_logo.png';
import './Footer.css';

export default function Footer({ setActivePage }) {
  const { t } = useTranslation();

  return (
    <footer className="footer-section">
      <div className="footer-ambient-glow" />
      <div className="footer-container">
        
        {/* Brand & Overview */}
        <div className="footer-brand-col">
          <div 
            onClick={() => setActivePage('home')}
            className="footer-logo-link group"
          >
            <div className="footer-logo-icon">
              <img src={logoImg} alt="RoshaLink Logo" className="footer-logo-img" />
            </div>
            <span className="footer-logo-text">
              <span className="footer-logo-rosha">{t('footer.brandRosha', 'ROSHA')}</span>
              <span className="footer-logo-link-text">{t('footer.brandLink', 'LINK')}</span>
            </span>
          </div>
          <p className="footer-desc">
            {t('footer.description')}
          </p>
          <div className="footer-socials">
            <a href="#" className="footer-social-link" title="Global Network">
              <Globe className="footer-social-icon" />
            </a>
            <a href="#" className="footer-social-link" title="Share">
              <Share2 className="footer-social-icon" />
            </a>
            <a href="#" className="footer-social-link" title="Community">
              <MessageSquare className="footer-social-icon" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-links-title">{t('footer.navigation')}</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => setActivePage('home')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.home')}</span></button></li>
            <li><button onClick={() => setActivePage('portfolio')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.portfolio')}</span></button></li>
            <li><button onClick={() => setActivePage('services')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.services')}</span></button></li>
            <li><button onClick={() => setActivePage('about')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.about')}</span></button></li>
            <li><button onClick={() => setActivePage('contact')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.contact')}</span></button></li>
          </ul>
        </div>

        {/* Capabilities */}
        <div className="footer-cap-col">
          <h4 className="footer-cap-title">{t('footer.capabilities')}</h4>
          <ul className="footer-links-list">
            <li><button className="footer-link-btn"><span className="footer-link-btn-text">Strategic Design</span></button></li>
            <li><button className="footer-link-btn"><span className="footer-link-btn-text">Product Development</span></button></li>
            <li><button className="footer-link-btn"><span className="footer-link-btn-text">Cloud & Architecture</span></button></li>
            <li><button className="footer-link-btn"><span className="footer-link-btn-text">AI & Business Intelligence</span></button></li>
            <li><button className="footer-link-btn"><span className="footer-link-btn-text">Design Systems</span></button></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-news-col">
          <h4 className="footer-links-title">{t('footer.stayUpdated')}</h4>
          <p className="footer-news-sub">{t('footer.newsletterSub')}</p>
          <form onSubmit={(e) => e.preventDefault()} className="footer-form">
            <div className="footer-input-wrapper">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="footer-input"
              />
              <button
                type="submit"
                className="footer-submit"
                // Icon-only button: without this a screen reader announces
                // just "button" with no indication of what it does.
                aria-label={t('footer.subscribe')}
              >
                <ArrowUpRight className="footer-submit-icon" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <div>{t('footer.rights')}</div>
        <div className="footer-bottom-links">
          <button onClick={() => setActivePage('privacy')} className="footer-bottom-link cursor-pointer">{t('footer.privacyPolicy', 'Privacy Policy')}</button>
          <a href="#" className="footer-bottom-link">Terms of Service</a>
          <a href="#" className="footer-bottom-link">Security Specification</a>
        </div>
      </div>
    </footer>
  );
}
