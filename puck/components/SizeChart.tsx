import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import { ColorPicker } from "../../components/ColorPicker";
import { VersionPicker, SizeChartSkeletons } from "../../components/VersionPicker";
import { SizeChart as SizeChartUI } from "neocomerz-storefront-ui";

const VERSION_OPTIONS = [
  { value: "default", label: "Default", description: "Table + image + policy bar", preview: SizeChartSkeletons.default },
  { value: "v1",      label: "v1",      description: "Clean table + WhatsApp CTA", preview: SizeChartSkeletons.v1 },
  { value: "v2",      label: "v2",      description: "Full-width table layout",    preview: SizeChartSkeletons.v2 },
  { value: "v3",      label: "v3",      description: "Dark theme table",           preview: SizeChartSkeletons.v3 },
  { value: "v4",      label: "v4",      description: "Minimal header style",       preview: SizeChartSkeletons.v4 },
  { value: "v5",      label: "v5",      description: "Split 2-col layout",         preview: SizeChartSkeletons.v5 },
];

export const SizeChart: ComponentConfig<any> = {
  label: "Size Chart",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "default"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    title:       { type: "text",     label: "TITLE" },
    description: { type: "textarea", label: "DESCRIPTION" },
    sizeData: {
      type: "array", label: "SIZE DATA",
      getItemSummary: (item, i) => item.measurement || `Row ${(i || 0) + 1}`,
      arrayFields: {
        measurement: { type: "text", label: "MEASUREMENT" },
        description: { type: "text", label: "DESCRIPTION" },
        m:   { type: "text", label: "M" },
        l:   { type: "text", label: "L" },
        xl:  { type: "text", label: "XL" },
        xxl: { type: "text", label: "XXL" },
      },
    },
    chartImage: {
      type: "custom", label: "CHART IMAGE",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    chartImageAlt:  { type: "text",     label: "CHART IMAGE ALT" },
    whatsappText:   { type: "text",     label: "WHATSAPP TEXT" },
    whatsappNumber: { type: "text",     label: "WHATSAPP NUMBER" },
    contactText:    { type: "text",     label: "CONTACT TEXT" },
    returnPolicy:   { type: "textarea", label: "RETURN POLICY" },
    primaryColor: {
      type: "custom", label: "PRIMARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Primary Color" value={value || "#10b981"} onChange={onChange} />,
    },
    textColor: {
      type: "custom", label: "TEXT COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Text Color" value={value || "#27272a"} onChange={onChange} />,
    },
    backgroundColor: {
      type: "custom", label: "BACKGROUND COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Background Color" value={value || "#ffffff"} onChange={onChange} />,
    },
  },
  defaultProps: {
    version: "default",
    title: "সাইজ চার্ট",
    description: "",
    sizeData: [
      { measurement: "Chest",  description: "Measured across the chest when laid flat.", m: "43", l: "46", xl: "48", xxl: "50" },
      { measurement: "Length", description: "Measured from high point shoulder to hem.",  m: "44", l: "44", xl: "45", xxl: "46" },
    ],
    chartImage: "/ui-images/panjabi-chart.png",
    chartImageAlt: "Size measurement guide",
    whatsappText: "যেকোন প্রয়োজনে",
    whatsappNumber: "01712508063",
    contactText: "যোগাযোগ করুন",
    returnPolicy: "অবশ্যই 100% কনফার্ম হয়ে অর্ডারটি করবেন। সাইজে প্রবলেম হলে রিটার্ন বা এক্সচেঞ্জ করে নিতে পারবেন ৩ দিনের ভেতরে।",
    primaryColor: "#10b981",
    textColor: "#27272a",
    backgroundColor: "#ffffff",
  },
  render: (props: any) => <SizeChartUI {...props} />,
};
