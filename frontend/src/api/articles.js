import axios from "axios";

const API = "http://localhost:5000/api/articles";

export const fetchArticles = async () => {
  const res = await axios.get(API);
  return res.data;
};
