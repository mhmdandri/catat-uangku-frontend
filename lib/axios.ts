import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

type RetryableConfig = AxiosRequestConfig & { __isRetry?: boolean };
type RequestConfig = Omit<RetryableConfig, "url" | "method" | "data">;

// Removed automatic refresh interceptor to avoid race conditions
// Server-side proxy.ts handles refresh automatically
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;

    // If unauthorized, redirect to login
    if (status === 401) {
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);
const request = async <TResponse>(config: RetryableConfig) => {
  const res = await api.request<TResponse>(config);
  return res.data;
};

export const get = <TResponse>(url: string, config?: RequestConfig) =>
  request<TResponse>({ url, method: "GET", ...config });

export const post = <TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: RequestConfig
) => request<TResponse>({ url, method: "POST", data, ...config });

export const put = <TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: RequestConfig
) => request<TResponse>({ url, method: "PUT", data, ...config });

export const del = <TResponse>(url: string, config?: RequestConfig) =>
  request<TResponse>({ url, method: "DELETE", ...config });
