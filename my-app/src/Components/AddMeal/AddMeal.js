import React, { useState } from "react";
import NavMenu from "../NavMenu/NavMenu";
import { createMeals } from "../../Common/Services/RecipeService.js"; 

const AddMeal = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [time, setCookTime] = useState("");

    // Function to handle submitting the form
    const handleSubmit = (event) => {
        event.preventDefault(); 
        // Check if all required fields are filled before submitting
        if (name && type && ingredients.length > 0 && time) {
            // Call createMeals function to add the new meal
            createMeals(name, type, ingredients, time).then((newMeal) => {
                // Optionally, you can reset the form fields after successful submission
                setName("");
                setType("");
                setIngredients([]);
                setCookTime("");
                console.log("New meal added:", newMeal);
            }).catch(error => {
                console.error("Error adding meal:", error);
            });
        } else {
            alert("Please fill out all the fields before submitting.");
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

    // Function to handle input change for ingredients
    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients); 
    };

    // Function to handle adding a new input field for ingredients
    const handleAddIngredientField = () => {
        setIngredients([...ingredients, ""]);
    };

    // Function to handle removing an ingredient
    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    // Function to handle input change for cook time
    const handleCookTimeChange = (event) => {
        setCookTime(event.target.value); 
    };

    return (
        <div>
            <NavMenu />
            <hr />
            <div className="intro">
            <h1>Add a Meal</h1>
            <form onSubmit={handleSubmit}>
                <div className="addmeals">
                {/* Input field for recipe name */}
                <label htmlFor="recipeName" >Recipe Name:</label>
                <input
                    type="text"
                    id="recipeName"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    className="rounded"
                />
                <br />
                {/* Input field for meal type */}
                <label htmlFor="mealType" >Meal Type (Breakfast, Lunch, Dinner):</label>
                <input
                    type="text"
                    id="mealType"
                    name="type"
                    value={type}
                    onChange={handleMealTypeChange}
                    className="rounded"
                />
                <br />
                {/* Input fields for ingredients */}
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <label htmlFor={`ingredient${index + 1}`}>Ingredient {index + 1}:</label>
                        <input
                            type="text"
                            id={`ingredient${index + 1}`}
                            name={`ingredient${index + 1}`}
                            value={ingredient}
                            onChange={(event) => handleIngredientChange(index, event)}
                            className="rounded"
                        />
                        <button type="button" className="rounded" onClick={() => handleRemoveIngredient(index)}>Remove</button> {/* Button to remove ingredient */}
                    </div>
                ))}
                <button type="button" className="rounded" onClick={handleAddIngredientField}>Add Ingredient</button>
                <br />
                {/* Input field for cook time */}
                <label htmlFor="cookTime">Cook Time:</label>
                <input
                    type="text"
                    id="cookTime"
                    name="time"
                    value={time}
                    onChange={handleCookTimeChange}
                    className="rounded"
                />
                <br />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" className="rounded comment-button">Add Meal</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default AddMeal;
