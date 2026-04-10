const DEFAULT_HEADERS = {
  Accept: "application/json",
};

function trimTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(value);
}

function getUrlOrigin(value) {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function normalizePath(path) {
  if (!path) {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function getResponseMessage(payload, status) {
  if (!payload) {
    return `Request failed with status ${status}.`;
  }

  if (typeof payload === "string") {
    return payload;
  }

  if (typeof payload === "object") {
    return (
      payload.message ||
      payload.detail ||
      payload.error ||
      payload.title ||
      (Array.isArray(payload.non_field_errors) ? payload.non_field_errors[0] : undefined) ||
      `Request failed with status ${status}.`
    );
  }

  return `Request failed with status ${status}.`;
}

async function readResponseBody(response) {
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

export class ApiError extends Error {
  constructor({ message, status, data, url, method }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.url = url;
    this.method = method;
  }
}

export function getApiBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  return trimTrailingSlash(baseUrl);
}

export function buildApiUrl(path = "") {
  if (isAbsoluteUrl(path)) {
    return path;
  }

  return `${getApiBaseUrl()}${normalizePath(path)}`;
}

function shouldAttachAuthHeader(path, requestUrl, explicitSendAuth) {
  if (explicitSendAuth === true) {
    return true;
  }

  if (explicitSendAuth === false) {
    return false;
  }

  if (!isAbsoluteUrl(path)) {
    return true;
  }

  const apiOrigin = getUrlOrigin(getApiBaseUrl());
  const requestOrigin = getUrlOrigin(requestUrl);

  return Boolean(apiOrigin && requestOrigin && apiOrigin === requestOrigin);
}

function prepareBody(body, headers) {
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
    return body;
  }

  headers.set("Content-Type", "application/json");
  return JSON.stringify(body);
}

export async function apiRequest(path, options = {}) {
  const {
    body,
    headers: providedHeaders,
    method = "GET",
    token,
    accessToken,
    sendAuth,
    ...fetchOptions
  } = options;

  const headers = new Headers(providedHeaders || {});
  for (const [key, value] of Object.entries(DEFAULT_HEADERS)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }

  const requestUrl = buildApiUrl(path);
  const authToken = accessToken ?? token;
  if (authToken && shouldAttachAuthHeader(path, requestUrl, sendAuth)) {
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

export async function fetchJson(path, options = {}) {
  return apiRequest(path, options);
}
