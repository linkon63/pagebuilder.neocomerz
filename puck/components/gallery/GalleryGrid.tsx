import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "@/puck/types/puck";
import { ImageUpload } from "@/components/ImageUpload";
import { VersionPicker, GallerySkeletons } from "@/components/VersionPicker";
import { GalleryGrid as GalleryGridUI } from "neocomerz-storefront-ui";

const VERSION_OPTIONS = [
  { value: "default", label: "Default", description: "Featured 2x2 + grid",       preview: GallerySkeletons.grid },
  { value: "v1",      label: "v1",      description: "Left-aligned featured grid", preview: GallerySkeletons.grid },
  { value: "v2",      label: "v2",      description: "Uniform grid layout",        preview: GallerySkeletons.grid6 },
  { value: "v3",      label: "v3",      description: "Masonry style",              preview: GallerySkeletons.col },
  { value: "v4",      label: "v4",      description: "Dark overlay grid",          preview: GallerySkeletons.grid },
  { value: "v5",      label: "v5",      description: "Rounded card grid",          preview: GallerySkeletons.grid },
];

export const GalleryGrid: ComponentConfig<any> = {
  label: "Gallery Grid (9 Pack)",
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
      type: "array", label: "IMAGES (max 9)",
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
    title: "Curated Collection",
    description: "Explore our visually stunning grid of premium products.",
    images: [
      { src: "/ui-images/products/product1.webp", alt: "Featured" },
      { src: "/ui-images/products/product2.webp", alt: "Product 1" },
      { src: "/ui-images/products/product3.webp", alt: "Product 2" },
      { src: "/ui-images/products/product4.webp", alt: "Product 3" },
      { src: "/ui-images/products/product5.webp", alt: "Product 4" },
    ],
  },
  render: (props: any) => <GalleryGridUI {...props} />,
};
