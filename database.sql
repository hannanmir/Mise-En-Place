CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "ingredient" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL
);

CREATE TABLE "recipe" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"instructions" TEXT NOT NULL,
	"image" varchar(255) NOT NULL
);

CREATE TABLE "user_ingredient" (
	"id" serial PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"ingredient_id" INT REFERENCES "ingredient" NOT NULL,
	"quantity" varchar(255) NOT NULL,
	"inFridge" BOOLEAN NOT NULL
);

CREATE TABLE "ingredient_recipe" (
	"id" serial PRIMARY KEY,
	"recipe_id" INT REFERENCES "recipe" NOT NULL,
	"ingredient_id" INT REFERENCES "ingredient" NOT NULL,
	"quantity" int NOT NULL
);

CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"recipe_id" INT REFERENCES "recipe" NOT NULL
);

-- Recipe inserts for some starter data

INSERT INTO "recipe"
	("name", "description", "image", "instructions")
	VALUES 
	('Nasi Ayam',
	'Flavorful fried chicken is accompanied with a savory sweet chili sauce and served with white rice steamed in chicken stock and aromatics, with a side of chicken soup to wash it all down.',
	'https://2.bp.blogspot.com/-WMRO9yUWrqg/VRelQDMYJUI/AAAAAAAAEb8/LZoeQJHw5o8/s1600/IMG_9855.JPG',
	'Cook the chicken!'); 
	
INSERT INTO "recipe"
	("name", "description", "image", "instructions")
	VALUES 
	('Pancakes',
	'You have definitely never had pancakes like this because they are going to be the best you have ever had.',
	'https://munchies-images.vice.com/wp_upload/the-best-pancakes-brayden-olson.jpg?crop=1xw:0.84375xh;center,center&resize=1000:*',
	'1. Make a traphouse fish scale movement when you are sifting flour through sieve. No one wants lumpy pancakes, so this will help prevent that.

2. Add 3 tablespoons of sugar to the flour mixture. Add the baking powder, baking soda, and a pinch of salt, and sift all ingredients together in bowl and set aside.

3. Melt the butter over medium low heat. Do not burn the butter. Set aside to cool in the pan. Crack the eggs and separate the yolks and the whites (save both.) Whisk the egg whites until fluffy (like a whiskey sour consistency). Add the buttermilk to the egg whites.

4. In a separate bowl, stir the yolks until blended. Add the sugar. Stir to incorporate. Add the cooled, melted butter slowly into the egg yolk mixture. Slowly whisk the yolk mixture into the egg white mixture until fully incorporated.

5. Slowly whisk the flour mixture into the wet mixture so that no clumps form. Whisk through to fluffy consistency and refrigerate for ten minutes.

6. In a large skillet, generously spray non-stick spray into pan over medium-high heat. With a large spoon, spoon a cookie-sized portion of batter into the pan. Don''t press on them or fuck with them at all. Let them sit there and chill out and think about your special person. When you see bubbles forming in the middle and a nice browning on the sides, it''s time to flip them (only do this once).

7. Plate them up with maple syrup and eat. If you feel like making blueberry pancakes, add a shitload of blueberries to the batter and do the same thing you just did before. Enjoy.');


INSERT INTO "recipe"
	("name", "description", "image", "instructions")
	VALUES 
	('Banana Bread',
	'“Best-ever” is quite a bold statement, right? I’ve tried many many many basic banana bread recipes and I can happily admit that this one is my very favorite. This is the best ever banana bread recipe!',
	'https://www.simplyrecipes.com/wp-content/uploads/2014/08/banana-bread-horiz-a-1600.jpg',
	'Adjust the oven rack to the lower third position and preheat the oven to 350°F (177°C). Grease a 9×5-inch loaf pan or coat with nonstick spray. Set aside.  Whisk the flour, baking soda, salt, and cinnamon together in a large bowl.  
  Using a handheld or stand mixer fitted with a paddle or whisk attachment, beat the butter and brown sugar together on high speed until smooth and creamy, about 2 minutes. On medium speed, add the eggs one at a time, beating well after each addition. Beat in the yogurt, mashed bananas, and vanilla extract on medium speed until combined. With the mixer running on low speed, slowly beat the dry ingredients into the wet ingredients until no flour pockets remain. Do not overmix. Fold in the nuts, if using.  Spoon the batter into the prepared baking pan and bake for 60-65 minutes. Loosely cover the bread with aluminum foil after 30 minutes to help prevent the top and sides from getting too brown. A toothpick inserted in the center of the loaf will come out clean when the bread is done. Remove from the oven and allow the bread to cool completely in the pan set on a wire rack.  Cover and store banana bread at room temperature for 2 days or in the refrigerator for up to 1 week. Banana bread tastes best on day 2 after the flavors have settled together. See post above for freezing instructions.  '); 

INSERT INTO "recipe"
	("name", "description", "image", "instructions")
	VALUES 
	('Grilled Cheese',
	'After rigorous scientific testing for this best-ever grilled cheese, I have determined that sandwiches sliced in half on a diagonal actually taste better. The facts do not lie!',
	'https://assets.bonappetit.com/photos/57acf62a53e63daf11a4dbee/16:9/w_2560,c_limit/best-ever-grilled-cheese.jpg',
	'Place bread on a cutting board and spread mayonnaise over top side of each; this is key to a golden, delectable crunch.  Heat a small skillet (nonstick, ideally) over medium. Slide in half of butter. When it melts, place 1 slice of bread, mayonnaise side down, in skillet; top with cheese; season with pepper.  Top with second slice of bread, mayonnaise side up. When underside is golden brown, about 4 minutes, turn sandwich and add remaining butter to skillet.  Press down on sandwich to encourage even browning and to help melt cheese—be gentle, don’t smash it. Cook until second side is golden brown and cheese is melted. Eat immediately, preferably with soup.');                 