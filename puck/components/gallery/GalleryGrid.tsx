import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "@/puck/types/puck";
import { ImageUpload } from "@/components/ImageUpload";
import GalleryGridUI from "@/ui-package/GalleryGrid";

import img1 from "@/ui-package/images/ProductImage1.webp";
import img2 from "@/ui-package/images/ProductImage2.webp";
import img3 from "@/ui-package/images/ProductImage3.webp";
import img4 from "@/ui-package/images/productFeature-1.jpg";
import img5 from "@/ui-package/images/productFeature-2.webp";

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
      { src: (img1 as any).src, alt: "Featured" },
      { src: (img2 as any).src, alt: "Product 1" },
      { src: (img3 as any).src, alt: "Product 2" },
      { src: (img4 as any).src, alt: "Product 3" },
      { src: (img5 as any).src, alt: "Product 4" },
    ],
  },
  render: (props: any) => {
    return <GalleryGridUI {...props} />;
  },
};
