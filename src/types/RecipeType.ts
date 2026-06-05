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
