import { Config } from "@puckeditor/core";
import { PuckProps } from "./types/puck";

export const categories: Config<PuckProps>["categories"] = {
  Layout: {
    components: ["Container", "Columns"],
  },
  Basic: {
    components: ["Heading", "Text", "Button"],
  },
  Prebuilt: {
    title: "Hero Components",
    components: ["Hero"],
  },
};
