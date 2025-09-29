import axios from "axios";

const api = axios.create({
  // baseURL: "/api", 
  // baseURL: "https://finance-app-backend-z8v0.onrender.com/api", 
  // baseURL: "http://localhost:5000/api", 
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  withCredentials: true, 
});

export default api;
