// src/api.ts
import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

/**
 * 建立 Axios instance，設定 baseURL、timeout 與攔截器
 */
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 5000,
});

// 請求攔截器：自動在 headers 加上 Authorization
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      // 如果 headers 還不存在，就先初始化為一個空的 AxiosRequestHeaders
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      // 直接把「Authorization」欄位加到 headers 中
      (config.headers as any)["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 回應攔截器：統一處理錯誤
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API 呼叫失敗：", error);
    return Promise.reject(error);
  }
);

export default instance;
