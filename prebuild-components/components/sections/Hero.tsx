import React from 'react';
import Image from 'next/image';
import { HeroProps } from '../../../ui-package/types';
import { PrimaryButton } from '../ui/Button';

export default function Hero({
  backgroundImage,
  logo,
  title,
  ctaButton,
  colors = {
    primary: '#F36621',
    text: '#222F28'
  }
}: HeroProps) {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 h-full flex items-end justify-center p-4 md:items-end md:justify-end md:p-0">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 flex flex-col items-center gap-6 rounded-3xl rounded-t-[400px] md:max-w-none md:rounded-b-none md:w-[640px] md:mr-[180px] md:bg-white/80 md:pt-12 md:pb-16 md:px-12 md:gap-8 md:rounded-t-[400px] lg:w-[720px] lg:px-16 lg:rounded-t-[500px]">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />

          <div className="self-stretch flex flex-col justify-start items-center">
            <h1 className="text-center">
              <span className="block text-4xl sm:text-5xl font-bold leading-tight md:text-7xl lg:text-8xl md:leading-[1.1] lg:leading-[96px]" style={{ color: colors.primary }}>
                {title.main}
              </span>
              <span className="block text-[#222F28] text-2xl sm:text-3xl font-normal leading-tight mt-1 md:text-6xl md:leading-[1.1] lg:leading-[72px]">
                {title.subtitle}
              </span>
            </h1>
          </div>

          {title.discount && (
            <h2 className="text-center">
              <span className="block text-[#222F28] text-4xl sm:text-5xl leading-tight mt-1 md:text-7xl lg:text-7xl md:leading-[1.1] lg:leading-[72px]">
                {title.discount}
              </span>
            </h2>
          )}

          <PrimaryButton href={ctaButton.href} icon={ctaButton.icon}>
            {ctaButton.text}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
