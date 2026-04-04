"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const breadcrumbs = [
    { label: "Products", href: "/" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
  ];

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-12 text-center shadow-2xl shadow-blue-100 border border-white">
          <div className="mb-8 flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-green-600 animate-in zoom-in duration-500" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Order Confirmed!</h1>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">
            Thank you for your purchase. We've received your order and are processing it for shipment.
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
             <p className="text-xl font-black text-gray-900">#ORD-{Math.floor(Math.random() * 1000000)}</p>
          </div>
          <Link
            href="/"
            className="flex w-full items-center justify-center rounded-2xl bg-gray-900 py-5 text-lg font-black text-white transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
          >
            Continue Exploring
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-black text-gray-900 mb-8">Your cart is empty.</h1>
            <Link href="/" className="text-blue-600 font-bold hover:underline">Return to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-4xl font-black text-gray-900 mt-8 mb-12 tracking-tight">
          Secure <span className="text-blue-600">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Form */}
          <div className="space-y-12">
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-black">1</span>
                <h2 className="text-2xl font-black text-gray-900">Shipping Details</h2>
              </div>
              
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">First Name</label>
                    <input required type="text" className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-black" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Last Name</label>
                    <input required type="text" className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-black" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                  <input required type="email" className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-black" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Shipping Address</label>
                  <input required type="text" className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-black" placeholder="123 Luxury Street" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">City</label>
                    <input required type="text" className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-black" placeholder="Lagos" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">State</label>
                    <input required type="text" className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-black" placeholder="LA" />
                  </div>
                   <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Zip Code</label>
                    <input required type="text" className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium text-black" placeholder="10001" />
                  </div>
                </div>

                <div className="pt-8">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-black">2</span>
                    <h2 className="text-2xl font-black text-gray-900">Payment</h2>
                  </div>
                  <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 text-blue-700 font-medium">
                    This is a simulation. You won't be charged. Simply click the button below to complete the order.
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex w-full items-center justify-center rounded-2xl bg-gray-900 py-6 text-xl font-black text-white transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-xl shadow-gray-200 mt-12 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      Complete Purchase
                      <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                    </>
                  )}
                </button>
              </form>
            </section>
          </div>

          {/* Cart Sidebar */}
          <div>
            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 sticky top-28">
              <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">In Your Bag</h3>
              <div className="space-y-6 mb-10 overflow-auto max-h-96 pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 bg-white rounded-xl border border-gray-100 p-2">
                      <Image src={item.thumbnail} alt={item.title} fill className="object-contain p-1" />
                      <span className="absolute -top-2 -right-2 h-6 w-6 bg-gray-900 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-bold text-gray-900 line-clamp-1">{item.title}</p>
                      <p className="text-sm font-black text-blue-600 font-display">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-200">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900 font-display">${totalPrice.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="text-lg font-black text-gray-900">Total</span>
                  <span className="text-3xl font-black text-gray-900 font-display">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
