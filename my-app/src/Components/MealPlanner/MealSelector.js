import React, { useEffect, useState } from 'react';
import { getAllMeals } from '../../Common/Services/RecipeService';

const MealSelector = ({ day, onMealSelectionChange }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  useEffect(() => {
    getAllMeals().then(fetchedMeals => {
      console.log("Meals fetched:", fetchedMeals);  // Debugging: Log the fetched meals
      // Ensure meals are correctly processed if necessary
      setMeals(fetchedMeals);
    });
  }, []);

  /*const handleMealChange = (mealType, event) => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: event.target.value
    }));
  };*/

  const handleMealChange = (mealType, event) => {
    const newSelectedMeals = {
      ...selectedMeals,
      [mealType]: event.target.value
    };
    setSelectedMeals(newSelectedMeals);
    onMealSelectionChange(day, newSelectedMeals);  // Propagate the change upwards
  };

  return (
    <div>
      <h3>Day {day}</h3>
      {['breakfast', 'lunch', 'dinner'].map(mealType => (
        <div key={mealType}>
          <label>
            {mealType.charAt(0).toUpperCase() + mealType.slice(1)}:
            <select 
              value={selectedMeals[mealType]} 
              onChange={e => handleMealChange(mealType, e)}
            >
              <option value="">Select {mealType}</option>
              {meals.filter(meal => meal.get("mealType")?.toLowerCase() === mealType).map(meal => (
                <option key={meal.id} value={meal.id}>
                  {meal.get("recipeName")}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
    </div>
  );
};

export default MealSelector;
