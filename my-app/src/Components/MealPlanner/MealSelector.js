import React, { useEffect, useState } from 'react';
import { getAllMeals } from '../../Common/Services/RecipeService';

const MealSelector = ({ day }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  useEffect(() => {
    getAllMeals().then(setMeals);
  }, []);

  const handleMealChange = (mealType, event) => {
    setSelectedMeals(prev => ({ ...prev, [mealType]: event.target.value }));
  };

  return (
    <div>
      <h2>Day {day}</h2>
      <div>
        <label>
          Breakfast:
          <select value={selectedMeals.breakfast} onChange={(e) => handleMealChange('breakfast', e)}>
            {meals.filter(meal => meal.get("mealType") === 'breakfast').map(meal => (
              <option key={meal.id} value={meal.id}>{meal.get("recipeName")}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Lunch:
          <select value={selectedMeals.lunch} onChange={(e) => handleMealChange('lunch', e)}>
            {meals.filter(meal => meal.get("mealType") === 'lunch').map(meal => (
              <option key={meal.id} value={meal.id}>{meal.get("recipeName")}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Dinner:
          <select value={selectedMeals.dinner} onChange={(e) => handleMealChange('dinner', e)}>
            {meals.filter(meal => meal.get("mealType") === 'dinner').map(meal => (
              <option key={meal.id} value={meal.id}>{meal.get("recipeName")}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default MealSelector;