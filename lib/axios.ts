import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let accessToken: string | null = null;

export const initAuth = async () => {
  try {
    const res = await api.post<{ access_token: string }>("/auth/refresh");
    accessToken = res.data.access_token;
  } catch {
    accessToken = null;
  }
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      if (!refreshPromise) {
        refreshPromise = api
          .post<{ access_token: string }>("/auth/refresh")
          .then((res) => {
            accessToken = res.data.access_token;
          })
          .catch(() => {
            accessToken = null;
            throw error;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      await refreshPromise;
      if (accessToken) {
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${accessToken}`;
      }
      return api(original);
    }
    return Promise.reject(error);
  }
);

type RequestConfig = Omit<AxiosRequestConfig, "url" | "method" | "data">;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    setAccessToken(null);
  }
};

const request = async <TResponse>(config: AxiosRequestConfig) => {
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
