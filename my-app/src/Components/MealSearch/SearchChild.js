import React from "react";

// Describes child component SearchChild that takes props data and onSearchChildClick
const SearchChild = ({ onSearch }) => {
  return (
    <div>
      {/* Pass the onSearch function as a prop to the button component */}
      <ButtonComponent onClick={onSearch} />
    </div>
  );
};

const ButtonComponent = ({ onClick }) => {
  return <button onClick={onClick} className="rounded">Search</button>;
};

export default SearchChild;


