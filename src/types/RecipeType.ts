import { RecipeIngredientMDTO } from "./IngredientsDTOType";
import { RecipeDTOType } from "./RecipeDTOType";

export type Recipe = {
  status: string;
  createdAt: Date;
  recipeId: number;
  recipeGroup: string;
  recipeName: string;
  recipeInfo: string;
  imageUrI: string | null;
  cookingTime: number | null;
  authorId: number | null;
};

export type FullRecipeType = {
  recipe: RecipeDTOType;
  ingredients: RecipeIngredientMDTO[];
};
