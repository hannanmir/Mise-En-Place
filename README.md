
![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# Mise En Place

## Description

#### Duration: Two Week Sprint

This app is a react recipe and pantry organizer/ collector. Users can add recipes to the app and view the name, image, description, ingredients, and instructions. The users can also edit any of those parts of the recipe easily with the modular edit mode of the recipe page. Users may also view all the recipes in the app and favorite any of them. Users can also add, edit, remove, and view ingredients in their pantry. Ingredients are displayed either in a "Pantry" or "Fridge" table indicating if the items need to be refrigerated or not.

## Screenshots
#### Recipe Collection
![Recipe Collection](https://github.com/hannanmir/Mise-En-Place/blob/master/public/images/Screen%20Shot%202020-09-21%20at%203.50.28%20PM.png)
#### Pantry
![Pantry](https://github.com/hannanmir/Mise-En-Place/blob/master/public/images/Screen%20Shot%202020-09-21%20at%203.40.35%20PM.png)


### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Redux.js](https://redux.js.org/)
- [Sweetalert](https://sweetalert.js.org/)
- [Material-UI](https://material-ui.com/)


## Installation

1. Create a database named `mise_en_place`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

### Browsing Recipes
1. Browse the recipes in the collection on the homepage.
2. Click on a recipe card or its "Explore" button to navigate to a detailed view for that recipe.
3. Click the Edit icon in the top left of the recipe page to toggle global edit mode.
4. All of rendered recipe information can be edited by hitting the edit button for that specific element.
5. Click the save icon for the specific element when you are done editing it.
6. When you are done editing the recipe, hit the save icon in the top left to save all changes and exit Edit mode.

### Adding A Recipe
1. Navigate to the Add Recipe view by hitting the "Add Recipe" button in the navbar.
2. Fill all the inputs for the new recipe you wish to add.
3. For the instructions, make sure to include double blank spaces '  ' in any part of the instructions that you wish to have a line break.
4. The app will only render line breaks if supplied with double spaces!
5. You toggle preview mode on or offby hitting the "Preview" button.
6. With Preview mode on you can watch the recipe card be built in real time while you enter in the inputs.
7. Hit the "Add Recipe" button to submit the recipe info and and add it to the database.
8. Once a recipe has been added you will be navigated back to the Recipe view and you can see your new recipe.

### Pantry Functionality
1. Navigate to the Pantry view by hitting the "Pantry" button the navbar.
2. Any and all ingredients in the Pantry view are displayed in either the Pantry or Fridge tables.
3. Use the inputs at the top of the page to add an ingredient to the Pantry or Fridge.
4. Any ingredient can be edited to change the quantity or deleted to remove from the table and database.
5. Each table has scrolling functionality to be able to see all ingredients with ease.
6. Use the Pantry to plan for or workshop new recipes to add!

## Built With

- React
- Redux
- Node.js
- Postgres
- Axios
- Sweetalert
- Material-UI

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. Special thanks to my instrucors [Dane Smith](https://github.com/DoctorHowser) and [Kris Szafranski](https://github.com/kdszafranski).

## Support
If you have suggestions or issues, please email me at [hannanmir2@gmail.com](mailto:hannanmir2@gmail.com).