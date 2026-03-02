import React from 'react';
import { TestimonialsProps } from '../../../ui-package/types';
import SectionHeader from '../ui/SectionHeader';

export default function Testimonials({
  title,
  description,
  testimonials,
  colors = {
    primary: '#F36621',
    text: '#222F28'
  }
}: TestimonialsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="bg-gray-50 py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader
          title={title}
          description={description}
          titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-[56px] lg:leading-[64px]"
          descriptionClassName="max-w-4xl mx-auto mt-6 text-zinc-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900" style={{ color: colors.text }}>
                    {testimonial.name}
                  </div>
                  {testimonial.designation && (
                    <div className="text-sm text-gray-600">
                      {testimonial.designation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
