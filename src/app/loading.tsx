import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero / Header Section Skeleton */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-12 pb-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto max-w-xl rounded-2xl" />
          <Skeleton className="h-4 w-1/2 mx-auto max-w-sm rounded-lg" />
          <div className="max-w-2xl mx-auto py-4">
            <Skeleton className="h-12 w-full rounded-2xl shadow-sm" />
          </div>
        </div>
      </section>

      {/* Filters & Grid Section Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex w-full items-center space-x-2 pb-4 pt-4 overflow-x-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>

        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-1/3 rounded-lg" />
          </div>

          <ProductGrid products={[]} isLoading={true} />
        </div>
      </section>
    </main>
  );
}
