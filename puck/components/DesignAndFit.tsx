import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import { DesignAndFit as DesignAndFitUI } from "neocomerz-storefront-ui";
import { VersionPicker, DesignAndFitSkeletons } from "../../components/VersionPicker";
import { ColorPicker } from "../../components/ColorPicker";

const VERSION_OPTIONS = [
  { value: "v1", label: "Classic", description: "3 image cards + 3 detail cards",    preview: DesignAndFitSkeletons.v1 },
  { value: "v2", label: "Split",   description: "Split hero image + bordered cards", preview: DesignAndFitSkeletons.v2 },
  { value: "v3", label: "Strip",   description: "Scroll strip + CTA panel",          preview: DesignAndFitSkeletons.v3 },
  { value: "v4", label: "Dark",    description: "Dark mosaic + glass cards",         preview: DesignAndFitSkeletons.v4 },
  { value: "v5", label: "Overlap", description: "Overlapping image cards",           preview: DesignAndFitSkeletons.v5 },
];

export const DesignAndFit: ComponentConfig<any> = {
  label: "Design & Fit Section",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "v1"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    title:    { type: "text",     label: "MAIN TITLE" },
    subtitle: { type: "textarea", label: "SUBTITLE" },
    imageCards: {
      type: "array", label: "IMAGE CARDS (3 recommended)",
      getItemSummary: (item, i) => item.title || `Card ${(i || 0) + 1}`,
      arrayFields: {
        image: {
          type: "custom", label: "CARD IMAGE",
          render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
        },
        title:       { type: "text", label: "CARD TITLE" },
        description: { type: "text", label: "CARD DESCRIPTION" },
        alt:         { type: "text", label: "IMAGE ALT" },
      },
    },
    detailCards: {
      type: "array", label: "DETAIL CARDS (3 recommended)",
      getItemSummary: (item, i) => item.title || `Detail ${(i || 0) + 1}`,
      arrayFields: {
        title: { type: "text", label: "CARD TITLE" },
        items: {
          type: "array", label: "ITEMS",
          getItemSummary: (item) => item.text || "Item",
          arrayFields: { text: { type: "text", label: "TEXT" } },
        },
      },
    },
    ctaText: { type: "text", label: "CTA TEXT" },
    ctaHref: { type: "text", label: "CTA HREF" },
    primaryColor: {
      type: "custom", label: "PRIMARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Primary Color" value={value || "#F36621"} onChange={onChange} />,
    },
    textColor: {
      type: "custom", label: "TEXT COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Text Color" value={value || "#27272a"} onChange={onChange} />,
    },
    backgroundColor: {
      type: "custom", label: "BACKGROUND COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Background Color" value={value || "#f3f4f6"} onChange={onChange} />,
    },
  },
  defaultProps: {
    version: "v1",
    title: "ইন্ডিয়ান এমব্রয়ডারি,",
    subtitle: "পাঞ্জাবি সাশ্রয় দামে - আজকের সেরা ডিল",
    imageCards: [
      { image: "/ui-images/hero-2/hero-main.webp",    title: "ফিল:",      description: "সফট, স্কিন-ফ্রেন্ডলি, আরামদায়ক",              alt: "Fabric quality" },
      { image: "/ui-images/hero-2/hero-overlay.webp", title: "থিকনেস:",   description: "রাজকীয় কারুকাজে অভিজাত্যের ছোঁয়া",           alt: "Embroidery detail" },
      { image: "/ui-images/feature-1/feature-3.webp", title: "ফ্রি অফার:", description: "প্রিমিয়াম কোয়ালিটির পায়জামা সম্পূর্ণ ফ্রি!", alt: "Free offer" },
    ],
    detailCards: [
      { title: "Design & Cut",       items: [{ text: "Modern Quality silhouette" }, { text: "Clean finishing & elegant tailoring" }, { text: "এমন ডিজাইন যা আলাদা করে নজর কাড়ে" }] },
      { title: "Fit & Styling",      items: [{ text: "Comfortable fit – ঢিলাও না, আঁটসাঁটও না" }, { text: "Casual, festive বা semi-formal—সব জায়গায় মানানসই" }] },
      { title: "Color & Variations", items: [{ text: "Trend-based colour selection" }, { text: "Limited colour runs" }] },
    ],
    ctaText: "এখনই অর্ডার করুন",
    ctaHref: "#order-form",
    primaryColor: "#F36621",
    textColor: "#27272a",
    backgroundColor: "#f3f4f6",
  },
  render: (props) => (
    <DesignAndFitUI
      version={props.version}
      title={props.title}
      subtitle={props.subtitle}
      imageCards={props.imageCards || []}
      detailCards={props.detailCards || []}
      ctaButton={{ text: props.ctaText || "এখনই অর্ডার করুন", href: props.ctaHref || "#order-form" }}
      colors={{ primary: props.primaryColor, text: props.textColor, background: props.backgroundColor }}
    />
  ),
};
