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
  Hero2: {
    mainImage?: string;
    mainImageAlt?: string;
    overlayImage?: string;
    overlayImageAlt?: string;
    shadowImage?: string;
    shadowImageAlt?: string;
    logoSrc?: string; logoAlt?: string; logoWidth?: number; logoHeight?: number;
    watermarkText?: string;
    titlePrimary?: string;
    titleSecondary?: string;
    description?: string;
    productName?: string;
    originalPrice?: string;
    discountPrice?: string;
    priceSuffix?: string;
    ctaText?: string; ctaHref?: string;
    showWatermark?: boolean;
    showShadow?: boolean;
    showPolaroid?: boolean;
    showCtaIcon?: boolean;
    primaryColor?: string;
    textColor?: string;
    descriptionColor?: string;
  };
  GalleryCol: {
    title?: string;
    description?: string;
    images?: { src: string; alt?: string }[];
  };
  GalleryGrid: {
    title?: string;
    description?: string;
    images?: { src: string; alt?: string }[];
  };
  GalleryGrid6: {
    title?: string;
    description?: string;
    images?: { src: string; alt?: string }[];
  };
};
