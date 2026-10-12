import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const baseURL = rawBaseUrl.replace(/\/+$/, "");

const api = axios.create({
    baseURL
});

export default api;