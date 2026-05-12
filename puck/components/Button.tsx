import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ColorPicker } from "../../components/ColorPicker";

export const Button: ComponentConfig<any> = {
  label: "Button",
  fields: {
    text: { type: "text", label: "TEXT" },
    href: { type: "text", label: "HREF" },
    variant: {
      type: "select", label: "VARIANT",
      options: [
        { label: "Filled", value: "default" },
        { label: "Outline", value: "outline" },
      ],
    },
    color: {
      type: "custom", label: "COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Button Color" value={value || "#F36621"} onChange={onChange} />,
    },
  },
  defaultProps: {
    text: "Click Here",
    href: "#",
    variant: "default",
    color: "#F36621",
  },
  render: ({ text, href, variant = "default", color }) => (
    <a
      href={href || "#"}
      className={`inline-block px-6 py-3 rounded-lg font-bold transition-all ${
        variant === "default"
          ? "text-white hover:opacity-90 shadow-lg"
          : "border-2 bg-transparent hover:bg-opacity-5"
      }`}
      style={
        variant === "default"
          ? { backgroundColor: color }
          : { borderColor: color, color }
      }
    >
      {text}
    </a>
  ),
};
