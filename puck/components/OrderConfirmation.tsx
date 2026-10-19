import { useCallback, useEffect, useRef, useState } from "react";
import { ComponentConfig, registerOverlayPortal, usePuck } from "@puckeditor/core";
import { OrderConfirmation as OrderConfirmationModal } from "neocomerz-storefront-ui";
import { PuckProps } from "../types/puck";
import { ImageUpload } from "../../components/ImageUpload";
import { ColorPicker } from "../../components/ColorPicker";
import { OrderConfirmationSkeletons, VersionPicker } from "../../components/VersionPicker";

const VERSION_OPTIONS = [
  { value: "v1", label: "Invoice", description: "Classic invoice with bordered details", preview: OrderConfirmationSkeletons.v1 },
  { value: "v2", label: "Featured", description: "Colored header with rounded cards", preview: OrderConfirmationSkeletons.v2 },
  { value: "v3", label: "Compact", description: "Narrow modal with a centered heading", preview: OrderConfirmationSkeletons.v3 },
];

const previewOrder = {
  orderId: "PREVIEW-1042",
  orderNumber: "PREVIEW-1042",
  createdAt: "2026-01-15T10:30:00.000Z",
  address: {
    name: "Alex Morgan",
    phone: "+880 1700-000000",
    addressLine: "12 Example Road, Dhaka",
  },
  items: [
    { id: "preview-item-1", name: "Classic Cotton Panjabi", price: 1499, quantity: 1, imageUrl: "" },
    { id: "preview-item-2", name: "Premium Scarf", price: 450, quantity: 2, imageUrl: "" },
  ],
  subtotal: 2399,
  delivery: 80,
  total: 2479,
};

const ModalPreview = ({ id, ...settings }: PuckProps["OrderConfirmation"] & { id: string }) => {
  const { selectedItem } = usePuck();
  const isSelected = selectedItem?.props.id === id;
  const previewRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement>();
  const [isOpen, setIsOpen] = useState(false);
  const closePreview = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    setPortalContainer(previewRef.current?.ownerDocument.body);
    return registerOverlayPortal(buttonRef.current, { disableDrag: true });
  }, []);

  useEffect(() => {
    setIsOpen(isSelected);
  }, [isSelected]);

  return (
    <div ref={previewRef} className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Order confirmation modal</p>
          <p className="mt-1 text-xs text-slate-500">This preview is not saved as a landing-page section.</p>
        </div>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
        >
          Preview modal
        </button>
      </div>
      <OrderConfirmationModal
        isOpen={isOpen && Boolean(portalContainer)}
        onClose={closePreview}
        portalContainer={portalContainer}
        preview
        {...previewOrder}
        currencySymbol="BDT"
        paymentMethod="Cash on Delivery"
        paymentStatus="Unpaid"
        settings={settings}
      />
    </div>
  );
};

export const OrderConfirmation: ComponentConfig<PuckProps["OrderConfirmation"]> = {
  label: "Order Confirmation Component",
  fields: {
    version: {
      type: "custom",
      label: "LAYOUT VERSION",
      render: ({ value, onChange }) => (
        <VersionPicker
          value={value || "v1"}
          onChange={(version) => {
            if (version === "v1" || version === "v2" || version === "v3") onChange(version);
          }}
          options={VERSION_OPTIONS}
        />
      ),
    },
    title: { type: "text", label: "CONFIRMATION TITLE" },
    message: { type: "textarea", label: "MESSAGE" },
    confirmedLabel: { type: "text", label: "SUCCESS LABEL" },
    orderNumberLabel: { type: "text", label: "ORDER NUMBER LABEL" },
    placedOnLabel: { type: "text", label: "ORDER DATE LABEL" },
    customerInformationLabel: { type: "text", label: "CUSTOMER INFORMATION LABEL" },
    paymentLabel: { type: "text", label: "PAYMENT SECTION LABEL" },
    amountDueLabel: { type: "text", label: "AMOUNT DUE LABEL" },
    paymentStatusLabel: { type: "text", label: "PAYMENT STATUS LABEL" },
    orderDetailsLabel: { type: "text", label: "ORDER DETAILS LABEL" },
    quantityLabel: { type: "text", label: "QUANTITY LABEL" },
    subtotalLabel: { type: "text", label: "SUBTOTAL LABEL" },
    deliveryLabel: { type: "text", label: "DELIVERY LABEL" },
    totalLabel: { type: "text", label: "TOTAL LABEL" },
    noItemsLabel: { type: "text", label: "EMPTY ORDER MESSAGE" },
    missingNameLabel: { type: "text", label: "MISSING NAME TEXT" },
    missingPhoneLabel: { type: "text", label: "MISSING PHONE TEXT" },
    missingAddressLabel: { type: "text", label: "MISSING ADDRESS TEXT" },
    printLabel: { type: "text", label: "PRINT BUTTON TEXT" },
    continueShoppingLabel: { type: "text", label: "CONTINUE SHOPPING TEXT" },
    viewMoreLabel: { type: "text", label: "VIEW MORE TEXT" },
    brandName: { type: "text", label: "STORE NAME" },
    logoSrc: {
      type: "custom",
      label: "STORE LOGO",
      render: ({ value, onChange }) => <ImageUpload value={value} onChange={onChange} />,
    },
    viewMoreHref: { type: "text", label: "SHOP LINK" },
    primaryColor: {
      type: "custom",
      label: "MODAL PRIMARY COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Modal Primary Color" value={value || "#F36621"} onChange={onChange} />,
    },
    backgroundColor: {
      type: "custom",
      label: "MODAL BACKGROUND COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Modal Background Color" value={value || "#ffffff"} onChange={onChange} />,
    },
    textColor: {
      type: "custom",
      label: "MODAL TEXT COLOR",
      render: ({ value, onChange }) => <ColorPicker label="Modal Text Color" value={value || "#0f172a"} onChange={onChange} />,
    },
  },
  defaultProps: {
    version: "v1",
    title: "Thank you for your order",
    message: "",
    confirmedLabel: "Order confirmed",
    orderNumberLabel: "Order number:",
    placedOnLabel: "Placed on",
    customerInformationLabel: "Customer information",
    paymentLabel: "Payment",
    amountDueLabel: "Amount due:",
    paymentStatusLabel: "Status:",
    orderDetailsLabel: "Order details",
    quantityLabel: "Qty",
    subtotalLabel: "Subtotal",
    deliveryLabel: "Delivery",
    totalLabel: "Total",
    noItemsLabel: "No item details available.",
    missingNameLabel: "Name not provided",
    missingPhoneLabel: "Phone not provided",
    missingAddressLabel: "Address not provided",
    printLabel: "Print invoice",
    continueShoppingLabel: "Continue shopping",
    viewMoreLabel: "View more",
    brandName: "",
    logoSrc: "",
    viewMoreHref: "/shop",
    primaryColor: "#F36621",
    backgroundColor: "#ffffff",
    textColor: "#0f172a",
  },
  render: ({ puck, ...props }) => puck.isEditing ? <ModalPreview {...props} /> : <></>,
};
