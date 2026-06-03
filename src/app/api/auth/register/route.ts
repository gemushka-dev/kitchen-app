import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/src/db/methods.orm";
import { UserDTOType } from "@/src/types/UserDTOType";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username }: UserDTOType = body;
    if (!email || !password || !username)
      return NextResponse.json(
        { error: "Missing email or password or username" },
        { status: 400 },
      );
    const registeredUser = await getUserByEmail(email);
    if (registeredUser)
      return NextResponse.json(
        { error: "User already registered" },
        { status: 409 },
      );
    const hashedPassword = await hash(password, 10);
    const user = await createUser({
      email,
      password: hashedPassword,
      username,
    });
    if (!user)
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    return NextResponse.json(
      { message: "Successfully registred" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
