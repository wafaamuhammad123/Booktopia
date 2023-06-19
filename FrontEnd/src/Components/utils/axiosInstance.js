import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Set your API base URL here
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from storage
    if (token) {
      config.headers['authorization'] = `${token}`; // Add the token to the request headers
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
