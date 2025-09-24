import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Set baseURL to include /api/auth
const API = axios.create({
  baseURL: `${BASE}/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
