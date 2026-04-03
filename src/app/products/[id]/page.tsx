import { getProductById } from "@/lib/api/client";
import { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Star, Truck, ShieldCheck, RefreshCcw, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    return {
      title: `${product.title} | Content Explorer`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.thumbnail }],
      },
    };
  } catch (e) {
    return {
      title: "Product Not Found",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  let product;
  try {
    product = await getProductById(id);
  } catch (e) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/" },
    { label: product.category, href: `/?category=${product.category}` },
    { label: product.title, href: `/products/${id}` },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 shadow-sm">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                priority
                className="object-contain p-8"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(0, 4).map((img : string, i : number) => (
                <div key={i} className="relative aspect-square rounded-xl bg-gray-50 border border-gray-100 overflow-hidden cursor-pointer hover:border-blue-300 transition-all">
                  <Image src={img} alt={`${product.title} view ${i}`} fill className="object-cover p-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
               <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-700/10 uppercase tracking-widest">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-yellow-400" : "text-gray-200")} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-sm font-medium text-gray-400">|</span>
                <span className="text-sm font-semibold text-blue-600">{product.reviews?.length ?? 0} Global Ratings</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-black text-gray-900">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl font-bold text-green-600">-{product.discountPercentage}% OFF</span>
                )}
              </div>
              <p className="mt-4 text-lg text-gray-500 font-medium leading-relaxed capitalize">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <Truck className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Fast Delivery</p>
                  <p className="text-sm font-bold text-gray-900">2-4 Days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <ShieldCheck className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Warranty</p>
                  <p className="text-sm font-bold text-gray-900">1 Year</p>
                </div>
              </div>
               <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <RefreshCcw className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Return Policy</p>
                  <p className="text-sm font-bold text-gray-900">30 Days</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 rounded-2xl bg-gray-900 py-5 text-lg font-black text-white transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-xl shadow-gray-200 flex items-center justify-center gap-3">
                <ShoppingCart className="h-6 w-6" />
                Add to Cart
              </button>
              <button className="flex-1 rounded-2xl border-2 border-gray-900 py-5 text-lg font-black text-gray-900 transition-all hover:bg-gray-50 hover:scale-105 active:scale-95">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
