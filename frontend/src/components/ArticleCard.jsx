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

  return (
    <>
      <div className="card">
        <div className="card-border" />
  
        <div className="card-header">
          <h3>{article.title}</h3>
          <span className={article.is_updated ? "badge updated" : "badge original"}>
            {article.is_updated ? "Updated" : "Original"}
          </span>
        </div>
  
        <p className="date">
          {new Date(article.created_at).toDateString()}
        </p>
  
        <p className="excerpt">
          {article.content.slice(0, 180)}...
        </p>
  
        <a 
          href="#" 
          className="read-more"
          onClick={handleReadMore}
        >
          Read More
        </a>
  
        {article.original_url && (
          <a 
            href={article.original_url}
            target="_blank"
            rel="noopener noreferrer"
            className="view-btn"
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            View Original →
          </a>
        )}
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
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2>{article.title}</h2>
            <p className="date" style={{ marginBottom: '20px' }}>
              {new Date(article.created_at).toDateString()}
            </p>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#444' }}>
              {article.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
  