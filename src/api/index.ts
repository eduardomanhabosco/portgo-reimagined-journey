
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8001', // A URL e porta do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Este "interceptador" adiciona o token de login em todas as chamadas futuras
apiClient.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const { token } = JSON.parse(authData);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;