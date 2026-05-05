import Link from "next/link";
import { notFound } from "next/navigation";
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

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const image = product.images[0];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/catalog" className="text-sm text-gray-500 hover:text-gray-950">
        ← Назад до каталогу
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <section>
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-gray-100 text-gray-400">
            {image ? image.alt ?? product.name : "Фото товару"}
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            <div className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-400">
              Фото 1
            </div>
            <div className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-400">
              Фото 2
            </div>
            <div className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-400">
              Фото 3
            </div>
            <div className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-400">
              Фото 4
            </div>
          </div>
        </section>

        <section>
          <p className="text-sm text-gray-500">{product.category?.name}</p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950">
            {product.name}
          </h1>

          <p className="mt-3 text-sm text-gray-500">Артикул: {product.sku}</p>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-3xl font-bold text-gray-950">
                {product.price.toString()} грн
              </p>
              <p className="mt-1 text-sm text-gray-500">
                за {formatUnit(product.priceUnit)}
              </p>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-gray-700">
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span>Наявність</span>
                <span>
                  {product.stockQty.toString()} {formatUnit(product.baseUnit)}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span>Одиниця продажу</span>
                <span>{formatUnit(product.saleUnit)}</span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span>Мінімальна кількість</span>
                <span>
                  {product.minQty.toString()} {formatUnit(product.baseUnit)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Крок замовлення</span>
                <span>
                  {product.stepQty.toString()} {formatUnit(product.baseUnit)}
                </span>
              </div>

              {product.packSize ? (
                <div className="flex justify-between border-t border-gray-100 pt-3">
                  <span>Розмір упаковки</span>
                  <span>
                    {product.packSize.toString()} {formatUnit(product.baseUnit)}
                  </span>
                </div>
              ) : null}
            </div>

            <button className="mt-8 w-full rounded-xl bg-gray-950 px-5 py-4 text-sm font-semibold text-white">
              Додати в кошик
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Кошик підключимо наступним кроком.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-950">Опис</h2>
            <p className="mt-3 leading-7 text-gray-600">
              {product.description ?? "Опис товару буде додано пізніше."}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}