import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import DesignAndFitUI from "@/ui-package/DesignAndFit";

import heroMain from "@/ui-package/images/hero-2/hero-main.webp";
import heroOverlay from "@/ui-package/images/hero-2/hero-overlay.webp";
import jannat from "@/ui-package/images/feature-1/feature-3.webp";

export const DesignAndFit: ComponentConfig<PuckProps["DesignAndFit"]> = {
  label: "Design & Fit Section",
  fields: {
    title: { label: "MAIN TITLE", type: "text" },
    subtitle: { label: "SUBTITLE", type: "textarea" },
    imageCards: {
      label: "IMAGE CARDS (3 RECOMMENDED)",
      type: "array",
      getItemSummary: (item, index) => item.title || `Card ${(index || 0) + 1}`,
      arrayFields: {
        image: {
          label: "CARD IMAGE",
          type: "custom",
          render: ({ value, onChange }) => (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Card Image</label>
              <ImageUpload value={value} onChange={onChange} />
            </div>
          ),
        },
        title: { type: "text", label: "CARD TITLE" },
        description: { type: "text", label: "CARD DESCRIPTION" },
        alt: { type: "text", label: "IMAGE ALT TEXT" },
      },
    },
    detailCards: {
      label: "DETAIL CARDS (3 RECOMMENDED)",
      type: "array",
      getItemSummary: (item, index) => item.title || `Detail ${(index || 0) + 1}`,
      arrayFields: {
        title: { type: "text", label: "CARD TITLE" },
        items: {
          label: "FEATURE ITEMS",
          type: "array",
          getItemSummary: (item) => item.text || "Feature",
          arrayFields: {
            text: { type: "text", label: "FEATURE TEXT" },
          },
        },
      },
    },
    ctaText: { label: "CTA BUTTON TEXT", type: "text" },
    ctaHref: { label: "CTA BUTTON LINK", type: "text" },
    primaryColor: { label: "PRIMARY COLOR (BRAND)", type: "text" },
    textColor: { label: "TEXT COLOR", type: "text" },
    backgroundColor: { label: "BACKGROUND COLOR", type: "text" },
  },
  defaultProps: {
    title: "ইন্ডিয়ান এমব্রয়ডারি,",
    subtitle: "পাঞ্জাবি সাশ্রয় দামে - আজকের সেরা ডিল",
    imageCards: [
      {
        image: (heroMain as any).src,
        title: "ফিল:",
        description: "সফট, স্কিন-ফ্রেন্ডলি, আরামদায়ক",
        alt: "Fabric quality showcase"
      },
      {
        image: (heroOverlay as any).src,
        title: "থিকনেস:",
        description: "রাজকীয় কারুকাজে অভিজাত্যের ছোঁয়া",
        alt: "Embroidery detail showcase"
      },
      {
        image: (jannat as any).src,
        title: "ফ্রি অফার:",
        description: "প্রিমিয়াম কোয়ালিটির পায়জামা সম্পূর্ণ ফ্রি!",
        alt: "Free payjama offer"
      },
    ],
    detailCards: [
      {
        title: "Design & Cut",
        items: [
          { text: "Modern Quality silhouette" },
          { text: "Clean finishing & elegant tailoring" },
          { text: "এমন ডিজাইন যা আলাদা করে নজর কাড়ে" },
        ],
      },
      {
        title: "Fit & Styling",
        items: [
          { text: "Comfortable fit – ঢিলাও না, আঁটসাঁটও না" },
          { text: "Casual, festive বা semi-formal—সব জায়গায় মানানসই" },
          { text: "Dupatta ও dress balance perfectly matched" },
        ],
      },
      {
        title: "Color & Variations",
        items: [
          { text: "Trend-based colour selection" },
          { text: "Limited colour runs (স্টক শেষ হলে আর আসবে না)" },
        ],
      },
    ],
    ctaText: "এখনই অর্ডার করুন",
    ctaHref: "#order-form",
    primaryColor: "#F36621",
    textColor: "#27272a",
    backgroundColor: "#f3f4f6",
  },
  render: (props) => (
    <DesignAndFitUI
      title={props.title}
      subtitle={props.subtitle}
      imageCards={props.imageCards || []}
      detailCards={props.detailCards || []}
      ctaButton={{
        text: props.ctaText || "এখনই অর্ডার করুন",
        href: props.ctaHref || "#order-form"
      }}
      colors={{
        primary: props.primaryColor,
        text: props.textColor,
        background: props.backgroundColor
      }}
    />
  ),
};
