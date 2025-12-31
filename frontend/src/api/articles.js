import axios from "axios";

const API_BASE = "https://beyondchats-assignment-ev5q.onrender.com/api";

export const fetchArticles = async () => {
  const res = await axios.get(`${API_BASE}/articles`);
  return res.data;
};

export const triggerRewrite = async (id) => {
  const res = await axios.post(`${API_BASE}/articles/${id}/rewrite`);
  return res.data;
};
