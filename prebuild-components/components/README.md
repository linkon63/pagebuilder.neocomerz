# Moveable Components Library

A collection of reusable, moveable React components for landing pages. These components are designed to be easily copied and used in different projects with minimal setup.

## 🚀 Features

- **Fully Moveable**: Just copy the folder and it works in any project
- **Props-based**: All data and styling passed through props
- **TypeScript Support**: Full type definitions included
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Customizable Colors**: Easy color theming through props
- **Modern UI**: Clean, professional design patterns

## 📁 Folder Structure

```
moveable-components/
├── assets/
│   └── images/             # All dummy images for components
│       ├── hero-bg.jpg
│       ├── logo.svg
│       ├── feature-1.jpg
│       ├── feature-2.webp
│       ├── feature-3.jpg
│       ├── feature-4.jpg
│       ├── review-1.jpeg
│       ├── review-2.jpeg
│       ├── review-3.jpeg
│       └── ...
├── types/
│   └── index.ts          # TypeScript type definitions
├── ui/
│   ├── Button.tsx        # Reusable button component
│   ├── SectionHeader.tsx # Section headers
│   └── CheckListItem.tsx # Check list items
├── sections/
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features showcase
│   ├── Testimonials.tsx  # Customer testimonials
│   ├── FAQ.tsx           # FAQ accordion
│   ├── SizeChart.tsx     # Size chart table
│   ├── OrderForm.tsx     # Order form
│   └── Footer.tsx        # Footer section
├── example-usage.tsx     # Complete example implementation
└── README.md             # This file
```

## 🛠️ Installation & Setup

1. **Copy the folder**: Simply copy the entire `moveable-components` folder to your project
2. **Install dependencies**: Make sure you have these dependencies in your project:

   ```bash
   npm install react react-dom next
   npm install -D typescript @types/react @types/react-dom
   npm install tailwindcss react-icons
   ```

3. **Configure Tailwind CSS**: Add the component paths to your `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{js,ts,jsx,tsx}",
       "./moveable-components/**/*.{js,ts,jsx,tsx}", // Add this line
     ],
     // ... rest of your config
   };
   ```

## 📖 Usage Examples

### Basic Usage

```tsx
import React from "react";
import Hero from "./moveable-components/sections/Hero";
import { HeroProps } from "./moveable-components/types";

const heroData: HeroProps = {
  backgroundImage: "./assets/images/hero-bg.jpg",
  logo: {
    src: "./assets/images/logo.svg",
    alt: "Company Logo",
    width: 180,
    height: 42,
  },
  title: {
    main: "Premium Product",
    subtitle: "Quality Description",
    discount: "30% Off",
  },
  ctaButton: {
    text: "Order Now",
    href: "#order-form",
  },
};

export default function LandingPage() {
  return <Hero {...heroData} />;
}
```

### Complete Example

Check out `example-usage.tsx` for a complete landing page implementation using all components.

## 🎨 Component Props

### Hero Component

```tsx
interface HeroProps {
  backgroundImage: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: {
    main: string;
    subtitle: string;
    discount?: string;
  };
  ctaButton: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  colors?: {
    primary?: string;
    text?: string;
  };
}
```

### Features Component

```tsx
interface FeaturesProps {
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
```

### Testimonials Component

```tsx
interface TestimonialsProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  testimonials: TestimonialItem[];
  colors?: {
    primary?: string;
    text?: string;
  };
}
```

### FAQ Component

```tsx
interface FAQProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  faqs: FAQItem[];
  colors?: {
    primary?: string;
    text?: string;
  };
}
```

### SizeChart Component

```tsx
interface SizeChartProps {
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
```

### OrderForm Component

```tsx
interface OrderFormProps {
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
```

### Footer Component

```tsx
interface FooterProps {
  sections: FooterSection[];
  socialLinks?: FooterLink[];
  copyright: string;
  colors?: {
    primary?: string;
    text?: string;
  };
}
```

## 🎯 Customization

### Colors

All components support color customization through the `colors` prop:

```tsx
<Hero
  {...heroData}
  colors={{
    primary: "#your-brand-color",
    text: "#your-text-color",
  }}
/>
```

### Styling

Components use Tailwind CSS classes. You can:

1. Override styles in your global CSS
2. Pass custom className props where available
3. Modify the component files directly

## 📱 Responsive Design

All components are built with a mobile-first approach:

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1440px and up

## 🔧 Dependencies

- **React**: 18.0+
- **Next.js**: 13.0+ (for Image component)
- **Tailwind CSS**: 3.0+
- **React Icons**: 4.0+

## 📝 Notes

- Components use inline styles for dynamic colors to ensure prop-based theming works correctly
- Image paths should be relative to the assets folder: `./assets/images/`
- All components are self-contained and don't require external context
- TypeScript is fully supported with proper type definitions
- All dummy assets are included in the assets/images folder

## 🚀 Quick Start

1. Copy the `moveable-components` folder to your project
2. Install dependencies
3. Configure Tailwind CSS
4. Import and use components with your data
5. Customize colors and styling as needed

That's it! Your components are ready to use in any project.
