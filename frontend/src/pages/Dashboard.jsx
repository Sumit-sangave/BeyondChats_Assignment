import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/articles";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // ✅ SINGLE fetch function
  const loadArticles = async () => {
    try {
      const res = await axios.get(API);
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to load articles", err);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // ✅ BUTTON HANDLER
  const triggerRewrite = async (id) => {
    console.log("Rewrite clicked for ID:", id); // 🔥 DEBUG LINE

    try {
      setLoadingId(id);
      await axios.post(`${API}/${id}/rewrite`);
      await loadArticles(); // refresh UI
      alert("Rewrite triggered");
    } catch (err) {
      console.error("Rewrite failed", err);
      alert("Rewrite failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>BeyondChats – Article Dashboard</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Original</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {articles.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>

              <td>{a.is_updated ? "✅ Updated" : "⏳ Pending"}</td>

              <td>
                <a
                  href={a.original_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Original
                </a>
              </td>

              <td>
                {!a.is_updated && (
                  <button
                    onClick={() => triggerRewrite(a.id)}
                    disabled={loadingId === a.id}
                  >
                    {loadingId === a.id ? "Processing..." : "Rewrite"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
