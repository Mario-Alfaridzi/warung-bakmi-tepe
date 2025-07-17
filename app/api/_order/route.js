import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { order_list: true },
      orderBy: { order_time: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
