  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import NavMenu from "../NavMenu/NavMenu"
  
  // Import the TypeChild component (child component)
  import TypeChild from "./TypeChild.js";
  
  // Imports getAllMeals function that fetchs a list of Meals via Parse
  import { getAllMeals } from "../../Common/Services/RecipeService.js";

// Sets initial state variables to be Breakfast Items that are first shown when the page is loaded
const MealType = () => {
  const [users, setUsers] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState("");

  useEffect(() => {
    getAllMeals().then((users) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  // Event handler that sets the selected meal type
  const handleMealTypeChange = (event) => {
    setSelectedMealType(event.target.value);
  };

  // Routing and Button Handler for Return Home Button
  const history = useNavigate();

  const buttonHandler = () => {
    history("/");
  }
  ;
  // Returns the radio buttons with the different meal types
  return (
    <div>
      <NavMenu />
      <hr />
      <h1>Meal type selection</h1>
      <div>
        <label>
          <input
            type="radio"
            name="mealType"
            value="breakfast"
            onChange={handleMealTypeChange}
            className="space"
          />
          Breakfast
        </label>
        <label>
          <input
            type="radio"
            name="mealType"
            value="lunch"
            onChange={handleMealTypeChange}
            className="space" 
          />
          Lunch
        </label>
        <label>
          <input
            type="radio"
            name="mealType"
            value="dinner"
            onChange={handleMealTypeChange}
            className="space"
          />
          Dinner
        </label>
        <h3>
          {selectedMealType.charAt(0).toUpperCase() +
            selectedMealType.slice(1)}
        </h3>
      </div>
      {/* Pass selectedMealType and users to Child component */}
      <TypeChild users={users} selectedMealType={selectedMealType} />
      <button onClick={buttonHandler}>Return Home</button>
    </div>
  );
};

export default MealType;

  