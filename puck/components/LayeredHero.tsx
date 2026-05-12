import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import { ColorPicker } from "../../components/ColorPicker";
import { VersionPicker, HeroSkeletons } from "../../components/VersionPicker";
import { LayeredHero as LayeredHeroUI } from "neocomerz-storefront-ui";

const VERSION_OPTIONS = [
  { value: "default", label: "Layered",   description: "Classic split with polaroid overlay", preview: HeroSkeletons.organic },
  { value: "v2",      label: "Bold",      description: "Large text + full image right",       preview: HeroSkeletons.cinematic },
  { value: "v3",      label: "Centered",  description: "Centered layout with overlay",        preview: HeroSkeletons.classic },
  { value: "v4",      label: "Dark",      description: "Dark premium theme",                  preview: HeroSkeletons.urgency },
  { value: "v5",      label: "Minimal",   description: "Clean split, no decorations",         preview: HeroSkeletons.splitPanel },
];

export const LayeredHero: ComponentConfig<any> = {
  label: "Hero — Layered / Split",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "default"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    mainImage: {
      type: "custom", label: "MAIN HERO IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    logoSrc: {
      type: "custom", label: "LOGO",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    logoAlt: { type: "text", label: "LOGO ALT" },
    overlayImage: {
      type: "custom", label: "POLAROID OVERLAY IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    shadowImage: {
      type: "custom", label: "LEFT SHADOW IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    watermarkText:  { type: "text",     label: "WATERMARK TEXT" },
    titlePrimary:   { type: "text",     label: "TITLE PRIMARY" },
    titleSecondary: { type: "text",     label: "TITLE SECONDARY" },
    description:    { type: "textarea", label: "DESCRIPTION" },
    productName:    { type: "text",     label: "PRODUCT NAME" },
    originalPrice:  { type: "text",     label: "ORIGINAL PRICE" },
    discountPrice:  { type: "text",     label: "DISCOUNT PRICE" },
    priceSuffix:    { type: "text",     label: "PRICE SUFFIX" },
    ctaText:        { type: "text",     label: "CTA TEXT" },
    ctaHref:        { type: "text",     label: "CTA HREF" },
    showWatermark: { type: "radio", label: "SHOW WATERMARK", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    showShadow:    { type: "radio", label: "SHOW SHADOW",    options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    showPolaroid:  { type: "radio", label: "SHOW POLAROID",  options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    showCtaIcon:   { type: "radio", label: "SHOW CTA ICON",  options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
    primaryColor: {
      type: "custom", label: "PRIMARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Primary Color" value={value || "#FBBF24"} onChange={onChange} />,
    },
    textColor: {
      type: "custom", label: "TEXT COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Text Color" value={value || "#222F28"} onChange={onChange} />,
    },
    descriptionColor: {
      type: "custom", label: "DESCRIPTION COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Description Color" value={value || "#6B6B6B"} onChange={onChange} />,
    },
  },
  defaultProps: {
    version: "default",
    mainImage: "/ui-images/hero-2/hero-main.webp",
    logoSrc: "/ui-images/hero-2/Logo.svg",
    overlayImage: "/ui-images/hero-2/hero-overlay.webp",
    shadowImage: "/ui-images/hero-2/left-shadow.webp",
    logoAlt: "Logo",
    watermarkText: "Shirt",
    titlePrimary: "এই শীতের",
    titleSecondary: "স্টাইল গেমে আনুন নতুনত্ব",
    description: "বাজেট ফ্রেন্ডলি প্রাইসে পাচ্ছেন আমাদের এক্সক্লুসিভ প্রিমিয়াম Sweatshirt Collection।",
    productName: "Sweat Shirt Set",
    originalPrice: "৳1427",
    discountPrice: "৳999",
    priceSuffix: "only",
    ctaText: "অর্ডার করুন (৩০% ছাড়ে)",
    ctaHref: "#order",
    showWatermark: true,
    showShadow: true,
    showPolaroid: true,
    showCtaIcon: true,
    primaryColor: "#FBBF24",
    textColor: "#222F28",
    descriptionColor: "#6B6B6B",
  },
  render: (props) => (
    <LayeredHeroUI
      version={props.version}
      mainImage={props.mainImage}
      overlayImage={props.overlayImage}
      shadowImage={props.shadowImage}
      logo={{ src: props.logoSrc, alt: props.logoAlt }}
      watermarkText={props.watermarkText}
      titlePrimary={props.titlePrimary}
      titleSecondary={props.titleSecondary}
      description={props.description}
      productName={props.productName}
      originalPrice={props.originalPrice}
      discountPrice={props.discountPrice}
      priceSuffix={props.priceSuffix}
      cta={{ text: props.ctaText, href: props.ctaHref }}
      settings={{ showWatermark: props.showWatermark, showShadow: props.showShadow, showPolaroid: props.showPolaroid, showCtaIcon: props.showCtaIcon }}
      theme={{ primaryColor: props.primaryColor, textColor: props.textColor, descriptionColor: props.descriptionColor }}
    />
  ),
};
