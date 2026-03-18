import React from 'react';

interface OrderFormCartSummaryProps {
  isLoadingProduct: boolean;
  displayProductName: string;
  selectedSize: string;
  quantity: number;
  subtotal: number;
  shippingCharge: number;
  total: number;
}

export default function OrderFormCartSummary({
  isLoadingProduct,
  displayProductName,
  selectedSize,
  quantity,
  subtotal,
  shippingCharge,
  total
}: OrderFormCartSummaryProps) {
  return (
    <div className="flex-1 self-stretch p-4 lg:p-6 bg-neutral-50 border-b lg:border-b-0 lg:border-r border-violet-200 flex flex-col justify-start items-start gap-6">
      <h3 className="text-zinc-800 text-2xl lg:text-3xl font-bold leading-tight">Your Cart</h3>

      <div className="self-stretch flex flex-col justify-start items-start gap-1 w-full">
        <span className="text-zinc-800 text-lg lg:text-xl font-semibold leading-6">Product</span>
        <div className="self-stretch p-4 bg-white rounded-2xl border border-neutral-200 flex justify-between items-end gap-4">
          <div className="flex flex-col items-start">
            <h4 className="text-zinc-800 text-lg lg:text-xl font-semibold leading-6">
              {isLoadingProduct ? "Loading..." : displayProductName}
            </h4>
            {selectedSize && (
              <span className="text-sm text-zinc-500 mt-1 font-medium bg-neutral-100 px-2 py-0.5 rounded">Size: {selectedSize}</span>
            )}
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
  );
}
