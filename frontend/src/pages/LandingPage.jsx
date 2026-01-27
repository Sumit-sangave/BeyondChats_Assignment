import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(null);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo">
            <img src="/logo.svg" alt="ArticleHub Logo" className="logo-image" />
            <span className="logo-text">ArticleHub</span>
          </div>
          <button 
            className="nav-button"
            onClick={() => navigate("/articles")}
          >
            Explore Articles
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover & Explore <span className="gradient-text">Amazing Articles</span>
          </h1>
          <p className="hero-subtitle">
            Stay updated with the latest content. Browse through our curated collection of original and enhanced articles.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate("/articles")}
            >
              Start Exploring →
            </button>
            <button className="btn btn-secondary">
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-graphic">
          <div className="floating-card card-1">📄</div>
          <div className="floating-card card-2">✨</div>
          <div className="floating-card card-3">🚀</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose ArticleHub?</h2>
        <div className="features-grid">
          {[
            {
              icon: "🎯",
              title: "Curated Content",
              description: "Hand-picked articles covering diverse topics and interests"
            },
            {
              icon: "✏️",
              title: "Enhanced Articles",
              description: "Original content reimagined and improved for better clarity"
            },
            {
              icon: "📊",
              title: "Easy Organization",
              description: "Filter and browse articles by original or updated versions"
            },
            {
              icon: "⚡",
              title: "Fast Loading",
              description: "Optimized for speed with a smooth, responsive interface"
            },
            {
              icon: "🔍",
              title: "Comprehensive",
              description: "Extensive collection of articles across multiple categories"
            },
            {
              icon: "💫",
              title: "Modern Design",
              description: "Beautiful, intuitive interface built for great user experience"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
              style={{
                transform: isHovered === index ? "translateY(-8px)" : "translateY(0)",
                transition: "all 0.3s ease"
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Articles</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Updates</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Quality</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Available</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore?</h2>
          <p>Join thousands of readers discovering amazing content every day</p>
          <button 
            className="btn btn-large"
            onClick={() => navigate("/articles")}
          >
            Browse All Articles
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ArticleHub</h4>
            <p>Your gateway to amazing content</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#articles">Articles</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <Link to="/login">Twitter</Link>
              <Link to="/login">GitHub</Link>
              <Link to="/login">LinkedIn</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ArticleHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
