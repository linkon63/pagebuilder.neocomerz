"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { Puck, Plugin, usePuck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import "../styles/puck-overrides.css";
import { config } from "../puck.config";
import { fetchProducts, type Product } from "@/lib/api";
import { Package, Search, X, Copy, Check } from "lucide-react";

function SaveModal({ data, onClose }: { data: any; onClose: () => void }) {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const formatSlug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleSave = async () => {
    if (!slug.trim() || !title.trim()) return;
    setSaving(true);
    setResult(null);
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slug.trim(), title: title.trim(), data }),
      });
      const json = await res.json();
      if (json.success) {
        setResult({ success: true, message: `✅ Page saved! Visit: /${slug.trim()}` });
      } else {
        setResult({ success: false, message: `❌ ${json.error}` });
      }
    } catch (err: any) {
      setResult({ success: false, message: `❌ ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Save Page to Database</h2>
            <p className="text-sm text-gray-500 mt-1">Slug দিন — এই slug দিয়ে page visit করা যাবে</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Summer Collection"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 bg-gray-100 border border-r-0 rounded-l-lg text-sm text-gray-500 font-mono">/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(formatSlug(e.target.value))}
                  placeholder="summer-collection"
                  className="flex-1 px-3 py-2 border rounded-r-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
            <div className={`p-3 rounded-lg text-sm font-medium ${result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {result.message}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-white text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !slug.trim() || !title.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : "Save & Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductSidebar() {
  const { appState, dispatch } = usePuck();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.en.toLowerCase().includes(search.toLowerCase()) || 
    p.variants[0]?.sku.toLowerCase().includes(search.toLowerCase())
  );

  const addProduct = (product: Product) => {
    console.warn("ProductHero component is missing. Cannot add product:", product.name.en);
  };

  return (
    <div className="flex flex-col h-full bg-background border-l">
      <div className="p-4 border-b space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Package className="w-4 h-4" /> Product Library
        </h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search products..."
            className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No products found</p>
        ) : (
          filteredProducts.map(product => (
            <div 
              key={product.id}
              onClick={() => addProduct(product)}
              className="group relative flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
            >
              <img src={product.thumbnail} className="w-12 h-12 rounded object-cover border" alt="" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{product.name.en}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{product.variants[0]?.sku}</p>
              </div>
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">ADD</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


function BuilderContent() {
  const [data, setData] = useState<any>({ content: [], root: {} });
  const [loading, setLoading] = useState(true);
  const [publishData, setPublishData] = useState<any>(null);

  useEffect(() => {
    async function initBuilder() {
      setData({
        content: [],
        root: { props: { title: "Landing Page Builder" } },
      });
      setLoading(false);
    }
    initBuilder();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium animate-pulse">Initializing Builder Home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative">
      <Puck
        config={config}
        data={data}
        onPublish={(data) => {
          console.log("Publishing data:", data);
          setPublishData(data);
        }}
      />

      {publishData && (
        <SaveModal 
          data={publishData} 
          onClose={() => setPublishData(null)} 
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Loading builder...</p>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}
