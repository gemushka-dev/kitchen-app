"use client";

import { GET } from "@/src/utils/get.fetch";
import { POST } from "@/src/utils/post.fetch";
import { RecipeIngredientMDTO } from "@/src/types/IngredientsDTOType";
import { useState, useEffect, useRef } from "react";
import { FullRecipeType } from "@/src/types/RecipeType";

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

  const [dbIngredients, setDbIngredients] = useState({ data: [] });

  const fetchIngredients = async () => {
    try {
      const data = await GET("api/create/ingredients");
      setDbIngredients(data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchIngredients();
  }, []);
  async function handleSubmitIngredient(e: React.FormEvent) {
    try {
      e.preventDefault();
      await POST("api/create/ingredients", {
        name: ingredientRef.current?.value,
      });
      ingredientRef.current!.value = "";
    } catch (e) {}
  }

  function handleAddIngredient(e: React.FormEvent) {
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
  }

  async function handleCreateRecipe(e: React.FormEvent) {
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
  }

  return (
    <>
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

      <section className="recipe" onSubmit={handleCreateRecipe}>
        <form className="recipe__form">
          <div className="recipe__general">
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
              className="form__placeholder"
              ref={recipeInfoRef}
            ></textarea>
            <input
              type="text"
              placeholder="https://image/salad"
              className="form__input"
              ref={recipeUriRef}
            />
            <input type="text" placeholder="e.g 20 mins" ref={cookingTimeRef} />
          </div>

          <button type="submit" className="form__btn">
            Save recipe
          </button>
        </form>
        <hr />
        <h3>Ingredients</h3>
        <form onSubmit={handleAddIngredient}>
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
          <button type="submit" className="form__btn">
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
