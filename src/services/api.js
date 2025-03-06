import axios from "axios";

// Create an instance of axios with default configuration
const api = axios.create({
  // Use environment variable for API URL, with fallback for local development
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
  withCredentials: false,
});

// First interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Second interceptor for adding authentication token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, add it to the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
