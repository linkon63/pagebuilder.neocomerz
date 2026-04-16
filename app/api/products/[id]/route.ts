import { NextRequest, NextResponse } from "next/server";
import { getBuilderSessionFromRequest } from "@/lib/builder-session";
import { proxyJsonResponse, proxyTenantRequest } from "@/lib/builder-proxy";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = getBuilderSessionFromRequest(request);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Page builder session not found." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const response = await proxyTenantRequest(session, {
    path: `/products/${id}`,
    requireAuth: false,
  });

  return proxyJsonResponse(response);
}
