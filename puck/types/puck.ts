import React from "react";

type VersionSlot = 'default' | 'v1' | 'v2' | 'v3' | 'v4' | 'v5';

export type PuckProps = {
  Heading:   { title: string; level: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'; color?: string; align?: 'left'|'center'|'right' };
  Text:      { content: string; color?: string; align?: 'left'|'center'|'right'; size?: string };
  Button:    { text: string; href: string; variant: 'default'|'outline'; color?: string };
  Container: { padding?: string; maxWidth?: string };
  Columns:   { columns: { children: React.ReactNode }[] };

  Hero: {
    version?: VersionSlot;
    backgroundImage?: string;
    logoSrc?: string; logoAlt?: string; logoWidth?: number; logoHeight?: number;
    title?: string; titleSize?: string;
    subtitle?: string; subtitleSize?: string;
    discountTag?: string; discountTagSize?: string;
    ctaText?: string; ctaHref?: string;
    secondaryCtaText?: string; secondaryCtaHref?: string;
    overlayOpacity?: number; overlayColor?: string;
    textAlignment?: 'left'|'center'|'right';
    contentAlignment?: 'left'|'center'|'right';
    primaryColor?: string; textColor?: string;
  };
  LayeredHero: {
    version?: VersionSlot;
    mainImage?: string; mainImageAlt?: string;
    overlayImage?: string; overlayImageAlt?: string;
    shadowImage?: string; shadowImageAlt?: string;
    logoSrc?: string; logoAlt?: string; logoWidth?: number; logoHeight?: number;
    watermarkText?: string;
    titlePrimary?: string; titleSecondary?: string;
    description?: string;
    productName?: string; originalPrice?: string; discountPrice?: string; priceSuffix?: string;
    ctaText?: string; ctaHref?: string;
    showWatermark?: boolean; showShadow?: boolean; showPolaroid?: boolean; showCtaIcon?: boolean;
    primaryColor?: string; textColor?: string; descriptionColor?: string;
  };
  InlineHero: {
    version?: VersionSlot;
    backgroundImage?: string; backgroundImageAlt?: string;
    logoSrc?: string; logoAlt?: string; logoWidth?: number; logoHeight?: number;
    titlePrimary?: string; titleSecondary?: string;
    description?: string; ctaText?: string; ctaHref?: string;
    primaryColor?: string; secondaryColor?: string; textColor?: string;
  };
  Hero2: {
    backgroundImage?: string; logoSrc?: string; logoAlt?: string;
    titlePart1?: string; titlePart2?: string; titlePart3?: string;
    description?: string; ctaText?: string; ctaHref?: string;
  };
  Hero3: {
    logoSrc?: string; logoAlt?: string;
    leftLeafImage?: string; rightLeafImage?: string;
    centerImage?: string; centerImageAlt?: string;
    badgeImage?: string; badgeImageAlt?: string;
    titleLine1?: string; titleLine2?: string;
    description?: string; priceLabel?: string; price?: string;
    ctaText?: string; ctaHref?: string; phoneNumber?: string;
  };
  Hero4: {
    leftLeafImage?: string; rightLeafImage?: string;
    mangoBannerImage?: string; mangoCircleImage?: string;
    titleLine1?: string; titleLine2?: string; titleLine3?: string;
    badgeTextLine1?: string; badgeTextLine2?: string;
    description?: string; ctaText?: string; ctaHref?: string; phoneNumber?: string;
  };

  GalleryCol: {
    version?: VersionSlot;
    title?: string; description?: string;
    images?: { src: string; alt?: string }[];
  };
  GalleryGrid: {
    version?: VersionSlot;
    title?: string; description?: string;
    images?: { src: string; alt?: string }[];
  };
  GalleryGrid6: {
    version?: VersionSlot;
    title?: string; description?: string;
    images?: { src: string; alt?: string }[];
  };

  Features: {
    version?: 'v1'|'v2'|'v3'|'v4'|'v5';
    title?: string; description?: string; tagline?: string;
    features?: { text: string }[];
    images?: { src: string; alt?: string }[];
    ctaText?: string; ctaHref?: string;
    primaryColor?: string; textColor?: string; backgroundColor?: string;
    whatsappNumber?: string;
  };
  DesignAndFit: {
    version?: 'v1'|'v2'|'v3'|'v4'|'v5';
    title?: string; subtitle?: string;
    imageCards?: { image?: string; title?: string; description?: string; alt?: string }[];
    detailCards?: { title?: string; items?: { text: string }[] }[];
    ctaText?: string; ctaHref?: string;
    primaryColor?: string; textColor?: string; backgroundColor?: string;
  };
  Quality: {
    version?: 'v1'|'v2'|'v3'|'v4'|'v5';
    title?: string; subtitle?: string;
    imageCards?: { image?: string; title?: string; description?: string; alt?: string }[];
    detailCards?: { title?: string; items?: { text: string }[] }[];
    ctaText?: string; ctaHref?: string;
    primaryColor?: string; textColor?: string; backgroundColor?: string;
  };

  SizeChart: {
    version?: VersionSlot;
    title?: string; description?: string;
    sizeData?: { measurement?: string; description?: string; m?: string; l?: string; xl?: string; xxl?: string }[];
    chartImage?: string; chartImageAlt?: string;
    whatsappText?: string; whatsappNumber?: string; contactText?: string; returnPolicy?: string;
    primaryColor?: string; textColor?: string; backgroundColor?: string;
  };
  Testimonials: {
    version?: VersionSlot;
    title?: string; description?: string;
    images?: { src: string; alt?: string }[];
    initialDisplayCount?: number; loadMoreCount?: number;
    loadMoreText?: string; loadingText?: string;
    primaryColor?: string; textColor?: string; backgroundColor?: string;
  };
  FAQ: {
    version?: VersionSlot;
    heading?: string;
    descriptionPart1?: string; descriptionPart2?: string; descriptionPart3?: string;
    contactLabel?: string; contactNumber?: string;
    faqs?: { question: string; answer: string }[];
    primaryColor?: string; backgroundColor?: string; faqBackgroundColor?: string;
  };

  OrderForm: {
    API_SECTION?: any; apiBaseUrlInfo?: any; PRODUCT_SECTION?: any; UI_SECTION?: any;
    apiBaseUrl?: string; productId?: string | number;
    allowedVariants?: { name: string }[];
    title?: string; description?: string; submitButtonText?: string;
    productImage?: string; productImageAlt?: string;
    productName?: string; productPrice?: string;
    shippingOptions?: { id?: string; label?: string; price?: number }[];
    namePlaceholder?: string; phonePlaceholder?: string;
    addressPlaceholder?: string; notesPlaceholder?: string;
    cashOnDeliveryText?: string; privacyPolicyUrl?: string;
    primaryColor?: string; textColor?: string; backgroundColor?: string;
  };
};
