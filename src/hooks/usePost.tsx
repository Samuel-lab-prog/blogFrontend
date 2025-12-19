import { useState, useCallback } from 'react';
import type { AppError } from '../types';

const BASE_API_URL = import.meta.env.VITE_API_URL;

type UsePostOptions = {
  credentials?: boolean;
};

export default function usePost<TRequest, TResponse>(
  path: string,
  options: UsePostOptions = {}
): {
  data: TResponse | null;
  loading: boolean;
  error: AppError | null;
  post: (body: TRequest) => void;
} {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const post = useCallback(
    async (body: TRequest) => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}${path}`, {
          method: 'POST',
          credentials: options.credentials
            ? 'include'
            : 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        let json = null;
        try {
          json = await response.json();
        } catch {
          json = null;
        }

        if (!response.ok) {
          const errorData: AppError = json ?? {
            errorMessages: ['Unknown error'],
            statusCode: response.status,
          };
          setError(errorData);
          setData(null);
        }
        setData(json);
      } catch {
        const networkError: AppError = {
          errorMessages: ['Network error'],
          statusCode: 500,
        };
        setError(networkError);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [path, options.credentials]
  );

  return { data, loading, error, post };
}
