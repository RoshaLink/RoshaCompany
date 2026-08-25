import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Globe, Share2, MessageSquare, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/Logo/RoshaLink_logo.png';
import './Footer.css';

export default function Footer({ setActivePage }) {
  const { t } = useTranslation();
  const newsletterRef = useRef(null);

  // RoshaChatWidget floats fixed at the bottom-right of the viewport and
  // fully covers the newsletter input/button whenever this section scrolls
  // into that corner (verified: the closed widget bubble is 80x80, inset up
  // to 24px from the edge -- sm:bottom-6/right-6 -- and sits directly on top
  // of the 44x44 submit button at the scroll position where the footer
  // naturally comes into view).
  //
  // The observed band is a fixed pixel height from the bottom of the
  // viewport, not a percentage: the widget's footprint is a fixed number of
  // pixels regardless of viewport height, so a %-based band would be far too
  // wide on a short viewport and too narrow on a tall one. Recomputed on
  // resize since the band's absolute position depends on window.innerHeight.
  useEffect(() => {
    const el = newsletterRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    // 80px bubble + 24px max inset + margin for its pulse ring/tooltip.
    const WIDGET_BAND_PX = 160;

    let observer;
    const observe = () => {
      observer?.disconnect();
      const topInset = Math.max(window.innerHeight - WIDGET_BAND_PX, 0);
      observer = new IntersectionObserver(
        ([entry]) => {
          document.documentElement.classList.toggle('footer-form-visible', entry.isIntersecting);
        },
        { rootMargin: `-${topInset}px 0px 0px 0px` }
      );
      observer.observe(el);
    };

    observe();
    window.addEventListener('resize', observe);

    return () => {
      window.removeEventListener('resize', observe);
      observer?.disconnect();
      document.documentElement.classList.remove('footer-form-visible');
    };
  }, []);

  const capabilities = [t('footer.cap1'), t('footer.cap2'), t('footer.cap3'), t('footer.cap4'), t('footer.cap5')];

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
            {/* href="#" is a known placeholder pending real destinations
                (tracked separately) -- title AND aria-label are both set here
                deliberately: aria-label gives screen readers a translated
                name, title gives mouse/pen users a visible tooltip, which
                aria-label alone does not. */}
            <a href="#" className="footer-social-link" title={t('footer.socialGlobal')} aria-label={t('footer.socialGlobal')}>
              <Globe className="footer-social-icon" aria-hidden="true" />
            </a>
            <a href="#" className="footer-social-link" title={t('footer.socialShare')} aria-label={t('footer.socialShare')}>
              <Share2 className="footer-social-icon" aria-hidden="true" />
            </a>
            <a href="#" className="footer-social-link" title={t('footer.socialCommunity')} aria-label={t('footer.socialCommunity')}>
              <MessageSquare className="footer-social-icon" aria-hidden="true" />
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

        {/* Capabilities -- plain text, not links: there's no per-capability
            page to send these to (Services has 6 cards with different titles
            that don't map 1:1 onto these 5 labels), so they were previously
            styled and cursor:pointer'd as buttons that did nothing when
            clicked. A summary list reads honestly; five identical dead links
            to the same page would not have. */}
        <div className="footer-cap-col">
          <h4 className="footer-cap-title">{t('footer.capabilities')}</h4>
          <ul className="footer-cap-list">
            {capabilities.map((label) => (
              <li key={label} className="footer-cap-item">{label}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-news-col" ref={newsletterRef}>
          <h4 className="footer-links-title">{t('footer.stayUpdated')}</h4>
          <p className="footer-news-sub">{t('footer.newsletterSub')}</p>
          <form onSubmit={(e) => e.preventDefault()} className="footer-form">
            <div className="footer-input-wrapper">
              {/* Visually hidden rather than placeholder-only: a placeholder
                  disappears the moment the field has a value and isn't
                  reliably announced as the field's label by assistive tech. */}
              <label htmlFor="footer-newsletter-email" className="sr-only">
                {t('footer.emailPlaceholder')}
              </label>
              <input
                id="footer-newsletter-email"
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
          <button onClick={() => setActivePage('privacy')} className="footer-bottom-link cursor-pointer">{t('footer.privacyPolicy')}</button>
          {/* href="#" is a known placeholder pending real destinations (tracked separately). */}
          <a href="#" className="footer-bottom-link">{t('footer.termsOfService')}</a>
          <a href="#" className="footer-bottom-link">{t('footer.securitySpec')}</a>
        </div>
      </div>
    </footer>
  );
}
