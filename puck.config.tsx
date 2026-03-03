import { Config } from "@puckeditor/core";
import { PuckProps as Props } from "@/puck/types/puck";
import { categories } from "./puck/categories";
import * as components from "./puck/components";

export const config: Config<Props> = {
  categories,
  components: components as any,
};
