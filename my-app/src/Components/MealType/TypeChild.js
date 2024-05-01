import React from "react";

// Component takes props: selectedMealType and handleMealChange and prints out the specified recipeName corresponding
const TypeChild = ({ users, selectedMealType }) => {
  return (
    <div className="intro">
          {users
            .filter((user) => user.get("mealType")?.toLowerCase() === selectedMealType)
            .map((user) => (
              <div key={user.id}>
                <p>{user.get("recipeName")}</p>
              </div>
            ))}
    </div>
  );
};

export default TypeChild;
