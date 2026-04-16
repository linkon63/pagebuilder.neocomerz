import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

export const BUILDER_SESSION_COOKIE = "page_builder_session";
const BUILDER_SESSION_MAX_AGE = 60 * 60 * 8;

export type BuilderSession = {
  token: string;
  tenantBaseUrl: string;
  tenantApiBaseUrl: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  tenant: {
    id: string;
    businessName: string;
    logo?: string | null;
  };
  expiresAt?: string;
};

export function encodeBuilderSession(session: BuilderSession) {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export function decodeBuilderSession(value?: string | null): BuilderSession | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as BuilderSession;

    if (!parsed?.token || !parsed?.tenantApiBaseUrl || !parsed?.tenantBaseUrl) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function getBuilderSession() {
  const cookieStore = await cookies();

  return decodeBuilderSession(cookieStore.get(BUILDER_SESSION_COOKIE)?.value);
}

export function getBuilderSessionFromRequest(request: NextRequest) {
  return decodeBuilderSession(request.cookies.get(BUILDER_SESSION_COOKIE)?.value);
}

export function setBuilderSessionCookie(response: NextResponse, session: BuilderSession) {
  response.cookies.set(BUILDER_SESSION_COOKIE, encodeBuilderSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: BUILDER_SESSION_MAX_AGE,
  });
}

export function clearBuilderSessionCookie(response: NextResponse) {
  response.cookies.set(BUILDER_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
