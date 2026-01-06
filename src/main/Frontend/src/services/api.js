import axios from 'axios';

// Create axios instance with base URL
const API_BASE_URL = process.env.REACT_APP_API_URL; // Change this to your API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  
  signup: async (username, email, password) => {
    const response = await api.post('/api/auth/signup', { username, email, password });
    return response.data;
  },
};

// Quiz API
export const quizAPI = {
  getQuizzes: async () => {
    const response = await api.get('/api/quiz/list');
    return response.data;
  },
  
  getQuestions: async (endpoint = '/api/quiz') => {
    const response = await api.get(endpoint);
    return response.data;
  },
  
  checkAnswer: async (id, userAnswer) => {
    const response = await api.post('/api/quiz/check', { id, userAnswer });
    return response.data;
  },
};

// Leaderboard API
export const leaderboardAPI = {
  submitScore: async (scoreData) => {
    const response = await api.post('/api/leaderboard/submit-score', scoreData);
    return response.data;
  },
  
  getLeaderboard: async () => {
    const response = await api.get('/api/leaderboard');
    return response.data;
  },
};

export default api;
