import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import Tabs from "../components/Tabs";
import Header from "../components/Header";
import "../styles/articles.css";

export default function Articles() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Check if user is authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await fetchArticles();

        // ✅ Ensure API response is an array
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  // 🔹 Filter and search based on active tab and search query
  let filteredArticles = articles.filter((a) => {
    if (activeTab === "Original") return !a.is_updated;
    if (activeTab === "Updated") return a.is_updated;
    return true;
  });

  // Apply search filter
  if (searchQuery) {
    filteredArticles = filteredArticles.filter((a) =>
      (a.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (a.source?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );
  }

  // Apply sorting
  if (sortBy === "newest") {
    filteredArticles = [...filteredArticles].sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB - dateA;
    });
  } else if (sortBy === "oldest") {
    filteredArticles = [...filteredArticles].sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateA - dateB;
    });
  } else if (sortBy === "title") {
    filteredArticles = [...filteredArticles].sort((a, b) =>
      (a.title || "").localeCompare(b.title || "")
    );
  }

  // 🔹 Tab counts
  const counts = {
    All: articles.length,
    Original: articles.filter((a) => !a.is_updated).length,
    Updated: articles.filter((a) => a.is_updated).length,
  };

  // 🔹 Loading state
  if (loading || authLoading) {
    return (
      <>
        <Header />
        <div className="articles-container">
          <div className="loading">
            <p>Loading articles...</p>
          </div>
        </div>
      </>
    );
  }

  // 🔹 Error state
  if (error) {
    return (
      <>
        <Header />
        <div className="articles-container">
          <div className="error">
            <p>{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="articles-container">
        <div className="articles-controls">
          <div className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search articles by title or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sort-section">
            <label htmlFor="sortBy">Sort by:</label>
            <select
              id="sortBy"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        <Tabs
          active={activeTab}
          setActive={setActiveTab}
          counts={counts}
        />

        <div className="results-info">
          <p>{filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found</p>
        </div>

        <div className="grid">
          {filteredArticles.length === 0 ? (
            <div className="no-results">
              <p>😕 No articles found</p>
              <p className="no-results-subtitle">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
