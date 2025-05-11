import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "", // adjust if needed
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default request;
