"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  variant?: "primary" | "outline";
  className?: string;
}

export function AddToCartButton({ product, variant = "primary", className }: AddToCartButtonProps) {
  const { cart, addToCart } = useCart();
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  // Check if item is already in cart and at max stock
  const cartItem = cart.find(item => item.id === product.id);
  const isMaxInCart = cartItem && cartItem.quantity >= product.stock;
  const isOutOfStock = product.stock <= 0;
  const isDisabled = isMaxInCart || isOutOfStock;

  const handleAddToCart = () => {
    if (isDisabled) return;

    addToCart(product);
    setIsAdded(true);
    
    if (variant === "outline") {
      // "Buy Now" logic
      router.push("/checkout");
    } else {
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={cn(
        "flex-1 rounded-2xl py-5 text-lg font-black transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 font-display shadow-sm",
        isDisabled 
          ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" 
          : variant === "primary" 
            ? "bg-gray-900 text-white hover:bg-blue-600 shadow-xl shadow-gray-200" 
            : "border-2 border-gray-900 text-gray-900 hover:bg-gray-50",
        isAdded && !isDisabled && "bg-green-600 border-green-600 hover:bg-green-600 text-white",
        className
      )}
    >
      {isOutOfStock ? (
        "Out of Stock"
      ) : isMaxInCart ? (
        "Max in Cart"
      ) : isAdded ? (
        <>
          <Check className="h-6 w-6" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="h-6 w-6" />
          {variant === "primary" ? "Add to Cart" : "Buy Now"}
        </>
      )}
    </button>
  );
}
