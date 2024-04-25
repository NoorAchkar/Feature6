import React, { useEffect, useState } from "react";
import NavMenu from "../NavMenu/NavMenu";
import { createMeals } from "../../Common/Services/RecipeService.js"; 

const AddMeal = () => {
    const [name, setName] = useState("");
    const [meals, setMeals] = useState([]);
    const [add, setAdd] = useState(false);

    // useEffect with dependency array to trigger only when 'add' flag changes
    useEffect(() => {
        // Check for add flag and make sure name state variable is defined
        if (name && add) {
            // Call createMeals function to add the new meal
            createMeals(name).then((newMeal) => {
                setAdd(false); 
                setName(""); 
                // Add the newly created meal to the meals array
                setMeals([...meals, newMeal]);
            }).catch(error => {
                console.error("Error adding meal:", error);
            });
        }
    }, [add]); 

    // Function to handle submitting the form
    const handleSubmit = (event) => {
        event.preventDefault(); 
        setAdd(true); 
    };

    // Function to handle input change
    const handleInputChange = (event) => {
        setName(event.target.value); 
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
                    onChange={handleInputChange}
                />
                {/* Button to submit the form */}
                <button type="submit">Add Meal</button>
            </form>
        </div>
    );
};

export default AddMeal;