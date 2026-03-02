import { Config, DropZone } from "@puckeditor/core";
import { ImageUpload } from "./components/ImageUpload";
import Hero from "./ui-package/Hero";

type Props = {
  Heading: { title: string; level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; color?: string; align?: 'left' | 'center' | 'right' };
  Text: { content: string; color?: string; align?: 'left' | 'center' | 'right'; size?: string };
  Button: { text: string; href: string; variant: 'default' | 'outline'; color?: string };
  Container: { padding?: string; maxWidth?: string };
  Columns: { columns: { children: React.ReactNode }[] };
  Hero: { 
    backgroundImage?: string; 
    logoSrc?: string; logoAlt?: string; logoWidth?: number; logoHeight?: number;
    title?: string; subtitle?: string; discountTag?: string;
    ctaText?: string; ctaHref?: string;
    secondaryCtaText?: string; secondaryCtaHref?: string;
    overlayOpacity?: number; overlayColor?: string;
    textAlignment?: 'left' | 'center' | 'right';
    contentAlignment?: 'left' | 'center' | 'right';
    primaryColor?: string; textColor?: string;
  };
};

export const config: Config<Props> = {
  categories: {
    Layout: {
      components: ["Container", "Columns"],
    },
    Basic: {
      components: ["Heading", "Text", "Button"],
    },
    Prebuilt: {
      title: "Prebuilt Components",
      components: ["Hero"],
    },
  },
  components: {
    Container: {
      render: ({ padding = "2rem", maxWidth = "1200px" }) => (
        <div style={{ padding, maxWidth, margin: "0 auto", width: "100%" }}>
          <DropZone zone="container-content" />
        </div>
      ),
    },
    Columns: {
      fields: {
        columns: {
          type: "array",
          getItemSummary: (_, id = 0) => `Column ${id + 1}`,
          arrayFields: {
            children: { type: "text" },
          },
        },
      },
      render: ({ columns = [{ children: null }, { children: null }] }) => (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, 1fr)`, gap: "1.5rem" }}>
          {columns.map((_, i) => (
            <div key={i}>
              <DropZone zone={`column-${i}`} />
            </div>
          ))}
        </div>
      ),
    },
    Heading: {
      fields: {
        title: { type: "text" },
        level: {
          type: "select",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" },
          ],
        },
        color: { type: "text" },
        align: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      render: ({ title, level = 'h2', color = 'inherit', align = 'left' }) => {
        const Tag = level as any;
        return <Tag className="font-bold tracking-tight" style={{ color, textAlign: align, fontSize: level === 'h1' ? '3rem' : '2rem' }}>{title}</Tag>;
      },
    },
    Text: {
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
    },
    Button: {
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
    },
    Hero: {
      fields: {
        backgroundImage: { 
          label: "Background Image",
          type: "custom",
          render: ({ value, onChange }) => (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Background Image</label>
              <ImageUpload value={value} onChange={onChange} />
            </div>
          )
        },
        logoSrc: { 
          label: "Logo Image",
          type: "custom",
          render: ({ value, onChange }) => (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Logo Image</label>
              <ImageUpload value={value} onChange={onChange} />
            </div>
          )
        },
        logoAlt: { label: "Logo Alt Text", type: "text" },
        logoWidth: { label: "Logo Width (px)", type: "number" },
        logoHeight: { label: "Logo Height (px)", type: "number" },
        title: { label: "Hero Title", type: "text" },
        subtitle: { label: "Hero Subtitle", type: "text" },
        discountTag: { label: "Discount Tagline", type: "text" },
        ctaText: { label: "Main CTA Text", type: "text" },
        ctaHref: { label: "Main CTA Link", type: "text" },
        secondaryCtaText: { label: "Secondary CTA Text", type: "text" },
        secondaryCtaHref: { label: "Secondary CTA Link", type: "text" },
        overlayOpacity: { label: "Overlay Opacity (0-100)", type: "number" },
        overlayColor: { label: "Overlay Color", type: "text" },
        textAlignment: {
          label: "Text Alignment",
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        contentAlignment: {
          label: "Box Alignment (Desktop)",
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        primaryColor: { label: "Primary Theme Color", type: "text" },
        textColor: { label: "Text Theme Color", type: "text" },
      },
      defaultProps: {
        title: "STYLISH & COMFORTABLE",
        subtitle: "SUMMER COLLECTION",
        discountTag: "UP TO 50% OFF",
        ctaText: "SHOP NOW",
        ctaHref: "#",
        logoAlt: "Logo",
        logoWidth: 150,
        logoHeight: 50,
        overlayOpacity: 10,
        overlayColor: "#000000",
        textAlignment: "center",
        contentAlignment: "right",
        primaryColor: "#F36621",
        textColor: "#222F28",
      },
      render: (props) => (
        <Hero
          backgroundImage={props.backgroundImage}
          logo={{
            src: props.logoSrc,
            alt: props.logoAlt,
            width: props.logoWidth,
            height: props.logoHeight,
          }}
          title={props.title}
          subtitle={props.subtitle}
          discountTag={props.discountTag}
          cta={{
            text: props.ctaText,
            href: props.ctaHref,
          }}
          secondaryCta={{
            text: props.secondaryCtaText,
            href: props.secondaryCtaHref,
          }}
          settings={{
            overlayOpacity: props.overlayOpacity,
            overlayColor: props.overlayColor,
            textAlignment: props.textAlignment,
            contentAlignment: props.contentAlignment,
          }}
          theme={{
            primaryColor: props.primaryColor,
            textColor: props.textColor,
          }}
        />
      ),
    }
  },
};
