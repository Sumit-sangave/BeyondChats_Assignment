import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import Tabs from "../components/Tabs";
import "../styles/articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  const filtered = articles.filter((a) => {
    if (activeTab === "Original") return !a.is_updated;
    if (activeTab === "Updated") return a.is_updated;
    return true;
  });

  const counts = {
    All: articles.length,
    Original: articles.filter((a) => !a.is_updated).length,
    Updated: articles.filter((a) => a.is_updated).length,
  };

  return (
    <>
      <header className="header">
        <h1>BeyondChats Articles</h1>
        <p>View original and AI-updated articles</p>
      </header>

      <Tabs active={activeTab} setActive={setActiveTab} counts={counts} />

      <div className="grid">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
