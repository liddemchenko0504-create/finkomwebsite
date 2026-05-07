"use client";

import { MouseEvent, useState } from "react";
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

  function addItem() {
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
  }

  function handleButtonClick() {
    addItem();
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    addItem();
    window.location.assign("/cart");
  }

  if (redirectToCart) {
    return (
      <a href="/cart" onClick={handleLinkClick} className={className}>
        Додати в кошик
      </a>
    );
  }

  return (
    <button type="button" onClick={handleButtonClick} className={className}>
      {added ? "Додано в кошик" : "Додати в кошик"}
    </button>
  );
}
