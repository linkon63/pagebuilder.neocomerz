import React from 'react';
import { LuShoppingBag } from 'react-icons/lu';
import CheckListItem from './CheckListItem';
import SectionHeader from './SectionHeader';
import Helpline from './Helpline';
import { FeaturesProps } from './types';

import feature1Default from './images/feature-1/feature-1.webp';
import feature2Default from './images/feature-1/feature-2.webp';
import feature3Default from './images/feature-1/feature-3.webp';
import feature4Default from './images/feature-1/feature-4.webp';

const defaultImages = [
    { src: feature1Default.src, alt: 'Model in a yellow traditional dress' },
    { src: feature2Default.src, alt: 'Model in a pink traditional dress' },
    { src: feature3Default.src, alt: 'Model in a green traditional dress' },
    { src: feature4Default.src, alt: 'Back view of a model in a green traditional dress' },
];

export default function Features({
    title,
    description,
    features = [],
    images = defaultImages,
    ctaButton = {
        text: "এখনই অর্ডার করুন",
        href: "#order-form"
    },
    tagline = "এটা শুধু একটা ড্রেস না—এটা এখনকার ফ্যাশন ট্রেন্ডের অংশ।",
    colors = {
        primary: '#F36621',
        text: '#222F28',
        background: '#ffffff'
    }
}: FeaturesProps) {
    const { primary = '#F36621', text = '#222F28', background = '#ffffff' } = colors;
    const defaultTagline = "এটা শুধু একটা ড্রেস না—এটা এখনকার ফ্যাশন ট্রেন্ডের অংশ।";

    // Default content with highlights
    const defaultTitle = <>কেন এটা <span style={{ color: primary }}>আলাদা করে</span> নজর কাড়ে</>;
    const defaultDescription = <>শুধু সুন্দর নয়, আরামদায়কও। আমাদের প্রিমিয়াম কোয়ালিটির Quality Panjabi সেট <span className="font-semibold" style={{ color: primary }}>আপনাকে দেবে এক অনন্য অভিজ্ঞতা।</span> প্রতিটি স্টিচে রয়েছে আমাদের নিখুঁত কারুকার্য।</>;

    const displayTitle = title === "কেন এটা আলাদা করে নজর কাড়ে" ? defaultTitle : title;
    const displayDescription = description === "শুধু সুন্দর নয়, আরামদায়কও। আমাদের প্রিমিয়াম কোয়ালিটির Quality Panjabi সেট আপনাকে দেবে এক অনন্য অভিজ্ঞতা। প্রতিটি স্টিচে রয়েছে আমাদের নিখুঁত কারুকার্য।" ? defaultDescription : description;
    const displayTagline = typeof tagline === 'string' && tagline.trim().length > 0 ? tagline : defaultTagline;

    return (
        <section className="bg-white py-12 md:py-24" style={{ backgroundColor: background }}>
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="flex flex-col gap-6 lg:gap-10">
                        <SectionHeader
                            className="text-left mb-0"
                            titleClassName="text-[#222F28] text-3xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-[64px]"
                            descriptionClassName="mt-4 text-[#222F28] text-base md:text-xl lg:text-2xl leading-relaxed lg:leading-7 max-w-none mx-0"
                            title={displayTitle}
                            description={displayDescription}
                        />

                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <CheckListItem
                                    key={index}
                                    iconClassName="w-6 h-6 md:w-7 md:h-7 text-green-500 flex-shrink-0"
                                    textClassName="text-[#222F28] text-lg md:text-xl font-semibold leading-tight lg:leading-7"
                                >
                                    {feature.text}
                                </CheckListItem>
                            ))}
                        </ul>

                        <div className="rounded-2xl md:rounded-[32px] p-6 md:p-8 self-start w-full md:w-[376px]" style={{ backgroundColor: primary }}>
                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 relative">
                                <a
                                    href={ctaButton.href}
                                    className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 bg-white rounded-xl sm:rounded-2xl inline-flex justify-center items-center gap-1.5 sm:gap-2 hover:bg-gray-50 active:scale-95 transition-all w-full md:w-auto z-10"
                                >
                                    <LuShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ color: primary }} />
                                    <div className="justify-start text-lg sm:text-xl md:text-xl font-bold leading-tight sm:leading-8 md:leading-10" style={{ color: primary }}>
                                        {ctaButton.text}
                                    </div>
                                </a>
                                <div className="w-full md:w-auto flex justify-center md:block md:absolute md:left-[90%] md:ml-6">
                                    <Helpline />
                                </div>
                            </div>
                            <p className="mt-8 text-white text-xl md:text-3xl font-bold leading-tight md:leading-9 max-w-sm">
                                {displayTagline}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {(images || defaultImages).map((image, index) => (
                            <div key={index} className="relative aspect-w-1 aspect-h-1 group overflow-hidden rounded-2xl">
                                <img
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                    src={image.src}
                                    alt={image.alt || `Feature image ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
