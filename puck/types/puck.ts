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
  LayeredHero: {
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
  InlineHero: {
    backgroundImage?: string;
    backgroundImageAlt?: string;
    logoSrc?: string;
    logoAlt?: string;
    logoWidth?: number;
    logoHeight?: number;
    titlePrimary?: string;
    titleSecondary?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
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
  Features: {
    title?: string;
    description?: string;
    features?: { text: string }[];
    images?: { src: string; alt?: string }[];
    ctaText?: string;
    ctaHref?: string;
    tagline?: string;
    primaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    whatsappNumber?: string;
  };
  DesignAndFit: {
    title?: string;
    subtitle?: string;
    imageCards?: { 
      image?: string; 
      title?: string; 
      description?: string; 
      alt?: string;
    }[];
    detailCards?: {
      title?: string;
      items?: { text: string }[];
    }[];
    ctaText?: string;
    ctaHref?: string;
    primaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
  };
  SizeChart: {
    title?: string;
    description?: string;
    sizeData?: {
      measurement?: string;
      description?: string;
      m?: string;
      l?: string;
      xl?: string;
      xxl?: string;
    }[];
    chartImage?: string;
    chartImageAlt?: string;
    whatsappText?: string;
    whatsappNumber?: string;
    contactText?: string;
    returnPolicy?: string;
    primaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
  };
  OrderForm: {
    API_SECTION?: any;
    PRODUCT_SECTION?: any;
    UI_SECTION?: any;
    apiBaseUrl?: string;
    productId?: string | number;
    title?: string;
    description?: string;
    submitButtonText?: string;
    productImage?: string;
    productImageAlt?: string;
    productName?: string;
    productPrice?: string;
    shippingOptions?: {
      id?: string;
      label?: string;
      price?: number;
    }[];
    namePlaceholder?: string;
    phonePlaceholder?: string;
    addressPlaceholder?: string;
    notesPlaceholder?: string;
    cashOnDeliveryText?: string;
    primaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
  };
};
