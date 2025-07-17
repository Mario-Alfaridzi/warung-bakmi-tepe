import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const user = await prisma.user.findFirst();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
