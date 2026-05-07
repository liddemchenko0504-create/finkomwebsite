import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type MarkExportedPayload = {
  orderNumbers: string[];
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as MarkExportedPayload;

    if (!payload.orderNumbers?.length) {
      return NextResponse.json(
        { message: "orderNumbers is required" },
        { status: 400 }
      );
    }

    const result = await prisma.order.updateMany({
      where: {
        orderNumber: {
          in: payload.orderNumbers,
        },
        status: "NEW",
      },
      data: {
        status: "EXPORTED",
      },
    });

    return NextResponse.json({
      ok: true,
      updatedCount: result.count,
    });
  } catch (error) {
    console.error("Mark orders exported error:", error);

    const errorMessage =
      error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        message: "Failed to mark orders as exported",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}