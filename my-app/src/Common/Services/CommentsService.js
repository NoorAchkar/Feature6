import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

export let Comments = {};
Comments.collection = [];

export const getAllComments = () => {
  const Comment = Parse.Object.extend("Comments");
  const query = new Parse.Query(Comment);
  return query.find().then((results) => {
    // returns array of Comments objects
    return results;
  });
};

// READ operation - get all meals in Parse class Recipe
export const getAllCommentsperMeals = (recipe) => {
  const Comment = Parse.Object.extend("Comments");
  const query = new Parse.Query(Comment);
  query.equalTo("Recipe", recipe);
  return query.find().then((results) => {
    console.log("results: ", results);
    // returns array of Meals objects
    return results;
  });
};

