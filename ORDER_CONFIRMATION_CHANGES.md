# Order Confirmation changes in pagebuilder.neocomerz

Updated: 19 October 2026

This document explains the current Order Confirmation implementation and related import fixes in this repository, based on the working tree changes against `HEAD`. It describes both completed behavior and remaining limitations.

## 1. What changed for the builder user

The **Commerce** menu now lists:

1. **Order Form Component**
2. **Order Confirmation Component**

Order Confirmation provides editable modal settings and a preview with sample order details. The actual modal design comes from the `OrderConfirmation` export in `neocomerz-storefront-ui`.

### How to view and configure it

1. Add an Order Form to the landing page.
2. Add Order Confirmation from Commerce to the same content list as the Order Form. The current implementation creates a temporary configuration card in the canvas.
3. Select the confirmation card. Its modal preview opens inside the builder's view area.
4. Use the settings panel to choose a layout and edit the text, branding, colors, and shop link.
5. Close the preview with its close button, backdrop, Escape, or Continue shopping. Use **Preview modal** on the card to reopen it.

The preview uses sample customer details, products, and totals. Opening it does not submit an order. Print and shop navigation are inactive in the sample preview through the UI package's `preview` prop.

## 2. Layout Version cards

The previous **Design Version** dropdown was replaced by the shared `VersionPicker`, matching other builder components.

The picker displays a two-column grid with an SVG thumbnail, layout name, description, and selected checkmark.

| Layout | Value | Design |
| --- | --- | --- |
| Invoice | `v1` | Classic invoice with bordered customer and payment details. |
| Featured | `v2` | Colored header with rounded information cards. |
| Compact | `v3` | Narrower modal with a centered heading. |

Selecting a card updates the component's `version` field. The open modal receives the new settings immediately. The other fields retain their values when switching layouts. The default version is Invoice (`v1`).

These cards select the three existing modal designs in the UI package. The thumbnails are small SVG illustrations of those layouts.

## 3. Editable settings

| Group | Fields |
| --- | --- |
| Layout | Invoice, Featured, or Compact. |
| Confirmation copy | Title, message, and success label. |
| Order labels | Order number, date, order details, quantity, subtotal, delivery, and total. |
| Customer and payment labels | Customer information, payment, amount due, and payment status. |
| Fallback text | Empty order message and missing name, phone, or address text. |
| Actions | Print invoice, Continue shopping, and View more labels. |
| Branding | Store name and uploaded logo. |
| Appearance | Primary, background, and text colors. |
| Navigation | Shop destination for View more. |

The sample order values are defined in the preview renderer. They are not editable settings and are not included in the saved confirmation configuration.

## 4. How the preview works

`puck/components/OrderConfirmation.tsx` defines the Puck component and its `ModalPreview` renderer.

- `usePuck()` identifies whether this confirmation card is selected.
- A selection change opens or closes the preview. Closing it manually keeps it closed until it is reopened or selected again.
- The preview card's `ownerDocument.body` is passed as `portalContainer`. With Puck's iframe canvas, this places the modal inside the preview viewport and keeps the settings panel accessible.
- The Preview modal button is registered with `registerOverlayPortal` with dragging disabled for that button.
- The UI package receives `preview`, `isOpen`, `onClose`, sample order details, and the current settings.
- The component renders its preview only when `puck.isEditing` is true. Outside editing, the standalone builder configuration component renders an empty fragment.

Opening or closing the modal overlay does not modify the content array. Adding the temporary configuration card still adds a Puck item during editing; see the limitations below.

## 5. What happens when saving

The Puck publish handler in `app/BuilderApp.tsx` now prepares the page data before opening the save dialog:

1. `preparePageDataForSave(nextData)` processes the main content list and each zone list.
2. Within each list, it collects the props from Order Confirmation items and removes those items.
3. It attaches the collected props as `confirmationSettings` on the first Order Form in that same list.
4. `withTenantDefaults()` applies the tenant API base URL to Order Forms.
5. The existing save dialog receives the prepared data.

The relative order of the remaining items is preserved. The published data contains the modal settings on the Order Form rather than a standalone confirmation content item.

Illustrative saved Order Form excerpt, omitting other form and confirmation fields:

```json
{
  "type": "OrderForm",
  "props": {
    "id": "order-form-1",
    "confirmationSettings": {
      "version": "v2",
      "title": "Thank you for your order",
      "brandName": "My store",
      "viewMoreHref": "/shop",
      "primaryColor": "#F36621"
    }
  }
}
```

The builder's Order Form wrapper already forwards its props to the package component, including `confirmationSettings`. The UI package handles order submission and opens the configured modal after success. This runtime behavior depends on the consuming application using the compatible UI package and passing the saved form props through.

## 6. Files involved

| File | Change and purpose |
| --- | --- |
| [puck/categories.ts](puck/categories.ts) | Registers Order Confirmation directly after Order Form under Commerce. |
| [puck/components/index.ts](puck/components/index.ts) | Exports the new Puck component so the existing config can discover it. |
| [puck/components/OrderConfirmation.tsx](puck/components/OrderConfirmation.tsx) | Adds the editable fields, defaults, layout options, sample order, and modal preview behavior. |
| [components/VersionPicker.tsx](components/VersionPicker.tsx) | Adds `OrderConfirmationSkeletons` for the three layout thumbnails; the existing shared picker supplies the card UI. |
| [puck/types/puck.ts](puck/types/puck.ts) | Adds Order Confirmation props and `OrderForm.confirmationSettings`, including the three supported version values. |
| [lib/puck-data.ts](lib/puck-data.ts) | Adds save preparation that removes temporary confirmation items and transfers their settings to an Order Form. |
| [app/BuilderApp.tsx](app/BuilderApp.tsx) | Calls save preparation before tenant defaults and the save dialog. |

## 7. UI package import fixes

Several builder wrappers imported names ending in `UI` that were not public exports of `neocomerz-storefront-ui`. They now import the package's public name and give it a local alias.

For example, Design & Fit changed from:

```tsx
import { DesignAndFitUI } from "neocomerz-storefront-ui";
```

to:

```tsx
import { DesignAndFit as DesignAndFitUI } from "neocomerz-storefront-ui";
```

This resolves the missing-export build error while keeping the existing local JSX names.

The same correction was applied to these wrappers under `puck/components/`:

- `DesignAndFit.tsx`, `FAQ.tsx`, `Features.tsx`.
- `InlineHero.tsx`, `LayeredHero.tsx`.
- `OrderForm.tsx`, `Quality.tsx`, `SizeChart.tsx`, `Testimonials.tsx`.
- `gallery/GalleryCol.tsx`, `gallery/GalleryGrid.tsx`, `gallery/GalleryGrid6.tsx`.

## 8. Current limitations

These behaviors follow from the current implementation and remain to be addressed:

1. **A temporary canvas card still exists.** Order Confirmation is registered as a regular Puck component during editing. Adding or moving it can affect the editor layout. The requested menu-only configuration experience has not been implemented. The modal overlay itself does not reorder sections.
2. **The card is not restored after saving or reopening.** Save preparation removes it, and the page loading paths do not rebuild it from `OrderForm.confirmationSettings`. Saved settings remain on the form, but the confirmation editor card disappears. Adding a fresh card uses defaults and can overwrite the previous configuration on the next save.
3. **The form and confirmation must share a content list.** Main content and individual zone lists are processed independently. If a list has confirmation items but no Order Form, those items are removed without transferring their settings.
4. **Multiple forms are not individually linked.** Only the first Order Form in a list receives the collected settings. Multiple confirmation items in that list are merged in order; later props override earlier ones.
5. **Save preparation copies all confirmation props.** It does not whitelist presentation fields, so Puck metadata such as the confirmation item's `id` can also enter `confirmationSettings`. The existing settings object is replaced when a confirmation card is present.

## 9. Validation and scope

- The builder's `pnpm build` passed after the layout picker change, including TypeScript compilation.
- The build reported a workspace-root warning caused by multiple lockfiles.
- Browser interactions, save/reopen behavior, and live order submission have not been tested end to end for these changes.
- No build or tests were rerun for this documentation-only update.
- The modal rendering and successful-order behavior live in the separate `neocomerz-ui` package. This file documents their connection to the builder.
- `storefront-next` was not modified for this work.
