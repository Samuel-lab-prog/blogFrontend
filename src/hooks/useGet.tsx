import { useState, useCallback, useMemo } from "react";
import type { AppError } from "../types";

const BASE_API_URL = import.meta.env.VITE_API_URL;

type UseGetOptions = {
  credentials?: boolean;
  cache?: boolean;
  queryParams?: Record<string, string | number>;
};

export default function useGet<T>(
  path: string,
  options: UseGetOptions = {}
) {
  const {
    credentials = false,
    cache = false,
    queryParams = undefined
  } = options;

  const cacheKey = useMemo(() => {        // I'm using useMemo to avoid recalculating the cache key on every render
    const queryString = queryParams       // It none of the dependencies change, the key remains the same
      ? `?${new URLSearchParams(
        Object.entries(queryParams).map(([k, v]) => [k, String(v)])
      ).toString()}`
      : "";
    return `cache:${path}${queryString}`;
  }, [path, queryParams]);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!data);
  const [error, setError] = useState<AppError | null>(null);

  const get = useCallback(
    async (params?: Record<string, string | number>) => {

      let hasCache = false;

      if (cache) {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setData(JSON.parse(cached) as T);
          hasCache = true;
        }
      }
      
      if (!hasCache) {
        setLoading(true);
      }

      setError(null);

      let url = `${BASE_API_URL}${path}`;
      if (params) {
        const query = new URLSearchParams(
          Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString();
        url += `?${query}`;
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: credentials ? "include" : "same-origin",
        });

        const json = await response.json().catch(() => null);

        if (!response.ok) {
          const errorData: AppError =
            json ?? { errorMessages: ["Unknown error"], statusCode: response.status };
          setError(errorData);
          return;
        }

        setData(json);

        if (cache) {
          localStorage.setItem(cacheKey, JSON.stringify(json));
        }
      } catch {
        const networkError: AppError = {
          errorMessages: ["Network error"],
          statusCode: 500,
        };
        setError(networkError);
      } finally {
        setLoading(false);
      }
    },
    [path, credentials, cache, cacheKey]
  );

  return {
    data,
    loading,
    error,
    get,
  };
}
