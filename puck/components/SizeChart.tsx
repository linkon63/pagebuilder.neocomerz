import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import { SizeChartUI } from "neocomerz-storefront-ui";

export const SizeChart: ComponentConfig<PuckProps["SizeChart"]> = {
  label: "Size Chart Component",
  fields: {
    title: { type: "text", label: "TITLE" },
    description: { type: "textarea", label: "DESCRIPTION" },
    sizeData: {
      label: "SIZE DATA",
      type: "array",
      getItemSummary: (item, index) => item.measurement || `Row ${(index || 0) + 1}`,
      arrayFields: {
        measurement: { type: "text", label: "MEASUREMENT" },
        description: { type: "text", label: "DESCRIPTION" },
        m: { type: "text", label: "M" },
        l: { type: "text", label: "L" },
        xl: { type: "text", label: "XL" },
        xxl: { type: "text", label: "XXL" },
      },
    },
    chartImage: {
      type: "custom",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
      label: "CHART IMAGE",
    },
    chartImageAlt: { type: "text", label: "CHART IMAGE ALT" },
    whatsappText: { type: "text", label: "WHATSAPP TEXT" },
    whatsappNumber: { type: "text", label: "WHATSAPP NUMBER" },
    contactText: { type: "text", label: "CONTACT TEXT" },
    returnPolicy: { type: "textarea", label: "RETURN POLICY" },
    primaryColor: { type: "text", label: "PRIMARY COLOR" },
    textColor: { type: "text", label: "TEXT COLOR" },
    backgroundColor: { type: "text", label: "BACKGROUND COLOR" },
  },
  defaultProps: {
    title: "সাইজ চার্ট",
    description: "",
    sizeData: [
      {
        measurement: "Chest",
        description: "Measured across the chest when laid flat.",
        m: "43",
        l: "46",
        xl: "48",
        xxl: "50",
      },
      {
        measurement: "Length",
        description: "Measured from high point shoulder to finished hem.",
        m: "44",
        l: "44",
        xl: "45",
        xxl: "46",
      },
    ],
    chartImage: "/ui-images/panjabi-chart.png",
    chartImageAlt: "Sweatshirt measurement guide",
    whatsappText: "যেকোন প্রয়োজনে",
    whatsappNumber: "01712508063",
    contactText: "যোগাযোগ করুন",
    returnPolicy: "অবশ্যই 100% কনফার্ম হয়ে অর্ডারটি করবেন। সাইজে প্রবলেম হলে অথবা অন্য কোন সমস্যা হলে রিটার্ন বা এক্সচেঞ্জ করে নিতে পারবেন ৩ দিনের ভেতরে।",
    primaryColor: "#10b981",
    textColor: "#27272a",
    backgroundColor: "#ffffff",
  },
  render: (props) => <SizeChartUI {...props} />,
};
