import { useEffect, useState } from "react";
import { useBuilderSession } from "@/components/BuilderSessionProvider";

export type CatalogProduct = Record<string, any>;
type CatalogResult = { key: string; items: CatalogProduct[]; details: Record<string, CatalogProduct>; loading: boolean; error: string };

function asRecord(value: unknown): CatalogProduct {
  return value && typeof value === "object" && !Array.isArray(value) ? value as CatalogProduct : {};
}

function extractItems(value: unknown): CatalogProduct[] {
  if (Array.isArray(value)) return value.filter((item) => Object.keys(asRecord(item)).length > 0).map(asRecord);
  const record = asRecord(value);
  if (Object.keys(record).length === 0) return [];
  const nested = [record.data, record.products, record.items, asRecord(record.data).data, asRecord(record.data).products];
  for (const item of nested) {
    const entries = extractItems(item);
    if (entries.length > 0) return entries;
  }
  return record.id !== undefined ? [record] : [];
}

function extractDetail(value: unknown, id: string): CatalogProduct | undefined {
  const record = asRecord(value);
  const candidates = [record.data, record.product, asRecord(record.data).product, record];
  for (const candidate of candidates) {
    const item = Array.isArray(candidate)
      ? candidate.map(asRecord).find((entry) => String(entry.id) === id) ?? {}
      : asRecord(candidate);
    if (Object.keys(item).length > 0 && String(item.id) === id) return item;
  }
  return undefined;
}

export function useOrderFormCatalog(productIds: Array<string | number> = [], includeCatalog = false) {
  const session = useBuilderSession();
  const [revision, setRevision] = useState(0);
  const idsKey = JSON.stringify(productIds.map(String).filter(Boolean));
  const key = `${session?.tenantApiBaseUrl ?? ""}:${includeCatalog ? "catalog" : ""}:${idsKey}`;
  const [result, setResult] = useState<CatalogResult>({ key: "", items: [], details: {}, loading: true, error: "" });

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      const ids = JSON.parse(idsKey) as string[];
      if (!includeCatalog && ids.length === 0) {
        setResult({ key, items: [], details: {}, loading: false, error: "" });
        return;
      }
      setResult((previous) => ({ key, items: includeCatalog ? previous.items : [], details: {}, loading: true, error: "" }));
      try {
        const catalogResponse = includeCatalog ? await fetch("/api/products?per_page=100", { signal: controller.signal, cache: "no-store", headers: { Accept: "application/json" } }) : undefined;
        const items = catalogResponse?.status === 200 ? extractItems(await catalogResponse.json()) : [];
        const responses = await Promise.all(ids.map(async (id) => {
          const response = await fetch(`/api/products/${encodeURIComponent(id)}`, { signal: controller.signal, cache: "no-store", headers: { Accept: "application/json" } });
          return { id, response, body: await response.json().catch(() => undefined) };
        }));
        const detailEntries: Array<[string, CatalogProduct]> = responses.flatMap(({ id, response, body }) => {
          const detail = response.status === 200 ? extractDetail(body, id) : undefined;
          return detail ? [[id, detail] as [string, CatalogProduct]] : [];
        });
        const details: Record<string, CatalogProduct> = Object.fromEntries(detailEntries);
        const failed = Boolean(catalogResponse && catalogResponse.status !== 200) || responses.some(({ response }) => response.status !== 200);
        if (!controller.signal.aborted) setResult({ key, items, details, loading: false, error: failed ? "Some products could not be loaded. Check the product and retry." : "" });
      } catch {
        if (!controller.signal.aborted) setResult({ key, items: [], details: {}, loading: false, error: "Products could not be loaded. Please retry." });
      }
    };
    void load();
    return () => controller.abort();
  }, [key, idsKey, includeCatalog, revision]);

  const fallback: Omit<CatalogResult, "key"> = { items: [], details: {}, loading: true, error: "" };
  return { ...(result.key === key ? result : fallback), retry: () => setRevision((v) => v + 1) };
}
