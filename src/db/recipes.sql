INSERT INTO users (user_id, email, password, username, status, created_at) VALUES
(1, 'youremail', 'yourhashedpass', 'yourname', 'active', NOW());

INSERT INTO recipes (recipe_id, recipe_group, recipe_name, recipe_info, image_uri, cooking_time, status, author_id, created_at) VALUES
(1, 'Pasta', 'Classic Carbonara', '1. Boil spaghetti in salted water. 2. Fry chopped guanciale until crispy. 3. Whisk egg yolks with grated Pecorino and black pepper. 4. Mix everything together off the heat.', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC_qbzfC7f23iA_juOPmZ_IBBPdNoSLyqFw2-eh9Oyd7J6mCuWkCfEHyOIlELL', 20, 'active', 1, NOW()),
(2, 'Breakfast', 'Fluffy Cottage Cheese Pancakes', '1. Drain cottage cheese and mash it with egg and sugar. 2. Form small patties and coat lightly in flour. 3. Fry in a pan for 2 minutes on each side, then bake for 5 minutes.', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTyoWWmw0SO0k1eyKke4vZoacAL0zD8fvuI84AaJ-_BibiunCXril4Rf3zd-cgz', 25, 'active', 1, NOW()),
(3, 'Burgers', 'Homemade Beef Burger', '1. Shape the beef patty and grill it for 3 minutes per side. 2. Melt cheddar on top. 3. Toast the brioche bun. 4. Assemble with caramelized onions, pickles, and sauce.', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS5wb4vMAvhX04ccq0KGGT9tIuV4U_D_xX2hM-Kut3dfEBQrMcwT0jGKPo5Q8T0', 15, 'active', 1, NOW());

INSERT INTO ingredients (ingredient_id, name) VALUES
(1, 'Spaghetti'), (2, 'Guanciale or Pancetta'), (3, 'Egg yolks'), (4, 'Pecorino Romano'),
(5, 'Cottage cheese (9%)'), (6, 'Egg'), (7, 'Flour'), (8, 'Sugar'),
(9, 'Beef patty'), (10, 'Brioche bun'), (11, 'Cheddar cheese'), (12, 'Pickles');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount, unit) VALUES
(1, 1, 200.00, 'g'),
(1, 2, 100.00, 'g'),
(1, 3, 3.00, 'pcs'),
(1, 4, 50.00, 'g'),

(2, 5, 400.00, 'g'),
(2, 6, 1.00, 'pc'),
(2, 7, 2.00, 'tbsp'),
(2, 8, 1.00, 'tbsp'),

(3, 9, 1.00, 'pc'),
(3, 10, 1.00, 'pc'),
(3, 11, 1.00, 'slice'),
(3, 12, 0.50, 'pcs');