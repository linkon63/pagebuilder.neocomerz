import { NextRequest, NextResponse } from "next/server";
import { getBuilderSessionFromRequest } from "@/lib/builder-session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = getBuilderSessionFromRequest(request);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "Page builder session not found." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: "success",
    data: {
      user: session.user,
      tenant: session.tenant,
      tenantBaseUrl: session.tenantBaseUrl,
      tenantApiBaseUrl: session.tenantApiBaseUrl,
      previewBaseUrl:
        process.env.NEXT_PUBLIC_LANDING_PAGE_PREVIEW_BASE_URL || "http://localhost:3001",
      expiresAt: session.expiresAt ?? null,
    },
  });
}
