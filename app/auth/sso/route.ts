import { NextRequest, NextResponse } from "next/server";
import {
  clearBuilderSessionCookie,
  setBuilderSessionCookie,
  type BuilderSession,
} from "@/lib/builder-session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const tenantBase = request.nextUrl.searchParams.get("tenant_base");

  if (!code || !tenantBase) {
    const response = NextResponse.redirect(
      new URL("/?error=Missing%20page%20builder%20SSO%20parameters.", request.url)
    );
    clearBuilderSessionCookie(response);
    return response;
  }

  try {
    const exchangeResponse = await fetch(
      `${tenantBase.replace(/\/$/, "")}/api/v1/page-builder/session/exchange`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          auth_token: process.env.APP_AUTH_TOKEN ?? "",
        },
        body: JSON.stringify({ code }),
        cache: "no-store",
      }
    );

    const payload = await exchangeResponse.json().catch(() => null);

    if (!exchangeResponse.ok || payload?.status !== "success" || !payload?.data?.token) {
      const message =
        typeof payload?.message === "string" ? payload.message : "Unable to create page builder session.";

      const response = NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(message)}`, request.url)
      );
      clearBuilderSessionCookie(response);
      return response;
    }

    const session: BuilderSession = {
      token: payload.data.token,
      tenantBaseUrl: payload.data.tenantBaseUrl,
      tenantApiBaseUrl: payload.data.tenantApiBaseUrl,
      user: payload.data.user,
      tenant: {
        id: payload.data.tenant.id,
        businessName: payload.data.tenant.business_name,
        logo: payload.data.tenant.logo,
      },
      expiresAt: payload.data.expires_at,
    };

    const response = NextResponse.redirect(new URL("/", request.url));
    setBuilderSessionCookie(response, session);

    return response;
  } catch {
    const response = NextResponse.redirect(
      new URL("/?error=Unable%20to%20reach%20the%20tenant%20API%20for%20page%20builder%20login.", request.url)
    );
    clearBuilderSessionCookie(response);
    return response;
  }
}
