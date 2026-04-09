"use client";

import { useEffect, useState } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import "../styles/puck-overrides.css";
import { config } from "../puck.config";
import { BuilderSessionProvider } from "@/components/BuilderSessionProvider";
import type { BuilderSession } from "@/lib/builder-session";
import { withTenantDefaults, type PuckData } from "@/lib/puck-data";
import { FilePlus2, Loader2, RefreshCw } from "lucide-react";

type PageStatus = "draft" | "published" | "disabled";

type PageSummary = {
  id: number;
  slug: string;
  title: string;
  status: PageStatus;
  published_at?: string | null;
  updated_at?: string | null;
};

type PageDetail = PageSummary & {
  builder_data: PuckData;
};

const createEmptyData = (tenantApiBaseUrl: string) =>
  withTenantDefaults(
    {
      content: [],
      root: { props: { title: "Landing Page Builder" } },
      zones: {},
    },
    tenantApiBaseUrl
  );

const STATUS_OPTIONS: Array<{ value: PageStatus; label: string; description: string }> = [
  {
    value: "draft",
    label: "Draft",
    description: "Save privately and keep it hidden from the public site.",
  },
  {
    value: "published",
    label: "Publish",
    description: "Make this landing page available on the public site.",
  },
  {
    value: "disabled",
    label: "Disable",
    description: "Keep the page saved but unavailable on the public site.",
  },
];

const formatStatusLabel = (status: PageStatus) =>
  STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;

function SaveModal({
  currentPage,
  data,
  previewBaseUrl,
  onClose,
  onSaved,
}: {
  currentPage: PageDetail | null;
  data: PuckData;
  previewBaseUrl: string;
  onClose: () => void;
  onSaved: (page: PageDetail) => Promise<void>;
}) {
  const [slug, setSlug] = useState(currentPage?.slug ?? "");
  const [title, setTitle] = useState(currentPage?.title ?? "");
  const [status, setStatus] = useState<PageStatus>(currentPage?.status ?? "draft");
  const [saving, setSaving] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    setSlug(currentPage?.slug ?? "");
    setTitle(currentPage?.title ?? "");
    setStatus(currentPage?.status ?? "draft");
  }, [currentPage]);

  const formatSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleSave = async () => {
    if (!slug.trim() || !title.trim()) {
      return;
    }

    setSaving(true);
    setResult(null);

    try {
      const endpoint = currentPage ? `/api/pages/${currentPage.id}` : "/api/pages";
      const method = currentPage ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.trim(),
          title: title.trim(),
          status,
          builder_data: data,
        }),
      });

      const json = await response.json().catch(() => null);

      if (!response.ok || json?.status !== "success" || !json?.data) {
        const message =
          typeof json?.message === "string" ? json.message : "Unable to publish this landing page.";
        setResult({ success: false, message });
        return;
      }

      const savedPage = json.data as PageDetail;
      await onSaved(savedPage);
      onClose();

      if (savedPage.status === "published") {
        const previewUrl = `${previewBaseUrl.replace(/\/$/, "")}/lp/${savedPage.slug}`;
        window.location.assign(previewUrl);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to publish this landing page.";
      setResult({ success: false, message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Save Landing Page</h2>
            <p className="text-sm text-gray-500 mt-1">
              Save the current builder data and choose how this page should be exposed.
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            Close
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g., Summer Collection"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 bg-gray-100 border border-r-0 rounded-l-lg text-sm text-gray-500 font-mono">
                  /
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(event) => setSlug(formatSlug(event.target.value))}
                  placeholder="summer-collection"
                  className="flex-1 px-3 py-2 border rounded-r-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="grid gap-2 md:grid-cols-3">
              {STATUS_OPTIONS.map((option) => {
                const isActive = status === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setStatus(option.value)}
                    className={`rounded-xl border p-3 text-left transition ${
                      isActive
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-900">{option.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setShowJson(!showJson)}
              className="w-full px-4 py-2 bg-gray-50 text-left text-xs font-semibold text-gray-600 flex justify-between items-center"
            >
              <span>{showJson ? "Hide JSON Data" : "Show JSON Data"}</span>
              <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded uppercase">Preview</span>
            </button>
            {showJson && (
              <div className="p-4 bg-slate-900 overflow-x-auto max-h-60">
                <pre className="text-emerald-400 font-mono text-[11px] leading-tight">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {result && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
              }`}
            >
              {result.message}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-white text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !slug.trim() || !title.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </>
            ) : (
              status === "published" ? "Save & Publish" : "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BuilderApp({
  session,
  previewBaseUrl,
}: {
  session: BuilderSession;
  previewBaseUrl: string;
}) {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [pagesLoading, setPagesLoading] = useState(true);
  const [pageLoadingId, setPageLoadingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<PageDetail | null>(null);
  const [data, setData] = useState<PuckData>(() => createEmptyData(session.tenantApiBaseUrl));
  const [editorKey, setEditorKey] = useState(`new-${Date.now()}`);
  const [publishData, setPublishData] = useState<PuckData | null>(null);

  const loadPages = async () => {
    setPagesLoading(true);

    try {
      const response = await fetch("/api/pages", { cache: "no-store" });
      const json = await response.json().catch(() => null);

      if (response.ok && json?.status === "success" && Array.isArray(json?.data)) {
        setPages(json.data);
      }
    } finally {
      setPagesLoading(false);
    }
  };

  useEffect(() => {
    void loadPages();
  }, []);

  const handleCreateNew = () => {
    setCurrentPage(null);
    setData(createEmptyData(session.tenantApiBaseUrl));
    setEditorKey(`new-${Date.now()}`);
  };

  const handleOpenPage = async (pageId: number) => {
    setPageLoadingId(pageId);

    try {
      const response = await fetch(`/api/pages/${pageId}`, { cache: "no-store" });
      const json = await response.json().catch(() => null);

      if (!response.ok || json?.status !== "success" || !json?.data) {
        return;
      }

      const page = json.data as PageDetail;
      setCurrentPage(page);
      setData(withTenantDefaults(page.builder_data, session.tenantApiBaseUrl));
      setEditorKey(`page-${page.id}-${page.updated_at ?? Date.now()}`);
    } finally {
      setPageLoadingId(null);
    }
  };

  const handleSaved = async (page: PageDetail) => {
    const normalizedPage = {
      ...page,
      builder_data: withTenantDefaults(page.builder_data, session.tenantApiBaseUrl),
    };

    setCurrentPage(normalizedPage);
    setData(normalizedPage.builder_data);
    setEditorKey(`page-${page.id}-${page.updated_at ?? Date.now()}`);
    await loadPages();
  };

  return (
    <BuilderSessionProvider session={session}>
      <div className="h-screen w-screen bg-slate-100 text-slate-900 flex overflow-hidden">
        <aside className="w-[320px] shrink-0 border-r bg-white flex flex-col">
          <div className="p-5 border-b space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tenant</p>
              <h1 className="text-xl font-bold">{session.tenant.businessName}</h1>
              <p className="text-sm text-slate-500">{session.user.name}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreateNew}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700"
              >
                <FilePlus2 className="h-4 w-4" />
                New Page
              </button>
              <button
                onClick={() => void loadPages()}
                className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                title="Refresh pages"
              >
                <RefreshCw className={`h-4 w-4 ${pagesLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {pagesLoading ? (
              <div className="flex items-center justify-center py-10 text-sm text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading pages...
              </div>
            ) : pages.length === 0 ? (
              <div className="rounded-xl border border-dashed p-6 text-sm text-slate-500 text-center">
                No landing pages created yet.
              </div>
            ) : (
              pages.map((page) => {
                const isActive = currentPage?.id === page.id;

                return (
                  <button
                    key={page.id}
                    onClick={() => void handleOpenPage(page.id)}
                    className={`w-full text-left rounded-xl border px-4 py-3 transition ${
                      isActive
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{page.title}</p>
                        <p className="text-xs text-slate-500 font-mono truncate">/{page.slug}</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Updated {page.updated_at ? new Date(page.updated_at).toLocaleString() : "just now"}
                        </p>
                      </div>
                      {pageLoadingId === page.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                      ) : (
                        <span className="text-[10px] uppercase tracking-wide text-slate-400">
                          {formatStatusLabel(page.status)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <Puck
            key={editorKey}
            config={config}
            data={data as any}
            onPublish={(nextData) => {
              setPublishData(withTenantDefaults(nextData as PuckData, session.tenantApiBaseUrl));
            }}
          />
        </main>

        {publishData && (
          <SaveModal
            currentPage={currentPage}
            data={publishData}
            previewBaseUrl={previewBaseUrl}
            onClose={() => setPublishData(null)}
            onSaved={handleSaved}
          />
        )}
      </div>
    </BuilderSessionProvider>
  );
}
