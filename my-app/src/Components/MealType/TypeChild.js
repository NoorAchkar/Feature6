import React from "react";

// Component takes props: selectedMealType and handleMealChange and prints out the specified recipeName corresponding
const TypeChild = ({ users, selectedMealType }) => {
  return (
    <div>
      <ul>
          {users
            .filter((user) => user.get("mealType")?.toLowerCase() === selectedMealType)
            .map((user) => (
              <li key={user.id}>
                <p>{user.get("recipeName")}</p>
              </li>
            ))}
        </ul>
    </div>
  );
};

export default TypeChild;
