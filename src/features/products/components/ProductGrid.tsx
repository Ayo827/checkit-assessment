"use client";

import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-8 max-w-7xl mx-auto w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-4 rounded-xl border border-gray-100 p-4 shadow-sm">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-8 w-1/3 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 px-4 py-8 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 my-8 mx-auto max-w-lg w-full">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
           <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-900">No products found</h3>
          <p className="text-gray-500 max-w-xs text-sm">We couldn't find anything matching your current filters. Try searching for something else or clearing your filters.</p>
        </div>
        <button 
          onClick={() => router.push('/')}
          className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 mt-4"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-8 max-w-7xl mx-auto w-full">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}

