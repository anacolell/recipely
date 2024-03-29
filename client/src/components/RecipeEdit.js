import React, { useContext, useState } from "react";
import axios from "axios";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);
  const [currentRecipe, setCurrentRecipe] = useState(recipe);

  function handleEditInputChange(changes) {
    setCurrentRecipe({ ...currentRecipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    let ingredients = currentRecipe.ingredients;
    const index = ingredients.findIndex((r) => r.id === id);
    ingredients[index] = ingredient;
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleEditInputChange({
      ingredients: [...currentRecipe.ingredients, newIngredient],
    });
  }

  function handleIngredientDelete(id) {
    handleEditInputChange({
      ingredients: currentRecipe.ingredients.filter((i) => i.id !== id),
    });
  }

  function uploadImage(files) {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "myrecipes");

    axios
      .post("https://api.cloudinary.com/v1_1/dwlvlqpso/image/upload", formData)
      .then((response) => {
        handleEditInputChange({ image: response.data.secure_url });
        console.log("image set");
      });
  }

  return (
    <>
      <div className="overlay" />
      <div className="recipe-edit">
        <div className="recipe-edit__details-grid">
          <label htmlFor="image" className="recipe-edit__label">
            Image
          </label>
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
          />
          <label htmlFor="name" className="recipe-edit__label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={currentRecipe.name}
            onChange={(e) => handleEditInputChange({ name: e.target.value })}
            className="recipe-edit__input"
          />
          <label htmlFor="cookTime" className="recipe-edit__label">
            Cook Time
          </label>
          <input
            type="text"
            name="cookTime"
            id="cookTime"
            value={currentRecipe.cookTime}
            onChange={(e) =>
              handleEditInputChange({ cookTime: e.target.value })
            }
            className="recipe-edit__input"
          />
          <label htmlFor="servings" className="recipe-edit__label">
            Servings
          </label>
          <input
            type="number"
            min="1"
            name="servings"
            id="servings"
            value={currentRecipe.servings}
            onChange={(e) =>
              handleEditInputChange({
                servings: parseInt(e.target.value) || "",
              })
            }
            className="recipe-edit__input"
          />
        </div>
        <div className="recipe-edit__instructions">
          <label htmlFor="instructions" className="recipe-edit__label">
            Instructions
          </label>
          <textarea
            name="instructions"
            className="recipe-edit__input"
            value={currentRecipe.instructions}
            onChange={(e) =>
              handleEditInputChange({ instructions: e.target.value })
            }
            id="instructions"
          />
        </div>
        <br />
        <div className="recipe-edit__add_ingredient">
          <label className="recipe-edit__label">Ingredients</label>
          <div onClick={() => handleIngredientAdd()}>
            <FontAwesomeIcon
              className="recipe-edit__icon-add-ingredient"
              icon={faPlus}
            />
          </div>
        </div>
        <div className="recipe-edit__ingredient-grid">
          <div>Name</div>
          <div>Amount</div>
          <div></div>
          {currentRecipe.ingredients.map((ingredient) => (
            <RecipeIngredientEdit
              key={ingredient.id}
              currentRecipe={currentRecipe}
              handleIngredientChange={handleIngredientChange}
              handleIngredientDelete={handleIngredientDelete}
              ingredient={ingredient}
            />
          ))}
        </div>
        <div className="recipe-edit__details-grid">
          <label htmlFor="author" className="recipe-edit__label">
            Created by
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={currentRecipe.author}
            onChange={(e) => handleEditInputChange({ author: e.target.value })}
            className="recipe-edit__input"
          />
        </div>
        <div className="recipe-edit__button-container">
          <button
            className="btn btn-edit btn-edit-cancel"
            onClick={() => handleRecipeSelect(undefined)}
          >
            Cancel
          </button>
          <button
            className="btn btn-edit btn-edit-update"
            onClick={() => {
              handleRecipeChange(currentRecipe._id, currentRecipe);
              handleRecipeSelect(undefined);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
