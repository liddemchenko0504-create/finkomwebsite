import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DeliveryType, Unit } from "@prisma/client";

type CartItemPayload = {
  productId: string;
  slug: string;
  sku: string;
  name: string;
  price: string;
  baseUnit: string;
  saleUnit: string;
  priceUnit: string;
  quantity: number;
  packSize?: string | null;
};

type CreateOrderPayload = {
  customer: {
    name: string;
    phone: string;
  };
  delivery: {
    type: string;
    city: string;
    street?: string;
    building?: string;
    apartment?: string;
    entrance?: string;
    floor?: string;
    comment?: string;
  };
  items: CartItemPayload[];
  total: number;
};

function toUnit(value: string): Unit {
  if (value in Unit) {
    return value as Unit;
  }

  throw new Error(`Invalid unit: ${value}`);
}

function toDeliveryType(value: string): DeliveryType {
  if (value === "pickup") {
    return DeliveryType.PICKUP;
  }

  return DeliveryType.ADDRESS;
}

function createOrderNumber() {
  const timestamp = new Date()
    .toISOString()
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replace(".", "")
    .slice(0, 15);

  return `WEB-${timestamp}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateOrderPayload;

    if (!payload.customer.name || !payload.customer.phone) {
      return NextResponse.json(
        { message: "Customer name and phone are required" },
        { status: 400 }
      );
    }

    if (!payload.items.length) {
      return NextResponse.json(
        { message: "Order items are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: createOrderNumber(),
        customerName: payload.customer.name,
        customerPhone: payload.customer.phone,
        deliveryType: toDeliveryType(payload.delivery.type),
        total: payload.total.toString(),

        deliveryAddress:
          payload.delivery.type === "address"
            ? {
                create: {
                  city: payload.delivery.city,
                  street: payload.delivery.street,
                  building: payload.delivery.building,
                  apartment: payload.delivery.apartment,
                  entrance: payload.delivery.entrance,
                  floor: payload.delivery.floor,
                  comment: payload.delivery.comment,
                },
              }
            : undefined,

        items: {
          create: payload.items.map((item) => {
            const lineTotal = Number(item.price) * item.quantity;

            return {
              productId: item.productId,
              sku: item.sku,
              name: item.name,
              price: item.price,
              quantity: item.quantity.toString(),
              baseUnit: toUnit(item.baseUnit),
              saleUnit: toUnit(item.saleUnit),
              priceUnit: toUnit(item.priceUnit),
              packSize: item.packSize ?? null,
              lineTotal: lineTotal.toString(),
            };
          }),
        },
      },
      include: {
        items: true,
        deliveryAddress: true,
      },
    });
    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
    } catch (error) {
    console.error("Create order error:", error);

    const errorMessage =
      error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        message: "Failed to create order",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Orders API is working",
  });
}