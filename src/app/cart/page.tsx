"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const breadcrumbs = [
    { label: "Products", href: "/" },
    { label: "Shopping Cart", href: "/cart" },
  ];

  if (cart.length === 0) {
    return (
      <main className="min-h-[calc(100-4rem)] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-12 flex flex-col items-center justify-center text-center space-y-6 py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="p-6 rounded-full bg-white shadow-sm border border-gray-100">
              <ShoppingBag className="h-12 w-12 text-gray-300" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-gray-900">Your cart is empty</h1>
              <p className="text-gray-500 font-medium max-w-sm mx-auto">
                Looks like you haven't added any products to your cart yet. 
                Explore our curated collection to get started.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-8 py-4 text-lg font-black text-white transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-4xl font-black text-gray-900 mt-8 mb-12 tracking-tight">
          Shopping <span className="text-blue-600">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{totalItems} Items</span>
            </div>

            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-8 flex gap-6 group">
                  <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <Link href={`/products/${item.id}`} className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                          {item.title}
                        </Link>
                        <p className="text-sm font-black text-gray-400 uppercase tracking-tighter">SKU: PRO-{item.id}442</p>
                      </div>
                      <p className="text-2xl font-black text-gray-900 font-display">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-inner">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 transition-all active:scale-90"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-black text-gray-900 font-display">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          title={item.quantity >= item.stock ? "Maximum stock reached" : "Increase quantity"}
                          className={cn(
                            "p-2 rounded-lg transition-all active:scale-90",
                            item.quantity >= item.stock 
                              ? "text-gray-200 cursor-not-allowed" 
                              : "hover:bg-white hover:shadow-sm text-gray-500"
                          )}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors bg-red-50 px-4 py-2 rounded-xl border border-red-100 shadow-sm active:scale-95"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gray-900 rounded-3xl p-8 text-white shadow-2xl shadow-gray-200 space-y-8">
              <h2 className="text-2xl font-black tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 border-b border-white/10 pb-8">
                <div className="flex justify-between text-white/70 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70 font-medium">
                  <span>Shipping</span>
                  <span className="font-bold text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-white/70 font-medium">
                  <span>Tax</span>
                  <span className="font-bold text-white">$0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-lg font-bold">Total</span>
                <span className="text-4xl font-black text-blue-400 font-display">${totalPrice.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center rounded-2xl bg-blue-600 py-5 text-lg font-black text-white transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/50"
              >
                Checkout Now
              </Link>

              <div className="pt-4 text-center">
                <Link href="/" className="text-sm font-bold text-white/50 hover:text-white transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
