import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        <div className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm shadow-sm border border-gray-100 uppercase tracking-tight">
          {product.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400 px-1">•</span>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{product.brand}</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900 font-display">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs font-medium text-green-600">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
          <span className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-blue-600 active:scale-95 shadow-sm">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
