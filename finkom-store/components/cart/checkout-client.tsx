"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CartItem, clearCart, getCartItems } from "@/lib/cart/cart-storage";

const deliveryCities = [
  "Прилуки",
  "Ладан",
  "Мала Дівиця",
  "Варва",
  "Ічня",
  "Срібне",
  "Інше місто / уточнить менеджер",
];

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

export function CheckoutClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    deliveryType: "address",
    city: "Прилуки",
    street: "",
    building: "",
    apartment: "",
    entrance: "",
    floor: "",
    comment: "",
  });

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);
  }, [items]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderPayload = {
      customer: {
        name: form.name,
        phone: form.phone,
      },
      delivery: {
        type: form.deliveryType,
        city: form.city,
        street: form.street,
        building: form.building,
        apartment: form.apartment,
        entrance: form.entrance,
        floor: form.floor,
        comment: form.comment,
      },
      items,
      total,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
  const errorText = await response.text();
  console.error("Order create failed:", errorText);
  alert(`Не вдалося створити замовлення: ${errorText}`);
  return;
}

    clearCart();
    setItems([]);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-gray-500">Замовлення</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950">
            Дякуємо! Замовлення прийнято
          </h1>
          <p className="mt-4 text-gray-600">
            Замовлення збережено в базу. Наступним кроком підготуємо передачу
            в 1С/BAS.
          </p>

          <Link
            href="/catalog"
            className="mt-6 inline-flex rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Повернутися до каталогу
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-950">Оформлення</h1>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">Кошик порожній.</p>

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
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/cart" className="text-sm text-gray-500 hover:text-gray-950">
        ← Назад до кошика
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <section>
          <p className="text-sm font-medium text-gray-500">Checkout</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950">
            Оформлення замовлення
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-950">
                Контактні дані
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Ім’я
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                    placeholder="Ваше ім’я"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Телефон
                  </span>
                  <input
                    required
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                    placeholder="+380..."
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-950">
                Спосіб отримання
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={form.deliveryType === "pickup"}
                    onChange={(event) =>
                      updateField("deliveryType", event.target.value)
                    }
                  />
                  <span className="text-sm font-medium text-gray-800">
                    Самовивіз
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="address"
                    checked={form.deliveryType === "address"}
                    onChange={(event) =>
                      updateField("deliveryType", event.target.value)
                    }
                  />
                  <span className="text-sm font-medium text-gray-800">
                    Доставка за адресою
                  </span>
                </label>
              </div>

              {form.deliveryType === "address" ? (
                <div className="mt-5 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      Місто / населений пункт
                    </span>
                    <select
                      value={form.city}
                      onChange={(event) => updateField("city", event.target.value)}
                      className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                    >
                      {deliveryCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Вулиця
                      </span>
                      <input
                        required
                        value={form.street}
                        onChange={(event) =>
                          updateField("street", event.target.value)
                        }
                        className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                        placeholder="Наприклад, Київська"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Будинок
                      </span>
                      <input
                        required
                        value={form.building}
                        onChange={(event) =>
                          updateField("building", event.target.value)
                        }
                        className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                        placeholder="12"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Квартира / офіс
                      </span>
                      <input
                        value={form.apartment}
                        onChange={(event) =>
                          updateField("apartment", event.target.value)
                        }
                        className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Під’їзд
                      </span>
                      <input
                        value={form.entrance}
                        onChange={(event) =>
                          updateField("entrance", event.target.value)
                        }
                        className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Поверх
                      </span>
                      <input
                        value={form.floor}
                        onChange={(event) =>
                          updateField("floor", event.target.value)
                        }
                        className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      Коментар до доставки
                    </span>
                    <textarea
                      value={form.comment}
                      onChange={(event) =>
                        updateField("comment", event.target.value)
                      }
                      className="min-h-28 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-950"
                      placeholder="Наприклад: дзвонити за 30 хв, потрібен підйом..."
                    />
                  </label>
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="rounded-xl bg-gray-950 px-5 py-4 text-sm font-semibold text-white"
            >
              Оформити замовлення
            </button>
          </form>
        </section>

        <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-950">
            Ваше замовлення
          </h2>

          <div className="mt-5 grid gap-4">
            {items.map((item) => {
              const saleQuantity =
                item.packSize && item.saleUnit !== item.baseUnit
                  ? item.quantity / Number(item.packSize)
                  : item.quantity;

              const lineTotal = Number(item.price) * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="font-medium text-gray-950">{item.name}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatNumber(saleQuantity)} {formatUnit(item.saleUnit)}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-950">
                    {formatNumber(lineTotal)} грн
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-300 pt-5">
            <span className="font-semibold text-gray-950">Разом</span>
            <span className="text-xl font-bold text-gray-950">
              {formatNumber(total)} грн
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}