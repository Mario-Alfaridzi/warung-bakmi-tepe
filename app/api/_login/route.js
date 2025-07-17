import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "JWT secret is not defined" },
        { status: 500 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }
    }

    const token = jwt.sign({ userId: user.id, username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      status: "success",
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
