import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";

export const Heading: ComponentConfig<PuckProps["Heading"]> = {
  fields: {
    title: { type: "text" },
    level: {
      type: "select",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
        { label: "H5", value: "h5" },
        { label: "H6", value: "h6" },
      ],
    },
    color: { type: "text" },
    align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  },
  render: ({ title, level = 'h2', color = 'inherit', align = 'left' }) => {
    const Tag = level as any;
    return <Tag className="font-bold tracking-tight" style={{ color, textAlign: align, fontSize: level === 'h1' ? '3rem' : '2rem' }}>{title}</Tag>;
  },
};
