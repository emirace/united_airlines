import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getBackendErrorMessage } from "../utils/error";

export const baseChatURL = "http://localhost:5000";

const apiChat = axios.create({
  baseURL: baseChatURL + "/api",
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiChat.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiChat.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    } else if (error.request) {
      console.error("API No Response:", error.request);
    } else {
      console.error("API Request Error:", error.message);
    }
    return Promise.reject(getBackendErrorMessage(error));
  }
);

export default apiChat;
