import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import FAQUI from "@/ui-package/FAQ";

export const FAQ: ComponentConfig<PuckProps["FAQ"]> = {
  fields: {
    heading: { type: "text", label: "HEADING" },
    descriptionPart1: { type: "textarea", label: "DESCRIPTION PART 1" },
    descriptionPart2: { type: "text", label: "DESCRIPTION HIGHLIGHT (PART 2)" },
    descriptionPart3: { type: "textarea", label: "DESCRIPTION PART 3" },
    contactLabel: { type: "text", label: "CONTACT LABEL" },
    contactNumber: { type: "text", label: "CONTACT NUMBER" },
    faqs: {
      type: "array",
      label: "FAQS",
      getItemSummary: (item) => item.question || "FAQ Item",
      arrayFields: {
        question: { type: "text", label: "QUESTION" },
        answer: { type: "textarea", label: "ANSWER" },
      },
      defaultItemProps: {
        question: "New FAQ Question",
        answer: "Answer to the new question goes here.",
      }
    },
    primaryColor: { type: "text", label: "PRIMARY COLOR (e.g., #5b21b6)" },
    backgroundColor: { type: "text", label: "BACKGROUND COLOR (e.g., #ede9fe)" },
    faqBackgroundColor: { type: "text", label: "FAQ BG COLOR (e.g., #f5f5f5)" },
  },
  defaultProps: {
    heading: "সাধারণ প্রশ্ন",
    descriptionPart1: "আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট! প্রথম যোগাযোগ থেকে শুরু করে চূড়ান্ত ডেলিভারি পর্যন্ত ",
    descriptionPart2: "আমরা সর্বোচ্চ মানের সেবা ও পণ্য দেওয়ার চেষ্টা করি,",
    descriptionPart3: " যা প্রত্যাশার থেকেও বেশি আনন্দ দেয়।",
    contactLabel: "যেকোনো প্রয়োজনে",
    contactNumber: "01712508063",
    faqs: [
      {
        question: '৩–৫ দিনের মধ্যে বাংলাদেশে পৌঁছে যাবে',
        answer: 'আমাদের গ্রাহকরা সবসময়ই আমাদের অভিজ্ঞতা নিয়ে সন্তুষ্ট! প্রথম যোগাযোগ থেকে শুরু করে চূড়ান্ত ডেলিভারি পর্যন্ত আমরা সর্বোচ্চ মানের সেবা ও পণ্য দেওয়ার চেষ্টা করি, যা প্রত্যাশার থেকেও বেশি আনন্দ দেয়।',
      },
      {
        question: '৭ দিনের মধ্যে full refund যদি সমস্যা থাকে',
        answer: 'আমরা আপনার সন্তুষ্টির জন্য প্রতিশ্রুতিবদ্ধ। যদি কোনো সমস্যা থাকে, আমরা সম্পূর্ণ অর্থ ফেরত দেব।',
      },
      {
        question: 'Fabric & embroidery quality guarantee',
        answer: 'আমাদের সমস্ত পণ্য সর্বোচ্চ মানের ফ্যাব্রিক এবং সূচিকর্ম দিয়ে তৈরি।',
      },
      {
        question: 'Cold wash, gentle drying recommended',
        answer: 'আপনার পোশাকের যত্ন নিতে ঠান্ডা পানিতে ধোয়া এবং হালকা শুকানো সুপারিশ করা হয়।',
      },
    ],
    primaryColor: "#5b21b6",
    backgroundColor: "#ede9fe",
    faqBackgroundColor: "#f5f5f5",
  },
  render: (props) => (
    <FAQUI
      heading={props.heading}
      descriptionPart1={props.descriptionPart1}
      descriptionPart2={props.descriptionPart2}
      descriptionPart3={props.descriptionPart3}
      contactLabel={props.contactLabel}
      contactNumber={props.contactNumber}
      faqs={props.faqs || []}
      colors={{
        primary: props.primaryColor,
        background: props.backgroundColor,
        faqBackground: props.faqBackgroundColor
      }}
    />
  ),
};
