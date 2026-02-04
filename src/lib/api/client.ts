import axios from "axios";

const BASE_URL = "https://api.imdbapi.dev/";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", `${response.config.baseURL || ''}${response.config.url || ''}`, response.status);
    // imdbapi.dev returns standard HTTP status codes
    if (response.status >= 400) {
      throw new Error(response.data?.message || `API error: ${response.status}`);
    }
    return response;
  },
  (error) => {
    console.error("❌ API Error:", `${error.config?.baseURL || ''}${error.config?.url || ''}`, error.response?.status);
    throw new Error(error.response?.data?.message || error.message || "Network error");
  }
);

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", `${config.baseURL || ''}${config.url || ''}`, config.params);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);
