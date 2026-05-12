import React from "react";
import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { CheckListItem as CheckListItemUI } from "neocomerz-storefront-ui";

export const CheckListItem: ComponentConfig<any> = {
  fields: {
    content: { type: "text", label: "TEXT CONTENT" },
    iconClassName: { type: "text", label: "ICON CLASS (Optional Tailwind classes)" },
    textClassName: { type: "text", label: "TEXT CLASS (Optional Tailwind classes)" },
    className: { type: "text", label: "CONTAINER CLASS (Optional Tailwind classes)" },
  },
  defaultProps: {
    content: "Premium quality item",
  },
  render: (props) => (
    <CheckListItemUI
      iconClassName={props.iconClassName}
      textClassName={props.textClassName}
      className={props.className}
    >
      {props.content || "Premium quality item"}
    </CheckListItemUI>
  ),
};
