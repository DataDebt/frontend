const DEFAULT_HEADERS: Record<string, string> = {
  Accept: "application/json",
};

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function getUrlOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function normalizePath(path: string): string {
  if (!path) {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function getResponseMessage(payload: unknown, status: number): string {
  if (!payload) {
    return `Request failed with status ${status}.`;
  }

  if (typeof payload === "string") {
    return payload;
  }

  if (typeof payload === "object" && payload !== null) {
    const p = payload as Record<string, unknown>;
    return (
      (typeof p.message === "string" ? p.message : undefined) ||
      (typeof p.detail === "string" ? p.detail : undefined) ||
      (typeof p.error === "string" ? p.error : undefined) ||
      (typeof p.title === "string" ? p.title : undefined) ||
      (Array.isArray(p.non_field_errors) && typeof p.non_field_errors[0] === "string"
        ? p.non_field_errors[0]
        : undefined) ||
      `Request failed with status ${status}.`
    );
  }

  return `Request failed with status ${status}.`;
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    const text = await response.text();
    return text.length ? text : null;
  } catch {
    return null;
  }
}

interface ApiErrorParams {
  message: string;
  status: number;
  data: unknown;
  url: string;
  method: string;
}

export class ApiError extends Error {
  status: number;
  data: unknown;
  url: string;
  method: string;

  constructor({ message, status, data, url, method }: ApiErrorParams) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.url = url;
    this.method = method;
  }
}

export function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  return trimTrailingSlash(baseUrl);
}

export function buildApiUrl(path = ""): string {
  if (isAbsoluteUrl(path)) {
    return path;
  }

  return `${getApiBaseUrl()}${normalizePath(path)}`;
}

function shouldAttachAuthHeader(
  explicitSendAuth: boolean | undefined,
  requestUrl: string
): boolean {
  if (explicitSendAuth === false) {
    return false;
  }

  if (!isAbsoluteUrl(requestUrl) || explicitSendAuth === true) {
    return true;
  }

  const apiOrigin = getUrlOrigin(getApiBaseUrl());
  const requestOrigin = getUrlOrigin(requestUrl);

  return Boolean(apiOrigin && requestOrigin && apiOrigin === requestOrigin);
}

function prepareBody(
  body: unknown,
  headers: Headers
): BodyInit | undefined {
  if (body == null) {
    return undefined;
  }

  if (
    typeof body === "string" ||
    body instanceof FormData ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body)
  ) {
    return body as BodyInit;
  }

  headers.set("Content-Type", "application/json");
  return JSON.stringify(body);
}

export interface ApiRequestOptions extends Omit<RequestInit, "body" | "method" | "headers"> {
  body?: unknown;
  headers?: HeadersInit;
  method?: string;
  token?: string;
  accessToken?: string;
  sendAuth?: boolean;
}

export async function apiRequest(path: string, options: ApiRequestOptions = {}): Promise<unknown> {
  const {
    body,
    headers: providedHeaders,
    method = "GET",
    token,
    accessToken,
    sendAuth,
    ...fetchOptions
  } = options;

  const headers = new Headers(providedHeaders as HeadersInit | undefined);
  for (const [key, value] of Object.entries(DEFAULT_HEADERS)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }

  const requestUrl = buildApiUrl(path);
  const authToken = accessToken ?? token;
  if (authToken && shouldAttachAuthHeader(sendAuth, requestUrl)) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  const requestBody = prepareBody(body, headers);
  const response = await fetch(requestUrl, {
    ...fetchOptions,
    method,
    headers,
    body: requestBody,
  });

  const data = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiError({
      message: getResponseMessage(data, response.status),
      status: response.status,
      data,
      url: response.url || requestUrl,
      method,
    });
  }

  return data;
}

export async function fetchJson(path: string, options: ApiRequestOptions = {}): Promise<unknown> {
  return apiRequest(path, options);
}
