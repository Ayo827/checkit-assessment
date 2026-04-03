import { Product, ProductResponse } from "@/types";

const BASE_URL = "https://dummyjson.com";

interface FetchOptions extends RequestInit {
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export async function getProducts(
  limit: number = 20,
  skip: number = 0
): Promise<ProductResponse> {
  const url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  const response = await fetch(url, {
    cache: "force-cache", // Standard listing data is force-cached
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function searchProducts(
  query: string,
  limit: number = 20,
  skip: number = 0
): Promise<ProductResponse> {
  const url = `${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`;
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
}

export async function getProductById(id: string): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;
  const response = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product with id: ${id}`);
  }

  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const url = `${BASE_URL}/products/category-list`;
  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getProductsByCategory(
  category: string,
  limit: number = 20,
  skip: number = 0
): Promise<ProductResponse> {
  const url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
  const response = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products in category: ${category}`);
  }

  return response.json();
}
