import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import { ColorPicker } from "../../components/ColorPicker";
import { VersionPicker, HeroSkeletons } from "../../components/VersionPicker";
import { Hero as HeroUI } from "neocomerz-storefront-ui";

// v1 is identical to default — skip it, map v2→Style 2, v3→Style 3, etc.
const VERSION_OPTIONS = [
  { value: "default", label: "Classic",   description: "Curved card overlay at bottom",    preview: HeroSkeletons.classic },
  { value: "v2",      label: "Urgency",   description: "Ticker banner + centered CTA",     preview: HeroSkeletons.urgency },
  { value: "v3",      label: "Split",     description: "Left panel with trust badges",     preview: HeroSkeletons.splitPanel },
  { value: "v4",      label: "Cinematic", description: "Full-screen bold typography",      preview: HeroSkeletons.cinematic },
  { value: "v5",      label: "Minimal",   description: "Clean text overlay, no card",      preview: HeroSkeletons.classic },
];

export const Hero: ComponentConfig<PuckProps["Hero"]> = {
  label: "Hero — Fashion / Apparel",
  fields: {
    version: {
      type: "custom", label: "LAYOUT STYLE",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "default"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    backgroundImage: {
      type: "custom", label: "BACKGROUND IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    logoSrc: {
      type: "custom", label: "LOGO",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    logoAlt:    { type: "text",   label: "LOGO ALT" },
    logoWidth:  { type: "number", label: "LOGO WIDTH" },
    logoHeight: { type: "number", label: "LOGO HEIGHT" },
    title:           { type: "text", label: "TITLE" },
    titleSize:       { type: "text", label: "TITLE SIZE" },
    subtitle:        { type: "text", label: "SUBTITLE" },
    subtitleSize:    { type: "text", label: "SUBTITLE SIZE" },
    discountTag:     { type: "text", label: "DISCOUNT TAG" },
    discountTagSize: { type: "text", label: "DISCOUNT TAG SIZE" },
    ctaText:          { type: "text", label: "CTA TEXT" },
    ctaHref:          { type: "text", label: "CTA HREF" },
    secondaryCtaText: { type: "text", label: "SECONDARY CTA TEXT" },
    secondaryCtaHref: { type: "text", label: "SECONDARY CTA HREF" },
    overlayOpacity: { type: "number", label: "OVERLAY OPACITY (0–100)" },
    overlayColor: {
      type: "custom", label: "OVERLAY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Overlay Color" value={value || "#000000"} onChange={onChange} />,
    },
    textAlignment: {
      type: "radio",
      options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }],
    },
    contentAlignment: {
      type: "radio",
      options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }],
    },
    primaryColor: {
      type: "custom", label: "PRIMARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Primary Color" value={value || "#F36621"} onChange={onChange} />,
    },
    textColor: {
      type: "custom", label: "TEXT COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Text Color" value={value || "#222F28"} onChange={onChange} />,
    },
  },
  defaultProps: {
    version: "default",
    backgroundImage: "/ui-images/heroBg.jpg",
    logoSrc: "/ui-images/neoComerz-logo.svg",
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
  render: (props) => <HeroUI {...props} />,
};
