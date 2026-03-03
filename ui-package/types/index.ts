import React from 'react';

export interface HeroProps {
  backgroundImage?: string;
  logo?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  title?: string;
  titleSize?: string;
  subtitle?: string;
  subtitleSize?: string;
  discountTag?: string;
  discountTagSize?: string;
  cta?: {
    text?: string;
    href?: string;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text?: string;
    href?: string;
    icon?: React.ReactNode;
  };
  settings?: {
    overlayOpacity?: number; // 0 to 100
    overlayColor?: string;
    textAlignment?: 'left' | 'center' | 'right';
    contentAlignment?: 'left' | 'center' | 'right'; // Aligns the content box
  };
  theme?: {
    primaryColor?: string;
    textColor?: string;
  };
}

// Hero2 Component Props
export interface Hero2Props {
  logo?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  mainImage?: string;
  mainImageAlt?: string;
  overlayImage?: string;
  overlayImageAlt?: string;
  shadowImage?: string;
  shadowImageAlt?: string;
  watermarkText?: string;
  titlePrimary?: string;
  titleSecondary?: string;
  description?: string;
  productName?: string;
  originalPrice?: string;
  discountPrice?: string;
  priceSuffix?: string;
  cta?: {
    text?: string;
    href?: string;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text?: string;
    href?: string;
    icon?: React.ReactNode;
  };
  settings?: {
    showWatermark?: boolean;
    showShadow?: boolean;
    showPolaroid?: boolean;
    showCtaIcon?: boolean;
  };
  theme?: {
    primaryColor?: string;
    textColor?: string;
    descriptionColor?: string;
  };
}

// Features Component Props
export interface FeatureItem {
  text: string;
}

export interface FeatureImage {
  src: string;
  alt: string;
}

export interface FeaturesProps {
  title: React.ReactNode;
  description: React.ReactNode;
  features: FeatureItem[];
  images: FeatureImage[];
  ctaButton: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  tagline: string;
  colors?: {
    primary?: string;
    text?: string;
    background?: string;
  };
}

// Design and Fit Component Props
export interface DesignAndFitProps {
  title: React.ReactNode;
  description: React.ReactNode;
  features: FeatureItem[];
  images: FeatureImage[];
  colors?: {
    primary?: string;
    text?: string;
  };
}

// Testimonial Item
export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  image?: string;
  designation?: string;
}

// Testimonials Component Props
export interface TestimonialsProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  testimonials: TestimonialItem[];
  colors?: {
    primary?: string;
    text?: string;
  };
}

// FAQ Item
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// FAQ Component Props
export interface FAQProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  faqs: FAQItem[];
  colors?: {
    primary?: string;
    text?: string;
  };
}

// Size Chart Props
export interface SizeChartProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  sizeChart: {
    headers: string[];
    rows: string[][];
  };
  colors?: {
    primary?: string;
    text?: string;
  };
}

// Order Form Props (simplified for reusability)
export interface OrderFormProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  productInfo: {
    name: string;
    price: number;
    discountPrice?: number;
  };
  colors?: {
    primary?: string;
    text?: string;
  };
}

// Footer Props
export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections: FooterSection[];
  socialLinks?: FooterLink[];
  copyright: string;
  colors?: {
    primary?: string;
    text?: string;
  };
}

// Common UI Component Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
}

export interface CheckListItemProps {
  children: React.ReactNode;
  iconClassName?: string;
  textClassName?: string;
}

export interface SectionHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}
