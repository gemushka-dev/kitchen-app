import { cookies } from "next/headers";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { UserLoginDTOType } from "@/src/types/UserDTOType";
import { getUserByEmail } from "@/src/db/methods.orm";
import { env } from "process";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password }: UserLoginDTOType = body;
  if (!email || !password)
    return NextResponse.json(
      { success: false, error: "Missing email or password or username" },
      { status: 400 },
    );
  const registeredUser = await getUserByEmail(email);
  if (!registeredUser)
    return NextResponse.json(
      { success: false, error: "There is no such user" },
      { status: 401 },
    );
  const isPasswordValid = await compare(password, registeredUser.password);
  if (!isPasswordValid)
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  if (!process.env.SECRET)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  const cookieStore = await cookies();
  const token = sign(
    {
      id: registeredUser.userId,
      username: registeredUser.username,
      email: registeredUser.email,
    },
    process.env.SECRET,
    { expiresIn: "7d" },
  );
  cookieStore.set("jwt_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return NextResponse.json(
    { success: true, message: "Logged in successfully" },
    { status: 200 },
  );
}
