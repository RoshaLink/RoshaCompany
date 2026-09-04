import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Share2, MessageSquare, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import logoImg from '../../assets/Logo/RoshaLink_logo.webp';
import './Footer.css';

export default function Footer({ setActivePage }) {
  const { t, i18n } = useTranslation();
  const newsletterRef = useRef(null);

  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'alreadySubscribed' | 'rateLimit' | 'invalidEmail' | 'error'

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

  const handleSubmitNewsletter = async (e) => {
    e.preventDefault();

    // Honeypot check: silently simulate success for spam bots
    if (honeypot) {
      setStatus('success');
      setEmail('');
      return;
    }

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatus('invalidEmail');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          lang: i18n.language || 'sv',
          hp_field: honeypot,
        }),
      });

      if (res.status === 429) {
        setStatus('rateLimit');
        return;
      }

      const data = await res.json().catch(() => null);

      if (res.ok) {
        if (data?.data?.alreadySubscribed) {
          setStatus('alreadySubscribed');
        } else {
          setStatus('success');
          setEmail('');
        }
      } else {
        if (res.status === 400 && data?.errors?.some((err) => err.toLowerCase().includes('email'))) {
          setStatus('invalidEmail');
        } else {
          setStatus('error');
        }
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setStatus('error');
    }
  };

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
              <img src={logoImg} alt="RoshaLink Logo" className="footer-logo-img" width="200" height="200"  loading="lazy" />
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
            <li><Link to={`/${i18n.language}`} onClick={() => setActivePage('home')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.home')}</span></Link></li>
            <li><Link to={`/${i18n.language}/portfolio`} onClick={() => setActivePage('portfolio')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.portfolio')}</span></Link></li>
            <li><Link to={`/${i18n.language}/services`} onClick={() => setActivePage('services')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.services')}</span></Link></li>
            <li><Link to={`/${i18n.language}/about`} onClick={() => setActivePage('about')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.about')}</span></Link></li>
            <li><Link to={`/${i18n.language}/contact`} onClick={() => setActivePage('contact')} className="footer-link-btn"><span className="footer-link-btn-text">{t('nav.contact')}</span></Link></li>
          </ul>
        </div>

        {/* Capabilities */}
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
          <form onSubmit={handleSubmitNewsletter} className="footer-form" noValidate>
            <div className="footer-input-wrapper">
              {/* Anti-Bot Honeypot Trap (Invisible to real users) */}
              <input
                type="text"
                name="website_url_check"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                style={{ display: 'none' }}
              />

              <label htmlFor="footer-newsletter-email" className="sr-only">
                {t('footer.emailPlaceholder')}
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle' && status !== 'loading') {
                    setStatus('idle');
                  }
                }}
                disabled={status === 'loading'}
                placeholder={t('footer.emailPlaceholder')}
                className={`footer-input ${status === 'invalidEmail' ? 'footer-input-error' : ''}`}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="footer-submit"
                aria-label={t('footer.subscribe')}
              >
                {status === 'loading' ? (
                  <Loader2 className="footer-submit-icon animate-spin" aria-hidden="true" />
                ) : (
                  <ArrowUpRight className="footer-submit-icon" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Inline accessible feedback messages */}
            {status === 'success' && (
              <div className="footer-newsletter-status is-success" role="status">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
                <span>{t('footer.newsletterSuccess')}</span>
              </div>
            )}

            {status === 'alreadySubscribed' && (
              <div className="footer-newsletter-status is-info" role="status">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-sky-500" aria-hidden="true" />
                <span>{t('footer.newsletterAlreadySubscribed')}</span>
              </div>
            )}

            {status === 'invalidEmail' && (
              <div className="footer-newsletter-status is-error" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" aria-hidden="true" />
                <span>{t('footer.newsletterInvalidEmail')}</span>
              </div>
            )}

            {status === 'rateLimit' && (
              <div className="footer-newsletter-status is-error" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" aria-hidden="true" />
                <span>{t('footer.newsletterRateLimit')}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="footer-newsletter-status is-error" role="alert">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" aria-hidden="true" />
                <span>{t('footer.newsletterError')}</span>
              </div>
            )}
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
