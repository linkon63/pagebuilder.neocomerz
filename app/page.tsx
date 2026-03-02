"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { Puck, Plugin, usePuck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../puck.config";
import { fetchProducts, type Product } from "@/lib/api";
import { Package, Search, X, Copy, Check } from "lucide-react";

function JSONModal({ data, onClose }: { data: any; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-xl font-bold">Published Page Data</h2>
            <p className="text-sm text-muted-foreground">This JSON contains your landing page configuration and content.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-all active:scale-95"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy JSON"}
            </button>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 bg-slate-950">
          <pre className="text-blue-400 font-mono text-sm leading-relaxed">
            {jsonString}
          </pre>
        </div>
        <div className="p-4 border-t bg-muted/30 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg font-medium hover:bg-background transition-colors">
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
    const id = `product-${product.id}-${Math.random().toString(36).substr(2, 4)}`;
    dispatch({
      type: "insert",
      componentType: "ProductHero",
      destinationIndex: appState.data.content.length,
      props: {
        productId: product.id.toString(),
        name: product.name.en,
        price: product.variants[0]?.current_pricing?.unit_price || "N/A",
        description: product.description.en || "",
        image: product.thumbnail,
        id,
      },
    });
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

const productPlugin: Plugin = {
  overrides: {
    sidebar: ({ children }) => (
      <div className="flex h-full w-full">
        {children}
      </div>
    ),
  },
};

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
        plugins={[
          {
            renderPluginRail: (props) => (
              <>
                {props.children}
                <Puck.PluginRailItem item="products" label="Products" icon={<Package size={20} />} />
              </>
            ),
            renderPluginSidebar: (props) => {
              if (props.selectedItem === "products") {
                return <ProductSidebar />;
              }
              return props.children;
            }
          }
        ]}
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
