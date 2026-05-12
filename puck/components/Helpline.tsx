import React from "react";
import { ComponentConfig } from "@puckeditor/core";
import { PuckProps } from "../types/puck";
import { Helpline as HelplineUI } from "neocomerz-storefront-ui";

export const Helpline: ComponentConfig<any> = {
  fields: {
    whatsappNumber: { type: "text", label: "WHATSAPP NUMBER" },
  },
  defaultProps: {
    whatsappNumber: "+880 1712-508063",
  },
  render: (props) => (
    <HelplineUI whatsappNumber={props.whatsappNumber} />
  ),
};
