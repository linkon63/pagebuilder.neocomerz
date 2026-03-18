import React from 'react';
import { LuShoppingBag } from 'react-icons/lu';

interface OrderFormBillingFieldsProps {
  primaryColor: string;
  namePlaceholder?: string;
  phonePlaceholder?: string;
  addressPlaceholder?: string;
  notesPlaceholder?: string;
  cashOnDeliveryText?: string;
  privacyPolicyUrl?: string;
  submitButtonText?: string;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  shippingOptions: any[];
  selectedShipping: string;
  setSelectedShipping: (id: string) => void;
  isSubmitting: boolean;
}

export default function OrderFormBillingFields({
  primaryColor,
  namePlaceholder,
  phonePlaceholder,
  addressPlaceholder,
  notesPlaceholder,
  cashOnDeliveryText,
  privacyPolicyUrl,
  submitButtonText,
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  notes,
  setNotes,
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
  isSubmitting
}: OrderFormBillingFieldsProps) {
  return (
    <div className="flex-1 self-stretch p-4 lg:p-6 bg-neutral-100 flex flex-col justify-start items-start gap-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-black text-2xl lg:text-3xl font-bold leading-tight">Enter Billing Details</h3>
        <p className="text-zinc-800 text-sm lg:text-base leading-5">
          Your personal data will be used to process your order, and for other purposes described in our
          <a
            href={privacyPolicyUrl || "/privacy-policy"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline transition-colors hover:text-blue-500"
          >
            {" "}privacy policy.
          </a>
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
            <fieldset className="w-full" role="radiogroup" aria-label="Shipping options">
              {shippingOptions.map((option, index) => {
                const optionId = option.id || `shipping-${index}`;
                const isSelected = selectedShipping === optionId;

                return (
                  <label
                    key={optionId}
                    className="cursor-pointer py-3 border-b border-neutral-200 flex justify-between items-center transition-all duration-200 hover:bg-violet-200/50 rounded-lg -mx-2 px-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shipping-option"
                        value={optionId}
                        checked={isSelected}
                        onChange={() => setSelectedShipping(optionId)}
                        className="sr-only"
                      />
                      <div
                        className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center p-0.5 transition-all duration-200"
                        style={{
                          borderColor: isSelected ? '#65a30d' : '#e5e5e5'
                        }}
                      >
                        {isSelected && (
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
                  </label>
                );
              })}
            </fieldset>
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
      <div className="self-stretch rounded-2xl overflow-hidden w-full"
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
  );
}
