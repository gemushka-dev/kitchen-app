"use client";

import { GET } from "@/src/utils/get.fetch";
import { POST } from "@/src/utils/post.fetch";
import { RecipeIngredientMDTO } from "@/src/types/IngredientsDTOType";
import { useState, useEffect, useRef } from "react";
import { FullRecipeType } from "@/src/types/RecipeType";
import { IngredientType } from "@/src/types/IngredientType";

import "../_styles/create.css";
import {
  createHandleAddIngredient,
  createHandleCreateRecipe,
  createHandleSubmitIngredient,
} from "@/src/utils/create.handlers";

export default function CreatePage() {
  const ingredientRef = useRef<HTMLInputElement>(null);

  const recipeGroupRef = useRef<HTMLInputElement>(null);
  const recipeNameRef = useRef<HTMLInputElement>(null);
  const recipeInfoRef = useRef<HTMLTextAreaElement>(null);
  const recipeUriRef = useRef<HTMLInputElement>(null);
  const cookingTimeRef = useRef<HTMLInputElement>(null);

  const ingredientSelectRef = useRef<HTMLSelectElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const unitSelectRef = useRef<HTMLSelectElement>(null);

  const [localIngredients, setLocalIngredients] = useState<
    RecipeIngredientMDTO[]
  >([]);
  const [userIngredients, setUserIngredients] = useState<
    { ingredientId: number; amount: number; unit: string; name: string }[]
  >([]);

  const [dbIngredients, setDbIngredients] = useState<{
    data: IngredientType[];
  }>({ data: [] });

  const fetchIngredients = async () => {
    try {
      const data = await GET("api/create/ingredients");
      setDbIngredients(data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleCreateRecipe = createHandleCreateRecipe({
    recipeGroupRef,
    recipeNameRef,
    recipeInfoRef,
    recipeUriRef,
    cookingTimeRef,
    localIngredients,
  });
  const handleSubmitIngredient = createHandleSubmitIngredient(ingredientRef);
  const handleAddIngredient = createHandleAddIngredient({
    ingredientSelectRef,
    amountInputRef,
    unitSelectRef,
    dbIngredients,
    setLocalIngredients,
    localIngredients,
    setUserIngredients,
    userIngredients,
  });

  return (
    <>
      <section className="recipe" onSubmit={handleCreateRecipe}>
        <h3>Recipe Details</h3>
        <form className="recipe__form">
          <input
            type="text"
            placeholder="e.g Salads"
            className="form__input"
            ref={recipeGroupRef}
          />
          <input
            type="text"
            placeholder="e.g Caesar"
            className="form__input"
            ref={recipeNameRef}
          />
          <textarea
            placeholder="1.Add sugar...."
            className="form__textarea"
            ref={recipeInfoRef}
          ></textarea>
          <input
            type="text"
            placeholder="https://image/salad"
            className="form__input"
            ref={recipeUriRef}
          />
          <input
            type="text"
            placeholder="e.g 20 mins"
            className="form__input"
            ref={cookingTimeRef}
          />

          <button type="submit" className="form__btn">
            Save recipe
          </button>
        </form>

        <h3>Ingredients</h3>
        <section className="ingredient">
          <form className="ingredient__form" onSubmit={handleSubmitIngredient}>
            <input
              type="text"
              className="form__input"
              placeholder="e.g Butter"
              ref={ingredientRef}
            />
            <button className="button__plus">+</button>
          </form>
        </section>
        <form onSubmit={handleAddIngredient} className="ingredient__form-add">
          <select ref={ingredientSelectRef}>
            <option value="">-- Choose ingredient --</option>
            {Array.isArray(dbIngredients.data) &&
              dbIngredients.data.map((e: any) => {
                return (
                  <option key={e.ingredientId} value={e.ingredientId}>
                    {e.name}
                  </option>
                );
              })}
          </select>
          <input
            type="text"
            placeholder="Amount"
            className="form__input"
            ref={amountInputRef}
          />

          <select ref={unitSelectRef}>
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="pcs">pcs</option>
            <option value="tbsp">tbsp</option>
            <option value="slice">slice</option>
          </select>
          <button type="submit" className="form__btn-add">
            Add to list
          </button>
        </form>
        <div className="selected__ingredients">
          <ul>
            {userIngredients.map((e) => {
              return (
                <li key={e.ingredientId}>
                  {e.name} {e.amount} {e.unit}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
