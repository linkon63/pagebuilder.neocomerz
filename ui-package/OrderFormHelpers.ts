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
    return sizes
      .map((s: any) => {
        const raw = typeof s === 'string' ? s : (s?.name || s?.label || s?.value || String(s?.id || s));
        return String(raw || '').trim();
      })
      .filter(Boolean);
  }
  if (typeof sizes === 'string') {
    return sizes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  return [];
};

export const getVariantDisplayValues = (variant: any) => {
  if (!variant) return { label: "", value: "" };

  const isQuantityLikeLabel = (label: string): boolean => {
    const normalized = String(label || '').toLowerCase().trim();
    return normalized.includes('quantity') || normalized === 'qty' || normalized.includes('unit qty');
  };
  
  if (variant.attribute_name && variant.attribute_value) {
    const attrLabel = getLocalizedString(variant.attribute_name);
    return {
      label: isQuantityLikeLabel(attrLabel) ? "" : attrLabel,
      value: getLocalizedString(variant.attribute_value)
    };
  }
  if (variant.variant_name && variant.variant_value) {
    const variantLabel = getLocalizedString(variant.variant_name);
    return {
      label: isQuantityLikeLabel(variantLabel) ? "" : variantLabel,
      value: getLocalizedString(variant.variant_value)
    };
  }

  const ignoredKeys = [
    'id', 'price', 'product_id', 'created_at', 'updated_at', 'deleted_at',
    'image', 'thumbnail', 'thumbnail_url', 'sku', 'stock', 
    'quantity', 'qty', 'unit_quantity', 'unit_qty', 'stock_quantity', 'available_quantity',
    'sizes', 'name', 'title', 'description', 
    'current_pricing', 'attributes', 'variants', 'status', 'is_active', 'type'
  ];

  for (const key of Object.keys(variant)) {
    if (!ignoredKeys.includes(key) && variant[key] !== null && variant[key] !== undefined && typeof variant[key] !== 'object' && variant[key] !== '') {
      const displayLabel = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
      if (isQuantityLikeLabel(displayLabel)) continue;
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

export const getDynamicSizeLabel = (variant: any, productData: any): string => {
  if (variant?.size_attribute_name) return getLocalizedString(variant.size_attribute_name);
  if (variant?.sizes_name) return getLocalizedString(variant.sizes_name);
  if (variant?.options_title) return getLocalizedString(variant.options_title);
  if (variant?.size_label) return getLocalizedString(variant.size_label);
  
  if (productData?.size_attribute_name) return getLocalizedString(productData.size_attribute_name);
  if (productData?.sizes_name) return getLocalizedString(productData.sizes_name);
  if (productData?.options_title) return getLocalizedString(productData.options_title);
  if (productData?.size_label) return getLocalizedString(productData.size_label);
  
  // Use product attribute_name if variant doesn't have one itself
  if (productData?.attribute_name && (!variant || !variant.attribute_name)) return getLocalizedString(productData.attribute_name);
  if (productData?.variant_name && (!variant || !variant.variant_name)) return getLocalizedString(productData.variant_name);
  
  // Heuristic color detection
  const sizes = getSizesArray(variant?.sizes || productData?.sizes);
  if (sizes.length > 0) {
    const isColors = sizes.every(s => s.startsWith('#') || ['red', 'blue', 'green', 'yellow', 'black', 'white', 'pink', 'purple', 'orange', 'grey', 'gray', 'brown', 'navy', 'maroon'].includes(s.toLowerCase()));
    if (isColors) return "Color";
  }

  return "Size";
};
