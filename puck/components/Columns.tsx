import { ComponentConfig, DropZone } from "@puckeditor/core";
import { PuckProps } from "../types/puck";

export const Columns: ComponentConfig<PuckProps["Columns"]> = {
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
};
