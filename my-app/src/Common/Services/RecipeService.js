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

// CREATE operation - new meal with Name
export const createMeals = (Name, Type, Ingredients, Time) => {
  console.log("Creating: ", Name);
  const Lesson = Parse.Object.extend("Recipe");
  const lesson = new Lesson();
  // using setter to UPDATE the object
  lesson.set("recipeName", Name);
  lesson.set("mealType", Type);
  lesson.set("ingredients", Ingredients);
  lesson.set("cookTime", Time);
  return lesson.save().then((result) => {
    // returns new Lesson object
    return result;
  });
};
