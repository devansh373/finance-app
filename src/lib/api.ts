import axios from "axios";

const api = axios.create({
  baseURL: "https://finance-app-backend-z8v0.onrender.com/api", 
  // baseURL: "http://localhost:5000/api", 
  withCredentials: true, 
});

export default api;
