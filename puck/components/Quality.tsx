import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { Quality as QualityUI } from "neocomerz-storefront-ui";
import { ImageUpload } from "../../components/ImageUpload";
import { VersionPicker, QualitySkeletons } from "../../components/VersionPicker";
import { ColorPicker } from "../../components/ColorPicker";

const VERSION_OPTIONS = [
  { value: "v1", label: "Classic",  description: "Image cards + detail cards grid", preview: QualitySkeletons.v1 },
  { value: "v2", label: "Split",    description: "Split layout with side cards",    preview: QualitySkeletons.v2 },
  { value: "v3", label: "Timeline", description: "Vertical timeline style",         preview: QualitySkeletons.v3 },
  { value: "v4", label: "Dark",     description: "Dark mosaic theme",               preview: QualitySkeletons.v4 },
  { value: "v5", label: "Overlap",  description: "Overlapping image cards",         preview: QualitySkeletons.v5 },
];

export const Quality: ComponentConfig<any> = {
  label: "Quality Section",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "v1"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    title:    { type: "text",     label: "TITLE" },
    subtitle: { type: "textarea", label: "SUBTITLE" },
    imageCards: {
      type: "array", label: "IMAGE CARDS",
      getItemSummary: (item, i) => item.title || `Card ${(i || 0) + 1}`,
      arrayFields: {
        image: {
          type: "custom", label: "IMAGE",
          render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
        },
        title:       { type: "text", label: "TITLE" },
        description: { type: "text", label: "DESCRIPTION" },
        alt:         { type: "text", label: "ALT TEXT" },
      },
    },
    detailCards: {
      type: "array", label: "DETAIL CARDS",
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
    title: "আমাদের কোয়ালিটি গ্যারান্টি",
    subtitle: "প্রতিটি পণ্যে আমরা যা নিশ্চিত করি",
    imageCards: [
      { image: "", title: "ফ্যাব্রিক টেস্ট",   description: "প্রতিটি কাপড় ৫ ধাপে টেস্ট করা হয়",  alt: "Fabric Testing" },
      { image: "", title: "স্টিচিং",            description: "ডাবল স্টিচ দিয়ে দীর্ঘস্থায়ী করা হয়", alt: "Stitching Quality" },
      { image: "", title: "কালার ফাস্টনেস",     description: "ধোয়ার পরেও রং থাকে অক্ষুণ্ণ",        alt: "Color Fastness" },
    ],
    detailCards: [
      { title: "Raw Material",   items: [{ text: "100% Premium Cotton ব্যবহার করা হয়" }, { text: "Indian Embroidery Thread — ওয়াশেবল এবং টেকসই" }, { text: "Eco-friendly Dyes — ত্বকে নিরাপদ" }] },
      { title: "Manufacturing",  items: [{ text: "দক্ষ কারিগর দ্বারা হাতে তৈরি" }, { text: "প্রতিটি সেলাই মেশিন + হ্যান্ড ফিনিশিং" }, { text: "QC পাস না হলে প্রোডাক্ট রিজেক্ট" }] },
      { title: "Packaging",      items: [{ text: "প্রিমিয়াম বক্স প্যাকেজিং" }, { text: "গিফট-ready presentation" }] },
    ],
    ctaText: "এখনই অর্ডার করুন",
    ctaHref: "#order-form",
    primaryColor: "#F36621",
    textColor: "#27272a",
    backgroundColor: "#f3f4f6",
  },
  render: (props) => (
    <QualityUI
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
