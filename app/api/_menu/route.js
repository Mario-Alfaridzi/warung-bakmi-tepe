import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/fileHelper";

export async function GET() {
  const menu = readData("menu.json");
  if (!menu || menu.length === 0) {
    return NextResponse.json({ message: "Menu not found" }, { status: 404 });
  }
  return NextResponse.json(menu, { status: 200 });
}

export async function POST(req) {
  const { id, available } = await req.json();
  const menu = readData("menu.json");

  if (id === null || available === null) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
  const newMenu = menu.map((item) =>
    item.id === id ? { ...item, available } : item
  );
  console.log(newMenu);
  writeData(newMenu, "menu.json");
  return NextResponse.json(menu, { status: 200 });
}
