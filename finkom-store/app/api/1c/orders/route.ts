import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatDecimal(value: unknown) {
  return value?.toString() ?? null;
}

export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: "NEW",
    },
    include: {
      deliveryAddress: true,
      items: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json({
    orders: orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      createdAt: order.createdAt.toISOString(),

      customer: {
        name: order.customerName,
        phone: order.customerPhone,
      },

      delivery: {
        type: order.deliveryType,
        city: order.deliveryAddress?.city ?? null,
        street: order.deliveryAddress?.street ?? null,
        building: order.deliveryAddress?.building ?? null,
        apartment: order.deliveryAddress?.apartment ?? null,
        entrance: order.deliveryAddress?.entrance ?? null,
        floor: order.deliveryAddress?.floor ?? null,
        comment: order.deliveryAddress?.comment ?? null,
      },

      total: formatDecimal(order.total),

      items: order.items.map((item) => ({
        productId: item.productId,
        sku: item.sku,
        name: item.name,
        price: formatDecimal(item.price),
        quantity: formatDecimal(item.quantity),
        baseUnit: item.baseUnit,
        saleUnit: item.saleUnit,
        priceUnit: item.priceUnit,
        packSize: formatDecimal(item.packSize),
        lineTotal: formatDecimal(item.lineTotal),
      })),
    })),
  });
}