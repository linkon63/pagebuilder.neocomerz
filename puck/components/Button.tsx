import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";

export const Button: ComponentConfig<PuckProps["Button"]> = {
  fields: {
    text: { type: "text" },
    href: { type: "text" },
    variant: {
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Outline", value: "outline" },
      ],
    },
    color: { type: "text" },
  },
  render: ({ text, variant = 'default', color }) => (
    <button 
      className={`px-6 py-3 rounded-lg font-bold transition-all ${
        variant === 'default' ? 'bg-primary text-white hover:opacity-90 shadow-lg' : 'border-2 border-primary text-primary hover:bg-primary/5'
      }`}
      style={variant === 'default' && color ? { backgroundColor: color } : variant === 'outline' && color ? { borderColor: color, color } : {}}
    >
      {text}
    </button>
  ),
};
