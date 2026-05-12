import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { Testimonials as TestimonialsUI } from "neocomerz-storefront-ui";
import { ImageUpload } from "../../components/ImageUpload";
import { ColorPicker } from "../../components/ColorPicker";
import { VersionPicker, TestimonialsSkeletons } from "../../components/VersionPicker";

const VERSION_OPTIONS = [
  { value: "default", label: "Default", description: "4-col grid layout",      preview: TestimonialsSkeletons.grid },
  { value: "v1",      label: "v1",      description: "Masonry columns",        preview: TestimonialsSkeletons.masonry },
  { value: "v2",      label: "v2",      description: "Uniform grid",           preview: TestimonialsSkeletons.grid },
  { value: "v3",      label: "v3",      description: "Slider / carousel",      preview: TestimonialsSkeletons.slider },
  { value: "v4",      label: "v4",      description: "Dark background grid",   preview: TestimonialsSkeletons.grid },
  { value: "v5",      label: "v5",      description: "Rounded card masonry",   preview: TestimonialsSkeletons.masonry },
];

export const Testimonials: ComponentConfig<any> = {
  label: "Testimonials Section",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "default"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    title:       { type: "text",     label: "TITLE" },
    description: { type: "textarea", label: "DESCRIPTION" },
    images: {
      type: "array", label: "REVIEW IMAGES",
      getItemSummary: (item, i) => item.alt || `Review ${(i || 0) + 1}`,
      arrayFields: {
        src: {
          type: "custom", label: "IMAGE",
          render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
        },
        alt: { type: "text", label: "ALT" },
      },
    },
    initialDisplayCount: { type: "number", label: "INITIAL DISPLAY COUNT" },
    loadMoreCount:       { type: "number", label: "LOAD MORE BATCH SIZE" },
    loadMoreText:        { type: "text",   label: "LOAD MORE TEXT" },
    loadingText:         { type: "text",   label: "LOADING TEXT" },
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
    version: "default",
    title: "গ্রাহকের মতামত",
    description: "আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট!",
    images: [
      { src: "/images/review-1.jpeg", alt: "Review 1" },
      { src: "/images/review-2.jpeg", alt: "Review 2" },
      { src: "/images/review-3.jpeg", alt: "Review 3" },
    ],
    initialDisplayCount: 8,
    loadMoreCount: 4,
    loadMoreText: "আরো দেখুন",
    loadingText: "লোড হচ্ছে...",
    primaryColor: "#F36621",
    textColor: "#27272a",
    backgroundColor: "#f3f4f6",
  },
  render: (props) => (
    <TestimonialsUI
      version={props.version}
      title={props.title}
      description={props.description}
      images={props.images?.length ? props.images.map((img: any) => ({ src: img.src || "", alt: img.alt || "" })) : []}
      initialDisplayCount={props.initialDisplayCount}
      loadMoreCount={props.loadMoreCount}
      loadMoreText={props.loadMoreText}
      loadingText={props.loadingText}
      colors={{ primary: props.primaryColor, text: props.textColor, background: props.backgroundColor }}
    />
  ),
};
