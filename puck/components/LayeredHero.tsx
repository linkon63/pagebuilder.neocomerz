import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import LayeredHeroUI from "../../ui-package/LayeredHero";

export const LayeredHero: ComponentConfig<PuckProps["LayeredHero"]> = {
  label: "Layered Hero",
  fields: {
    mainImage: {
      label: "Main Hero Image",
      type: "custom",
      render: ({ value, onChange }) => (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Main Hero Image</label>
          <ImageUpload value={value} onChange={onChange} />
        </div>
      )
    },
    logoSrc: {
      label: "Logo Image",
      type: "custom",
      render: ({ value, onChange }) => (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Logo Image</label>
          <ImageUpload value={value} onChange={onChange} />
        </div>
      )
    },
    logoAlt: { label: "Logo Alt Text", type: "text" },
    overlayImage: {
      label: "Polaroid Overlay Image",
      type: "custom",
      render: ({ value, onChange }) => (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Polaroid Overlay Image</label>
          <ImageUpload value={value} onChange={onChange} />
        </div>
      )
    },
    shadowImage: {
      label: "Left Shadow Image",
      type: "custom",
      render: ({ value, onChange }) => (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Left Shadow Image</label>
          <ImageUpload value={value} onChange={onChange} />
        </div>
      )
    },
    watermarkText: { label: "Watermark Text", type: "text" },
    titlePrimary: { label: "Primary Title (Yellow)", type: "text" },
    titleSecondary: { label: "Secondary Title (Black)", type: "text" },
    description: { label: "Description Text", type: "textarea" },
    productName: { label: "Product Name", type: "text" },
    originalPrice: { label: "Original Price", type: "text" },
    discountPrice: { label: "Discount Price", type: "text" },
    ctaText: { label: "Main CTA Text", type: "text" },
    ctaHref: { label: "Main CTA Link", type: "text" },
    showWatermark: { label: "Show Watermark", type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    showShadow: { label: "Show Left Shadow", type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    showPolaroid: { label: "Show Polaroid", type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    primaryColor: { label: "Primary Theme Color", type: "text" },
    textColor: { label: "Text Theme Color", type: "text" },
    descriptionColor: { label: "Description Color", type: "text" },
    priceSuffix: { label: "Price Suffix Text", type: "text" },
    showCtaIcon: { label: "Show CTA Icon", type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
  },
  defaultProps: {
    mainImage: "/ui-package/images/hero-2/hero-main.webp",
    overlayImage: "/ui-package/images/hero-2/hero-overlay.webp",
    shadowImage: "/ui-package/images/hero-2/left-shadow.webp",
    logoSrc: "/ui-package/images/hero-2/Logo.svg",
    logoAlt: "Logo image",
    watermarkText: "Shirt",
    titlePrimary: "এই শীতের",
    titleSecondary: "স্টাইল গেমে আনুন নতুনত্ব",
    description: "শীত এলেই শুরু হয় স্টাইলের নতুন অধ্যায়। এত কম দামে প্রিমিয়াম কোয়ালিটি Sweatshirt and Pant। এই শীতের স্টাইল গেমে আনুন নতুনত্ব। বাজেট ফ্রেন্ডলি প্রাইসে পাচ্ছেন আমাদের এক্সক্লুসিভ প্রিমিয়াম Sweatshirt Collection - যা আপনার লুককে করবে আরো স্টাইলিশ ও আকর্ষনীয়।",
    productName: "Sweat Shirt Set",
    originalPrice: "৳1427",
    discountPrice: "৳999",
    ctaText: "অর্ডার করুন (৩০% ছাড়ে)",
    ctaHref: "#order",
    showWatermark: true,
    showShadow: true,
    showPolaroid: true,
    primaryColor: "#FBBF24",
    textColor: "#222F28",
    descriptionColor: "#6B6B6B",
    priceSuffix: "only",
    showCtaIcon: true,
  },
  render: (props) => (
    <LayeredHeroUI
      mainImage={props.mainImage}
      overlayImage={props.overlayImage}
      shadowImage={props.shadowImage}
      logo={{
        src: props.logoSrc,
        alt: props.logoAlt,
      }}
      watermarkText={props.watermarkText}
      titlePrimary={props.titlePrimary}
      titleSecondary={props.titleSecondary}
      description={props.description}
      productName={props.productName}
      originalPrice={props.originalPrice}
      discountPrice={props.discountPrice}
      priceSuffix={props.priceSuffix}
      cta={{
        text: props.ctaText,
        href: props.ctaHref,
      }}
      settings={{
        showWatermark: props.showWatermark,
        showShadow: props.showShadow,
        showPolaroid: props.showPolaroid,
        showCtaIcon: props.showCtaIcon,
      }}
      theme={{
        primaryColor: props.primaryColor,
        textColor: props.textColor,
        descriptionColor: props.descriptionColor,
      }}
    />
  ),
};
