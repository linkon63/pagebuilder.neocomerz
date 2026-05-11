import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import { ColorPicker } from "../../components/ColorPicker";
import { VersionPicker, HeroSkeletons } from "../../components/VersionPicker";
import { InlineHeroUI } from "neocomerz-storefront-ui";

const VERSION_OPTIONS = [
  { value: "default", label: "Classic",  description: "Full-width bg, text left aligned",  preview: HeroSkeletons.organic },
  { value: "v2",      label: "Gradient", description: "Centered layout with gradient",     preview: HeroSkeletons.cinematic },
  { value: "v3",      label: "Accent",   description: "Sky blue accent, bold title",       preview: HeroSkeletons.classic },
  { value: "v4",      label: "Dark",     description: "Dark overlay, high contrast",       preview: HeroSkeletons.urgency },
  { value: "v5",      label: "Minimal",  description: "Clean inline, no background",       preview: HeroSkeletons.splitPanel },
];

export const InlineHero: ComponentConfig<PuckProps["InlineHero"]> = {
  label: "Hero — Inline / Full Width",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "default"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    backgroundImage: {
      type: "custom", label: "BACKGROUND IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    backgroundImageAlt: { type: "text", label: "BACKGROUND ALT" },
    logoSrc: {
      type: "custom", label: "LOGO",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    logoAlt:        { type: "text",     label: "LOGO ALT" },
    titlePrimary:   { type: "text",     label: "TITLE PRIMARY" },
    titleSecondary: { type: "text",     label: "TITLE SECONDARY" },
    description:    { type: "textarea", label: "DESCRIPTION" },
    ctaText:        { type: "text",     label: "CTA TEXT" },
    ctaHref:        { type: "text",     label: "CTA HREF" },
    primaryColor: {
      type: "custom", label: "PRIMARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Primary Color" value={value || "#27272a"} onChange={onChange} />,
    },
    secondaryColor: {
      type: "custom", label: "SECONDARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Secondary Color" value={value || "#5b21b6"} onChange={onChange} />,
    },
    textColor: {
      type: "custom", label: "TEXT COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Text Color" value={value || "#27272a"} onChange={onChange} />,
    },
  },
  defaultProps: {
    version: "default",
    backgroundImage: "/ui-images/hero-3/hero-bg.webp",
    backgroundImageAlt: "Hero Background",
    logoSrc: "/ui-images/hero-3/Logo.svg",
    logoAlt: "Logo",
    logoWidth: 200,
    logoHeight: 60,
    titlePrimary: "প্রিমিয়াম",
    titleSecondary: "Pakistani Dress",
    description: "সেই ডিজাইন—যেটা পরলে আলাদা করে কিছু বলার দরকার পড়ে না। ফ্যাশন-লাভারদের নতুন obsession।",
    ctaText: "এখনই অর্ডার করুন",
    ctaHref: "#order",
    primaryColor: "#27272a",
    secondaryColor: "#5b21b6",
    textColor: "#27272a",
  },
  render: (props) => (
    <InlineHeroUI
      version={props.version}
      backgroundImage={props.backgroundImage}
      backgroundImageAlt={props.backgroundImageAlt}
      logoSrc={props.logoSrc}
      logoAlt={props.logoAlt}
      logoWidth={props.logoWidth}
      logoHeight={props.logoHeight}
      titlePrimary={props.titlePrimary}
      titleSecondary={props.titleSecondary}
      description={props.description}
      ctaText={props.ctaText}
      ctaHref={props.ctaHref}
      theme={{ primaryColor: props.primaryColor, secondaryColor: props.secondaryColor, textColor: props.textColor }}
    />
  ),
};
