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

  const perPage = request.nextUrl.searchParams.get("per_page") ?? "100";
  const response = await proxyTenantRequest(session, {
    path: `/products?per_page=${encodeURIComponent(perPage)}`,
    requireAuth: false,
  });

  return proxyJsonResponse(response);
}
