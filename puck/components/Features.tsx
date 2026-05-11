import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { FeaturesUI } from "neocomerz-storefront-ui";
import { ImageUpload } from "../../components/ImageUpload";
import { VersionPicker, FeaturesSkeletons } from "../../components/VersionPicker";
import { ColorPicker } from "../../components/ColorPicker";

const DEFAULT_CTA_TEXT = "এখনই অর্ডার করুন";
const DEFAULT_CTA_HREF = "#order-form";
const DEFAULT_TAGLINE = "এটা শুধু একটা ড্রেস না—এটা এখনকার ফ্যাশন ট্রেন্ডের অংশ।";

const withFallback = (v: string | undefined, fallback: string) =>
  typeof v === "string" && v.trim().length > 0 ? v : fallback;

const VERSION_OPTIONS = [
  { value: "v1", label: "Classic",   description: "2-col image grid + feature list",        preview: FeaturesSkeletons.v1 },
  { value: "v2", label: "Bold CTA",  description: "Urgency banner, CTA left, images right", preview: FeaturesSkeletons.v2 },
  { value: "v3", label: "Numbered",  description: "3-col numbered feature cards",            preview: FeaturesSkeletons.v3 },
  { value: "v4", label: "Dark",      description: "Dark theme with gold accents",            preview: FeaturesSkeletons.v4 },
  { value: "v5", label: "Collage",   description: "Overlapping image collage",               preview: FeaturesSkeletons.v5 },
];

export const Features: ComponentConfig<PuckProps["Features"]> = {
  label: "Features Section",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "v1"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    title:         { type: "text",     label: "TITLE" },
    description:   { type: "textarea", label: "DESCRIPTION" },
    tagline:       { type: "text",     label: "TAGLINE" },
    features: {
      type: "array", label: "FEATURES",
      getItemSummary: (item) => item.text || "Feature",
      arrayFields: { text: { type: "text", label: "TEXT" } },
    },
    images: {
      type: "array", label: "IMAGES",
      getItemSummary: (item, i) => item.alt || `Image ${(i || 0) + 1}`,
      arrayFields: {
        src: {
          type: "custom", label: "IMAGE",
          render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
        },
        alt: { type: "text", label: "ALT" },
      },
    },
    ctaText:        { type: "text", label: "CTA TEXT" },
    ctaHref:        { type: "text", label: "CTA HREF" },
    whatsappNumber: { type: "text", label: "WHATSAPP NUMBER" },
    primaryColor: {
      type: "custom", label: "PRIMARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Primary Color" value={value || "#F36621"} onChange={onChange} />,
    },
    textColor: {
      type: "custom", label: "TEXT COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Text Color" value={value || "#222F28"} onChange={onChange} />,
    },
    backgroundColor: {
      type: "custom", label: "BACKGROUND COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Background Color" value={value || "#ffffff"} onChange={onChange} />,
    },
  },
  defaultProps: {
    version: "v1",
    title: "কেন এটা আলাদা করে নজর কাড়ে",
    description: "শুধু সুন্দর নয়, আরামদায়কও। আমাদের প্রিমিয়াম কোয়ালিটির Quality Panjabi সেট আপনাকে দেবে এক অনন্য অভিজ্ঞতা।",
    tagline: DEFAULT_TAGLINE,
    features: [
      { text: "Quality runway-inspired design" },
      { text: "Elegant cut & premium fall — ছবি আর বাস্তবে এক" },
      { text: "Daily wear থেকে occasion—দুই জায়গাতেই মানানসই" },
      { text: "বাংলাদেশি আবহাওয়ার জন্য comfortable fabric choice" },
    ],
    ctaText: DEFAULT_CTA_TEXT,
    ctaHref: DEFAULT_CTA_HREF,
    whatsappNumber: "+880 1712-508063",
    primaryColor: "#F36621",
    textColor: "#222F28",
    backgroundColor: "#ffffff",
  },
  render: (props) => (
    <FeaturesUI
      version={props.version}
      title={props.title}
      description={props.description}
      tagline={withFallback(props.tagline, DEFAULT_TAGLINE)}
      features={props.features || []}
      images={props.images?.length ? props.images.map((img) => ({ src: img.src || "", alt: img.alt || "" })) : undefined}
      ctaButton={{ text: withFallback(props.ctaText, DEFAULT_CTA_TEXT), href: withFallback(props.ctaHref, DEFAULT_CTA_HREF) }}
      whatsappNumber={props.whatsappNumber}
      colors={{ primary: props.primaryColor, text: props.textColor, background: props.backgroundColor }}
    />
  ),
};
