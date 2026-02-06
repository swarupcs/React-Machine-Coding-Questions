import axios from 'axios';
import authService from './authService';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
