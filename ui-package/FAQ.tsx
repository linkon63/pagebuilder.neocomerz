'use client';

import React, { useState } from 'react';
import { FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQUIProps {
  heading?: string;
  descriptionPart1?: string;
  descriptionPart2?: string;
  descriptionPart3?: string;
  contactLabel?: string;
  contactNumber?: string;
  faqs?: FAQItem[];
  colors?: {
    primary?: string;
    background?: string;
    faqBackground?: string;
  };
}

const WhatsAppButton = ({ phoneNumber, labelText, className = "" }: { phoneNumber: string, labelText: string, className?: string }) => {
  return (
    <a
      href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[16px] transition-colors shadow-lg hover:shadow-xl ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <FaWhatsapp className="w-6 h-6 md:w-8 md:h-8 text-white" />
      <div className="flex flex-col items-start leading-tight">
        <span className="text-xs sm:text-sm font-semibold text-white/90">{labelText}</span>
        <span className="text-base sm:text-lg md:text-xl font-bold text-white tracking-wide">{phoneNumber}</span>
      </div>
    </a>
  );
};

export default function FAQUI({
  heading = 'সাধারণ প্রশ্ন',
  descriptionPart1 = 'আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট! প্রথম যোগাযোগ থেকে শুরু করে চূড়ান্ত ডেলিভারি পর্যন্ত ',
  descriptionPart2 = 'আমরা সর্বোচ্চ মানের সেবা ও পণ্য দেওয়ার চেষ্টা করি,',
  descriptionPart3 = ' যা প্রত্যাশার থেকেও বেশি আনন্দ দেয়।',
  contactLabel = 'যেকোনো প্রয়োজনে',
  contactNumber = '01712508063',
  faqs = [],
  colors = {}
}: FAQUIProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const primaryColor = colors.primary || '#5b21b6';
  const backgroundColor = colors.background || '#ede9fe';
  const faqBackgroundColor = colors.faqBackground || '#f5f5f5';

  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor }}>
      <div className="flex justify-center items-start w-full">
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row justify-start items-center gap-0">
          
          {/* Left Section (Contact Info Card) */}
          <div className="w-full lg:w-[40%] py-10 lg:py-20 flex justify-center lg:justify-start items-start px-4 sm:px-8 z-10">
            <div 
              className="w-full max-w-lg p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] flex flex-col justify-start items-start gap-6 sm:gap-8 shadow-xl"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="w-full flex flex-col justify-center items-start gap-4">
                <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[64px] font-bengali">
                  {heading}
                </h2>
                <p className="w-full text-lg sm:text-xl lg:text-2xl leading-relaxed">
                  <span className="text-white font-normal">
                    {descriptionPart1}
                  </span>
                  <span className="text-amber-200 font-semibold mx-1">
                    {descriptionPart2}
                  </span>
                  <span className="text-white font-normal">
                    {descriptionPart3}
                  </span>
                </p>
              </div>

              {/* WhatsApp Button */}
              <div className="w-full overflow-visible">
                <WhatsAppButton
                  phoneNumber={contactNumber}
                  labelText={contactLabel}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851]"
                />
              </div>
            </div>
          </div>

          {/* Right Section (FAQs) */}
          <div 
            className="flex-1 py-12 lg:py-44 px-6 sm:px-12 lg:pl-32 lg:pr-16 flex flex-col justify-start items-stretch lg:ml-[-100px] z-0"
            style={{ backgroundColor: faqBackgroundColor }}  
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="w-full py-5 sm:py-6 border-b border-zinc-300 transition-all duration-300 ease-in-out hover:bg-black/5 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-start gap-4 sm:gap-6 text-left group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex-1 flex flex-col justify-start items-start gap-0 min-w-0">
                      <h3 
                        className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug transition-colors duration-200 break-words font-bengali"
                        style={{ color: isOpen ? primaryColor : '#27272a' }}
                      >
                        {faq.question}
                      </h3>
                      <div
                        id={`faq-answer-${index}`}
                        className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${isOpen
                            ? 'max-h-[500px] opacity-100 mt-4'
                            : 'max-h-0 opacity-0 mt-0'
                          }`}
                      >
                        <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-neutral-700 font-bengali pb-2">
                          {faq.answer}
                        </p>
                      </div>
                    </div>

                    <div 
                      className="mt-1 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center rounded-full transition-colors"
                      style={{ backgroundColor: isOpen ? `${primaryColor}20` : '#e4e4e7' }}
                    >
                      {isOpen ? (
                        <FaMinus className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: primaryColor }} />
                      ) : (
                        <FaPlus className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-900" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
