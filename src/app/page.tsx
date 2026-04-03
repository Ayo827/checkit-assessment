import { getCategories } from "@/lib/api/client";
import { SearchInput } from "@/features/products/components/SearchInput";
import { CategoryFilter } from "@/features/products/components/CategoryFilter";
import { Suspense } from "react";
import { ProductResults } from "@/features/products/components/ProductResults";
import { ProductGrid } from "@/features/products/components/ProductGrid";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const category = typeof params.category === "string" ? params.category : "";
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-gray-50 to-white pt-12 pb-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
            Explore <span className="text-blue-600">Great Products</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Discover a curated collection of premium gadgets, electronics, and lifestyle items.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchInput className="shadow-xl shadow-blue-50" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md mb-6 border-b border-gray-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <CategoryFilter categories={categories} />
        </div>

        <div className="flex flex-col space-y-8">
          <Suspense 
            key={`${query}-${category}-${page}`}
            fallback={
              <div className="flex flex-col space-y-8">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-1/3 bg-gray-100 animate-pulse rounded-lg" />
                </div>
                <ProductGrid products={[]} isLoading={true} />
              </div>
            }
          >
            <ProductResults query={query} category={category} page={page} />
          </Suspense>
        </div>
      </section>
      
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Powered by Checkit Assessment</p>
      </footer>
    </main>
  );
}

