import type { AppErrorType } from '@features/base';

export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions,
  locale: string = 'pt-BR'
): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Data inválida';
  }

  return parsedDate.toLocaleString(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    ...options,
  });
}

export type FetchHttpOptions<TBody> = {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, string | number | boolean | undefined>;
  params?: string[] | number[] | boolean[];
  body?: TBody;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
  headers?: HeadersInit;
};

export async function fetchHttp<TResponse, TBody = undefined>({
  path,
  method = 'GET',
  query,
  params,
  body,
  credentials = 'same-origin',
  signal,
  headers,
}: FetchHttpOptions<TBody>): Promise<TResponse> {
  const baseUrl = import.meta.env.VITE_API_URL;

  const searchParams = query
    ? new URLSearchParams(
        Object.entries(query)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : '';

  const url = `${baseUrl}${path}${params ? `/${params.join('/')}` : ''}${searchParams ? `?${searchParams}` : ''}`;

  const response = await fetch(url, {
    method,
    credentials,
    signal,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get('content-type');
  const hasJson = contentType?.includes('application/json');

  const parsedBody = hasJson ? await response.json() : null;

  if (!response.ok) {
    const error: AppErrorType = {
      statusCode: response.status,
      errorMessages: parsedBody?.errorMessages ?? [
        `Erro HTTP ${response.status}`,
      ],
    };

    throw error;
  }

  return parsedBody as TResponse;
}
