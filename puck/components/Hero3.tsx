import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { Hero3 as Hero3UI } from "neocomerz-storefront-ui";
import { ImageUpload } from "../../components/ImageUpload";

export const Hero3: ComponentConfig<any> = {
  label: "Hero — Circle Focus",
  fields: {
    logoSrc: {
      type: "custom",
      label: "LOGO",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    leftLeafImage: {
      type: "custom",
      label: "LEFT DECORATION IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    rightLeafImage: {
      type: "custom",
      label: "RIGHT DECORATION IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    centerImage: {
      type: "custom",
      label: "CENTER CIRCLE IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    badgeImage: {
      type: "custom",
      label: "BADGE IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    titleLine1: { type: "text", label: "TITLE LINE 1" },
    titleLine2: { type: "text", label: "TITLE LINE 2 (accent)" },
    description: { type: "textarea", label: "DESCRIPTION" },
    priceLabel: { type: "text", label: "PRICE LABEL" },
    price: { type: "text", label: "PRICE" },
    ctaText: { type: "text", label: "CTA TEXT" },
    ctaHref: { type: "text", label: "CTA HREF" },
    phoneNumber: { type: "text", label: "PHONE NUMBER" },
  },
  defaultProps: {
    logoSrc: "",
    leftLeafImage: "",
    rightLeafImage: "",
    centerImage: "",
    badgeImage: "",
    titleLine1: "নওগাঁর ঐতিহ্যবাহী ফরমালিনমুক্ত",
    titleLine2: "নাকফজলি আম",
    description: "নাক ফজলি আম বাংলাদেশের জনপ্রিয় একটি সুস্বাদু জাত।",
    priceLabel: "প্রতিকোজি আম এখন পাচ্ছেন",
    price: "মাত্র ২০০ টাকায়",
    ctaText: "অর্ডার করুন",
    ctaHref: "#order-form",
    phoneNumber: "01712508063",
  },
  render: (props) => (
    <Hero3UI
      logoSrc={props.logoSrc}
      leftLeafImage={props.leftLeafImage}
      rightLeafImage={props.rightLeafImage}
      centerImage={props.centerImage}
      badgeImage={props.badgeImage}
      titleLine1={props.titleLine1}
      titleLine2={props.titleLine2}
      description={props.description}
      priceLabel={props.priceLabel}
      price={props.price}
      ctaText={props.ctaText}
      ctaHref={props.ctaHref}
      phoneNumber={props.phoneNumber}
    />
  ),
};
