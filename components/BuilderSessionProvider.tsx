"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { BuilderSession } from "@/lib/builder-session";

const BuilderSessionContext = createContext<BuilderSession | null>(null);

export function BuilderSessionProvider({
  session,
  children,
}: {
  session: BuilderSession;
  children: ReactNode;
}) {
  return (
    <BuilderSessionContext.Provider value={session}>
      {children}
    </BuilderSessionContext.Provider>
  );
}

export function useBuilderSession() {
  return useContext(BuilderSessionContext);
}
