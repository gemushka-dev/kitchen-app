import { getAllRecipes } from "@/src/db/methods.orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 10;
  const offset = Number(searchParams.get("offset")) || 0;
  try {
    const recipes = await getAllRecipes(limit, offset);
    return NextResponse.json(recipes, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}
