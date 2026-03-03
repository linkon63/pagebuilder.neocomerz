import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "@/puck/types/puck";
import { ImageUpload } from "@/components/ImageUpload";
import GalleryGrid6UI from "@/ui-package/GalleryGrid6";

import img1 from "@/ui-package/images/products/product1.webp";
import img2 from "@/ui-package/images/products/product2.webp";
import img3 from "@/ui-package/images/products/product3.webp";
import img4 from "@/ui-package/images/products/product4.webp";
import img5 from "@/ui-package/images/products/product5.webp";

export const GalleryGrid6: ComponentConfig<PuckProps["GalleryGrid6"]> = {
  label: "Gallery Grid (6 Pack)",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    images: {
      label: "Images (Max 6)",
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
    title: "Premium Collection",
    description: "A specialized 6-pack grid for your finest products.",
    images: [
      { src: (img1 as any).src, alt: "Featured" },
      { src: (img2 as any).src, alt: "Product 1" },
      { src: (img3 as any).src, alt: "Product 2" },
      { src: (img4 as any).src, alt: "Product 3" },
      { src: (img5 as any).src, alt: "Product 4" },
      { src: (img1 as any).src, alt: "Product 5" },
    ],
  },
  render: (props: any) => {
    return <GalleryGrid6UI {...props} />;
  },
};
