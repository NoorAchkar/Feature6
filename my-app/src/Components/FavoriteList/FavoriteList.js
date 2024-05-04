import React, { useEffect, useState } from "react";
import NavMenu from "../NavMenu/NavMenu";
import { getAllMeals, toggleFavorite } from "../../Common/Services/RecipeService";

const FavoriteList = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // Holds favorite recipes

  useEffect(() => {
    const fetchFavorites = async () => { // Fetches and filters favorite meals
      const allMeals = await getAllMeals();
      const favorites = allMeals.filter(meal => meal.get('isFavorite') === true);
      setFavoriteRecipes(favorites);
    };

    fetchFavorites();
  }, []);

  // Handlers favorite status of recipe via toggle
  const handleToggleFavorite = async (recipe) => {
    await toggleFavorite(recipe.id);
    setFavoriteRecipes(prev => prev.filter(r => r.id !== recipe.id));  // Optimistically remove from UI
  };

  return (
    <div className='intro'>
      <NavMenu />
      <h1>Favorites</h1>
      {favoriteRecipes.length > 0 ? favoriteRecipes.map(recipe => (
        <div key={recipe.id}>
          <h2>{recipe.get("recipeName")}</h2>
          <button onClick={() => handleToggleFavorite(recipe)}>
            Remove from Favorites
          </button>
        </div>
      )) : <p>No favorites added yet.</p>}
    </div>
  );
};

export default FavoriteList;
