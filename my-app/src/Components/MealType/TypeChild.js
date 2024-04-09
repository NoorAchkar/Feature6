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
                <p><b>{user.get("recipeName")}</b></p>
              </li>
            ))}
        </ul>
    </div>
  );
};

export default TypeChild;
