import { NextResponse } from "next/server";
import { writeData } from "@/lib/fileHelper";

export async function POST() {
  writeData({}, "currentLogin.json");
  return NextResponse.json({ message: "Sukses Logout" }, { status: 200 });
}
