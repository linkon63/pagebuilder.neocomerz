"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AllowedVariant, OrderFormProductConfig } from "neocomerz-storefront-ui";
import { useOrderFormCatalog } from "@/hooks/useOrderFormCatalog";
import { getLocalizedString } from "@/ui-package/OrderFormHelpers";
import { ImageUpload } from "./ImageUpload";

type Props = {
  value?: OrderFormProductConfig[];
  onChange: (products: OrderFormProductConfig[]) => void;
  renderVariants: (product: OrderFormProductConfig, detail: Record<string, any> | undefined, onChange: (variants: AllowedVariant[]) => void) => ReactNode;
};

const imageOf = (product?: Record<string, any>): string => String(product?.image ?? product?.thumbnail_image ?? product?.thumbnail ?? product?.thumbnail_url ?? "");
const nameOf = (product?: Record<string, any>): string => getLocalizedString(product?.name ?? product?.title);
const priceOf = (product?: Record<string, any>): string => String(
  product?.discount_price ??
  product?.discounted_price ??
  product?.current_pricing?.discount_price ??
  product?.current_pricing?.discounted_price ??
  product?.retail_price ??
  product?.current_pricing?.retail_price ??
  product?.unit_price ??
  product?.current_pricing?.unit_price ??
  product?.price ??
  ""
);

export function MultiProductSelector({ value, onChange, renderVariants }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const products = Array.isArray(value) ? value : [];
  const catalog = useOrderFormCatalog(products.map((product) => product.productId), true);
  const selectedIds = new Set(products.map((product) => String(product.productId)));
  const filtered = useMemo(() => catalog.items.filter((product) => `${nameOf(product)} ${product.id}`.toLowerCase().includes(search.toLowerCase())), [catalog.items, search]);
  const configuredProducts = products.map((product, index) => {
    const detail = catalog.details[String(product.productId)];
    return {
      product,
      index,
      detail,
      name: nameOf(detail) || product.productName || `Product ${product.productId}`,
      image: imageOf(detail) || product.productImage || "",
      price: priceOf(detail) || product.productPrice || "",
    };
  });

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const next = products.map((product) => {
      const detail = catalog.details[String(product.productId)];
      if (!detail) return product;
      return {
        ...product,
        productName: product.productName || nameOf(detail),
        productImage: product.productImage || imageOf(detail),
        productPrice: product.productPrice || priceOf(detail),
      };
    });
    const changed = next.some((product, index) => product.productName !== products[index]?.productName || product.productImage !== products[index]?.productImage || product.productPrice !== products[index]?.productPrice);
    if (changed) onChange(next);
  }, [catalog.details, products, onChange]);

  const update = (index: number, patch: Partial<OrderFormProductConfig>) => onChange(products.map((product, current) => current === index ? { ...product, ...patch } : product));
  const toggle = (product: Record<string, any>, checked: boolean) => {
    const id = String(product.id);
    if (!checked) return onChange(products.filter((item) => String(item.productId) !== id));
    onChange([...products, { productId: id, productName: nameOf(product), productImage: imageOf(product), productPrice: priceOf(product) }]);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">Select products for this form. Customers choose products on the landing page.</p>
      <div ref={dropdownRef} className="relative">
        <button type="button" onClick={() => setOpen((open) => !open)} className="flex w-full items-center justify-between rounded-lg border bg-white p-3 text-left text-sm"><span>{products.length > 0 ? `${products.length} product${products.length === 1 ? "" : "s"} selected` : "Select products…"}</span><span aria-hidden="true">⌄</span></button>
        {isOpen ? <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-xl">
          <input aria-label="Search products" placeholder="Search products…" value={search} onChange={(event) => setSearch(event.target.value)} className="m-3 w-[calc(100%-1.5rem)] rounded-lg border p-2 text-sm" />
          {catalog.loading ? <p className="p-3 text-xs">Loading products…</p> : catalog.error && catalog.items.length === 0 ? <p role="alert" className="p-3 text-xs text-red-700">{catalog.error} <button type="button" onClick={catalog.retry} className="underline">Retry</button></p> : <div className="max-h-64 overflow-auto divide-y">{filtered.length > 0 ? filtered.map((product, index) => <label key={`catalog-${product.id}-${index}`} className="flex cursor-pointer items-center gap-3 p-3 text-sm hover:bg-slate-50"><input type="checkbox" checked={selectedIds.has(String(product.id))} onChange={(event) => toggle(product, event.target.checked)} />{imageOf(product) ? <img src={imageOf(product)} alt="" className="h-10 w-10 rounded object-cover" /> : <span className="h-10 w-10 rounded bg-slate-100" />}<span className="min-w-0 flex-1"><span className="block truncate font-medium">{nameOf(product) || `Product ${product.id}`}</span><span className="text-xs text-slate-500">{priceOf(product) ? `৳${priceOf(product)}` : `ID: ${product.id}`}</span></span></label>) : <p className="p-3 text-xs">No matching products.</p>}</div>}
        </div> : <></>}
      </div>
      {catalog.error && catalog.items.length > 0 ? <p role="alert" className="text-xs text-amber-700">{catalog.error} <button type="button" onClick={catalog.retry} className="underline">Retry</button></p> : <></>}
      {configuredProducts.length > 0 ? configuredProducts.map(({ product, index, detail, name, image, price }) => {
        return <details key={`configured-${product.productId}-${index}`} className="rounded-lg border bg-white p-3" open><summary className="cursor-pointer text-sm font-semibold">{image ? <img src={image} alt="" className="mr-2 inline-block h-8 w-8 rounded object-cover" /> : <></>}{name}<span className="ml-2 text-xs font-normal text-slate-500">{price ? `৳${price}` : "Loading price…"}</span></summary><div className="mt-3 space-y-3"><div className="flex gap-3 text-xs"><button type="button" disabled={index === 0} onClick={() => { const next = [...products]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; onChange(next); }} className="underline disabled:opacity-40">Move up</button><button type="button" disabled={index === products.length - 1} onClick={() => { const next = [...products]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; onChange(next); }} className="underline disabled:opacity-40">Move down</button><button type="button" onClick={() => onChange(products.filter((_, current) => current !== index))} className="text-red-700 underline">Remove</button></div>{renderVariants(product, detail, (allowedVariants) => update(index, { allowedVariants }))}<label className="block text-xs">Display name<input value={product.productName ?? ""} onChange={(event) => update(index, { productName: event.target.value })} className="mt-1 w-full rounded border p-2 text-sm" /></label><label className="block text-xs">Fallback price<input value={product.productPrice ?? ""} onChange={(event) => update(index, { productPrice: event.target.value })} className="mt-1 w-full rounded border p-2 text-sm" /></label><div className="text-xs">Fallback image<ImageUpload value={product.productImage ?? ""} onChange={(productImage) => update(index, { productImage })} /></div><label className="block text-xs">Image description<input value={product.productImageAlt ?? ""} onChange={(event) => update(index, { productImageAlt: event.target.value })} className="mt-1 w-full rounded border p-2 text-sm" /></label></div></details>;
      }) : <p className="text-xs text-slate-500">Select at least one product to configure the form.</p>}
    </div>
  );
}
