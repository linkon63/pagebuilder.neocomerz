'use client';

import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
  const primaryColor = colors.primary || '#F36621';
  const textColor = colors.text || '#27272a';
  const backgroundColor = colors.background || '#f3f4f6';

  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [isLoading, setIsLoading] = useState(false);
  const displayedImages = images.slice(0, displayCount);
  const hasMore = displayCount < images.length;

  const handleLoadMore = () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + loadMoreCount, images.length));
      setIsLoading(false);
    }, 300);
  };

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
          {images.length >= 4 ? (
            <div className="w-full pb-12">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="w-full"
              >
                {images.map((testimonial, index) => (
                  <SwiperSlide key={`${testimonial.src}-${index}`}>
                    <div className="group rounded-lg overflow-hidden relative">
                      <img
                        src={testimonial.src}
                        alt={testimonial.alt || `Testimonial screenshot ${index + 1}`}
                        className="w-full h-[500px] rounded-lg group-hover:scale-105 transition-transform duration-300 ease-in-out object-cover object-bottom"
                        loading={index < 4 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {displayedImages.map((testimonial, index) => (
                  <div
                    key={`${testimonial.src}-${index}`}
                    className="relative break-inside-avoid group rounded-lg overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.alt || `Testimonial screenshot ${index + 1}`}
                      className="w-full h-[500px] rounded-lg group-hover:scale-105 transition-transform duration-300 ease-in-out object-cover object-bottom"
                      loading={index < initialDisplayCount ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
              <div 
                className="absolute bottom-0 left-0 right-0 h-26 pointer-events-none" 
                style={{ background: `linear-gradient(to top, ${backgroundColor}, transparent)` }}
              />
            </>
          )}
        </div>
      </div>
      {hasMore && images.length < 4 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-8 py-4 bg-white rounded-full shadow-[0px_0px_100px_rgba(0,0,0,0.14)] text-xl leading-7 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
            style={{ color: textColor }}
            aria-label="Load more testimonials"
          >
            {isLoading ? loadingText : loadMoreText}
          </button>
        </div>
      )}
    </section>
  );
}
