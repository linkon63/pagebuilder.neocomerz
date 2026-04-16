import { NextRequest, NextResponse } from "next/server";
import { getBuilderSessionFromRequest } from "@/lib/builder-session";
import { proxyJsonResponse, proxyTenantRequest } from "@/lib/builder-proxy";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = getBuilderSessionFromRequest(request);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Page builder session not found." },
      { status: 401 }
    );
  }

  const response = await proxyTenantRequest(session, {
    path: "/page-builder/pages",
  });

  return proxyJsonResponse(response);
}

export async function POST(request: NextRequest) {
  const session = getBuilderSessionFromRequest(request);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Page builder session not found." },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { status: "error", message: "Invalid request body." },
      { status: 400 }
    );
  }

  const response = await proxyTenantRequest(session, {
    method: "POST",
    path: "/page-builder/pages",
    body,
  });

  return proxyJsonResponse(response);
}
