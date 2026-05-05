"use client";

import { useMemo, useState } from "react";
import { addCartItem } from "@/lib/cart/cart-storage";

type ProductPurchasePanelProps = {
  productId: string;
  slug: string;
  sku: string;
  name: string;
  price: string;
  baseUnit: string;
  saleUnit: string;
  priceUnit: string;
  minQty: string;
  stepQty: string;
  packSize?: string | null;
};

function formatUnit(unit: string) {
  const units: Record<string, string> = {
    PCS: "шт",
    M2: "м²",
    M: "м",
    KG: "кг",
    L: "л",
    PACK: "уп.",
    BAG: "мішок",
  };

  return units[unit] ?? unit;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}

export function ProductPurchasePanel({
  productId,
  slug,
  sku,
  name,
  price,
  baseUnit,
  saleUnit,
  priceUnit,
  minQty,
  stepQty,
  packSize,
}: ProductPurchasePanelProps) {
  const min = Number(minQty);
  const step = Number(stepQty);
  const unitPrice = Number(price);
  const packageSize = packSize ? Number(packSize) : null;

  const [quantity, setQuantity] = useState(min);
  const [added, setAdded] = useState(false);

  const saleQuantity = useMemo(() => {
    if (packageSize && saleUnit !== baseUnit) {
      return quantity / packageSize;
    }

    return quantity;
  }, [quantity, packageSize, saleUnit, baseUnit]);

  const total = useMemo(() => {
    return quantity * unitPrice;
  }, [quantity, unitPrice]);

  function decrease() {
    setQuantity((current) => {
      const next = current - step;
      return next < min ? min : next;
    });
  }

  function increase() {
    setQuantity((current) => current + step);
  }

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
      quantity,
      packSize,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <>
      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-950">Кількість</p>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={decrease}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-xl font-medium"
          >
            −
          </button>

          <div className="min-w-32 rounded-xl border border-gray-300 bg-white px-4 py-3 text-center">
            <p className="text-lg font-semibold text-gray-950">
              {formatNumber(saleQuantity)} {formatUnit(saleUnit)}
            </p>

            {saleUnit !== baseUnit ? (
              <p className="mt-1 text-xs text-gray-500">
                = {formatNumber(quantity)} {formatUnit(baseUnit)}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={increase}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-xl font-medium"
          >
            +
          </button>
        </div>

        {packageSize ? (
          <p className="mt-3 text-xs text-gray-500">
            В упаковці: {formatNumber(packageSize)} {formatUnit(baseUnit)}
          </p>
        ) : null}

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="text-sm text-gray-600">
            Ціна за {formatUnit(priceUnit)}
          </span>
          <span className="font-semibold text-gray-950">{price} грн</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">Разом</span>
          <span className="text-xl font-bold text-gray-950">
            {formatNumber(total)} грн
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-8 w-full rounded-xl bg-gray-950 px-5 py-4 text-sm font-semibold text-white"
      >
        {added ? "Додано в кошик" : "Додати в кошик"}
      </button>
    </>
  );
}