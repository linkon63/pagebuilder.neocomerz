import React, { useState } from 'react';
import { FAQProps } from '../../../ui-package/types';
import SectionHeader from '../ui/SectionHeader';

export default function FAQ({
  title,
  description,
  faqs,
  colors = {
    primary: '#F36621',
    text: '#222F28'
  }
}: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader
          title={title}
          description={description}
          titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-[56px] lg:leading-[64px]"
          descriptionClassName="max-w-4xl mx-auto mt-6 text-zinc-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
        />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 md:px-8 md:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg md:text-xl font-semibold pr-4" style={{ color: colors.text }}>
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 transition-transform duration-200 ${
                      openItems.has(faq.id) ? 'rotate-180' : ''
                    }`}
                    style={{ color: colors.primary }}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openItems.has(faq.id) ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4 md:px-8 md:pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
