import { ComponentConfig, DropZone } from "@puckeditor/core";
import { PuckProps } from "../types/puck";

export const Container: ComponentConfig<PuckProps["Container"]> = {
  render: ({ padding = "2rem", maxWidth = "1200px" }) => (
    <div style={{ padding, maxWidth, margin: "0 auto", width: "100%" }}>
      <DropZone zone="container-content" />
    </div>
  ),
};
