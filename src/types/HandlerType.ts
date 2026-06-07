import { Dispatch, RefObject, SetStateAction } from "react";
import { IngredientType } from "./IngredientType";
import { RecipeIngredientMDTO } from "./IngredientsDTOType";

export type AddIngredientType = {
  ingredientSelectRef: RefObject<HTMLSelectElement | null>;
  amountInputRef: RefObject<HTMLInputElement | null>;
  unitSelectRef: RefObject<HTMLSelectElement | null>;
  dbIngredients: {
    data: IngredientType[];
  };
  setLocalIngredients: Dispatch<SetStateAction<RecipeIngredientMDTO[]>>;
  localIngredients: RecipeIngredientMDTO[];
  setUserIngredients: Dispatch<
    SetStateAction<
      {
        ingredientId: number;
        amount: number;
        unit: string;
        name: string;
      }[]
    >
  >;
  userIngredients: {
    ingredientId: number;
    amount: number;
    unit: string;
    name: string;
  }[];
};

export type CreateRecipeType = {
  recipeGroupRef: RefObject<HTMLInputElement | null>;
  recipeNameRef: RefObject<HTMLInputElement | null>;
  recipeInfoRef: RefObject<HTMLTextAreaElement | null>;
  recipeUriRef: RefObject<HTMLInputElement | null>;
  cookingTimeRef: RefObject<HTMLInputElement | null>;
  localIngredients: RecipeIngredientMDTO[];
};
