import React, { useState, useEffect } from 'react';
import NavMenu from "../NavMenu/NavMenu";
import MealSelector from './MealSelector';
import { saveMealPlan } from '../../Common/Services/PlannerService';
import Parse from "parse";


const MealPlanner = () => {
    const [days, setDays] = useState(1);
    const [allMeals, setAllMeals] = useState({});  // This will store all meal selections
    const [userId, setUserId] = useState('');

    useEffect(() => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        setUserId(currentUser.id);
      }
      else {
        console.log("No user logged in");
      }
    }, []);

    const handleDaysChange = (event) => {
        setDays(event.target.value);
    };
    
    const handleDaysBlur = () => {
        const clampedDays = Math.max(1, Math.min(10, parseInt(days, 10) || 1));
        setDays(clampedDays);
    };

    const handleMealSelectionChange = (day, meals) => {
      setAllMeals(prev => ({ ...prev, [day]: meals }));
    };

    const handleSavePlan = () => {
      // Assume `userId` is available through context or props
      saveMealPlan({ userId: userId, days: days, meals: Object.values(allMeals) })
        .then(() => alert('Meal Plan Saved Successfully!'))
        .catch(error => {
          console.error('Error saving meal plan:', error);
          alert('Failed to save meal plan.');
        });
    };

    return (
      <div>
        <NavMenu />
        <hr />
        <div className="intro">
        <h1>Meal Planner</h1>
        <label>
          Number of Days:
          <input type="number" value={days} onChange={handleDaysChange} onBlur={handleDaysBlur} className="space rounded" />
        </label>
        {Array.from({ length: days }, (_, index) => (
          <MealSelector key={index} day={index + 1} onMealSelectionChange={handleMealSelectionChange} />
        ))}
        <br/>
        <button onClick={handleSavePlan} className="rounded comment-button">Save Meal Plan</button>
        </div>
      </div>
    );
};

export default MealPlanner;
