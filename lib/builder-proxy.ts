import { NextResponse } from "next/server";
import type { BuilderSession } from "./builder-session";

type ProxyOptions = {
  method?: string;
  path: string;
  body?: unknown;
  headers?: HeadersInit;
  requireAuth?: boolean;
};

export async function proxyTenantRequest(session: BuilderSession, options: ProxyOptions) {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (options.requireAuth !== false) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  return fetch(`${session.tenantApiBaseUrl.replace(/\/$/, "")}${options.path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });
}

export async function proxyJsonResponse(response: Response) {
  const payload = await response.json().catch(() => ({
    status: "error",
    message: "Unexpected upstream response.",
  }));

  return NextResponse.json(payload, { status: response.status });
}
