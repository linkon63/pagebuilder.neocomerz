export type PuckData = {
  content: Array<Record<string, any>>;
  root?: Record<string, any>;
  zones?: Record<string, Array<Record<string, any>>>;
};

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
