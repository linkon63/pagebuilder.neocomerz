import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "@/puck/types/puck";
import { ImageUpload } from "@/components/ImageUpload";
import GalleryColUI from "@/ui-package/GalleryCol";

import img1 from "@/ui-package/images/productFeature-3.jpg";
import img2 from "@/ui-package/images/feature-4.jpg";
import img3 from "@/ui-package/images/ProductImage1.webp";
import img4 from "@/ui-package/images/ProductImage2.webp";

export const GalleryCol: ComponentConfig<PuckProps["GalleryCol"]> = {
  label: "Gallery Column",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    images: {
      label: "Images (Max 4)",
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
    title: "Our Product Gallery",
    description: "Check out our latest collection and high-quality product images.",
    images: [
      { src: (img1 as any).src, alt: "Product 1" },
      { src: (img2 as any).src, alt: "Product 2" },
      { src: (img3 as any).src, alt: "Product 3" },
      { src: (img4 as any).src, alt: "Product 4" },
    ],
  },
  render: (props: any) => {
    return <GalleryColUI {...props} />;
  },
};
