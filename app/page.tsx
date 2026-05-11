import BuilderAppClient from "./BuilderAppClient";
import { getBuilderSession, type BuilderSession } from "@/lib/builder-session";
// ─── Dev bypass ──────────────────────────────────────────────────────────────
const DEV_SESSION: BuilderSession = {
  token: "dev-token",
  tenantBaseUrl: "http://localhost:3000",
  tenantApiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  user: { id: 1, name: "Dev User", email: "dev@neocomerz.com" },
  tenant: { id: "dev", businessName: "NeoComerz (Dev)" },
};
// ─────────────────────────────────────────────────────────────────────────────

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const isDev = process.env.NODE_ENV === "development";
  const session = isDev ? DEV_SESSION : await getBuilderSession();
  const params = await searchParams;

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Page Builder Access</p>
          <h1 className="mt-3 text-3xl font-bold">Open the builder from the Laravel admin panel.</h1>
          <p className="mt-4 text-slate-300">
            This workspace is tenant-authenticated. Direct access is blocked until a valid SSO
            session is created from the authenticated tenant dashboard.
          </p>
          {typeof params.error === "string" ? (
            <p className="mt-4 rounded-xl bg-red-500/10 border border-red-400/20 px-4 py-3 text-sm text-red-200">
              {decodeURIComponent(params.error)}
            </p>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <BuilderAppClient
      session={session}
      previewBaseUrl={
        process.env.NEXT_PUBLIC_LANDING_PAGE_PREVIEW_BASE_URL || "http://localhost:3001"
      }
    />
  );
}
