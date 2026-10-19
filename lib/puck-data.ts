export type PuckData = {
  content: Array<Record<string, any>>;
  root?: Record<string, any>;
  zones?: Record<string, Array<Record<string, any>>>;
};

function stripOrderConfirmation(items: Array<Record<string, any>>): Array<Record<string, any>> {
  const confirmationItems = items.filter((item) => item?.type === "OrderConfirmation");
  const remainingItems = items.filter((item) => item?.type !== "OrderConfirmation");
  const orderFormIndex = remainingItems.findIndex((item) => item?.type === "OrderForm");

  if (orderFormIndex < 0 || confirmationItems.length === 0) {
    return remainingItems;
  }

  const confirmationSettings = confirmationItems.reduce<Record<string, any>>(
    (settings, item) => ({ ...settings, ...(item?.props ?? {}) }),
    {},
  );

  return remainingItems.map((item, index) =>
    index === orderFormIndex
      ? { ...item, props: { ...item.props, confirmationSettings } }
      : item,
  );
}

export function preparePageDataForSave(data: Partial<PuckData> | null | undefined): PuckData {
  const content = Array.isArray(data?.content) ? stripOrderConfirmation(data.content) : [];
  const zones = data?.zones && typeof data.zones === "object" ? data.zones : {};

  return {
    content,
    root: data?.root ?? { props: { title: "Landing Page Builder" } },
    zones: Object.fromEntries(
      Object.entries(zones).map(([key, value]) => [
        key,
        stripOrderConfirmation(Array.isArray(value) ? value : []),
      ]),
    ),
  };
}

function mapItems(
  items: Array<Record<string, any>>,
  tenantApiBaseUrl: string
) {
  return items.map((item) => {
    if (item?.type !== "OrderForm") {
      return item;
    }

    return {
      ...item,
      props: {
        ...item.props,
        apiBaseUrl: tenantApiBaseUrl,
      },
    };
  });
}

export function withTenantDefaults(data: Partial<PuckData> | null | undefined, tenantApiBaseUrl: string): PuckData {
  const content = Array.isArray(data?.content) ? data.content : [];
  const zones = data?.zones && typeof data.zones === "object" ? data.zones : {};

  return {
    content: mapItems(content, tenantApiBaseUrl),
    root: data?.root ?? { props: { title: "Landing Page Builder" } },
    zones: Object.fromEntries(
      Object.entries(zones).map(([key, value]) => [
        key,
        mapItems(Array.isArray(value) ? value : [], tenantApiBaseUrl),
      ])
    ),
  };
}
