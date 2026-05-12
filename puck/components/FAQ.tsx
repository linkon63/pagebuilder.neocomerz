import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { FAQ as FAQUI } from "neocomerz-storefront-ui";
import { ColorPicker } from "../../components/ColorPicker";
import { VersionPicker, FAQSkeletons } from "../../components/VersionPicker";

const VERSION_OPTIONS = [
  { value: "default", label: "Default", description: "Split card + accordion",   preview: FAQSkeletons.default },
  { value: "v1",      label: "v1",      description: "Centered accordion",       preview: FAQSkeletons.v1 },
  { value: "v2",      label: "v2",      description: "Dark background",          preview: FAQSkeletons.v2 },
  { value: "v3",      label: "v3",      description: "Side-by-side layout",      preview: FAQSkeletons.v3 },
  { value: "v4",      label: "v4",      description: "Minimal top header",       preview: FAQSkeletons.v4 },
  { value: "v5",      label: "v5",      description: "2-col grid accordion",     preview: FAQSkeletons.v5 },
];

export const FAQ: ComponentConfig<any> = {
  label: "FAQ Section",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "default"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    heading:          { type: "text",     label: "HEADING" },
    descriptionPart1: { type: "textarea", label: "DESCRIPTION PART 1" },
    descriptionPart2: { type: "text",     label: "DESCRIPTION HIGHLIGHT" },
    descriptionPart3: { type: "textarea", label: "DESCRIPTION PART 3" },
    contactLabel:     { type: "text",     label: "CONTACT LABEL" },
    contactNumber:    { type: "text",     label: "CONTACT NUMBER" },
    faqs: {
      type: "array", label: "FAQS",
      getItemSummary: (item) => item.question || "FAQ Item",
      arrayFields: {
        question: { type: "text",     label: "QUESTION" },
        answer:   { type: "textarea", label: "ANSWER" },
      },
      defaultItemProps: { question: "New FAQ Question", answer: "Answer goes here." },
    },
    primaryColor: {
      type: "custom", label: "PRIMARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Primary Color" value={value || "#5b21b6"} onChange={onChange} />,
    },
    backgroundColor: {
      type: "custom", label: "BACKGROUND COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Background Color" value={value || "#ede9fe"} onChange={onChange} />,
    },
    faqBackgroundColor: {
      type: "custom", label: "FAQ CARD BACKGROUND",
      render: ({ value, onChange }) => <ColorPicker label="FAQ Card BG" value={value || "#f5f5f5"} onChange={onChange} />,
    },
  },
  defaultProps: {
    version: "default",
    heading: "সাধারণ প্রশ্ন",
    descriptionPart1: "আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট! ",
    descriptionPart2: "আমরা সর্বোচ্চ মানের সেবা ও পণ্য দেওয়ার চেষ্টা করি,",
    descriptionPart3: " যা প্রত্যাশার থেকেও বেশি আনন্দ দেয়।",
    contactLabel: "যেকোনো প্রয়োজনে",
    contactNumber: "01712508063",
    faqs: [
      { question: "৩–৫ দিনের মধ্যে বাংলাদেশে পৌঁছে যাবে", answer: "আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট।" },
      { question: "৭ দিনের মধ্যে full refund যদি সমস্যা থাকে", answer: "আমরা আপনার সন্তুষ্টির জন্য প্রতিশ্রুতিবদ্ধ।" },
      { question: "Fabric & embroidery quality guarantee", answer: "আমাদের সমস্ত পণ্য সর্বোচ্চ মানের ফ্যাব্রিক দিয়ে তৈরি।" },
      { question: "Cold wash, gentle drying recommended", answer: "ঠান্ডা পানিতে ধোয়া এবং হালকা শুকানো সুপারিশ করা হয়।" },
    ],
    primaryColor: "#5b21b6",
    backgroundColor: "#ede9fe",
    faqBackgroundColor: "#f5f5f5",
  },
  render: (props) => (
    <FAQUI
      version={props.version}
      heading={props.heading}
      descriptionPart1={props.descriptionPart1}
      descriptionPart2={props.descriptionPart2}
      descriptionPart3={props.descriptionPart3}
      contactLabel={props.contactLabel}
      contactNumber={props.contactNumber}
      faqs={props.faqs || []}
      colors={{ primary: props.primaryColor, background: props.backgroundColor, faqBackground: props.faqBackgroundColor }}
    />
  ),
};
