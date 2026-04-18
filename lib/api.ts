import axios from 'axios';

const api = axios.create({
  // Filhal hum mock data use karenge, baad mein yahan aapka backend URL aayega
  baseURL: 'https://api.example.com/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Advance: Request Interceptor (Tokens ke liye)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;