import React from "react";
import Image from "next/image";
import { HeroProps } from "./types";
import { PrimaryButton } from "./Button";

import logoDefault from "./images/neoComerz-logo.svg";
import bgDefault from "./images/heroBg.jpg";

export default function Hero({
  backgroundImage = bgDefault.src,
  logo = {
    src: logoDefault.src,
    alt: "Logo",
    width: 150,
    height: 50,
  },
  title = "👑 STYLISH & COMFORTABLE",
  titleSize,
  subtitle = "✨ LUXURY SUMMER COLLECTION",
  subtitleSize,
  discountTag = "UP TO 50% OFF",
  discountTagSize,
  cta = {
    text: "SHOP NOW",
    href: "#",
  },
  secondaryCta,
  settings = {
    overlayOpacity: 10,
    overlayColor: "#000000",
    textAlignment: "center",
    contentAlignment: "right",
  },
  theme = {
    primaryColor: "#F36621",
    textColor: "#222F28",
  },
}: HeroProps) {
  const { overlayOpacity = 10, overlayColor = "#000000", textAlignment = "center", contentAlignment = "right" } = settings;
  const { primaryColor = "#F36621", textColor = "#222F28" } = theme;

  const {
    src: finalLogoSrc = logoDefault.src,
    alt: finalLogoAlt = "Logo",
    width: finalLogoWidth = 150,
    height: finalLogoHeight = 50,
  } = logo || {};

  const alignmentClasses = {
    left: "md:justify-start md:items-end",
    center: "md:justify-center md:items-end",
    right: "md:justify-end md:items-end",
  };

  const contentAlignmentClasses = {
    left: "md:ml-[100px] md:mr-auto",
    center: "md:mx-auto",
    right: "md:mr-[180px] md:ml-auto",
  };

  const textAlignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  // Defensive checks for legacy data structures
  const displayTitle = typeof title === 'object' ? (title as any).main : title;
  const displaySubtitle = typeof subtitle === 'object' ? (subtitle as any).subtitle : subtitle;
  const displayDiscount = typeof discountTag === 'object' ? (discountTag as any).discount : discountTag;

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : { backgroundColor: "#f3f4f6" }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: overlayColor,
          opacity: (overlayOpacity || 0) / 100 
        }}
      ></div>

      <div className={`relative z-10 h-full flex items-end justify-center p-4 md:p-0 ${alignmentClasses[contentAlignment]}`}>
        <div 
          className={`w-full max-w-md bg-white/90 backdrop-blur-sm p-8 flex flex-col gap-6 rounded-3xl rounded-t-[400px] md:max-w-none md:rounded-b-none md:w-[640px] md:bg-white/80 md:pt-12 md:pb-16 md:px-12 md:gap-8 md:rounded-t-[400px] lg:w-[720px] lg:px-16 lg:rounded-t-[500px] ${contentAlignmentClasses[contentAlignment]} ${textAlignmentClasses[textAlignment]}`}
        >
          {finalLogoSrc && (
            <Image
              src={finalLogoSrc}
              alt={finalLogoAlt}
              width={finalLogoWidth}
              height={finalLogoHeight}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          )}

          <div className={`self-stretch flex flex-col justify-start ${textAlignmentClasses[textAlignment]}`}>
            <h1 className={textAlignment === 'center' ? 'text-center' : ''}>
              <span
                className="block text-4xl sm:text-5xl font-bold leading-tight md:text-7xl lg:text-8xl md:leading-[1.1] lg:leading-[96px]"
                style={{ color: primaryColor, fontSize: titleSize || undefined }}
              >
                {displayTitle}
              </span>
              <span 
                className="block text-2xl sm:text-3xl font-normal leading-tight mt-1 md:text-6xl md:leading-[1.1] lg:leading-[72px]"
                style={{ color: textColor, fontSize: subtitleSize || undefined }}
              >
                {displaySubtitle}
              </span>
            </h1>
          </div>

          {displayDiscount && (
            <h2 className={textAlignment === 'center' ? 'text-center' : ''}>
              <span 
                className="block text-4xl sm:text-5xl leading-tight mt-1 md:text-7xl lg:text-7xl md:leading-[1.1] lg:leading-[72px]"
                style={{ color: textColor, fontSize: discountTagSize || undefined }}
              >
                {displayDiscount}
              </span>
            </h2>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {cta && (
              <PrimaryButton href={cta.href} icon={cta.icon} style={{ background: primaryColor }}>
                {cta.text}
              </PrimaryButton>
            )}
            
            {secondaryCta?.text && (
              <PrimaryButton 
                href={secondaryCta.href} 
                icon={secondaryCta.icon} 
                variant="secondary"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                {secondaryCta.text}
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
