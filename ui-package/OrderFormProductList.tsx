import React from 'react';
import { LuShoppingBag } from 'react-icons/lu';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { getLocalizedString, getSizesArray, getVariantDisplayValues, getDynamicSizeLabel } from './OrderFormHelpers';

interface OrderFormProductListProps {
  isLoadingProduct: boolean;
  productData: any;
  variants: any[];
  allowedVariants?: { name: string }[];
  selectedVariantId: string | number;
  setSelectedVariantId: (id: string | number) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (q: number) => void;
  primaryColor: string;
  rawProductName: string;
  productPrice?: string;
  productImage?: string;
  productImageAlt?: string;
  displayProductName: string;
  displayProductPrice: string;
  displayProductImage?: string;
}

export default function OrderFormProductList({
  isLoadingProduct,
  productData,
  variants,
  allowedVariants,
  selectedVariantId,
  setSelectedVariantId,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  primaryColor,
  rawProductName,
  productPrice,
  productImage,
  productImageAlt,
  displayProductName,
  displayProductPrice,
  displayProductImage
}: OrderFormProductListProps) {
  return (
    <div className="flex-1 p-3 lg:p-6 bg-white flex flex-col justify-start items-start gap-4 border-b lg:border-b-0 lg:border-r border-neutral-200">
      <h3 className="text-zinc-800 text-2xl lg:text-3xl font-bold leading-tight">Select Product</h3>

      {isLoadingProduct ? (
        <div className="w-full p-4 text-center text-zinc-500 bg-neutral-50 rounded-xl border border-neutral-200">Loading products...</div>
      ) : productData ? (
        <div className="w-full flex flex-col gap-3">
          {variants.length > 0 ? (
            variants.map((variant: any) => {
              const isSelected = String(variant.id) === String(selectedVariantId);
              
              const { label: vLabel, value: vValue } = getVariantDisplayValues(variant);
              const dName = getLocalizedString(rawProductName);
              
              const vPrice = variant.price ?? variant.current_pricing?.unit_price ?? variant.current_pricing?.retail_price ?? productData?.price ?? productData?.current_pricing?.unit_price ?? productData?.current_pricing?.retail_price;
              const hasPrice = vPrice !== null && vPrice !== undefined && String(vPrice).trim() !== '';
              const dPrice = hasPrice ? (String(vPrice).includes('৳') ? String(vPrice) : `৳${vPrice}`) : (productPrice || "৳1499");
              
              const vImage = variant.image || variant.thumbnail || productData?.image || productData?.thumbnail_image || productData?.thumbnail || productData?.thumbnail_url || productImage;

              let sizes = getSizesArray(variant.sizes || productData?.sizes);
              
              if (allowedVariants && allowedVariants.length > 0) {
                const allowedList = allowedVariants.map(a => (a.name || '').toLowerCase().trim()).filter(Boolean);
                if (allowedList.length > 0) {
                  const sizeLabel = getDynamicSizeLabel(variant, productData).toLowerCase().trim();
                  if (!allowedList.includes(sizeLabel) && !allowedList.includes('default')) {
                    sizes = [];
                  }
                }
              }

              return (
                <div 
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id);
                    const nextSizes = getSizesArray(variant.sizes || productData?.sizes);
                    if (selectedSize && !nextSizes.includes(selectedSize)) {
                      setSelectedSize('');
                    }
                  }}
                  className="p-4 bg-white border rounded-xl flex flex-col gap-4 cursor-pointer transition-all"
                  style={{
                    borderColor: isSelected ? primaryColor : '#e5e5e5',
                    backgroundColor: isSelected ? '#ffffff' : '#ffffff',
                    borderWidth: isSelected ? '2px' : '1px',
                    boxShadow: isSelected ? `0 4px 6px -1px rgba(0, 0, 0, 0.1)` : 'none'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div 
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center p-0.5 transition-all"
                        style={{ borderColor: isSelected ? primaryColor : '#d4d4d8' }}
                      >
                        {isSelected && <div className="w-full h-full rounded-full" style={{ backgroundColor: primaryColor }} />}
                      </div>
                    </div>
                    
                    <div className="flex flex-col flex-1 gap-1">
                      <span className="text-sm lg:text-base font-semibold text-zinc-800 break-words whitespace-normal leading-snug">
                        {dName}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-zinc-500">Price</span>
                        <span className="text-sm lg:text-base font-bold" style={{ color: primaryColor }}>
                          {dPrice}
                        </span>
                      </div>
                      
                      {vValue && (
                        <div 
                          className="inline-block px-2 py-1 bg-white border rounded w-fit mt-1"
                          style={{ borderColor: primaryColor }}
                        >
                          <span className="text-xs font-semibold" style={{ color: primaryColor }}>
                            {vLabel ? `${vLabel}: ` : ''}{vValue}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      {vImage ? (
                        <img src={vImage} alt={productImageAlt || "Product"} className="w-20 h-20 rounded-lg object-cover border border-neutral-100 bg-white" />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center">
                          <LuShoppingBag className="w-6 h-6 text-neutral-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {sizes.length > 0 && (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <span className="text-sm font-bold text-zinc-800">{getDynamicSizeLabel(variant, productData)}:</span>
                      {sizes.map((size: string) => {
                        const isSizeSelected = isSelected && selectedSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVariantId(variant.id);
                              setSelectedSize(size);
                            }}
                            className={`w-9 h-9 flex items-center justify-center rounded border text-xs font-bold transition-all ${
                              isSizeSelected ? 'border-blue-600 text-blue-600' : 'border-neutral-200 text-zinc-600 hover:border-neutral-400'
                            }`}
                            style={isSizeSelected ? { borderColor: primaryColor, color: primaryColor, backgroundColor: `${primaryColor}10` } : {}}
                          >
                            {size}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            // Single product with no variants
            <div 
              className="p-4 bg-white border rounded-xl flex flex-col gap-4 transition-all"
              style={{
                borderColor: primaryColor,
                backgroundColor: '#ffffff',
                borderWidth: '2px',
                boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div 
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center p-0.5 transition-all"
                    style={{ borderColor: primaryColor }}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: primaryColor }} />
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-1">
                  <span className="text-sm lg:text-base font-semibold text-zinc-800 break-words whitespace-normal leading-snug">
                    {displayProductName}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-zinc-500">Price</span>
                    <span className="text-sm lg:text-base font-bold" style={{ color: primaryColor }}>
                      {displayProductPrice}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 ml-2">
                  {displayProductImage ? (
                    <img src={displayProductImage} alt={productImageAlt || "Product"} className="w-20 h-20 rounded-lg object-cover border border-neutral-100 bg-white" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center">
                      <LuShoppingBag className="w-6 h-6 text-neutral-400" />
                    </div>
                  )}
                </div>
              </div>

              {(() => {
                let sizes = getSizesArray(productData?.sizes);
                if (allowedVariants && allowedVariants.length > 0) {
                  const allowedList = allowedVariants.map(a => (a.name || '').toLowerCase().trim()).filter(Boolean);
                  if (allowedList.length > 0) {
                    const sizeLabel = getDynamicSizeLabel(null, productData).toLowerCase().trim();
                    if (!allowedList.includes(sizeLabel) && !allowedList.includes('default')) {
                      sizes = [];
                    }
                  }
                }
                
                if (sizes.length === 0) return null;
                
                return (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <span className="text-sm font-bold text-zinc-800">{getDynamicSizeLabel(null, productData)}:</span>
                    {sizes.map((size: string) => {
                    const isSizeSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSize(size);
                        }}
                        className={`w-9 h-9 flex items-center justify-center rounded border text-xs font-bold transition-all ${
                          isSizeSelected ? 'border-blue-600 text-blue-600' : 'border-neutral-200 text-zinc-600 hover:border-neutral-400'
                        }`}
                        style={isSizeSelected ? { borderColor: primaryColor, color: primaryColor, backgroundColor: `${primaryColor}10` } : {}}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
                );
              })()}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full p-4 text-center text-zinc-500 bg-neutral-50 rounded-xl border border-neutral-200">No product selected</div>
      )}

      {/* Product Information */}
      {productData?.description && (
        <p className="w-full mt-2 text-sm text-zinc-600 font-normal leading-relaxed max-h-32 overflow-y-auto custom-scrollbar pr-2 whitespace-pre-wrap">
          {getLocalizedString(productData.description)}
        </p>
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
  );
}
