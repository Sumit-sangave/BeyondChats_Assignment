import { useState } from "react";

export default function ArticleCard({ article }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const handleReadMore = (e) => {
    e.preventDefault();
    setShowFullContent(true);
  };

  const handleCloseModal = () => {
    setShowFullContent(false);
  };

  const sourceDisplay = article.source || "Unknown Source";
  const titleTruncated = article.title?.length > 50 
    ? article.title.slice(0, 50) + "..." 
    : article.title;

  return (
    <>
      <div className="article-card">
        <div className="card-header">
          <div className="header-top">
            <span className={`status-badge ${article.is_updated ? "updated" : "original"}`}>
              {article.is_updated ? "✨ Updated" : "📄 Original"}
            </span>
          </div>
          
          <h3 className="article-title" title={article.title}>
            {titleTruncated}
          </h3>
          
          <div className="article-meta">
            <span className="source">📌 {sourceDisplay}</span>
            <span className="date">
              📅 {new Date(article.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="card-content">
          <p className="excerpt">
            {article.content.slice(0, 150)}...
          </p>
        </div>

        <div className="card-footer">
          <button 
            className="btn-read-more"
            onClick={handleReadMore}
          >
            Read More →
          </button>
          
          {article.original_url && (
            <a 
              href={article.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-view-original"
            >
              View Original ↗
            </a>
          )}
        </div>
      </div>

      {showFullContent && (
        <div 
          className="modal-overlay"
          onClick={handleCloseModal}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              ✕
            </button>
            
            <div className="modal-header">
              <span className={`status-badge ${article.is_updated ? "updated" : "original"}`}>
                {article.is_updated ? "✨ Updated" : "📄 Original"}
              </span>
              <h2>{article.title}</h2>
              <div className="modal-meta">
                <span>📌 {sourceDisplay}</span>
                <span>📅 {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            <div className="modal-body">
              {article.content}
            </div>

            {article.original_url && (
              <div className="modal-footer">
                <a 
                  href={article.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-view-original"
                >
                  View Original Source ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
  