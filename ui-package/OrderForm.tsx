import React, { useState, useEffect, useRef } from 'react';
import { LuShoppingBag } from 'react-icons/lu';
import { FiPlus, FiMinus, FiChevronDown, FiSearch, FiCheck } from 'react-icons/fi';

interface OrderFormUIProps {
  title?: string;
  description?: string;
  submitButtonText?: string;
  productImage?: string;
  productImageAlt?: string;
  productName?: string;
  productPrice?: string;
  shippingOptions?: Array<{
    id?: string;
    label?: string;
    price?: number;
  }>;
  namePlaceholder?: string;
  phonePlaceholder?: string;
  addressPlaceholder?: string;
  notesPlaceholder?: string;
  cashOnDeliveryText?: string;
  colors?: {
    primary?: string;
    text?: string;
    background?: string;
  };
  apiBaseUrl?: string;
  apiKey?: string;
  productId?: string | number;
  orderPlacementUrl?: string;
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

const OrderFormUI: React.FC<OrderFormUIProps> = ({
  title,
  description,
  submitButtonText,
  productImage,
  productImageAlt,
  productName,
  productPrice,
  shippingOptions = [],
  namePlaceholder,
  phonePlaceholder,
  addressPlaceholder,
  notesPlaceholder,
  cashOnDeliveryText,
  colors = {},
  apiBaseUrl,
  apiKey,
  productId,
  orderPlacementUrl
}) => {
  const primaryColor = colors.primary || '#F36621';
  const textColor = colors.text || '#27272a';
  const backgroundColor = colors.background || '#f3e8ff';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]?.id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | number>(productId || '');
  const [selectedVariantId, setSelectedVariantId] = useState<string | number>('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      // Allow API to return products without `productId` as well 
      setIsLoadingProduct(true);
      try {
        const baseUrl = apiBaseUrl || process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!baseUrl) return;
        const headers: Record<string, string> = {
          "Accept": "application/json"
        };
        if (apiKey) {
          headers["Authorization"] = `Bearer ${apiKey}`;
        }

        // Fetch all products for selection
        const url = `${baseUrl.replace(/\/$/, '')}/products`;
        const res = await fetch(url, { headers });
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.data || data.products || []);
        setAllProducts(items);

        if (productId && items.length > 0) {
          setSelectedProductId(productId);
        } else if (items.length > 0 && !selectedProductId) {
          setSelectedProductId(items[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    // Call only once, or if api details change
    fetchProducts();
  }, [apiBaseUrl, apiKey, productId]);

  useEffect(() => {
    const currentProduct = allProducts.find(p => String(p.id) === String(selectedProductId)) || allProducts[0];
    const currentVariants = currentProduct?.variants || currentProduct?.attributes || [];
    if (currentVariants.length > 0) {
      if (!currentVariants.find((v: any) => String(v.id) === String(selectedVariantId))) {
        setSelectedVariantId(currentVariants[0].id);
      }
    } else {
      setSelectedVariantId('');
    }
  }, [selectedProductId, allProducts, selectedVariantId]);

  const filteredProducts = allProducts.filter(p => {
    const name = getLocalizedString(p.name || p.title || `Product ${p.id}`);
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || String(p.id).includes(searchTerm);
  });

  const productData = allProducts.find(p => String(p.id) === String(selectedProductId)) || allProducts[0];
  const variants = productData?.variants || productData?.attributes || [];
  const selectedVariantData = variants.find((v: any) => String(v.id) === String(selectedVariantId)) || variants[0];

  // Derived variables for display
  const rawTitle = title || "Stock সীমিত – আজই অর্ডার করুন!";
  const rawProductName = productData?.name || productData?.title || productName || "প্রিমিয়াম Quality Panjabi";
  const displayTitle = getLocalizedString(rawTitle);
  
  // Format variant details in name if available
  const variantNameStr = selectedVariantData ? getLocalizedString(selectedVariantData.name || selectedVariantData.title || selectedVariantData.attribute_value || `Variant ${selectedVariantData.id}`) : "";
  const displayProductName = getLocalizedString(rawProductName) + (variantNameStr ? ` - ${variantNameStr}` : "");
  
  const variantPrice = selectedVariantData?.price || selectedVariantData?.current_pricing?.unit_price || selectedVariantData?.current_pricing?.retail_price;
  const basePrice = productData?.price || productData?.current_pricing?.unit_price || productData?.current_pricing?.retail_price;
  const finalPrice = variantPrice || basePrice;
  const displayProductPrice = finalPrice ? (String(finalPrice).includes('৳') ? String(finalPrice) : `৳${finalPrice}`) : (productPrice || "৳1499");
  
  const displayProductImage = selectedVariantData?.image || selectedVariantData?.thumbnail || productData?.image || productData?.thumbnail_image || productData?.thumbnail || productData?.thumbnail_url || productImage;

  const selectedShippingOption = shippingOptions.find(opt => opt.id === selectedShipping) || shippingOptions[0];
  const shippingCharge = selectedShippingOption?.price || 0;
  const productPriceNum = parseInt(displayProductPrice.replace(/[^\d]/g, '') || '0');
  const subtotal = productPriceNum * quantity;
  const total = subtotal + shippingCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Attempt actual submission
    const baseUrl = apiBaseUrl || process.env.NEXT_PUBLIC_API_BASE_URL;
    const submitUrl = orderPlacementUrl || (baseUrl ? `${baseUrl.replace(/\/$/, '')}/orders` : null);

    const payload = {
      product_id: selectedProductId,
      variant_id: selectedVariantId || undefined,
      name,
      phone,
      address,
      notes,
      quantity,
      shipping_id: selectedShipping,
      total_amount: total
    };

    if (submitUrl) {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "Accept": "application/json"
        };
        if (apiKey) {
          headers["Authorization"] = `Bearer ${apiKey}`;
        }

        const res = await fetch(submitUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error("API Submission failed");
        }

        setIsSubmitting(false);
        alert('Order submitted successfully!');
        setName(''); setPhone(''); setAddress(''); setNotes(''); setQuantity(1);
      } catch (err) {
        console.error("Order submission err:", err);
        setIsSubmitting(false);
        alert('Failed to submit via API. (Simulated successful placement due to missing endpoint CORS/Error).');
        setName(''); setPhone(''); setAddress(''); setNotes(''); setQuantity(1);
      }
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Order submitted successfully! (Simulated)');
        setName(''); setPhone(''); setAddress(''); setNotes(''); setQuantity(1);
      }, 2000);
    }
  };

  return (
    <section className="py-24" style={{ backgroundColor }}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-start items-center gap-8 lg:gap-16">
        {/* Section Header */}
        <div className="self-stretch flex flex-col justify-start items-center gap-4 mb-0">
          <h1
            className="text-center text-3xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-[64px]"
            style={{ color: textColor }}
          >
            {displayTitle}
          </h1>
          {description && (
            <p className="text-center text-lg md:text-xl lg:text-2xl font-normal leading-7 mt-0" style={{ color: textColor }}>
              {description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="self-stretch rounded-2xl grid grid-cols-1 lg:grid-cols-3 overflow-hidden shadow-xl lg:shadow-none bg-white lg:bg-transparent">
          {/* Product Selection */}
          <div className="flex-1 p-3 lg:p-6 bg-white flex flex-col justify-start items-start gap-4 border-b lg:border-b-0 lg:border-r border-neutral-200">
            <h3 className="text-zinc-800 text-2xl lg:text-3xl font-bold leading-tight">Select Product</h3>

            {/* Custom Dropdown */}
            <div className="w-full relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-3 bg-white border border-neutral-200 rounded-xl shadow-sm flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:border-transparent transition-all hover:border-neutral-300"
                style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
              >
                {productData ? (
                  <div className="flex items-center gap-3 overflow-hidden">
                    {displayProductImage ? (
                      <img src={displayProductImage} alt={productImageAlt || "Product"} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-neutral-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                        <LuShoppingBag className="w-5 h-5 text-neutral-400" />
                      </div>
                    )}
                    <div className="flex flex-col truncate">
                      <span className="text-sm lg:text-base font-semibold text-zinc-800 truncate">
                        {displayProductName}
                      </span>
                      <span className="text-xs lg:text-sm text-zinc-500 font-medium">
                        {isLoadingProduct ? "..." : displayProductPrice}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-zinc-400 text-base">{isLoadingProduct ? "Loading products..." : "Select a product..."}</span>
                )}
                <FiChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden z-[100] transform opacity-100 scale-100 transition-all duration-200">
                  {/* Search Field */}
                  <div className="p-3 border-b border-neutral-100 bg-neutral-50/50">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm outline-none focus:ring-2 focus:border-transparent transition-all"
                        style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="max-h-64 overflow-y-auto w-full p-2 space-y-1 custom-scrollbar">
                    {filteredProducts.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-neutral-500">
                        No products found matching "{searchTerm}"
                      </div>
                    ) : (
                      filteredProducts.map((p) => {
                        const dName = getLocalizedString(p.name || p.title || `Product ${p.id}`);
                        const bPrice = p.price || p.current_price || p.price_string;
                        const dPrice = bPrice ? (String(bPrice).includes('৳') ? String(bPrice) : `৳${bPrice}`) : "৳1499";
                        const dImage = p.image || p.thumbnail_image || p.thumbnail || p.thumbnail_url || productImage;
                        const isSelected = String(p.id) === String(selectedProductId);

                        return (
                          <div
                            key={p.id}
                            onClick={() => {
                              setSelectedProductId(p.id);
                              setIsDropdownOpen(false);
                              setSearchTerm("");
                            }}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors w-full ${isSelected
                                ? "bg-violet-50 border border-violet-100"
                                : "hover:bg-neutral-50 border border-transparent"
                              }`}
                          >
                            <div className="flex items-center gap-3 w-[85%]">
                              {dImage ? (
                                <img src={dImage} alt="Product" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm border border-neutral-100 bg-neutral-50" />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                                  <LuShoppingBag className="w-5 h-5 text-neutral-400" />
                                </div>
                              )}
                              <div className="flex flex-col min-w-0">
                                <span className={`text-sm font-semibold truncate ${isSelected ? 'text-violet-700' : 'text-zinc-800'}`}>
                                  {dName}
                                </span>
                                <span className="text-xs text-zinc-500 font-medium">{dPrice}</span>
                              </div>
                            </div>
                            {isSelected && <FiCheck className="w-5 h-5 text-violet-600 flex-shrink-0" />}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Product Information */}
            {productData?.description && (
              <div 
                className="w-full mt-2 text-sm text-zinc-600 font-normal leading-relaxed max-h-32 overflow-y-auto custom-scrollbar pr-2"
                dangerouslySetInnerHTML={{ __html: getLocalizedString(productData.description) }}
              />
            )}

            {/* Variant Selector */}
            {variants.length > 0 && (
              <div className="w-full mt-4 flex flex-col gap-3 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
                <span className="text-zinc-800 font-semibold text-sm lg:text-base">Select Variant:</span>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant: any) => {
                    const variantName = getLocalizedString(variant.name || variant.title || variant.attribute_value || variant.sku || `Variant ${variant.id}`);
                    const isSelected = String(variant.id) === String(selectedVariantId || selectedVariantData?.id);
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-violet-100 border-violet-500 text-violet-800 shadow-sm"
                            : "bg-white border-neutral-200 text-zinc-600 hover:border-neutral-300 hover:bg-neutral-50"
                        }`}
                        style={isSelected ? { borderColor: primaryColor, backgroundColor: `${primaryColor}15`, color: primaryColor } : {}}
                      >
                        {variantName}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="w-full mt-2 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
              <span className="text-zinc-800 font-semibold text-sm lg:text-base">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-neutral-100 transition-all duration-200 shadow-sm"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-zinc-800">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-neutral-100 transition-all duration-200 shadow-sm"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="flex-1 self-stretch p-4 lg:p-6 bg-neutral-50 border-b lg:border-b-0 lg:border-r border-violet-200 flex flex-col justify-start items-start gap-6">
            <h3 className="text-zinc-800 text-2xl lg:text-3xl font-bold leading-tight">Your Cart</h3>

            <div className="self-stretch flex flex-col justify-start items-start gap-1 w-full">
              <span className="text-zinc-800 text-lg lg:text-xl font-semibold leading-6">Product</span>
              <div className="self-stretch p-4 bg-white rounded-2xl border border-neutral-200 flex justify-between items-end gap-4">
                <div className="flex flex-col items-start">
                  <h4 className="text-zinc-800 text-lg lg:text-xl font-semibold leading-6">
                    {isLoadingProduct ? "Loading..." : displayProductName}
                  </h4>
                </div>
                <div className="flex items-end gap-4">
                  <span className="text-sm lg:text-base text-zinc-600 font-semibold">Qty: {quantity}</span>
                  <span className="text-zinc-800 text-lg lg:text-xl font-semibold leading-6">
                    ৳{subtotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="self-stretch px-4 flex flex-col justify-start items-start gap-2 w-full">
              <h4 className="text-zinc-800 text-lg lg:text-xl font-semibold leading-6">Summary</h4>
              <div className="self-stretch flex justify-between items-start text-zinc-800 text-base">
                <p>Sub-Total</p><p>৳{subtotal}</p>
              </div>
              <div className="self-stretch flex justify-between items-start text-zinc-800 text-base">
                <p>Shipping Charge</p><p>৳{shippingCharge}</p>
              </div>
              <div className="self-stretch pt-2 mt-2 border-t border-neutral-200 flex justify-between items-start text-zinc-800 text-xl font-semibold">
                <p>Total</p><p>৳{total}</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="flex-1 self-stretch p-4 lg:p-6 bg-neutral-100 flex flex-col justify-start items-start gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-black text-2xl lg:text-3xl font-bold leading-tight">Enter Billing Details</h3>
              <p className="text-zinc-800 text-sm lg:text-base leading-5">
                Your personal data will be used to process your order, and for other purposes described in our
                <span className="text-blue-700 underline transition-colors hover:text-blue-500"> privacy policy.</span>
              </p>
            </div>

            <div className="self-stretch flex flex-col gap-4">
              <div>
                <label className="text-black text-lg lg:text-xl font-semibold leading-6">
                  আপনার নাম <span style={{ color: primaryColor }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder={namePlaceholder || "আপনার নাম"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full p-3 bg-white rounded-lg border text-base lg:text-xl font-semibold text-black placeholder-neutral-400 outline-none focus:ring-2 transition-all duration-200 border-neutral-200 focus:ring-lime-500"
                  required
                />
              </div>

              <div>
                <label className="text-black text-lg lg:text-xl font-semibold leading-6">
                  আপনার মোবাইল নাম্বার <span style={{ color: primaryColor }}>*</span>
                </label>
                <input
                  type="tel"
                  placeholder={phonePlaceholder || "+8801 XXX XXXXXX"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full p-3 bg-white rounded-lg border text-base lg:text-xl font-semibold text-black placeholder-neutral-400 outline-none focus:ring-2 transition-all duration-200 border-neutral-200 focus:ring-lime-500"
                  required
                />
              </div>
            </div>

            <div className="self-stretch flex flex-col gap-4">
              <div>
                <h4 className="text-black text-lg lg:text-xl font-semibold leading-6">
                  শিপিং এরিয়া সিলেক্ট করুন <span style={{ color: primaryColor }}>*</span>
                </h4>
                <div className="mt-1 border-t border-neutral-200">
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedShipping(option.id || '')}
                      className="cursor-pointer py-3 border-b border-neutral-200 flex justify-between items-center transition-all duration-200 hover:bg-violet-200/50 rounded-lg -mx-2 px-2"
                      role="radio"
                      aria-checked={selectedShipping === option.id}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center p-0.5 transition-all duration-200"
                          style={{
                            borderColor: selectedShipping === option.id ? '#65a30d' : '#e5e5e5'
                          }}
                        >
                          {selectedShipping === option.id && (
                            <div className="w-full h-full bg-lime-600 rounded-full" />
                          )}
                        </div>
                        <span className="text-zinc-800 text-base lg:text-xl font-normal leading-6">
                          {option.label}
                        </span>
                      </div>
                      <span className="text-zinc-800 text-base lg:text-xl font-semibold leading-6">
                        ৳ {option.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-black text-lg lg:text-xl font-semibold leading-6">
                  আপনার ঠিকানা <span style={{ color: primaryColor }}>*</span>
                </label>
                <textarea
                  placeholder={addressPlaceholder || "আপনার ঠিকানা"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full p-3 bg-white rounded-lg border h-24 text-base lg:text-xl font-semibold text-black placeholder-neutral-400 outline-none focus:ring-2 transition-all duration-200 resize-none border-neutral-200 focus:ring-lime-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-black text-lg lg:text-xl font-semibold leading-6">
                অর্ডার নোট (যদি থাকে)
              </label>
              <textarea
                placeholder={notesPlaceholder || "লিখুন"}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 w-full text-black p-3 bg-white rounded-lg border border-neutral-200 h-24 text-base lg:text-xl font-semibold placeholder-neutral-400 outline-none focus:ring-2 transition-all duration-200 resize-none focus:ring-lime-500"
              />
            </div>

            {/* Submit Button */}
            <div className="self-stretch rounded-2xl overflow-hidden"
              style={{
                backgroundColor: `${primaryColor}20`,
                border: `2px solid ${primaryColor}`,
                boxShadow: `inset 0 0 0 4px ${primaryColor}20`
              }}>
              <div className="px-3 py-2 text-center text-sm lg:text-base" style={{ color: primaryColor }}>
                {cashOnDeliveryText || "Cash on delivery. We prioritizing frictionless payments"}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-5 py-3 lg:px-7 lg:py-3.5 rounded-t-xl inline-flex justify-center items-center gap-2 transition-all duration-300 hover:opacity-95 hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4"
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 0 4px ${primaryColor}30`
                }}
              >
                <LuShoppingBag className={`w-8 h-8 lg:w-10 lg:h-10 text-white transition-transform ${isSubmitting ? 'animate-pulse' : ''}`} />
                <span className="text-white text-xl lg:text-2xl font-bold leading-tight lg:leading-10">
                  {isSubmitting ? 'Processing...' : (submitButtonText || 'অর্ডার কনফার্ম করুন')}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderFormUI;
