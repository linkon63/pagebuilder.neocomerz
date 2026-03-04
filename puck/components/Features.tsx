import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import FeaturesUI from "../../ui-package/Features";
import { ImageUpload } from "../../components/ImageUpload";

const DEFAULT_CTA_TEXT = "এখনই অর্ডার করুন";
const DEFAULT_CTA_HREF = "#order-form";
const DEFAULT_TAGLINE = "এটা শুধু একটা ড্রেস না—এটা এখনকার ফ্যাশন ট্রেন্ডের অংশ।";

const withFallbackText = (value: string | undefined, fallback: string) => {
    if (typeof value !== "string") return fallback;
    return value.trim().length > 0 ? value : fallback;
};

export const Features: ComponentConfig<PuckProps["Features"]> = {
    fields: {
        title: { label: "Title", type: "text" },
        description: { label: "Description", type: "textarea" },
        features: {
            label: "Features List",
            type: "array",
            getItemSummary: (item) => item.text || "Feature",
            arrayFields: {
                text: { type: "text", label: "Feature Text" },
            },
        },
        images: {
            label: "Image Grid (4 recommended)",
            type: "array",
            getItemSummary: (item, index) => item.alt || `Image ${(index || 0) + 1}`,
            arrayFields: {
                src: {
                    label: "Image",
                    type: "custom",
                    render: ({ value, onChange }) => (
                        <ImageUpload value={value} onChange={onChange} />
                    ),
                },
                alt: { type: "text", label: "Alt Text" },
            },
        },
        ctaText: { label: "CTA Button Text", type: "text" },
        ctaHref: { label: "CTA Button Link", type: "text" },
        tagline: { label: "Bottom Tagline", type: "text" },
        primaryColor: { label: "Primary Color (Brand)", type: "text" },
        textColor: { label: "Text Color", type: "text" },
        backgroundColor: { label: "Background Color", type: "text" },
    },
    defaultProps: {
        title: "কেন এটা আলাদা করে নজর কাড়ে",
        description: "শুধু সুন্দর নয়, আরামদায়কও। আমাদের প্রিমিয়াম কোয়ালিটির Quality Panjabi সেট আপনাকে দেবে এক অনন্য অভিজ্ঞতা। প্রতিটি স্টিচে রয়েছে আমাদের নিখুঁত কারুকার্য।",
        features: [
            { text: "Quality runway-inspired design" },
            { text: "Elegant cut & premium fall — ছবি আর বাস্তবে এক" },
            { text: "Daily wear থেকে occasion—দুই জায়গাতেই মানানসই" },
            { text: "বাংলাদেশি আবহাওয়ার জন্য comfortable fabric choice" },
        ],
        ctaText: DEFAULT_CTA_TEXT,
        ctaHref: DEFAULT_CTA_HREF,
        tagline: DEFAULT_TAGLINE,
        backgroundColor: "#ffffff",
    },
    render: (props) => (
        <FeaturesUI
            title={props.title}
            description={props.description}
            features={props.features || []}
            images={props.images && props.images.length > 0 ? props.images.map(img => ({ src: img.src || "", alt: img.alt || "" })) : undefined}
            ctaButton={{
                text: withFallbackText(props.ctaText, DEFAULT_CTA_TEXT),
                href: withFallbackText(props.ctaHref, DEFAULT_CTA_HREF)
            }}
            tagline={withFallbackText(props.tagline, DEFAULT_TAGLINE)}
            colors={{
                primary: props.primaryColor,
                text: props.textColor,
                background: props.backgroundColor
            }}
        />
    ),
};
