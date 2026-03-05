import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LayeredHeroProps } from "./types";

import layeredHeroMainDefault from './images/hero-2/hero-main.webp';
import layeredHeroOverlayDefault from './images/hero-2/hero-overlay.webp';
import layeredHeroShadowDefault from './images/hero-2/left-shadow.webp';
import layeredHeroLogoDefault from './images/hero-3/Logo.svg';

export default function LayeredHero({
  logo = {
    src: layeredHeroLogoDefault.src,
    alt: "Logo image",
    width: 230,
    height: 60,
  },
  mainImage = layeredHeroMainDefault.src,
  mainImageAlt = "Collection Models",
  overlayImage = layeredHeroOverlayDefault.src,
  overlayImageAlt = "Featured Product",
  shadowImage = layeredHeroShadowDefault.src,
  shadowImageAlt = "Decorative shadow",
  watermarkText = "Shirt",
  titlePrimary = "🌟 এই শীতের",
  titleSecondary = "স্টাইল গেমে আনুন নতুনত্ব",
  description = "শীত এলেই শুরু হয় স্টাইলের নতুন অধ্যায়। এত কম দামে প্রিমিয়াম কোয়ালিটি Sweatshirt and Pant। এই শীতের স্টাইল গেমে আনুন নতুনত্ব। বাজেট ফ্রেন্ডলি প্রাইসে পাচ্ছেন আমাদের এক্সক্লুসিভ প্রিমিয়াম Sweatshirt Collection - যা আপনার লুককে করবে আরো স্টাইলিশ ও আকর্ষনীয়।",
  productName = "Sweat Shirt Set",
  originalPrice = "৳1427",
  discountPrice = "৳999",
  priceSuffix = "only",
  cta = {
    text: "অর্ডার করুন (৩০% ছাড়ে)",
    href: "#order",
  },
  settings = {
    showWatermark: true,
    showShadow: true,
    showPolaroid: true,
    showCtaIcon: true,
  },
  theme = {
    primaryColor: "#FBBF24",
    textColor: "#222F28",
    descriptionColor: "#6B6B6B",
  },
}: LayeredHeroProps) {
  const { showWatermark = true, showShadow = true, showPolaroid = true, showCtaIcon = true } = settings;
  const { primaryColor = "#FBBF24", textColor = "#222F28", descriptionColor = "#6B6B6B" } = theme;

  const {
    src: finalLogoSrc = layeredHeroLogoDefault.src,
    alt: finalLogoAlt = "Logo image",
    width: finalLogoWidth = 230,
    height: finalLogoHeight = 60,
  } = logo || {};

  return (
    <section className="relative w-full flex flex-col-reverse lg:flex-row bg-white px-4 m-0 p-0">

      <div className="hidden xl:block absolute top-8 left-6 lg:left-24 lg:top-6 z-20 mb-20">
        <div className="logo relative w-[230px] h-20">
          {finalLogoSrc && (
            <Image
              src={finalLogoSrc}
              alt={finalLogoAlt}
              fill
              className="object-contain object-left"
            />
          )}
        </div>
      </div>

      {showShadow && shadowImage && (
        <div className="hidden 2xl:block absolute left-0 top-0 z-10">
          <Image
            src={shadowImage}
            alt={shadowImageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="relative w-full lg:w-[60%] flex flex-col xl:mt-10 2xl:pl-[13%] justify-center px-4 sm:px-8 lg:px-24 py-14 overflow-hidden pl-[5%]">

        {showWatermark && watermarkText && (
          <div className="absolute right-46 top-1/2 -translate-y-1/2 translate-x-[35%] pointer-events-none select-none z-0 hidden lg:block">
            <span
              className="font-oswald text-[160px] font-bold text-gray-300/50 tracking-widest uppercase"
              style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
            >
              {watermarkText}
            </span>
          </div>
        )}

        <div className="relative z-10 w-full lg:max-w-xl text-center lg:text-left">
          <div className="self-stretch inline-flex flex-col justify-center items-center lg:items-start lg:justify-start gap-6">

            <div className="z-20 block xl:hidden mb-20 lg:mb-16 relative w-[230px] h-[60px]">
              <div className="logo">
                {finalLogoSrc && (
                  <Image
                    src={finalLogoSrc}
                    alt={finalLogoAlt}
                    width={finalLogoWidth}
                    height={finalLogoHeight}
                    className="h-auto"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            {/* Title Section */}
            <div className="self-stretch justify-start">
              <span
                className="text-3xl sm:text-4xl xl:text-6xl font-bold font-['Hind_Siliguri'] leading-snug lg:leading-[74px]"
                style={{ color: primaryColor }}
              >
                {titlePrimary}
              </span>
              <span
                className="text-3xl sm:text-4xl xl:text-6xl font-bold font-['Hind_Siliguri'] leading-snug xl:leading-[74px]"
                style={{ color: textColor }}
              >
                {" "}{titleSecondary}{" "}
              </span>
            </div>

            <div
              className="self-stretch justify-start text-base sm:text-lg font-medium font-['Hind_Siliguri'] leading-relaxed"
              style={{ color: descriptionColor }}
            >
              {description}
            </div>


            <p
              className='font-bold text-lg lg:text-2xl'
              style={{ color: textColor }}
            >
              {productName} - <span className="text-red-500 text-md lg:text-base line-through">{originalPrice}</span> <span style={{ color: primaryColor }}>{discountPrice}</span> {priceSuffix}
            </p>

          </div>

          {/* Button */}
          <Link
            href={cta?.href || "#order"}
            className="px-6 sm:px-8 mt-8 py-4 inline-flex justify-center items-center gap-2 w-full sm:w-auto cursor-pointer transition-colors"
            style={{ backgroundColor: primaryColor }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {showCtaIcon && (
              <div className="w-6 h-6 relative overflow-hidden">
                <svg
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 5H12C12 3.34315 10.6569 2 9 2C7.3431 2 6 3.34315 6 5ZM4 5C4 2.23858 6.23858 0 9 0C11.7614 0 14 2.23858 14 5H17C17.5523 5 18 5.44772 18 6V20C18 20.5523 17.5523 21 17 21H1C0.44772 21 0 20.5523 0 20V6C0 5.44772 0.44772 5 1 5H4ZM2 7V19H16V7H2ZM6 9C6 10.6569 7.3431 12 9 12C10.6569 12 12 10.6569 12 9H14C14 11.7614 11.7614 14 9 14C6.23858 14 4 11.7614 4 9H6Z"
                    fill="#161616"
                  />
                </svg>
              </div>
            )}
            <div
              className="text-center justify-start text-xl font-semibold font-['Hind_Siliguri'] leading-6"
              style={{ color: textColor }}
            >
              {cta?.text || "অর্ডার করুন (৩০% ছাড়ে)"}
            </div>
          </Link>
        </div>
      </div>

      {/* Right Section (Background Image) */}
      <div className="w-full lg:w-[40%] h-[380px] sm:h-[500px] lg:h-[645px] xl:h-full relative order-first lg:order-0">
        {mainImage && (
          <>
            <Image
              src={mainImage}
              alt={mainImageAlt}
              fill
              className="relative! object-cover w-full h-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
              loading="lazy"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          </>
        )}
      </div>

      {showPolaroid && overlayImage && (
        <div className="hidden 2xl:block absolute top-[65%] lg:top-1/2 left-1/2 lg:left-[60%] transform -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] z-30 w-[280px] sm:w-[320px] lg:w-[380px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform hover:rotate-0 duration-500 ease-out">
          <div className="bg-white p-4 pb-16 lg:p-5 lg:pb-20">
            <div className="w-full h-[350px] lg:h-[450px] overflow-hidden bg-gray-100 relative">
              <Image
                src={overlayImage}
                alt={overlayImageAlt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
