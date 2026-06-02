import { relations } from "drizzle-orm";
import {
  decimal,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  email: varchar("email", { length: 128 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  username: varchar("username", { length: 64 }).unique().notNull(),
  status: varchar("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const recipes = pgTable("recipes", {
  recipeId: serial("recipe_id").primaryKey(),
  recipeGroup: varchar("recipe_group", { length: 64 }).notNull(),
  recipeName: varchar("recipe_name", { length: 128 }).notNull(),
  recipeInfo: text("recipe_info").notNull(),
  imageUrI: varchar("image_uri", { length: 512 }),
  cookingTime: integer("cooking_time"),
  status: varchar("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  authorId: integer("author_id").references(() => users.userId, {
    onDelete: "cascade",
  }),
});

export const ingredients = pgTable("ingredients", {
  ingredientId: serial("ingredient_id").primaryKey(),
  name: varchar("name", { length: 128 }).unique().notNull(),
});

export const recipeIngredients = pgTable(
  "recipe_ingredients",
  {
    recipeId: integer("recipe_id").references(() => recipes.recipeId, {
      onDelete: "cascade",
    }),
    ingredientId: integer("ingredient_id").references(
      () => ingredients.ingredientId,
      { onDelete: "cascade" },
    ),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    unit: varchar("unit", { length: 32 }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.recipeId, table.ingredientId] })],
);

export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
}));

export const recipeRelations = relations(recipes, ({ one, many }) => ({
  author: one(users, {
    fields: [recipes.authorId],
    references: [users.userId],
  }),
  ingredients: many(recipeIngredients),
}));

export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.recipeId],
    }),
    ingredient: one(ingredients, {
      fields: [recipeIngredients.ingredientId],
      references: [ingredients.ingredientId],
    }),
  }),
);

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  recipeIngredients: many(recipeIngredients),
}));
