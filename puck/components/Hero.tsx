import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import { Hero as HeroUI } from "neocomerz-storefront-ui";

export const Hero: ComponentConfig<PuckProps["Hero"]> = {
  fields: {
    backgroundImage: {
      type: "custom",
      label: "BACKGROUND IMAGE",
      render: ({ value, onChange }) => (
        <ImageUpload value={value} onChange={onChange} />
      )
    },
    logoSrc: {
      type: "custom",
      label: "LOGO SRC",
      render: ({ value, onChange }) => (
        <ImageUpload value={value} onChange={onChange} />
      )
    },
    logoAlt: { type: "text", label: "LOGO ALT" },
    logoWidth: { type: "number", label: "LOGO WIDTH" },
    logoHeight: { type: "number", label: "LOGO HEIGHT" },
    title: { type: "text", label: "TITLE" },
    titleSize: { type: "text", label: "TITLE SIZE" },
    subtitle: { type: "text", label: "SUBTITLE" },
    subtitleSize: { type: "text", label: "SUBTITLE SIZE" },
    discountTag: { type: "text", label: "DISCOUNT TAG" },
    discountTagSize: { type: "text", label: "DISCOUNT TAG SIZE" },
    ctaText: { type: "text", label: "CTA TEXT" },
    ctaHref: { type: "text", label: "CTA HREF" },
    secondaryCtaText: { type: "text", label: "SECONDARY CTA TEXT" },
    secondaryCtaHref: { type: "text", label: "SECONDARY CTA HREF" },
    overlayOpacity: { type: "number", label: "OVERLAY OPACITY" },
    overlayColor: { type: "text", label: "OVERLAY COLOR" },
    textAlignment: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    contentAlignment: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    primaryColor: { type: "text" },
    textColor: { type: "text" },
  },
  defaultProps: {
    backgroundImage: "/ui-images/heroBg.jpg",
    logoSrc: "/ui-images/neoComerz-logo.svg",
    title: "STYLISH & COMFORTABLE",
    subtitle: "SUMMER COLLECTION",
    discountTag: "UP TO 50% OFF",
    ctaText: "SHOP NOW",
    ctaHref: "#",
    logoAlt: "Logo",
    logoWidth: 150,
    logoHeight: 50,
    overlayOpacity: 10,
    overlayColor: "#000000",
    textAlignment: "center",
    contentAlignment: "right",
    primaryColor: "#F36621",
    textColor: "#222F28",
  },
  render: (props) => <HeroUI {...props} />,
};
