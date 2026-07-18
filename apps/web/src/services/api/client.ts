const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl: string = BASE_URL, timeout: number = 15000) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
  }

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { timeout = this.defaultTimeout, retries = 2, ...fetchOptions } = options;
    const url = `${this.baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

    // Request Interceptor
    const headers = new Headers(fetchOptions.headers);
    if (!headers.has("Content-Type") && !(fetchOptions.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    // Auth Header Support
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("arena-auth-token");
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    fetchOptions.headers = headers;

    let lastError: Error | ApiError | unknown = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        clearTimeout(id);

        // Response Interceptor
        if (!response.ok) {
          let errorData = null;
          try {
            errorData = await response.json();
          } catch {
            // Fallback if not json
          }
          throw new ApiError(
            errorData?.detail || `HTTP error! Status: ${response.status}`,
            response.status,
            errorData
          );
        }

        const data = await response.json();
        return data as T;
      } catch (err: unknown) {
        clearTimeout(id);
        lastError = err;

        if (err instanceof Error && err.name === "AbortError") {
          lastError = new Error(`Request timed out after ${timeout}ms`);
        }

        // Only retry on network issues or server errors
        const isNetworkOrServerError =
          err instanceof Error &&
          (err.name === "TypeError" || // Fetch network failure
            err.name === "AbortError" ||
            (err instanceof ApiError && err.status >= 500));

        if (!isNetworkOrServerError || attempt === retries) {
          break;
        }

        // Backoff delay before retry
        await new Promise((res) => setTimeout(res, Math.pow(2, attempt) * 1000));
      }
    }

    throw lastError;
  }

  public async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  public async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
