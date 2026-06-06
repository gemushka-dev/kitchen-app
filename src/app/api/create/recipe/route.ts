import { createRecipe, createRecipeIngredients } from "@/src/db/methods.orm";
import { RecipeIngredientDTO } from "@/src/types/IngredientsDTOType";
import { FullRecipeType } from "@/src/types/RecipeType";
import { verifyJWT } from "@/src/utils/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = (await cookies()).get("jwt_token")?.value;
    const user = token ? verifyJWT(token) : false;
    if (!user)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    const body: FullRecipeType = await request.json();
    body.recipe.authorId = user.id;
    const [newRecipe] = await createRecipe(body.recipe);
    const items = body.ingredients.map((e) => {
      return {
        recipeId: newRecipe.recipeId,
        ingredientId: e.ingredientId,
        amount: e.amount,
        unit: e.unit,
      };
    });
    await createRecipeIngredients(items);
    return NextResponse.json({ message: "Recipe created" }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
