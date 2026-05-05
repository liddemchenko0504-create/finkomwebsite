import { PrismaClient, Unit } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const doorsCategory = await prisma.category.upsert({
    where: { slug: "doors" },
    update: {},
    create: {
      name: "Двері",
      slug: "doors",
    },
  });

  const tilesCategory = await prisma.category.upsert({
    where: { slug: "tiles" },
    update: {},
    create: {
      name: "Плитка",
      slug: "tiles",
    },
  });

  const cementCategory = await prisma.category.upsert({
    where: { slug: "cement" },
    update: {},
    create: {
      name: "Цемент",
      slug: "cement",
    },
  });

  await prisma.product.upsert({
    where: { sku: "DOOR-001" },
    update: {},
    create: {
      external1cId: "1C-DOOR-001",
      sku: "DOOR-001",
      name: "Двері міжкімнатні класичні",
      slug: "classic-interior-door",
      description: "Міжкімнатні двері для житлових приміщень.",
      categoryId: doorsCategory.id,
      baseUnit: Unit.PCS,
      saleUnit: Unit.PCS,
      priceUnit: Unit.PCS,
      price: "3900",
      stockQty: "4",
      minQty: "1",
      stepQty: "1",
      packSize: null,
      images: {
        create: [
          {
            url: "/images/products/door-placeholder.jpg",
            alt: "Двері міжкімнатні класичні",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { sku: "TILE-001" },
    update: {},
    create: {
      external1cId: "1C-TILE-001",
      sku: "TILE-001",
      name: "Плитка керамічна Metro",
      slug: "ceramic-tile-metro",
      description: "Керамічна плитка для ванної кімнати та кухні.",
      categoryId: tilesCategory.id,
      baseUnit: Unit.M2,
      saleUnit: Unit.PACK,
      priceUnit: Unit.M2,
      price: "620",
      stockQty: "43.2",
      minQty: "1.44",
      stepQty: "1.44",
      packSize: "1.44",
      images: {
        create: [
          {
            url: "/images/products/tile-placeholder.jpg",
            alt: "Плитка керамічна Metro",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { sku: "CEMENT-001" },
    update: {},
    create: {
      external1cId: "1C-CEMENT-001",
      sku: "CEMENT-001",
      name: "Цемент М500 25 кг",
      slug: "cement-m500-25kg",
      description: "Цемент для будівельних та ремонтних робіт.",
      categoryId: cementCategory.id,
      baseUnit: Unit.KG,
      saleUnit: Unit.BAG,
      priceUnit: Unit.BAG,
      price: "185",
      stockQty: "120",
      minQty: "1",
      stepQty: "1",
      packSize: "25",
      images: {
        create: [
          {
            url: "/images/products/cement-placeholder.jpg",
            alt: "Цемент М500 25 кг",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });