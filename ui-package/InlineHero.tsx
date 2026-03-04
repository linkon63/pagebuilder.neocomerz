import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InlineHeroProps } from './types';

import inlineHeroBgDefault from './images/hero-3/hero-bg.webp';
import inlineHeroLogoDefault from './images/hero-3/Logo.svg';

export default function InlineHero({
    backgroundImage = inlineHeroBgDefault.src,
    backgroundImageAlt = 'Pakistani Dress Collection Background',
    logoSrc = inlineHeroLogoDefault.src,
    logoAlt = 'NeoComerz Logo',
    logoWidth = 200,
    logoHeight = 60,
    titlePrimary = 'প্রিমিয়াম',
    titleSecondary = 'Pakistani Dress',
    description = 'সেই ডিজাইন—যেটা পরলে আলাদা করে কিছু বলার দরকার পড়ে না. ফ্যাশন-লাভারদের নতুন obsession',
    ctaText = 'এখনই অর্ডার করুন',
    ctaHref = '#order',
    theme = {
        primaryColor: '#27272a',    // zinc-800 equivalent
        secondaryColor: '#5b21b6',  // violet-800 equivalent
        textColor: '#27272a',       // zinc-800 equivalent
    }
}: InlineHeroProps) {
    const { primaryColor, secondaryColor, textColor } = theme;

    return (
        <section className="relative w-full">
            {/* Background Image Container */}
            <div className="image-container absolute inset-0 z-0 h-full w-full">
                {backgroundImage && (
                    <Image
                        src={backgroundImage}
                        alt={backgroundImageAlt}
                        fill
                        className="object-cover object-center hero-bg-mobile"
                        priority
                        quality={90}
                    />
                )}
            </div>

            <div className="relative z-10 container mx-auto max-w-[1440px] flex">
                <div className="w-full max-w-[720px] px-4 sm:px-8 pt-6 sm:pt-12 md:pt-16 pb-12 sm:pb-24 md:pb-32 flex flex-col justify-start items-start gap-6 sm:gap-12 md:gap-16">

                    <div className="flex justify-start items-center mb-12 sm:mb-20 md:mb-32">
                        {logoSrc && (
                            <Image
                                src={logoSrc}
                                alt={logoAlt}
                                width={logoWidth}
                                height={logoHeight}
                                className="h-10 sm:h-14 md:h-16 w-auto hero-logo"
                                priority
                            />
                        )}
                    </div>

                    <div className="self-stretch inline-flex flex-col justify-start items-start gap-8 sm:gap-12 md:gap-16">
                        <div className="self-stretch flex flex-col justify-start items-start">
                            <div
                                className="justify-start text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-bengali leading-[1.2] md:leading-[96px]"
                                style={{ color: primaryColor }}
                            >
                                {titlePrimary}
                            </div>
                            <div
                                className="self-stretch justify-start text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold font-['Li_Ador_Noirrit'] leading-[1.2] md:leading-[72px]"
                                style={{ color: secondaryColor }}
                            >
                                {titleSecondary}
                            </div>
                        </div>
                        <div
                            className="self-stretch justify-start text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-bengali leading-[1.5] md:leading-7"
                            style={{ color: textColor }}
                        >
                            {description}{' '}
                            <br className="hidden sm:block" />{' '}
                        </div>

                        {ctaText && ctaHref && (
                            <Link
                                href={ctaHref}
                                className="px-6 py-3 sm:px-8 sm:py-4 text-white text-base sm:text-lg lg:text-xl font-bold rounded-lg transition-colors shadow-lg"
                                style={{ backgroundColor: secondaryColor }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                            >
                                {ctaText}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
