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
    // Fashion/Apparel: Hero (multi-style), LayeredHero, InlineHero
    // Organic/Food: Hero2 (Organic), Hero3 (Circle Focus), Hero4 (Cinematic)
    components: [
      "Hero",
      "LayeredHero",
      "InlineHero",
      "Hero2",
      "Hero3",
      "Hero4",
    ],
  },

  GALLERY: {
    title: "Gallery",
    components: ["GalleryCol", "GalleryGrid", "GalleryGrid6"],
  },

  FEATURES: {
    title: "Features",
    components: ["Features"],
  },

  DESIGN: {
    title: "Design & Quality",
    components: ["DesignAndFit", "Quality"],
  },

  SIZING: {
    title: "Sizing",
    components: ["SizeChart"],
  },

  COMMERCE: {
    title: "Commerce",
    components: ["OrderForm"],
  },

  SOCIAL_PROOF: {
    title: "Social Proof",
    components: ["Testimonials", "FAQ"],
  },
};
