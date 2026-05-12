import React from "react";
import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { SectionHeader as SectionHeaderUI } from "neocomerz-storefront-ui";

export const SectionHeader: ComponentConfig<any> = {
  fields: {
    title: { type: "text", label: "TITLE" },
    description: { type: "textarea", label: "DESCRIPTION" },
    className: { type: "text", label: "CONTAINER CLASS (Optional)" },
    titleClassName: { type: "text", label: "TITLE CLASS (Optional)" },
    descriptionClassName: { type: "text", label: "DESCRIPTION CLASS (Optional)" },
  },
  defaultProps: {
    title: "Section Title",
    description: "This is a section description.",
  },
  render: (props) => (
    <SectionHeaderUI
      title={props.title}
      description={props.description}
      className={props.className}
      titleClassName={props.titleClassName}
      descriptionClassName={props.descriptionClassName}
    />
  ),
};
