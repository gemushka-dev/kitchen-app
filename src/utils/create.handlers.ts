import { RefObject } from "react";
import { POST } from "./post.fetch";
import { AddIngredientType, CreateRecipeType } from "../types/HandlerType";
import { FullRecipeType } from "../types/RecipeType";

export const createHandleSubmitIngredient = (
  ingredientRef: RefObject<HTMLInputElement | null>,
) => {
  return async function handleSubmitIngredient(e: React.FormEvent) {
    try {
      e.preventDefault();
      await POST("api/create/ingredients", {
        name: ingredientRef.current?.value,
      });
      ingredientRef.current!.value = "";
    } catch (e) {}
  };
};

export const createHandleAddIngredient = ({
  ingredientSelectRef,
  amountInputRef,
  unitSelectRef,
  dbIngredients,
  setLocalIngredients,
  localIngredients,
  setUserIngredients,
  userIngredients,
}: AddIngredientType) => {
  return function handleAddIngredient(e: React.FormEvent) {
    e.preventDefault();
    const selectedIdStr = ingredientSelectRef.current?.value;
    const amountVal = amountInputRef.current?.value;
    const unitVal = unitSelectRef.current?.value || "g";
    if (!selectedIdStr || !amountVal?.trim()) {
      alert("Please select an ingredient and enter amount!");
      return;
    }
    const ingredientId = Number(selectedIdStr);
    const foundIngredient: any = dbIngredients.data?.find(
      (e: any) => e.ingredientId === ingredientId,
    );
    const ingredientName = foundIngredient ? foundIngredient.name : "Unknown";
    setLocalIngredients([
      ...localIngredients,
      {
        ingredientId: ingredientId,
        amount: Number(amountVal.trim()),
        unit: unitVal,
      },
    ]);
    setUserIngredients([
      ...userIngredients,
      {
        ingredientId: ingredientId,
        amount: Number(amountVal.trim()),
        unit: unitVal,
        name: ingredientName,
      },
    ]);

    if (ingredientSelectRef.current) ingredientSelectRef.current.value = "";
    if (amountInputRef.current) amountInputRef.current.value = "";
    if (unitSelectRef.current) unitSelectRef.current.value = "g";
  };
};

export const createHandleCreateRecipe = ({
  recipeGroupRef,
  recipeNameRef,
  recipeInfoRef,
  recipeUriRef,
  cookingTimeRef,
  localIngredients,
}: CreateRecipeType) => {
  return async function handleCreateRecipe(e: React.FormEvent) {
    e.preventDefault();
    if (!recipeGroupRef.current?.value) return;
    if (!recipeNameRef.current?.value) return;
    if (!recipeInfoRef.current?.value) return;
    if (!recipeUriRef.current?.value) return;
    if (!cookingTimeRef.current?.value) return;
    const body: FullRecipeType = {
      recipe: {
        recipeGroup: recipeGroupRef.current?.value,
        recipeName: recipeNameRef.current?.value,
        recipeInfo: recipeInfoRef.current?.value,
        imageUrI: recipeUriRef.current?.value,
        cookingTime: Number(cookingTimeRef.current?.value),
        authorId: 0,
      },
      ingredients: localIngredients,
    };
    try {
      await POST("api/create/recipe", body);
    } catch (e) {}
  };
};
