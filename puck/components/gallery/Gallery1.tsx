import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../../types/puck";
import { ImageUpload } from "../../../components/ImageUpload";
import Gallery1UI from "../../../ui-package/Gallery1";

export const Gallery1: ComponentConfig<PuckProps["Gallery1"]> = {
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
    images: {
      type: "array",
      getItemSummary: (item) => item.alt || "Image",
      arrayFields: {
        src: {
          label: "Image",
          type: "custom",
          render: ({ value, onChange }) => (
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
      { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800", alt: "Product 1" },
      { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800", alt: "Product 2" },
      { src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800", alt: "Product 3" },
      { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", alt: "Product 4" },
    ],
  },
  render: (props) => {
    return <Gallery1UI {...props} />;
  },
};
