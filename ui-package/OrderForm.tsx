import React, { useState } from 'react';
import { LuShoppingBag } from 'react-icons/lu';
import { FiPlus, FiMinus } from 'react-icons/fi';

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
}

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
  colors = {}
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

  const selectedShippingOption = shippingOptions.find(opt => opt.id === selectedShipping) || shippingOptions[0];
  const shippingCharge = selectedShippingOption?.price || 0;
  const productPriceNum = parseInt(productPrice?.replace(/[^\d]/g, '') || '0');
  const subtotal = productPriceNum * quantity;
  const total = subtotal + shippingCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate order submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Order submitted successfully!');
    }, 2000);
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
            {title || "Stock সীমিত – আজই অর্ডার করুন!"}
          </h1>
          {description && (
            <p className="text-center text-lg md:text-xl lg:text-2xl font-normal leading-7 mt-0" style={{ color: textColor }}>
              {description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="self-stretch rounded-2xl grid grid-cols-1 lg:grid-cols-3 overflow-hidden shadow-xl lg:shadow-none bg-white lg:bg-transparent">
          {/* Product Selection */}
          <div className="flex-1 p-3 lg:p-6 bg-white flex flex-col justify-start items-start gap-6 border-b lg:border-b-0 lg:border-r border-neutral-200">
            <h3 className="text-zinc-800 text-2xl lg:text-3xl font-bold leading-tight">Select Products</h3>
            
            {/* Product Card */}
            <div className="self-stretch p-3 rounded-2xl border border-neutral-200 bg-white">
              <div className="flex justify-start items-start gap-4">
                <div className="relative shrink-0">
                  {productImage ? (
                    <img 
                      src={productImage} 
                      alt={productImageAlt || "Product"} 
                      className="w-20 h-20 rounded-xl object-cover border border-neutral-100" 
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-neutral-200 flex items-center justify-center">
                      <span className="text-neutral-500 text-xs">Product Image</span>
                    </div>
                  )}
                  <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center shadow-sm border-lime-600">
                    <div className="w-3 h-3 bg-lime-600 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-zinc-800 text-base lg:text-lg font-bold leading-tight line-clamp-2">
                      {productName || "প্রিমিয়াম Quality Panjabi"}
                    </h4>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs lg:text-sm text-zinc-500">Price</span>
                    <span className="text-lg lg:text-xl font-bold text-zinc-800">{productPrice || "৳1499"}</span>
                  </div>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-zinc-800 font-semibold text-sm lg:text-base">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-zinc-600 hover:bg-neutral-100 transition-all duration-200"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-zinc-800">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-zinc-600 hover:bg-neutral-100 transition-all duration-200"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
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
                    {productName || "প্রিমিয়াম Quality Panjabi"}
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
