export const getLocalizedString = (val: any): string => {
  if (!val) return "";
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    const extracted = val.en || val.bn || Object.values(val)[0] || "";
    return typeof extracted === 'object' ? JSON.stringify(extracted) : String(extracted);
  }
  return String(val);
};

export const getSizesArray = (sizes: any): string[] => {
  if (!sizes) return [];
  if (Array.isArray(sizes)) {
    return sizes.map((s: any) => typeof s === 'string' ? s : (s.name || s.label || s.value || String(s.id || s)));
  }
  if (typeof sizes === 'string') return sizes.split(',').map(s => s.trim());
  return [];
};

export const getVariantDisplayValues = (variant: any) => {
  if (!variant) return { label: "", value: "" };
  
  if (variant.attribute_name && variant.attribute_value) {
    return { label: getLocalizedString(variant.attribute_name), value: getLocalizedString(variant.attribute_value) };
  }
  if (variant.variant_name && variant.variant_value) {
    return { label: getLocalizedString(variant.variant_name), value: getLocalizedString(variant.variant_value) };
  }

  const ignoredKeys = [
    'id', 'price', 'product_id', 'created_at', 'updated_at', 'deleted_at',
    'image', 'thumbnail', 'thumbnail_url', 'sku', 'stock', 
    'quantity', 'sizes', 'name', 'title', 'description', 
    'current_pricing', 'attributes', 'variants', 'status', 'is_active', 'type'
  ];

  for (const key of Object.keys(variant)) {
    if (!ignoredKeys.includes(key) && variant[key] !== null && variant[key] !== undefined && typeof variant[key] !== 'object' && variant[key] !== '') {
      const displayLabel = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
      return { 
        label: displayLabel, 
        value: String(variant[key]) 
      };
    }
  }

  let fallbackValue = variant.name || variant.title || variant.sku || "";
  let extracted = fallbackValue;
  if (fallbackValue && typeof fallbackValue === 'object') {
     extracted = fallbackValue.name || fallbackValue.value || fallbackValue.title || fallbackValue;
  }
  
  return { 
    label: "", 
    value: getLocalizedString(extracted) 
  };
};
