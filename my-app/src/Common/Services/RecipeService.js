import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

export let Recipes = {};
Recipes.collection = [];

// READ operation - get all meals in Parse class Recipe
export const getAllMeals = () => {
  const Recipes = Parse.Object.extend("Recipe");
  const query = new Parse.Query(Recipes);
  return query.find().then((results) => {
    console.log("results: ", results);
    // returns array of Meals objects
    return results;
  });
};