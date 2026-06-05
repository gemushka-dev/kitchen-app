import { getRecipeById } from "@/src/db/methods.orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../_styles/uniqRecipe.css";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RecipeByIdPage({ params }: Props) {
  const resolvedParams = await params;
  const recipeId = Number(resolvedParams.id);
  const recipeInfo = await getRecipeById(recipeId);

  if (!recipeInfo) return notFound();

  return (
    <>
      <section className="recipe__details">
        <div className="recipe__details-back">
          <Link href="/recipes" className="back__link">
            &larr; Back to all recipes
          </Link>
        </div>
        <div className="recipe__header">
          <div className="info">
            <span className="header__category">{recipeInfo.recipeGroup}</span>
            <h1 className="header__title">{recipeInfo.recipeName}</h1>

            <div className="info__recipe">
              <div className="header__meta">
                <p>Cooking Time</p>
                <strong>{recipeInfo.cookingTime || 0} mins</strong>
              </div>

              <div className="header__user">
                <p>Chef</p>
                <strong>{recipeInfo.author?.username}</strong>
              </div>
            </div>
          </div>

          <div className="header__img">
            {recipeInfo.imageUrI ? (
              <img
                src={recipeInfo.imageUrI}
                alt={recipeInfo.recipeName}
                className="recipe__image"
              />
            ) : (
              <div className="recipe__image">Food image</div>
            )}
          </div>
        </div>

        <hr />

        <div className="recipe__body">
          <div className="ingredients">
            <ul className="ingredients__list">
              {recipeInfo.ingredients.map((ing) => {
                return (
                  <li key={ing.ingredientId} className="list__item">
                    <span className="ingredient__name">
                      {ing?.ingredient?.name}
                    </span>
                    <span className="ingredient__amount">
                      {parseFloat(ing.amount as string)} {ing.unit}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="instructions">
            <h2>How To Cook</h2>
            {recipeInfo.recipeInfo.split(/(?=\d\.)/).map((step, index) => (
              <p key={index} className="instruction__step">
                {step.trim()}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
