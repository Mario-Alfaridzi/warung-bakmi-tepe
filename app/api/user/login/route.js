import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json(
        { message: "Username tidak ditemukan" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Password salah" }, { status: 400 });
    }

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: "7d" });

    const res = NextResponse.json({
      user: { userId: user.userId, username: user.username, role: user.role },
    });

    res.cookies.set("token_bakmitepe", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    res.cookies.set(
      "user_bakmitepe",
      JSON.stringify({
        userId: user.userId,
        username: user.username,
        role: user.role,
        imageProfile: user.imageProfile,
      }),
      {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
    );

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
