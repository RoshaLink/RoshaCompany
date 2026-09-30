import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { insightsData } from '../../data/insightsData';
import InsightCard from '../InsightsPage/InsightCard';
import { BASE_URL } from '../../config/seoConfig';
import './InsightDetailsPage.css';

export default function InsightDetailsPage() {
  const { lang, slug } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'sv';
  const isRTL = ['fa', 'ar'].includes(currentLang);

  const post = useMemo(() => {
    return insightsData.find(p => p.slug === slug && p.lang === currentLang);
  }, [slug, currentLang]);

  const relatedArticles = useMemo(() => {
    if (!post) return [];
    return insightsData
      .filter(p => p.lang === currentLang && p.id !== post.id)
      .slice(0, 2);
  }, [currentLang, post]);

  if (!post) {
    return <Navigate to={`/${currentLang}/insights`} replace />;
  }

  // Schema.org JSON-LD for Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${currentLang}/insights/${post.slug}`
    },
    headline: post.seo.title,
    description: post.seo.description,
    image: `${BASE_URL}${post.image || '/logo.png'}`,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${BASE_URL}/#organization`
    },
    publisher: {
      '@type': 'Organization',
      name: 'RoshaLink',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`
      }
    },
    datePublished: post.date,
    dateModified: post.date
  };

  // Schema.org JSON-LD for Breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isRTL ? 'صفحه اصلی' : 'Home',
        item: `${BASE_URL}/${currentLang}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('nav.insights'),
        item: `${BASE_URL}/${currentLang}/insights`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${BASE_URL}/${currentLang}/insights/${post.slug}`
      }
    ]
  };

  // Reading time
  const wordCount = post.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  // Social Share URLs
  const pageUrl = `${BASE_URL}/${currentLang}/insights/${post.slug}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(post.title)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`;

  return (
    <div className="insight-details-wrapper" dir={isRTL ? 'rtl' : 'ltr'}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <title>{post.seo.title}</title>
      <meta name="description" content={post.seo.description} />

      <div className="insight-details-container max-w-3xl mx-auto px-5 pt-32 pb-24">
        
        <Link to={`/${currentLang}/insights`} className="insight-back-link">
          {isRTL ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
          {isRTL ? 'بازگشت به مقالات' : 'Back to Insights'}
        </Link>

        <article>
          <header className="insight-header">
            <span className="insight-category-badge">
              {post.category}
            </span>
            
            <h1 className="insight-title">
              {post.title}
            </h1>
            
            <p className="insight-excerpt">
              {post.excerpt}
            </p>
            
            <div className="insight-meta-row">
              <div className="insight-author-profile">
                <div className="insight-avatar">
                  {post.author.charAt(0)}
                </div>
                <div className="insight-author-info">
                  <span className="insight-author-name">{post.author}</span>
                  <span className="insight-author-role">{t('insightsPage.partnerRole')}</span>
                </div>
              </div>
              
              <div className="insight-post-stats">
                <span>{new Date(post.date).toLocaleDateString(currentLang, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>&bull;</span>
                <span>{readingTime} {t('insightsPage.minRead')}</span>
              </div>
            </div>
          </header>

          <div 
            className="insight-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="insight-share-row mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> {t('insightsPage.share')}
            </span>
            <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <div className="insight-related mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-50">
              {t('insightsPage.readNext')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(related => (
                <InsightCard 
                  key={related.id} 
                  post={related} 
                  currentLang={currentLang} 
                  isRTL={isRTL} 
                />
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
