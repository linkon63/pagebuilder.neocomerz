import React from 'react';
import { FeaturesProps } from '../../../ui-package/types';
import { PrimaryButton } from '../ui/Button';
import CheckListItem from '../ui/CheckListItem';
import SectionHeader from '../ui/SectionHeader';

export default function Features({
  title,
  description,
  features,
  images,
  ctaButton,
  tagline,
  colors = {
    primary: '#F36621',
    text: '#222F28',
    background: '#ffffff'
  }
}: FeaturesProps) {
  return (
    <section className="bg-white py-12 md:py-24" style={{ backgroundColor: colors.background }}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 lg:gap-10">
            <SectionHeader
              className="text-left mb-0"
              titleClassName="text-[#222F28] text-3xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-[64px]"
              descriptionClassName="mt-4 text-[#222F28] text-base md:text-xl lg:text-2xl leading-relaxed lg:leading-7 max-w-none mx-0"
              title={title}
              description={description}
            />

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <CheckListItem key={index} iconClassName="w-6 h-6 md:w-7 md:h-7 text-green-500 flex-shrink-0" textClassName="text-[#222F28] text-lg md:text-xl font-semibold leading-tight lg:leading-7">
                  {feature.text}
                </CheckListItem>
              ))}
            </ul>

            <div className="rounded-2xl md:rounded-[32px] p-6 md:p-8 self-start w-full md:w-[376px]" style={{ backgroundColor: colors.primary }}>
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 relative">
                <PrimaryButton 
                  href={ctaButton.href} 
                  icon={ctaButton.icon}
                  variant="secondary"
                >
                  {ctaButton.text}
                </PrimaryButton>
              </div>
              <p className="mt-8 text-white text-xl md:text-3xl font-bold leading-tight md:leading-9 max-w-sm">
                {tagline}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-w-1 aspect-h-1 group overflow-hidden rounded-2xl">
                <img 
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 ease-in-out" 
                  src={image.src} 
                  alt={image.alt} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
