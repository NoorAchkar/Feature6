import React, { useEffect, useState } from 'react';
import { getAllMeals } from '../../Common/Services/RecipeService';

const MealSelector = ({ day, onMealSelectionChange }) => {
    const [meals, setMeals] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState({
        breakfast: { id: '', name: '' },
        lunch: { id: '', name: '' },
        dinner: { id: '', name: '' }
    });

    useEffect(() => {
        getAllMeals().then(fetchedMeals => {
            console.log("Meals fetched:", fetchedMeals);  // Debugging: Log the fetched meals
            setMeals(fetchedMeals);
        });
    }, []);

    const handleMealChange = (mealType, event) => {
        const mealId = event.target.value;
        const meal = meals.find(m => m.id === mealId);
        const newSelectedMeals = {
            ...selectedMeals,
            [mealType]: { id: mealId, name: meal ? meal.get("recipeName") : '' }
        };
        setSelectedMeals(newSelectedMeals);
        onMealSelectionChange(day, newSelectedMeals);  // Propagate the change upwards
    };

    return (
        <div className="addmeals">
            <h3>Day {day}</h3>
            {['breakfast', 'lunch', 'dinner'].map(mealType => (
                <div key={mealType}>
                    <label>
                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}:
                        <select 
                            value={selectedMeals[mealType].id} 
                            onChange={e => handleMealChange(mealType, e)}
                            className="rounded"
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
