'use client';

import React from 'react';
import SectionHeader from './SectionHeader';

export interface TestimonialImageItem {
  src: string;
  alt?: string;
}

export interface TestimonialsUIProps {
  title?: string;
  description?: string | React.ReactNode;
  images?: TestimonialImageItem[];
  initialDisplayCount?: number;
  loadMoreCount?: number;
  loadMoreText?: string;
  loadingText?: string;
  colors?: {
    primary?: string;
    text?: string;
    background?: string;
  };
}

export default function TestimonialsUI({
  title = "গ্রাহকের মতামত",
  description = "আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট! প্রথম যোগাযোগ থেকে শুরু করে চূড়ান্ত ডেলিভারি পর্যন্ত আমরা সর্বোচ্চ মানের সেবা ও পণ্য দেওয়ার চেষ্টা করি, যা প্রত্যাশার থেকেও বেশি আনন্দ দেয়।",
  images = [],
  initialDisplayCount = 8,
  loadMoreCount = 4,
  loadMoreText = "আরো দেখুন",
  loadingText = "লোড হচ্ছে...",
  colors = {}
}: TestimonialsUIProps) {
  const textColor = colors.text || '#27272a';
  const backgroundColor = colors.background || '#f3f4f6';

  return (
    <section className="pt-24 pb-40 relative" style={{ backgroundColor }}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader
          className="text-center"
          titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-[56px] lg:leading-[64px]"
          descriptionClassName="mt-4 max-w-5xl mx-auto text-2xl leading-7"
          title={<span style={{ color: textColor }}>{title}</span>}
          description={<span style={{ color: textColor }}>{description}</span>}
        />
        <div className="mt-16 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((testimonial, index) => (
              <div
                key={`${testimonial.src}-${index}`}
                className="group rounded-lg overflow-hidden relative"
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.alt || `Testimonial screenshot ${index + 1}`}
                  className="w-full h-[500px] rounded-lg group-hover:scale-105 transition-transform duration-300 ease-in-out object-cover object-bottom"
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
