import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";

export const Text: ComponentConfig<PuckProps["Text"]> = {
  fields: {
    content: { type: "textarea" },
    color: { type: "text" },
    size: { type: "text" },
    align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  },
  render: ({ content, align = 'left', color = 'inherit', size = '1rem' }) => (
    <p style={{ textAlign: align, color, fontSize: size }}>{content}</p>
  ),
};
