import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './InsightCard.css';

export default function InsightCard({ post, currentLang, isRTL }) {
  // Simple reading time calculation
  const wordCount = post.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  return (
    <Link to={`/${currentLang}/insights/${post.slug}`} className="insight-card-link">
      <article className="insight-card group">
        <div className="insight-card-gradient-border"></div>
        <div className="insight-card-inner">
          <div className="insight-card-header">
            <span className="insight-category">
              {post.category}
            </span>
            <div className="insight-meta flex items-center gap-2">
              <span className="insight-date">
                {new Date(post.date).toLocaleDateString(currentLang, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="insight-dot">&bull;</span>
              <span className="insight-reading-time">
                {readingTime} {isRTL ? 'دقیقه مطالعه' : 'min read'}
              </span>
            </div>
          </div>
          
          <h2 className="insight-card-title">
            {post.title}
          </h2>
          
          <p className="insight-card-excerpt">
            {post.excerpt}
          </p>
          
          <div className="insight-card-footer">
            <div className="insight-card-author">
              <div className="insight-author-avatar">
                {post.author.charAt(0)}
              </div>
              <span className="insight-author-name">{post.author}</span>
            </div>
            
            <div className="insight-read-more">
              <span className="insight-read-more-text">{isRTL ? 'مطالعه مقاله' : 'Read Article'}</span>
              {isRTL ? (
                <ArrowLeft className="w-4 h-4 insight-arrow" />
              ) : (
                <ArrowRight className="w-4 h-4 insight-arrow" />
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
