"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { Puck, Plugin, usePuck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import "../styles/puck-overrides.css";
import { config } from "../puck.config";
import { fetchProducts, type Product } from "@/lib/api";
import { Package, Search, X, Copy, Check } from "lucide-react";

function JSONModal({ data, onClose }: { data: any; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState(data.root.props?.slug || "");
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const jsonString = JSON.stringify(data, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!slug) {
      setStatus({ type: 'error', message: "Please enter a 'Page Slug' before saving." });
      return;
    }

    setSaving(true);
    setStatus(null);

    try {
      // Sync the slug into the data object before saving
      const updatedData = {
        ...data,
        root: {
          ...data.root,
          props: {
            ...data.root.props,
            slug: slug
          }
        }
      };

      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, data: updatedData }),
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || "Failed to save");

      setStatus({ type: 'success', message: `Page successfully saved to MongoDB with slug: /${slug}` });
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || "Failed to save to database." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-xl font-bold">Publish & Save Page</h2>
            <p className="text-sm text-muted-foreground">Define a slug and save your configuration to MongoDB.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 border-b bg-muted/10 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Page Route Slug</label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-background border px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <span className="text-muted-foreground font-medium select-none">/</span>
                <input 
                  placeholder="e.g. black-friday-deal"
                  className="bg-transparent text-sm font-bold outline-none flex-1"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                />
              </div>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50 min-w-[160px] justify-center"
              >
                {saving ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Package size={18} />}
                {saving ? "Saving..." : "Save to MongoDB"}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground italic">Use lowercase letters, numbers, and hyphens only.</p>
          </div>
        </div>

        {status && (
          <div className={`px-6 py-3 border-b text-sm font-medium animate-in slide-in-from-top-2 duration-300 ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {status.message}
          </div>
        )}

        <div className="flex-1 overflow-auto p-6 bg-slate-950">
          <pre className="text-blue-400 font-mono text-sm leading-relaxed">
            {jsonString}
          </pre>
        </div>

        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg font-medium hover:bg-background transition-colors"
          >
            {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy JSON"}
          </button>
          <button onClick={onClose} className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-all active:scale-95">
            Close
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
        root: { props: { title: "Landing Page Builder", slug: "" } },
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
    <div className="h-screen w-screen relative overflow-hidden">
      <Puck
        config={config}
        data={data}
        onChange={setData}
        onPublish={(data) => {
          console.log("Publishing data:", data);
          setPublishData(data);
        }}
      />

      {publishData && (
        <JSONModal 
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
