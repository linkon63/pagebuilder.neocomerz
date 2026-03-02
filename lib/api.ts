export interface ProductName {
  en: string;
}

export interface ProductDescription {
  en: string;
}

export interface ProductPricing {
  id: number;
  unit_price: string;
  retail_price: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  current_pricing: ProductPricing;
}

export interface Product {
  id: number;
  name: ProductName;
  description: ProductDescription;
  thumbnail: string;
  variants: ProductVariant[];
}

export interface ProductListResponse {
  status: string;
  message: string;
  data: Product[];
}

const DEFAULT_API_URL = "https://cap.dev-inventory.softzino.xyz/api/v1/products";

export async function fetchProducts(apiUrl: string = DEFAULT_API_URL): Promise<Product[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const result: ProductListResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
