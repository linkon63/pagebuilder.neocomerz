import { Config } from "@puckeditor/core";
import { PuckProps as Props, RootProps } from "@/puck/types/puck";
import { categories } from "./puck/categories";
import * as components from "./puck/components";

export const config: Config<Props, RootProps> = {
  categories,
  components: components as any,
  root: {
    fields: {
      title: { type: "text" },
      slug: { type: "text" },
    },
    render: ({ title, children }) => (
      <div>
        {children}
      </div>
    ),
  },
};
