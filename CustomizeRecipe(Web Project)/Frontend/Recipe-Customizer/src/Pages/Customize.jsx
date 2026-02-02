import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Customize.css';
import axios from 'axios';

const Customize = () => {
  const [title, setTitle] = useState(''); // ✅ NEW: Title state
  const [ingredient, setIngredient] = useState('');
  const [instruction, setInstruction] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [instructionsList, setInstructionsList] = useState([]);
  const navigate = useNavigate();

  const cleanText = (text) => {
    return text.replace(/[^\x00-\x7F]/g, '').trim();
  };

  const addIngredient = () => {
    const clean = cleanText(ingredient.trim());
    if (clean) {
      setIngredientsList([...ingredientsList, clean]);
      setIngredient('');
    }
  };

  const addInstruction = () => {
    const clean = cleanText(instruction.trim());
    if (clean) {
      setInstructionsList([...instructionsList, clean]);
      setInstruction('');
    }
  };

  const handleSaveRecipe = async () => {
    if (!title.trim()) {
      alert('Please add a title for your recipe.');
      return;
    }

    if (ingredientsList.length && instructionsList.length) {
      const createdBy = localStorage.getItem("userEmail");

      const recipeData = {
        title: title, // ✅ Include Title
        ingredients: ingredientsList.join(", "),
        instructions: instructionsList.join("\n"),
        createdBy: createdBy
      };

      try {
        await axios.post("https://localhost:7075/api/RecipesApi", recipeData);
        alert("Recipe saved successfully!");
        navigate('/saved-recipe', {
          state: {
            title,
            ingredients: ingredientsList,
            instructions: instructionsList,
            suggestions: []
          }
        });
      } catch (error) {
        console.error("❌ Error saving recipe:", error);
        alert("Error saving recipe. Check backend.");
      }
    } else {
      alert('Please add at least one ingredient and one instruction.');
    }
  };

  return (
    <div className="customize-container">
      <h1>🍳 Create Your Own Recipe</h1>

      <div className="form-section">
        <input
          type="text"
          placeholder="Enter recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
      </div>

      <div className="customize-layout">
        <div className="customize-section">
          <h3>🥕 Add Ingredients</h3>
          <div className="form-section">
            <input
              type="text"
              placeholder="Add ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <button onClick={addIngredient}>Add</button>
          </div>
          <ul className="custom-list">
            {ingredientsList.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>

        <div className="customize-section">
          <h3>📝 Add Instructions</h3>
          <div className="form-section">
            <textarea
              placeholder="Write instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
            <button onClick={addInstruction}>Add</button>
          </div>
          <ol className="custom-list">
            {instructionsList.map((step, index) => (
              <li key={index}>📌 {step}</li>
            ))}
          </ol>
        </div>
      </div>

      <button className="save-btn" onClick={handleSaveRecipe}>
        Save Recipe 📝
      </button>
    </div>
  );
};

export default Customize;
