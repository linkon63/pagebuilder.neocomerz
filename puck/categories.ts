import { Config } from "@puckeditor/core";
import { PuckProps } from "./types/puck";

export const categories: Config<PuckProps>["categories"] = {
  LAYOUT: {
    title: "Layout",
    components: ["Container", "Columns"],
  },

  CONTENT: {
    title: "Content",
    components: ["Heading", "Text", "Button"],
  },

  HERO: {
    title: "Hero Sections",
    components: ["Hero", "LayeredHero", "InlineHero", "Hero2", "Hero3", "Hero4"],
  },

  FEATURES: {
    title: "Features",
    components: ["Features"],
  },

  QUALITY: {
    title: "Design & Quality",
    components: ["DesignAndFit", "Quality"],
  },

  GALLERY: {
    title: "Gallery",
    components: ["GalleryCol", "GalleryGrid", "GalleryGrid6"],
  },

  SIZING: {
    title: "Size Chart",
    components: ["SizeChart"],
  },

  REVIEWS: {
    title: "Reviews & FAQ",
    components: ["Testimonials", "FAQ"],
  },

  COMMERCE: {
    title: "Commerce",
    components: ["OrderForm"],
  },

  ELEMENTS: {
    title: "UI Elements",
    components: ["CheckListItem", "SectionHeader", "Helpline"],
  },
};
