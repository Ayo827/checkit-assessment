import { getProductById } from "@/lib/api/client";
import { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Star, Truck, ShieldCheck, RefreshCcw, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/features/products/components/AddToCartButton";
import { ProductReviews } from "@/features/products/components/ProductReviews";

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
                <span className="text-5xl font-black text-gray-900 font-display">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl font-bold text-green-600 font-display">-{product.discountPercentage}% OFF</span>
                )}
              </div>
              <p className="mt-4 text-lg text-gray-500 font-medium leading-relaxed capitalize">
                {product.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border",
                  product.stock > 0 
                    ? "bg-green-50 text-green-700 border-green-100" 
                    : "bg-red-50 text-red-700 border-red-100"
                )}>
                  <div className={cn("h-2 w-2 rounded-full", product.stock > 0 ? "bg-green-500" : "bg-red-500")} />
                  {product.availabilityStatus || (product.stock > 0 ? "In Stock" : "Out of Stock")}
                </div>
                
                <span className="text-sm font-bold text-gray-400">
                  Available Quantity: <span className={cn("text-gray-900", product.stock < 10 && "text-red-600")}>{product.stock}</span>
                </span>

                {product.stock < 5 && product.stock > 0 && (
                  <span className="text-xs font-black text-red-600 uppercase tracking-widest animate-pulse">
                    Low Stock!
                  </span>
                )}
              </div>
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
              <AddToCartButton product={product} variant="primary" />
              <AddToCartButton product={product} variant="outline" className="border-gray-900" />
            </div>
          </div>
        </div>

        <div className="mt-20 pt-20 border-t border-gray-100 pb-20">
          <ProductReviews reviews={product.reviews || []} totalRating={product.rating} />
        </div>
      </div>
    </main>
  );
}
