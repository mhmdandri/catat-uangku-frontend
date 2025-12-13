import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

type RetryableConfig = AxiosRequestConfig & { __isRetry?: boolean };
type RequestConfig = Omit<RetryableConfig, "url" | "method" | "data">;

let refreshPromise: Promise<void> | null = null;
const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh")
      .then(() => {})
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;
    const config = error.config as RetryableConfig | undefined;
    const isRefreshCall = config?.url?.includes("/auth/refresh");

    if (status === 401 && config && !config.__isRetry && !isRefreshCall) {
      config.__isRetry = true;
      try {
        await refreshAccessToken();
        return api.request(config);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
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
