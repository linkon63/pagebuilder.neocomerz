import { Config } from "@puckeditor/core";
import { PuckProps } from "./types/puck";

export const categories: Config<PuckProps>["categories"] = {
  LAYOUT: {
    components: ["Container", "Columns"],
  },

  CONTENT: {
    components: ["Heading", "Text", "Button"],
  },

  HERO: {
    components: ["Hero", "LayeredHero", "InlineHero"],
  },

  FEATURES: {
    components: ["Features"],
  },

  QUALITY: {
    components: ["DesignAndFit"],
  },
  
  GALLERY: {
    components: ["GalleryCol", "GalleryGrid", "GalleryGrid6"],
  },

  SIZING: {
    components: ["SizeChart"],
  },

  COMMERCE: {
    components: ["OrderForm"],
  },
};
