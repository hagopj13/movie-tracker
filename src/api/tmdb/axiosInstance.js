import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.params = { ...config.params, api_key: process.env.REACT_APP_TMDB_API_KEY };
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => Promise.reject(error.response.data),
);

export default axiosInstance;
