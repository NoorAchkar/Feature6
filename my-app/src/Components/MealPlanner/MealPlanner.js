import React, {useState} from 'react';
import NavMenu from "../NavMenu/NavMenu"
import MealSelector from './MealSelector';

const MealPlanner = () => {
    const [days, setDays] = useState(1); // Tracks number of days for meal plans

    /*const handleDaysChange = (event) => {
        // Ensure the input is a valid number; if not, default to the minimum value 1
        let inputDays = parseInt(event.target.value, 10);
      
        // Check if the parsed number is NaN (Not-a-Number), use 1 as a fallback
        if (isNaN(inputDays)) {
          inputDays = 1;
        }
      
        // Set the days state with the clamped value
        setDays(inputDays);
    };*/

    const handleDaysChange = (event) => {
        setDays(event.target.value);  // Updates state with whatever user types
      };
    
      const handleDaysBlur = () => {
        // Validate when the user leaves the input field
        const clampedDays = Math.max(1, Math.min(10, parseInt(days, 10) || 1));
        setDays(clampedDays);  // Corrects the input if it's out of the allowed range
      };

    /*return (
        <div>
          <NavMenu />
          <hr />
          <h1>Meal Planner</h1>
          <label>
            Number of Days:
            <input type="number" value={days} onChange={handleDaysChange} min="1" max="10" />
          </label>
          {Array.from({ length: days }, (_, index) => (
            <MealSelector key={index} day={index + 1} />
          ))}
        </div>
    );*/

    /*return (
        <div>
          <NavMenu />
          <hr />
          <h1>Meal Planner</h1>
          <label>
            Number of Days:
            <input type="number" value={days} onChange={handleDaysChange} />
          </label>
          {days >= 1 && days <= 10 ? (
            Array.from({ length: days }, (_, index) => (
              <MealSelector key={index} day={index + 1} />
            ))
          ) : (
            <p>Please enter a number of days between 1 and 10.</p>
          )}
        </div>
      );*/

      return (
        <div>
          <NavMenu />
          <hr />
          <h1>Meal Planner</h1>
          <label>
            Number of Days:
            <input
              type="number"
              value={days}
              onChange={handleDaysChange}
              onBlur={handleDaysBlur}  // Checks the number when input loses focus
            />
          </label>
          {Array.from({ length: days }, (_, index) => (
            <MealSelector key={index} day={index + 1} />
          ))}
        </div>
      ); 
      
};

export default MealPlanner;