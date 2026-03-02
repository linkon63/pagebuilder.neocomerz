import React from 'react';
import { OrderFormProps } from '../../../ui-package/types';
import { PrimaryButton } from '../ui/Button';

export default function OrderForm({
  title,
  description,
  productInfo,
  colors = {
    primary: '#F36621',
    text: '#222F28'
  }
}: OrderFormProps) {
  return (
    <section className="bg-gray-50 py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>
                {title}
              </h2>
              {description && (
                <p className="text-lg text-gray-600">
                  {description}
                </p>
              )}
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                  {productInfo.name}
                </h3>
                <div className="text-right">
                  {productInfo.discountPrice && (
                    <span className="text-sm text-gray-500 line-through block">
                      ৳{productInfo.price}
                    </span>
                  )}
                  <span className="text-2xl font-bold" style={{ color: colors.primary }}>
                    ৳{productInfo.discountPrice || productInfo.price}
                  </span>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Delivery Address
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Enter your delivery address"
                />
              </div>

              <PrimaryButton type="submit" className="w-full">
                Place Order
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
