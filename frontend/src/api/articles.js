import axios from "axios";

const API_BASE = "https://beyondchats-assignment-ev5q.onrender.com/api/articles";

export const fetchArticles = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const rewriteArticle = async (id) => {
  const res = await axios.post(`${API_BASE}/${id}/rewrite`);
  return res.data;
};
