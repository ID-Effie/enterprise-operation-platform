import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types/common";

export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
  showError?: boolean;
}

const service = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  (response) => {
    const res = response.data as ApiResponse<unknown>;

    if (res.code !== 0) {
      console.error(res.message || "业务错误");
      return Promise.reject(res);
    }

    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.pathname,
      )}`;
    } else if (status === 500) {
      console.error("服务器错误");
    } else {
      console.error("网络错误或请求失败");
    }

    return Promise.reject(error);
  },
);

export function request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
  return service
    .request<ApiResponse<T>>(config)
    .then((response) => response.data);
}
