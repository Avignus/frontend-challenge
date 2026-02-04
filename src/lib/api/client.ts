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
    // imdbapi.dev returns standard HTTP status codes
    if (response.status >= 400) {
      throw new Error(response.data?.message || `API error: ${response.status}`);
    }
    return response;
  },
  (error) => {
    throw new Error(error.response?.data?.message || error.message || "Network error");
  }
);
