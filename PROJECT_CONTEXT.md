# Project Context: pagebuilder-nc (NeoComerz Page Builder)

This document provides a high-level overview of the `pagebuilder-nc` project, designed for both AI assistants and human developers to understand the project's purpose, architecture, and extension points.

## 🎯 Purpose
`pagebuilder-nc` is a visual page builder application built for the NeoComerz ecosystem. It enables users to create, edit, and publish custom landing pages or store pages using a drag-and-drop interface powered by **Puck**.

## 🛠 Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Visual Editor**: [Puck](https://github.com/measuredco/puck) (`@puckeditor/core`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [lucide-react](https://lucide.dev/), [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: Lucide React
- **Language**: TypeScript

## 🏗 Core Architecture

The project follows a standard Next.js App Router structure with Puck integrated as the primary interface.

### Key Directories
- `/app`: Contains the Next.js routes. `app/page.tsx` is the main editor entry point.
- `/ui-package`: Houses complex, pre-styled UI components (e.g., `Hero.tsx`) that are used within the builder.
- `/components`: General React components, including Puck-specific custom fields like `ImageUpload.tsx`.
- `/lib`: Utility functions and API clients (e.g., `fetchProducts`).
- `/prebuild-components`: Templates or pre-configured component blocks for the builder.

### Primary Configuration: `puck.config.tsx`
This is the "brain" of the page builder. It defines:
1.  **Component Definitions**: The mapping between Puck components (Heading, Text, Hero, etc.) and their React implementations.
2.  **Field Definitions**: The editable properties (props) for each component, using Puck's field types (text, number, select, custom).
3.  **Categories**: Organization of components in the sidebar (Layout, Basic, Prebuilt).
4.  **Layout Logic**: `Container` and `Columns` components that use Puck's `DropZone` for nesting.

## 🧩 Extension Points

### Custom Plugins
The builder is extended via Puck plugins. In `app/page.tsx`, a custom product plugin adds a "Product Library" sidebar, allowing users to search and add real products into the builder interface.

### Custom Fields
Specific UI needs (like image selection) are handled via custom field renders within `puck.config.tsx`, leveraging components like `ImageUpload`.

## 🚀 Development Workflow
1.  **Run Dev**: `npm run dev`
2.  **Configuration**: Modify `puck.config.tsx` to add new components or change existing ones.
3.  **UI Updates**: Components in `ui-package` should be updated for visual changes to prebuilt blocks.
4.  **Publishing**: The "Publish" action in the editor currently outputs the page configuration as a JSON object (visible in a modal).

---
*Last Updated: March 2026*
