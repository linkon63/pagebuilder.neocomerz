import React from 'react';
import { SectionHeaderProps } from './types';

export default function SectionHeader({
    title,
    description,
    className = "text-center mb-16",
    titleClassName = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-[56px] lg:leading-[64px]",
    descriptionClassName = "max-w-4xl mx-auto mt-6 text-zinc-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
}: SectionHeaderProps) {
    return (
        <div className={className}>
            <h2 className={titleClassName}>{title}</h2>
            {description && <p className={descriptionClassName}>{description}</p>}
        </div>
    );
}
