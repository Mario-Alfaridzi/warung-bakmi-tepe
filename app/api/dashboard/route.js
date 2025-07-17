import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const totalOrder = await prisma.order.count();
    const totalIncome = await prisma.order.aggregate({
      _sum: { total_price: true },
    });

    const totalMenu = await prisma.menu.count();

    return NextResponse.json({
      data: [
        { title: "Total Pesanan", value: totalOrder },
        { title: "Total Pendapatan", value: totalIncome._sum.total_price || 0 },
        { title: "Menu Tersedia", value: totalMenu },
      ],
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
