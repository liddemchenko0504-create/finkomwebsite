import Link from "next/link";
import { prisma } from "@/lib/prisma";

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

function createCartHref(product: {
  id: string;
  slug: string;
  sku: string;
  name: string;
  price: { toString(): string };
  baseUnit: string;
  saleUnit: string;
  priceUnit: string;
  minQty: { toString(): string };
  packSize?: { toString(): string } | null;
}) {
  const params = new URLSearchParams({
    add: product.id,
    slug: product.slug,
    sku: product.sku,
    name: product.name,
    price: product.price.toString(),
    baseUnit: product.baseUnit,
    saleUnit: product.saleUnit,
    priceUnit: product.priceUnit,
    quantity: product.minQty.toString(),
  });

  if (product.packSize) {
    params.set("packSize", product.packSize.toString());
  }

  return `/cart?${params.toString()}`;
}

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-gray-500">Каталог</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
            Будівельні матеріали
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Тестовий каталог товарів з підтримкою різних одиниць продажу:
            штуки, м², упаковки та мішки.
          </p>
        </div>

        <Link
          href="/cart"
          className="inline-flex justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
        >
          Відкрити кошик
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const image = product.images[0];

          return (
            <article
              key={product.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex h-44 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
                {image ? image.alt ?? product.name : "Фото товару"}
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  {product.category?.name}
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-950">
                  {product.name}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Артикул: {product.sku}
                </p>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold text-gray-950">
                      {product.price.toString()} грн
                    </p>
                    <p className="text-sm text-gray-500">
                      за {formatUnit(product.priceUnit)}
                    </p>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    <p>
                      Залишок: {product.stockQty.toString()}{" "}
                      {formatUnit(product.baseUnit)}
                    </p>
                    {product.packSize ? (
                      <p>Упаковка: {product.packSize.toString()}</p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5 grid gap-2">
                  <Link
                    href={createCartHref(product)}
                    prefetch={false}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    Додати в кошик
                  </Link>

                  <Link
                    href={`/product/${product.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Дивитися товар
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
