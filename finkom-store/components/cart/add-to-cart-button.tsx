"use client";

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
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

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

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-8 w-full rounded-xl bg-gray-950 px-5 py-4 text-sm font-semibold text-white"
    >
      {added ? "Додано в кошик" : "Додати в кошик"}
    </button>
  );
}