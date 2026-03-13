import React, { useState, useEffect, useRef } from "react";
import { ComponentConfig, usePuck } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import OrderFormUI from "@/ui-package/OrderForm";
import { FiChevronDown, FiSearch, FiCheck } from "react-icons/fi";

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

// Helper to render product image safely
const renderProductImage = (p: any, className: string) => {
  const imgSrc = p.image || p.thumbnail_image || p.thumbnail || p.thumbnail_url || (productImage as any).src;
  return (
    <img
      src={imgSrc}
      alt={getLocalizedString(p.name || p.title || "Product")}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = (productImage as any).src;
      }}
    />
  );
};

const ProductSelector = ({ value, onChange, id }: any) => {
  const { appState } = usePuck();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        console.warn("Puck products fetch failed:", err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [baseUrl, apiKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedProduct = products.find(p => String(p.id) === String(value));
  const filteredProducts = products.filter(p => {
    const name = getLocalizedString(p.name || p.title || `Product ${p.id}`);
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || String(p.id).includes(searchTerm);
  });

  return (
    <div className="flex flex-col gap-2 relative z-50">
      {loading ? (
        <span className="text-sm text-gray-500">Loading products...</span>
      ) : (
        <div className="relative" ref={dropdownRef}>
          {/* Dropdown Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-gray-400"
          >
            {selectedProduct ? (
              <div className="flex items-center gap-3 overflow-hidden">
                {renderProductImage(selectedProduct, "w-8 h-8 rounded-md object-cover flex-shrink-0 border border-gray-100")}
                <span className="text-sm font-medium text-gray-700 truncate">
                  {getLocalizedString(selectedProduct.name || selectedProduct.title || `Product ${selectedProduct.id}`)}
                </span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Select a product...</span>
            )}
            <FiChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-[100] transform opacity-100 scale-100 transition-all duration-200">
              {/* Search Field */}
              <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Options List */}
              <div className="max-h-64 overflow-y-auto w-full p-2 space-y-1 custom-scrollbar">
                {filteredProducts.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-500">
                    No products found matching "{searchTerm}"
                  </div>
                ) : (
                  filteredProducts.map((p) => {
                    const displayName = getLocalizedString(p.name || p.title || `Product ${p.id}`);
                    const isSelected = String(p.id) === String(value);

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          onChange(String(p.id));
                          setIsOpen(false);
                          setSearchTerm("");
                        }}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors w-full ${isSelected
                          ? "bg-blue-50 border border-blue-100"
                          : "hover:bg-gray-100 border border-transparent"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {renderProductImage(p, "w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm border border-gray-100 bg-gray-50")}
                          <div className="flex flex-col">
                            <span className={`text-sm font-medium truncate max-w-[180px] ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                              {displayName}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">ID: {p.id}</span>
                          </div>
                        </div>
                        {isSelected && <FiCheck className="w-5 h-5 text-blue-600 mr-2" />}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
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
    maxVariantsToShow: { type: "number", label: "MAX VARIANTS TO SHOW" },
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
    privacyPolicyUrl: { type: "text", label: "PRIVACY POLICY URL" },
    primaryColor: { type: "text", label: "PRIMARY COLOR" },
    textColor: { type: "text", label: "TEXT COLOR" },
    backgroundColor: { type: "text", label: "BACKGROUND COLOR" },
  },
  defaultProps: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    productId: process.env.NEXT_PUBLIC_PRODUCT_ID || "3",
    maxVariantsToShow: 2,
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
    privacyPolicyUrl: "/privacy-policy",
    primaryColor: "#F36621",
    textColor: "#27272a",
    backgroundColor: "#f3e8ff",
  },
  render: (props) => <OrderFormUI {...props} />,
};
