import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.params = { ...config.params, api_key: process.env.REACT_APP_TMDB_API_KEY };
  return config;
});

export default axiosInstance;
