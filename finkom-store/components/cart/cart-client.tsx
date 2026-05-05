"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CartItem,
  getCartItems,
  removeCartItem,
  saveCartItems,
} from "@/lib/cart/cart-storage";

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

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);
  }, [items]);

  function handleRemove(productId: string) {
    removeCartItem(productId);
    setItems(getCartItems());
  }

  function handleClear() {
    saveCartItems([]);
    setItems([]);
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-950">Кошик</h1>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">Кошик поки порожній.</p>

          <Link
            href="/catalog"
            className="mt-5 inline-flex rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Перейти до каталогу
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Оформлення</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950">Кошик</h1>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700"
        >
          Очистити
        </button>
      </div>

      <div className="mt-8 grid gap-4">
        {items.map((item) => {
          const saleQuantity =
            item.packSize && item.saleUnit !== item.baseUnit
              ? item.quantity / Number(item.packSize)
              : item.quantity;

          const lineTotal = Number(item.price) * item.quantity;

          return (
            <article
              key={item.productId}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div>
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-lg font-semibold text-gray-950 hover:underline"
                  >
                    {item.name}
                  </Link>

                  <p className="mt-1 text-sm text-gray-500">
                    Артикул: {item.sku}
                  </p>

                  <p className="mt-3 text-sm text-gray-700">
                    Кількість: {formatNumber(saleQuantity)}{" "}
                    {formatUnit(item.saleUnit)}
                    {item.saleUnit !== item.baseUnit
                      ? ` = ${formatNumber(item.quantity)} ${formatUnit(
                          item.baseUnit
                        )}`
                      : ""}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-500">
                    {item.price} грн / {formatUnit(item.priceUnit)}
                  </p>

                  <p className="mt-2 text-xl font-bold text-gray-950">
                    {formatNumber(lineTotal)} грн
                  </p>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.productId)}
                    className="mt-3 text-sm text-red-600 hover:underline"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-950">Разом</span>
          <span className="text-2xl font-bold text-gray-950">
            {formatNumber(total)} грн
          </span>
        </div>

        <Link
          href="/checkout"
          className="mt-6 inline-flex w-full justify-center rounded-xl bg-gray-950 px-5 py-4 text-sm font-semibold text-white"
        >
          Перейти до оформлення
        </Link>
      </div>
    </main>
  );
}