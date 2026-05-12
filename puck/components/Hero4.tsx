import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { Hero4 as Hero4UI } from "neocomerz-storefront-ui";
import { ImageUpload } from "../../components/ImageUpload";

export const Hero4: ComponentConfig<any> = {
  label: "Hero — Cinematic",
  fields: {
    leftLeafImage: {
      type: "custom",
      label: "LEFT DECORATION",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    rightLeafImage: {
      type: "custom",
      label: "RIGHT DECORATION",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    mangoBannerImage: {
      type: "custom",
      label: "BANNER / BACKGROUND IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    mangoCircleImage: {
      type: "custom",
      label: "CENTER CIRCLE IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    titleLine1: { type: "text", label: "TITLE LINE 1" },
    titleLine2: { type: "text", label: "TITLE LINE 2 (accent)" },
    titleLine3: { type: "text", label: "TITLE LINE 3" },
    badgeTextLine1: { type: "text", label: "BADGE TEXT LINE 1" },
    badgeTextLine2: { type: "text", label: "BADGE TEXT LINE 2" },
    description: { type: "textarea", label: "DESCRIPTION" },
    ctaText: { type: "text", label: "CTA TEXT" },
    ctaHref: { type: "text", label: "CTA HREF" },
    phoneNumber: { type: "text", label: "PHONE NUMBER" },
  },
  defaultProps: {
    leftLeafImage: "",
    rightLeafImage: "",
    mangoBannerImage: "",
    mangoCircleImage: "",
    titleLine1: "খাঁটি, রসালো ও",
    titleLine2: "ফরমালিনমুক্ত ",
    titleLine3: "আমের নিশ্চয়তা",
    badgeTextLine1: "100%",
    badgeTextLine2: "ফরমালিনমুক্ত",
    description: "আমাদের বাগান থেকে সরাসরি সংগ্রহ করা টাটকা, রসালো ও কেমিক্যালমুক্ত দেশি আম।",
    ctaText: "অর্ডার করুন",
    ctaHref: "#order-form",
    phoneNumber: "01712508063",
  },
  render: (props) => (
    <Hero4UI
      leftLeafImage={props.leftLeafImage}
      rightLeafImage={props.rightLeafImage}
      mangoBannerImage={props.mangoBannerImage}
      mangoCircleImage={props.mangoCircleImage}
      titleLine1={props.titleLine1}
      titleLine2={props.titleLine2}
      titleLine3={props.titleLine3}
      badgeTextLine1={props.badgeTextLine1}
      badgeTextLine2={props.badgeTextLine2}
      description={props.description}
      ctaText={props.ctaText}
      ctaHref={props.ctaHref}
      phoneNumber={props.phoneNumber}
    />
  ),
};
