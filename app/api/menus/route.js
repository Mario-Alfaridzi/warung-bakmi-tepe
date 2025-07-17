import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: {
        available: "desc",
      },
    });
    return Response.json(menus);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, price, type, image } = await req.json();

    const available = false;

    if (!name || !price || !type || !image) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (isNaN(price)) {
      return NextResponse.json(
        { message: "Harga harus berupa angka" },
        { status: 400 }
      );
    }

    const newMenu = await prisma.menu.create({
      data: {
        name,
        price,
        type,
        image,
        available,
      },
    });

    return NextResponse.json(newMenu);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
