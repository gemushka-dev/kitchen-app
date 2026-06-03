import Link from "next/link";
import { getAllRecipes } from "../db/methods.orm";
import "./_styles/homepage.css";

export default async function HomePage() {
  const recipes = await getAllRecipes(3, 0);
  return (
    <>
      <section className="info">
        <h1 className="info__title">Your personal book of recipes</h1>
        <p className="info__text">Find new ideas and share yours with others</p>
        <div className="info__container">
          <Link href="/recipes" className="recipe__btn">
            Recipes
          </Link>
          <Link href="/register" className="register__btn">
            Register
          </Link>
        </div>
      </section>

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
    </>
  );
}
