import { Config } from "@puckeditor/core";
import { PuckProps } from "./types/puck";

export const categories: Config<PuckProps>["categories"] = {
  LAYOUT: {
    title: "LAYOUT Components",
    components: ["Container", "Columns"],
  },

  CONTENT: {
    title: "CONTENT Components",
    components: ["Heading", "Text", "Button", "FAQ"],
  },

  PREBUILT: {
    title: "HERO Components",
    components: ["Hero", "LayeredHero", "InlineHero"],
  },

  FEATURES: {
    title: "FEATURES Components",
    components: ["Features"],
  },

  QUALITY: {
    title: "QUALITY Components",
    components: ["DesignAndFit"],
  },

  GALLERY: {
    title: "GALLERY Components",
    components: ["GalleryCol", "GalleryGrid", "GalleryGrid6"],
  },

  SIZING: {
    title: "SIZING Components",
    components: ["SizeChart"],
  },

  COMMERCE: {
    title: "COMMERCE Components",
    components: ["OrderForm"],
  },

  REVIEWS: {
    title: "REVIEWS Components",
    components: ["Testimonials"],
  },
};
