import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { Hero2 as Hero2UI } from "neocomerz-storefront-ui";
import { ImageUpload } from "../../components/ImageUpload";

export const Hero2: ComponentConfig<PuckProps["Hero2"]> = {
  label: "Hero — Organic / Nature",
  fields: {
    backgroundImage: {
      type: "custom",
      label: "BACKGROUND IMAGE",
      render: ({ value, onChange }) => (
        <ImageUpload value={value} onChange={onChange} />
      ),
    },
    logoSrc: {
      type: "custom",
      label: "LOGO",
      render: ({ value, onChange }) => (
        <ImageUpload value={value} onChange={onChange} />
      ),
    },
    logoAlt: { type: "text", label: "LOGO ALT" },
    titlePart1: { type: "text", label: "TITLE PART 1 (normal color)" },
    titlePart2: { type: "text", label: "TITLE PART 2 (accent color)" },
    titlePart3: { type: "text", label: "TITLE PART 3 (normal color)" },
    description: { type: "textarea", label: "DESCRIPTION" },
    ctaText: { type: "text", label: "CTA TEXT" },
    ctaHref: { type: "text", label: "CTA HREF" },
  },
  defaultProps: {
    backgroundImage: "",
    logoSrc: "",
    logoAlt: "Logo",
    titlePart1: "সম্পূর্ণ ফরমালিনমুক্ত নওগাঁর ",
    titlePart2: "নাকফজলি",
    titlePart3: " আমের মেলা",
    description: "নাক ফজলি আম বাংলাদেশের জনপ্রিয় একটি সুস্বাদু জাত, যা আকারে বড়, লম্বাটে ও হালকা বাঁকানো।",
    ctaText: "অর্ডার করুন",
    ctaHref: "#order-form",
  },
  render: (props) => (
    <Hero2UI
      backgroundImage={props.backgroundImage}
      logoSrc={props.logoSrc}
      logoAlt={props.logoAlt}
      titlePart1={props.titlePart1}
      titlePart2={props.titlePart2}
      titlePart3={props.titlePart3}
      description={props.description}
      ctaText={props.ctaText}
      ctaHref={props.ctaHref}
    />
  ),
};
