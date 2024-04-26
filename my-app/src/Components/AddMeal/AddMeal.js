import React, { useState } from "react";
import NavMenu from "../NavMenu/NavMenu";
import { createMeals } from "../../Common/Services/RecipeService.js"; 

const AddMeal = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    // Function to handle submitting the form
    const handleSubmit = (event) => {
        event.preventDefault(); 
        // Check if both name and type are filled before submitting
        if (name && type) {
            // Call createMeal function to add the new meal
            createMeals(name, type).then((newMeal) => {
                // Optionally, you can reset the form fields after successful submission
                setName("");
                setType("");
                console.log("New meal added:", newMeal);
            }).catch(error => {
                console.error("Error adding meal:", error);
            });
        } else {
            alert("Please fill out both the recipe name and meal type before submitting.");
        }
    };

    // Function to handle input change for recipe name
    const handleNameChange = (event) => {
        setName(event.target.value); 
    };

    // Function to handle input change for meal type
    const handleMealTypeChange = (event) => {
        setType(event.target.value); 
    };

    return (
        <div>
            <NavMenu />
            <hr />
            <h1>Add a Meal</h1>
            <form onSubmit={handleSubmit}>
                {/* Input field for recipe name */}
                <label htmlFor="recipeName">Recipe Name:</label>
                <input
                    type="text"
                    id="recipeName"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                />
                <br />
                {/* Input field for meal type */}
                <label htmlFor="mealType">Meal Type (Breakfast, Lunch, Dinner):</label>
                <input
                    type="text"
                    id="mealType"
                    name="type"
                    value={type}
                    onChange={handleMealTypeChange}
                />
                <br />
                {/* Button to submit the form */}
                <button type="submit">Add Meal</button>
            </form>
        </div>
    );
};

export default AddMeal;
