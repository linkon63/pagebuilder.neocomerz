import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "@/puck/types/puck";
import { ImageUpload } from "@/components/ImageUpload";
import { VersionPicker, GallerySkeletons } from "@/components/VersionPicker";
import { GalleryCol as GalleryColUI } from "neocomerz-storefront-ui";

const VERSION_OPTIONS = [
  { value: "default", label: "Default", description: "4-col equal grid",          preview: GallerySkeletons.col },
  { value: "v1",      label: "v1",      description: "Left-aligned title + grid", preview: GallerySkeletons.col },
  { value: "v2",      label: "v2",      description: "Masonry column layout",     preview: GallerySkeletons.col },
  { value: "v3",      label: "v3",      description: "Overlay hover effect",      preview: GallerySkeletons.col },
  { value: "v4",      label: "v4",      description: "Dark background grid",      preview: GallerySkeletons.col },
  { value: "v5",      label: "v5",      description: "Rounded card style",        preview: GallerySkeletons.col },
];

export const GalleryCol: ComponentConfig<any> = {
  label: "Gallery Column",
  fields: {
    version: {
      type: "custom", label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker value={value || "default"} onChange={(v) => onChange(v as any)} options={VERSION_OPTIONS} />
      ),
    },
    title:       { type: "text",     label: "TITLE" },
    description: { type: "textarea", label: "DESCRIPTION" },
    images: {
      type: "array", label: "IMAGES (max 4)",
      getItemSummary: (item: any) => item.alt || "Image",
      arrayFields: {
        src: {
          type: "custom", label: "IMAGE",
          render: ({ value, onChange }: any) => <ImageUpload value={value} onChange={onChange} />,
        },
        alt: { type: "text", label: "ALT TEXT" },
      },
      defaultItemProps: { src: "", alt: "" },
    },
  },
  defaultProps: {
    version: "default",
    title: "Our Product Gallery",
    description: "Check out our latest collection and high-quality product images.",
    images: [
      { src: "/ui-images/products/product1.webp", alt: "Product 1" },
      { src: "/ui-images/products/product2.webp", alt: "Product 2" },
      { src: "/ui-images/products/product3.webp", alt: "Product 3" },
      { src: "/ui-images/products/product4.webp", alt: "Product 4" },
    ],
  },
  render: (props: any) => <GalleryColUI {...props} />,
};
