import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavMenu from "../NavMenu/NavMenu";
import { fetchMealPlanById, saveMealPlan } from '../../Common/Services/PlannerService';
import { getAllMeals } from '../../Common/Services/RecipeService';

const MealPlanEdit = () => {
    const { id } = useParams();
    const [mealPlan, setMealPlan] = useState({ days: '', meals: [] });
    const [allMeals, setAllMeals] = useState([]);

    useEffect(() => {
        fetchMealPlanById(id)
            .then(data => {
                setMealPlan({
                    days: data.days,
                    meals: data.meals.map(meal => ({
                        breakfast: meal.breakfast,
                        lunch: meal.lunch,
                        dinner: meal.dinner
                    }))
                });
            })
            .catch(error => console.error('Error fetching meal plan:', error));

        getAllMeals()
            .then(setAllMeals)
            .catch(error => console.error('Error fetching meals:', error));
    }, [id]);

    const handleMealChange = (index, mealType, mealId) => {
        const meal = allMeals.find(m => m.id === mealId);
        const updatedMeals = mealPlan.meals.map((mealItem, idx) => {
            if (idx === index) {
                return {
                    ...mealItem,
                    [mealType]: { id: mealId, name: meal ? meal.get("recipeName") : '' } 
                };
            }
            return mealItem;
        });
        setMealPlan({ ...mealPlan, meals: updatedMeals });
    };

    const handleSave = () => {
        saveMealPlan(mealPlan)
            .then(() => alert('Meal plan updated successfully!'))
            .catch(error => {
                console.error('Error updating meal plan:', error);
                alert('Failed to update meal plan');
            });
    };

    return (
        <div className="intro">
            <NavMenu />
            <h1>Edit Meal Plan</h1>
            {mealPlan ? (
                <div>
                    <label>
                        Days:
                        <input
                            type="number"
                            name="days"
                            value={mealPlan.days}
                            onChange={e => setMealPlan({...mealPlan, days: e.target.value})}
                        />
                    </label>
                    {mealPlan.meals.map((meal, index) => (
                        <div key={index}>
                            <h3>Day {index + 1}</h3>
                            {['breakfast', 'lunch', 'dinner'].map(mealType => (
                                <div key={mealType}>
                                    <label>
                                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}:
                                        <select 
                                            value={meal[mealType].id}
                                            onChange={e => handleMealChange(index, mealType, e.target.value)}
                                        >
                                            <option value="">{meal[mealType].name || `Select ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`}</option>
                                            {allMeals.filter(m => m.get("mealType")?.toLowerCase() === mealType).map(m => (
                                                <option key={m.id} value={m.id}>
                                                    {m.get("recipeName")}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleSave}>Save Changes</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
    
};

export default MealPlanEdit;

