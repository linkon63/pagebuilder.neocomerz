import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import HeroUI from "../../ui-package/Hero";

export const Hero: ComponentConfig<PuckProps["Hero"]> = {
  fields: {
    backgroundImage: { 
      label: "Background Image",
      type: "custom",
      render: ({ value, onChange }) => (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Background Image</label>
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
    logoWidth: { label: "Logo Width (px)", type: "number" },
    logoHeight: { label: "Logo Height (px)", type: "number" },
    title: { label: "Hero Title", type: "text" },
    titleSize: { label: "Title Font Size (e.g. 5rem)", type: "text" },
    subtitle: { label: "Hero Subtitle", type: "text" },
    subtitleSize: { label: "Subtitle Font Size (e.g. 3rem)", type: "text" },
    discountTag: { label: "Discount Tagline", type: "text" },
    discountTagSize: { label: "Discount Font Size (e.g. 4.5rem)", type: "text" },
    ctaText: { label: "Main CTA Text", type: "text" },
    ctaHref: { label: "Main CTA Link", type: "text" },
    secondaryCtaText: { label: "Secondary CTA Text", type: "text" },
    secondaryCtaHref: { label: "Secondary CTA Link", type: "text" },
    overlayOpacity: { label: "Overlay Opacity (0-100)", type: "number" },
    overlayColor: { label: "Overlay Color", type: "text" },
    textAlignment: {
      label: "Text Alignment",
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    contentAlignment: {
      label: "Box Alignment (Desktop)",
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    primaryColor: { label: "Primary Theme Color", type: "text" },
    textColor: { label: "Text Theme Color", type: "text" },
  },
  defaultProps: {
    title: "STYLISH & COMFORTABLE",
    subtitle: "SUMMER COLLECTION",
    discountTag: "UP TO 50% OFF",
    ctaText: "SHOP NOW",
    ctaHref: "#",
    logoAlt: "Logo",
    logoWidth: 150,
    logoHeight: 50,
    overlayOpacity: 10,
    overlayColor: "#000000",
    textAlignment: "center",
    contentAlignment: "right",
    primaryColor: "#F36621",
    textColor: "#222F28",
  },
  render: (props) => (
    <HeroUI
      backgroundImage={props.backgroundImage}
      logo={{
        src: props.logoSrc,
        alt: props.logoAlt,
        width: props.logoWidth,
        height: props.logoHeight,
      }}
      title={props.title}
      titleSize={props.titleSize}
      subtitle={props.subtitle}
      subtitleSize={props.subtitleSize}
      discountTag={props.discountTag}
      discountTagSize={props.discountTagSize}
      cta={{
        text: props.ctaText,
        href: props.ctaHref,
      }}
      secondaryCta={{
        text: props.secondaryCtaText,
        href: props.secondaryCtaHref,
      }}
      settings={{
        overlayOpacity: props.overlayOpacity,
        overlayColor: props.overlayColor,
        textAlignment: props.textAlignment,
        contentAlignment: props.contentAlignment,
      }}
      theme={{
        primaryColor: props.primaryColor,
        textColor: props.textColor,
      }}
    />
  ),
};
