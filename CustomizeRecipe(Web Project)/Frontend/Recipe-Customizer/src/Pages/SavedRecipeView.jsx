import React from 'react';
import { useLocation } from 'react-router-dom';
import './SavedRecipeView.css';

const SavedRecipeView = () => {
  const location = useLocation();
  const { ingredients = [], instructions = [], suggestions = [] } = location.state || {};

  if (!location.state) {
    return (
      <div className="saved-recipe-wrapper">
        <p>No recipe data found. Please create and save your recipe first.</p>
      </div>
    );
  }

  const handleDownload = () => {
    const content = `
      Your Custom Recipe
      ------------------
      Ingredients: ${ingredients.join(', ')}

      Instructions:
      ${instructions.map((ins, i) => `${i + 1}. ${ins}`).join('\n')}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'MyRecipe.txt';
    a.click();
  };

  return (
    <div className="saved-recipe-wrapper">
      <div className="saved-card">
        <h2>📋 Your Custom Recipe</h2>

        <div className="section">
          <h4>🥕 Ingredients</h4>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>✅ {item}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h4>📝 Instructions</h4>
          <ol>
            {instructions.map((step, idx) => (
              <li key={idx}>📌 {step}</li>
            ))}
          </ol>
        </div>

        {suggestions.length > 0 && (
          <div className="section">
            <h4>✨ Recipe Suggestions (via API)</h4>
            <ul>
              {suggestions.map((item, idx) => (
                <li key={idx}>
                  🍽️ {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="button-group">
          <button className="feedback-btn">💬 Give Feedback</button>
          <button className="download-btn" onClick={handleDownload}>⬇️ Download</button>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipeView;
