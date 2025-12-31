import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import Tabs from "../components/Tabs";
import "../styles/articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 🔹 Filter based on active tab
  const filteredArticles = articles.filter((a) => {
    if (activeTab === "Original") return !a.is_updated;
    if (activeTab === "Updated") return a.is_updated;
    return true;
  });

  // 🔹 Tab counts
  const counts = {
    All: articles.length,
    Original: articles.filter((a) => !a.is_updated).length,
    Updated: articles.filter((a) => a.is_updated).length,
  };

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="center">
        <p>Loading articles...</p>
      </div>
    );
  }

  // 🔹 Error state
  if (error) {
    return (
      <div className="center error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <h1>BeyondChats Articles</h1>
        <p>View original and AI-updated articles</p>
      </header>

      <Tabs
        active={activeTab}
        setActive={setActiveTab}
        counts={counts}
      />

      <div className="grid">
        {filteredArticles.length === 0 ? (
          <p className="empty">No articles found</p>
        ) : (
          filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))
        )}
      </div>
    </>
  );
}
