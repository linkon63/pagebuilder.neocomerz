import React from "react";

export type PuckProps = {
  Heading: { title: string; level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; color?: string; align?: 'left' | 'center' | 'right' };
  Text: { content: string; color?: string; align?: 'left' | 'center' | 'right'; size?: string };
  Button: { text: string; href: string; variant: 'default' | 'outline'; color?: string };
  Container: { padding?: string; maxWidth?: string };
  Columns: { columns: { children: React.ReactNode }[] };
  Hero: { 
    backgroundImage?: string; 
    logoSrc?: string; logoAlt?: string; logoWidth?: number; logoHeight?: number;
    title?: string; titleSize?: string;
    subtitle?: string; subtitleSize?: string;
    discountTag?: string; discountTagSize?: string;
    ctaText?: string; ctaHref?: string;
    secondaryCtaText?: string; secondaryCtaHref?: string;
    overlayOpacity?: number; overlayColor?: string;
    textAlignment?: 'left' | 'center' | 'right';
    contentAlignment?: 'left' | 'center' | 'right';
    primaryColor?: string; textColor?: string;
  };
  Gallery1: {
    title?: string;
    description?: string;
    images?: { src: string; alt?: string }[];
  };
};
