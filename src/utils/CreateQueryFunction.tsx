/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { AppError } from "../types";

export type FetchHttpOptions<TParams, TBody> = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: TParams;
  body?: TBody;
  credentials?: RequestCredentials;
  signal?: AbortSignal;
  headers?: HeadersInit;
};


export default async function fetchHttp<
  TResponse,
  TParams extends Record<string, string | number | undefined> = {},
  TBody = unknown
>({
  path,
  method = "GET",
  params,
  body,
  credentials = "same-origin",
  signal,
  headers,
}: FetchHttpOptions<TParams, TBody>): Promise<TResponse> {
  const baseUrl = import.meta.env.VITE_API_URL;

  const query = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  const url = query ? `${baseUrl}${path}?${query}` : `${baseUrl}${path}`;

  const response = await fetch(url, {
    method,
    credentials,
    signal,
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let parsedBody: unknown = null;

  try {
    parsedBody = await response.json();
  } catch {
    // No JSON body
  }

  if (!response.ok) {
    const error: AppError = {
      statusCode: response.status,
      errorMessages:
        (parsedBody as AppError)?.errorMessages ?? ["Unknown error"],
    };
    throw error;
  }

  return parsedBody as TResponse;
}
