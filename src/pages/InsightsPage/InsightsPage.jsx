import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { insightsData } from '../../data/insightsData';
import InsightCard from './InsightCard';
import './InsightsPage.css';

export default function InsightsPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'sv';
  const isRTL = ['fa', 'ar'].includes(currentLang);

  const filteredInsights = useMemo(() => {
    return insightsData.filter(post => post.lang === currentLang);
  }, [currentLang]);

  return (
    <div className="insights-page-root" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="insights-header-bg">
        <div className="insights-container text-center pt-32 pb-20">
          <h1 className="insights-title mb-6">
            <span className="sky-blue-text-shine">
              {t('nav.insights') || 'Insights & Tech Journal'}
            </span>
          </h1>
          <p className="insights-subtitle mx-auto max-w-2xl text-lg">
            {t('insightsPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="insights-container pb-24">
        {filteredInsights.length === 0 ? (
          <div className="text-center py-20 insights-empty">
            <p>{t('insightsPage.empty')}</p>
          </div>
        ) : (
          <div className="insights-grid">
            {filteredInsights.map(post => (
              <InsightCard 
                key={post.id} 
                post={post} 
                currentLang={currentLang} 
                isRTL={isRTL} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
