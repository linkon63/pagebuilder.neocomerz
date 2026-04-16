import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "@/puck/types/puck";
import { ImageUpload } from "@/components/ImageUpload";
import { GalleryGridUI } from "neocomerz-storefront-ui";

export const GalleryGrid: ComponentConfig<PuckProps["GalleryGrid"]> = {
  label: "Gallery Grid (9 Pack)",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    images: {
      label: "Images (Max 9)",
      type: "array",
      getItemSummary: (item: any) => item.alt || "Image",
      arrayFields: {
        src: {
          label: "Image",
          type: "custom",
          render: ({ value, onChange }: any) => (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Image</label>
              <ImageUpload value={value} onChange={onChange} />
            </div>
          ),
        },
        alt: { type: "text", label: "Alt Text" },
      },
      defaultItemProps: {
        src: "",
        alt: "",
      },
    },
  },
  defaultProps: {
    title: "Curated Collection",
    description: "Explore our visually stunning grid of premium products and lifestyle shots.",
    images: [
      { src: "/ui-images/products/product1.webp", alt: "Featured" },
      { src: "/ui-images/products/product2.webp", alt: "Product 1" },
      { src: "/ui-images/products/product3.webp", alt: "Product 2" },
      { src: "/ui-images/products/product4.webp", alt: "Product 3" },
      { src: "/ui-images/products/product5.webp", alt: "Product 4" },
    ],
  },
  render: (props: any) => {
    return <GalleryGridUI {...props} />;
  },
};
