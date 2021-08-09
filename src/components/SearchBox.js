import React, { useContext } from "react";
import { RecipeContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBox() {
  const { handleRecipeSearch } = useContext(RecipeContext);
  return (
    <div className="search-container">
      <div className="searchbox">
        <input
          className="search"
          type="text"
          placeholder="Search a recipe"
          onChange={(e) => handleRecipeSearch(e.target.value)}
        />
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
      </div>
    </div>
  );
}