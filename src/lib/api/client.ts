import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // OMDb returns 200 even for errors, check Response field
    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Unknown API error");
    }
    return response;
  },
  (error) => {
    throw new Error(error.message || "Network error");
  }
);
