"use client";

import dynamic from "next/dynamic";
import type { BuilderSession } from "@/lib/builder-session";

// Puck generates random IDs client-side — ssr:false prevents
// server/client hydration mismatch.
const BuilderApp = dynamic(() => import("./BuilderApp"), { ssr: false });

export default function BuilderAppClient({
  session,
  previewBaseUrl,
}: {
  session: BuilderSession;
  previewBaseUrl: string;
}) {
  return <BuilderApp session={session} previewBaseUrl={previewBaseUrl} />;
}
