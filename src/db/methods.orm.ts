import { desc } from "drizzle-orm";
import { UserDTOType } from "../types/UserDTOType";
import { db } from "./index";
import { ingredients, recipeIngredients, recipes, users } from "./schema";
import { RecipeDTOType } from "../types/RecipeDTOType";
import {
  IngredientDTOType,
  RecipeIngredientDTO,
} from "../types/IngredientsDTOType";

export function getUserById(userId: number) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.userId, userId),
  });
}

export function createUser(user: UserDTOType) {
  return db.insert(users).values(user).returning();
}

export function getAllRecipes(limit: number, offset: number) {
  return db.query.recipes.findMany({
    where: ({ status }, { eq }) => eq(status, "active"),
    orderBy: ({ createdAt }, { desc }) => [desc(createdAt)],
    limit,
    offset,
  });
}

export function getRecipeById(recipeId: number) {
  return db.query.recipes.findFirst({
    where: (recipes, { eq }) => eq(recipes.recipeId, recipeId),
    with: {
      author: true,
      ingredients: {
        with: {
          ingredient: true,
        },
      },
    },
  });
}

export function createRecipe(recipe: RecipeDTOType) {
  return db.insert(recipes).values(recipe).returning();
}

export function createIngredient(ingredient: IngredientDTOType) {
  return db.insert(ingredients).values(ingredient).returning();
}

export function createRecipeIngredients(items: RecipeIngredientDTO[]) {
  const formattedItems = items.map((item) => ({
    ...item,
    amount: item.amount.toString(),
  }));

  return db.insert(recipeIngredients).values(formattedItems).returning();
}
