"use client";

import { Recipe } from "@/src/types/RecipeType";
import { GET } from "@/src/utils/get.fetch";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../_styles/homepage.css";
import "../_styles/recipes.css";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [offset, setOffset] = useState(0);
  const LIMIT = 12;
  useEffect(() => {
    async function getRecipe() {
      const data = await GET(`/api/recipes?limit=${LIMIT}&offset=${offset}`);
      setRecipes(data);
    }
    getRecipe();
  }, [offset]);

  const handleNext = () => {
    setOffset((prev) => prev + LIMIT);
  };

  const handlePrev = () => {
    setOffset((prev) => Math.max(0, prev - LIMIT));
  };

  return (
    <>
      <section className="recipes">
        {recipes.map((e) => {
          return (
            <div className="recipe__card" key={e.recipeId}>
              <div className="recipe__image-wrapper">
                <img
                  src={e.imageUrI}
                  alt={e.recipeName}
                  className="recipe__image"
                />

                <span className="recipe__category">{e.recipeGroup}</span>
              </div>

              <div className="recipe__content">
                <h3 className="recipe__title">{e.recipeName}</h3>

                <p className="recipe__description">
                  {e.recipeInfo.length > 90
                    ? `${e.recipeInfo.substring(0, 90)}...`
                    : e.recipeInfo}
                </p>

                <div className="recipe__footer">
                  <span className="recipe__time">
                    {e.cookingTime || 0} mins
                  </span>
                  <Link
                    href={`/recipes/${e.recipeId}`}
                    className="recipe__link"
                  >
                    View Recipe &rarr;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="pagination__controls">
        <button
          onClick={handlePrev}
          disabled={offset === 0}
          className="control__btn"
        >
          &larr; Previous {LIMIT}
        </button>

        <button
          onClick={handleNext}
          disabled={recipes.length < LIMIT}
          className="control__btn"
        >
          Next {LIMIT} &rarr;
        </button>
      </div>
    </>
  );
}
