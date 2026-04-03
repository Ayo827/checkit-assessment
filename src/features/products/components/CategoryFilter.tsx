"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category");

  const setCategory = (category: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
      params.delete("page"); // Reset page on category change
    } else {
      params.delete("category");
    }
    
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div className="flex w-full items-center space-x-2 overflow-x-auto pb-4 pt-4 no-scrollbar">
      <button
        onClick={() => setCategory(null)}
        className={cn(
          "whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all shadow-sm active:scale-95 cursor-pointer",
          !currentCategory
            ? "bg-blue-600 text-white shadow-blue-200 ring-2 ring-blue-100"
            : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
        )}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCategory(category)}
          className={cn(
            "whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all shadow-sm active:scale-95 capitalize cursor-pointer",
            currentCategory === category
              ? "bg-blue-600 text-white shadow-blue-200 ring-2 ring-blue-100"
              : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
          )}
        >
          {category.replace(/-/g, " ")}
        </button>
      ))}
    </div>
  );
}
