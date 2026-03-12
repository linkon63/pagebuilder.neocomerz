import React, { useState, useEffect } from "react";
import { ComponentConfig, usePuck } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import OrderFormUI from "@/ui-package/OrderForm";

import productImage from "@/ui-package/images/products/product2.webp";

// Helper to get selected component props
function getSelectedProps(appState: any) {
  const selector = appState.ui.itemSelector;
  if (!selector) return null;
  let currentArray = appState.data.content;
  if (selector.zone) {
    const zoneContent = appState.data.zones?.[selector.zone];
    if (zoneContent) currentArray = zoneContent;
  }
  return currentArray?.[selector.index]?.props;
}

// Helper for localized strings
const getLocalizedString = (val: any) => {
  if (!val) return "";
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
     return val.en || val.bn || Object.values(val)[0] || "";
  }
  return String(val);
};

const ProductSelector = ({ value, onChange, id }: any) => {
  const { appState } = usePuck();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const props = getSelectedProps(appState);
  
  const baseUrl = props?.apiBaseUrl || process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = props?.apiKey;

  useEffect(() => {
    if (!baseUrl) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
        if (apiKey) {
            headers["Authorization"] = `Bearer ${apiKey}`;
        }
        
        const url = `${baseUrl.replace(/\/$/, '')}/products`;
        
        const res = await fetch(url, { headers });
        const data = await res.json();
        
        // Handle common response formats
        const items = Array.isArray(data) ? data : (data.data || data.products || []);
        setProducts(items);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [baseUrl, apiKey]);

  return (
    <div className="flex flex-col gap-2 relative z-50">
      {loading ? (
        <span className="text-sm text-gray-500">Loading products...</span>
      ) : (
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded border-gray-300 text-sm bg-white"
        >
          <option value="">Select a product...</option>
          {products.map((p) => {
            const displayName = getLocalizedString(p.name || p.title || `Product ${p.id}`);
            return (
              <option key={p.id} value={p.id}>
                {displayName} (ID: {p.id})
              </option>
            );
          })}
        </select>
      )}
      <div className="text-xs text-gray-400 mt-1 font-mono">
        Selected Product ID: {value || "None"}
      </div>
    </div>
  );
};

export const OrderForm: ComponentConfig<PuckProps["OrderForm"]> = {
  label: "Order Form Component",
  fields: {
    API_SECTION: {
      type: "custom",
      render: () => <div className="text-xs font-bold text-gray-500 mt-2 mb-1 uppercase">API Configuration</div>,
    },
    apiBaseUrl: { type: "text", label: "API BASE URL" },
    apiKey: { 
      type: "custom", 
      label: "API KEY",
      render: ({ value, onChange }) => (
        <input 
          type="password" 
          value={value || ""} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Secure API Key"
        />
      )
    },
    orderPlacementUrl: { type: "text", label: "ORDER PLACEMENT URL" },
    PRODUCT_SECTION: {
      type: "custom",
      render: () => <div className="text-xs font-bold text-gray-500 mt-4 mb-1 uppercase">Product Selection</div>,
    },
    productId: {
      type: "custom",
      label: "PRODUCT SEARCH/SELECT",
      render: ({ value, onChange, id }) => (
        <ProductSelector value={value} onChange={onChange} id={id} />
      )
    },
    UI_SECTION: {
      type: "custom",
      render: () => <div className="text-xs font-bold text-gray-500 mt-4 mb-1 uppercase">UI Configuration</div>,
    },
    title: { type: "text", label: "TITLE" },
    description: { type: "textarea", label: "DESCRIPTION" },
    submitButtonText: { type: "text", label: "SUBMIT BUTTON TEXT" },
    productImage: {
      type: "custom",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
      label: "PRODUCT IMAGE"
    },
    productImageAlt: { type: "text", label: "PRODUCT IMAGE ALT" },
    productName: { type: "text", label: "PRODUCT NAME" },
    productPrice: { type: "text", label: "PRODUCT PRICE" },
    shippingOptions: {
      type: "array",
      label: "SHIPPING OPTIONS",
      getItemSummary: (item, index) => item.label || `Option ${(index || 0) + 1}`,
      arrayFields: {
        id: { type: "text", label: "ID" },
        label: { type: "text", label: "LABEL" },
        price: { type: "number", label: "PRICE" },
      },
    },
    namePlaceholder: { type: "text", label: "NAME PLACEHOLDER" },
    phonePlaceholder: { type: "text", label: "PHONE PLACEHOLDER" },
    addressPlaceholder: { type: "textarea", label: "ADDRESS PLACEHOLDER" },
    notesPlaceholder: { type: "text", label: "NOTES PLACEHOLDER" },
    cashOnDeliveryText: { type: "text", label: "CASH ON DELIVERY TEXT" },
    primaryColor: { type: "text", label: "PRIMARY COLOR" },
    textColor: { type: "text", label: "TEXT COLOR" },
    backgroundColor: { type: "text", label: "BACKGROUND COLOR" },
  },
  defaultProps: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://pakisthanidress.dev-inventory.softzino.xyz/api/v1",
    productId: process.env.NEXT_PUBLIC_PRODUCT_ID || "3",
    title: "Stock সীমিত – আজই অর্ডার করুন!",
    description: "অর্ডার করতে নীচের ফর্মটি পূরণ করুন এবং অর্ডার করুন বাটনে ক্লিক করুন!",
    submitButtonText: "অর্ডার কনফার্ম করুন",
    productImage: (productImage as any).src,
    productImageAlt: "Premium Quality Panjabi",
    productName: "প্রিমিয়াম Quality Panjabi",
    productPrice: "৳1499",
    shippingOptions: [
      { id: "dhaka_city", label: "ঢাকা শহর", price: 70 },
      { id: "dhaka_suburbs", label: "ঢাকার আশেপাশের এলাকা", price: 100 },
      { id: "outside_dhaka", label: "ঢাকার বাইরে", price: 130 },
    ],
    namePlaceholder: "আপনার নাম",
    phonePlaceholder: "+8801 XXX XXXXXX",
    addressPlaceholder: "আপনার ঠিকানা",
    notesPlaceholder: "লিখুন",
    cashOnDeliveryText: "Cash on delivery. We prioritizing frictionless payments",
    primaryColor: "#F36621",
    textColor: "#27272a",
    backgroundColor: "#f3e8ff",
  },
  render: (props) => <OrderFormUI {...props} />,
};
