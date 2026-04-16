import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import TestimonialsUI from "@/ui-package/Testimonials";
import { ImageUpload } from "../../components/ImageUpload";

export const Testimonials: ComponentConfig<PuckProps["Testimonials"]> = {
  fields: {
    title: { type: "text", label: "TITLE" },
    description: { type: "textarea", label: "DESCRIPTION" },
    images: {
      type: "array",
      label: "IMAGES",
      getItemSummary: (item, index) => item.alt || `Review Image ${(index || 0) + 1}`,
      arrayFields: {
        src: {
          type: "custom",
          label: "SRC",
          render: ({ value, onChange }) => (
            <ImageUpload value={value} onChange={onChange} />
          ),
        },
        alt: { type: "text", label: "ALT" },
      },
    },
    initialDisplayCount: { type: "number", label: "INITIAL DISPLAY COUNT" },
    loadMoreCount: { type: "number", label: "LOAD MORE BATCH SIZE" },
    loadMoreText: { type: "text", label: "LOAD MORE TEXT" },
    loadingText: { type: "text", label: "LOADING TEXT" },
    primaryColor: { type: "text", label: "PRIMARY COLOR" },
    textColor: { type: "text", label: "TEXT COLOR" },
    backgroundColor: { type: "text", label: "BACKGROUND COLOR" },
  },
  defaultProps: {
    title: "গ্রাহকের মতামত",
    description: "আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট! প্রথম যোগাযোগ থেকে শুরু করে চূড়ান্ত ডেলিভারি পর্যন্ত আমরা সর্বোচ্চ মানের সেবা ও পণ্য দেওয়ার চেষ্টা করি, যা প্রত্যাশার থেকেও বেশি আনন্দ দেয়।",
    images: [
      { src: '/images/review-1.jpeg', alt: 'Review 1' },
      { src: '/images/review-2.jpeg', alt: 'Review 2' },
      { src: '/images/review-2-alt.jpeg', alt: 'Review 3' },
      { src: '/images/review-3.jpeg', alt: 'Review 4' },
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
      title={props.title}
      description={props.description}
      images={props.images && props.images.length > 0 ? props.images.map(img => ({ src: img.src || "", alt: img.alt || "" })) : []}
      initialDisplayCount={props.initialDisplayCount}
      loadMoreCount={props.loadMoreCount}
      loadMoreText={props.loadMoreText}
      loadingText={props.loadingText}
      colors={{
        primary: props.primaryColor,
        text: props.textColor,
        background: props.backgroundColor
      }}
    />
  ),
};
