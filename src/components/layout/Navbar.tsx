"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-110 group-active:scale-95">
            <span className="text-xl font-black">P</span>
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900 font-display">
            Product<span className="text-blue-600">Explorer</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-white transition-all hover:border-blue-100 hover:bg-blue-50 active:scale-95 shadow-sm"
          >
            <ShoppingCart className="h-5 w-5 text-gray-600 transition-colors group-hover:text-blue-600" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white shadow-lg shadow-blue-200 ring-4 ring-white animate-in zoom-in duration-300">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
