import { NextRequest, NextResponse } from "next/server";
import { createIngredient, getIngredientsByUserId } from "@/src/db/methods.orm";
import { IngredientDTOType } from "@/src/types/IngredientsDTOType";
import { cookies } from "next/headers";
import { verifyJWT } from "@/src/utils/auth";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const token = (await cookies()).get("jwt_token")?.value;
    const user = token ? verifyJWT(token) : false;
    if (!user)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    const ingredients = await getIngredientsByUserId(user.id);
    return NextResponse.json({ data: ingredients }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = (await cookies()).get("jwt_token")?.value;
    const user = token ? verifyJWT(token) : false;
    if (!user)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    const body = await request.json();
    const { name }: IngredientDTOType = body;
    if (!name || name.trim() === "")
      return NextResponse.json(
        { success: false, error: "Bad Request" },
        { status: 400 },
      );
    await createIngredient(name, user.id);
    revalidatePath("/create");
    return NextResponse.json(
      { message: "Ingredient created" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
