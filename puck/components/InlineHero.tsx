import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import InlineHeroUI from "@/ui-package/InlineHero";

export const InlineHero: ComponentConfig<PuckProps["InlineHero"]> = {
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
        backgroundImageAlt: { label: "Background Alt Text", type: "text" },
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
        titlePrimary: { label: "Primary Title", type: "text" },
        titleSecondary: { label: "Secondary Title", type: "text" },
        description: { label: "Description Text", type: "textarea" },
        ctaText: { label: "CTA Button Text", type: "text" },
        ctaHref: { label: "CTA Button Link", type: "text" },
        primaryColor: { label: "Primary Title Color", type: "text" },
        secondaryColor: { label: "Secondary Title & Button BG Color", type: "text" },
        textColor: { label: "Description Text Color", type: "text" },
    },
    defaultProps: {
        backgroundImageAlt: "Pakistani Dress Collection Background",
        logoAlt: "NeoComerz Logo",
        logoWidth: 200,
        logoHeight: 60,
        titlePrimary: "প্রিমিয়াম",
        titleSecondary: "Pakistani Dress",
        description: "সেই ডিজাইন—যেটা পরলে আলাদা করে কিছু বলার দরকার পড়ে না. ফ্যাশন-লাভারদের নতুন obsession",
        ctaText: "এখনই অর্ডার করুন",
        ctaHref: "#order",
        primaryColor: "#27272a",
        secondaryColor: "#5b21b6",
        textColor: "#27272a",
    },
    render: (props) => (
        <InlineHeroUI
            backgroundImage={props.backgroundImage}
            backgroundImageAlt={props.backgroundImageAlt}
            logoSrc={props.logoSrc}
            logoAlt={props.logoAlt}
            logoWidth={props.logoWidth}
            logoHeight={props.logoHeight}
            titlePrimary={props.titlePrimary}
            titleSecondary={props.titleSecondary}
            description={props.description}
            ctaText={props.ctaText}
            ctaHref={props.ctaHref}
            theme={{
                primaryColor: props.primaryColor,
                secondaryColor: props.secondaryColor,
                textColor: props.textColor,
            }}
        />
    ),
};
