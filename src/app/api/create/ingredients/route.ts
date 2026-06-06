import { NextRequest, NextResponse } from "next/server";
import { createIngredient } from "@/src/db/methods.orm";
import { IngredientDTOType } from "@/src/types/IngredientsDTOType";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name }: IngredientDTOType = body;
    if (!name)
      return NextResponse.json(
        { success: false, error: "Bad Request" },
        { status: 400 },
      );
    await createIngredient({ name });
    return NextResponse.json(
      { message: "Ingredient created" },
      { status: 200 },
    );
  } catch (e) {
    return (
      NextResponse.json({
        success: false,
        error: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
