import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import OrderFormUI from "@/ui-package/OrderForm";

import productImage from "@/ui-package/images/products/product2.webp";

export const OrderForm: ComponentConfig<PuckProps["OrderForm"]> = {
  label: "Order Form Component",
  fields: {
    title: { type: "text", label: "TITLE" },
    description: { type: "textarea", label: "DESCRIPTION" },
    submitButtonText: { type: "text", label: "SUBMIT BUTTON TEXT" },
    productImage: {
      type: "custom",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
      label: "PRODUCT IMAGE"
    },
    productImageAlt: { type: "text", label: "PRODUCT IMAGE ALT" },
    productName: { type: "text", label: "PRODUCT NAME" },
    productPrice: { type: "text", label: "PRODUCT PRICE" },
    shippingOptions: {
      type: "array",
      label: "SHIPPING OPTIONS",
      getItemSummary: (item, index) => item.label || `Option ${(index || 0) + 1}`,
      arrayFields: {
        id: { type: "text", label: "ID" },
        label: { type: "text", label: "LABEL" },
        price: { type: "number", label: "PRICE" },
      },
    },
    namePlaceholder: { type: "text", label: "NAME PLACEHOLDER" },
    phonePlaceholder: { type: "text", label: "PHONE PLACEHOLDER" },
    addressPlaceholder: { type: "textarea", label: "ADDRESS PLACEHOLDER" },
    notesPlaceholder: { type: "text", label: "NOTES PLACEHOLDER" },
    cashOnDeliveryText: { type: "text", label: "CASH ON DELIVERY TEXT" },
    primaryColor: { type: "text", label: "PRIMARY COLOR" },
    textColor: { type: "text", label: "TEXT COLOR" },
    backgroundColor: { type: "text", label: "BACKGROUND COLOR" },
  },
  defaultProps: {
    title: "Stock সীমিত – আজই অর্ডার করুন!",
    description: "অর্ডার করতে নীচের ফর্মটি পূরণ করুন এবং অর্ডার করুন বাটনে ক্লিক করুন!",
    submitButtonText: "অর্ডার কনফার্ম করুন",
    productImage: (productImage as any).src,
    productImageAlt: "Premium Quality Panjabi",
    productName: "প্রিমিয়াম Quality Panjabi",
    productPrice: "৳1499",
    shippingOptions: [
      { id: "dhaka_city", label: "ঢাকা শহর", price: 70 },
      { id: "dhaka_suburbs", label: "ঢাকার আশেপাশের এলাকা", price: 100 },
      { id: "outside_dhaka", label: "ঢাকার বাইরে", price: 130 },
    ],
    namePlaceholder: "আপনার নাম",
    phonePlaceholder: "+8801 XXX XXXXXX",
    addressPlaceholder: "আপনার ঠিকানা",
    notesPlaceholder: "লিখুন",
    cashOnDeliveryText: "Cash on delivery. We prioritizing frictionless payments",
    primaryColor: "#F36621",
    textColor: "#27272a",
    backgroundColor: "#f3e8ff",
  },
  render: (props) => <OrderFormUI {...props} />,
};
