import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/fileHelper";

export async function DELETE(req) {
  const { id } = await req.json();
  const order = readData("order.json");
  const idxToDelete = order.findIndex((item) => item.id === id);
  order.splice(idxToDelete, 1);

  writeData(order, "order.json");

  return NextResponse.json(
    { message: "Deleted one of order" },
    { status: 201 }
  );
}
