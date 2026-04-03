import { getProducts, getProductsByCategory, searchProducts } from "@/lib/api/client";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "@/components/ui/Pagination";

interface ProductResultsProps {
  query: string;
  category: string;
  page: number;
}

export async function ProductResults({ query, category, page }: ProductResultsProps) {
  const limit = 20;
  const skip = (page - 1) * limit;

  let initialData;
  if (query) {
    initialData = await searchProducts(query, limit, skip);
  } else if (category) {
    initialData = await getProductsByCategory(category, limit, skip);
  } else {
    initialData = await getProducts(limit, skip);
  }

  const totalPages = Math.ceil(initialData.total / limit);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {query ? `Search results for "${query}"` : category ? `${category.replace(/-/g, ' ')} Products` : "Latest Collections"}
          <span className="ml-2 text-sm font-medium text-gray-400 capitalize">
            ({initialData.total} items found)
          </span>
        </h2>
      </div>

      <ProductGrid products={initialData.products} />

      <Pagination totalPages={totalPages} currentPage={page} />
    </div>
  );
}
