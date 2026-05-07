"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCartItem } from "@/lib/cart/cart-storage";

type AddToCartButtonProps = {
  productId: string;
  slug: string;
  sku: string;
  name: string;
  price: string;
  baseUnit: string;
  saleUnit: string;
  priceUnit: string;
  minQty: string;
  packSize?: string | null;
  className?: string;
  redirectToCart?: boolean;
};

export function AddToCartButton({
  productId,
  slug,
  sku,
  name,
  price,
  baseUnit,
  saleUnit,
  priceUnit,
  minQty,
  packSize,
  className = "mt-8 w-full rounded-xl bg-gray-950 px-5 py-4 text-sm font-semibold text-white",
  redirectToCart = false,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const router = useRouter();

  function handleAddToCart() {
    addCartItem({
      productId,
      slug,
      sku,
      name,
      price,
      baseUnit,
      saleUnit,
      priceUnit,
      quantity: Number(minQty),
      packSize,
    });

    if (redirectToCart) {
      router.push("/cart");
      return;
    }

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button type="button" onClick={handleAddToCart} className={className}>
      {added ? "Додано в кошик" : "Додати в кошик"}
    </button>
  );
}
