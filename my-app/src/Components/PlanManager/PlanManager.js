import React, { useEffect, useState } from 'react';
import NavMenu from "../NavMenu/NavMenu";
import { fetchMealPlans, deleteMealPlan } from '../../Common/Services/PlannerService';
import Parse from 'parse';

const MealPlanManager = () => {
    const [mealPlans, setMealPlans] = useState([]); // Stores meal plans fetched from server
    const currentUser = Parse.User.current();

    // Fetches meal plans for current user
    useEffect(() => {
        if (currentUser) {
            fetchMealPlans(currentUser.id)
                .then(setMealPlans)
                .catch(error => console.error('Error fetching meal plans:', error));
        }
    }, [currentUser]);

    // Handles meal plan deletion
    const handleDelete = (planId) => {
        deleteMealPlan(planId)
            .then(() => {
                setMealPlans(currentPlans => currentPlans.filter(plan => plan.id !== planId));
                alert('Meal plan deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting meal plan:', error);
                alert('Failed to delete meal plan');
            });
    };

      // Function to render meals of a plan
      const renderMeals = (meals) => {
        return meals.map((meal, index) => (
            <div key={index}>
                <p>Day {index + 1}:</p>
                <p>Breakfast: {meal.breakfastName}</p>
                <p>Lunch: {meal.lunchName}</p>
                <p>Dinner: {meal.dinnerName}</p>
            </div>
        ));
    };

    return (
        <div className="intro">
            <NavMenu />
            <h1>Meal Plan Manager</h1>
            {mealPlans.length > 0 ? (
                mealPlans.map(plan => (
                    <div key={plan.id}>
                        <h2>Plan for {plan.days} days</h2>
                        {renderMeals(plan.meals)}
                        <button onClick={() => handleDelete(plan.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No meal plans found.</p>
            )}
        </div>
    );
};

export default MealPlanManager;