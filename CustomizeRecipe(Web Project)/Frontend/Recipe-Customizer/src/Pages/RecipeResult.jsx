import React from 'react';
import { useLocation } from 'react-router-dom';
import './RecipeResult.css'; // 👉 Create this CSS file

const RecipeResult = () => {
  const location = useLocation();
  const selected = location.state?.selected || [];
  const apiRecipes = location.state?.apiRecipes || [];

  return (
    <div className="recipe-result">
      <h1 className="recipe-title">🍽️ Your Custom Recipe</h1>

      <div className="recipe-card">
        <h2 className="section-title">🧂 Ingredients:</h2>
        <ul className="ingredient-list">
          {selected.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {apiRecipes.length > 0 && (
          <>
            <h2 className="section-title">✨ Suggested Recipes (From API)</h2>
            <ul className="suggested-list">
              {apiRecipes.map((item, idx) => (
                <li key={idx} className="suggested-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="suggested-img"
                  />
                  <div>
                    <strong className="suggested-title">🍽️ {item.title}</strong><br />
                    <a
                      href={`https://spoonacular.com/recipes/${item.title.replace(/\s+/g, '-').toLowerCase()}-${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="recipe-link"
                    >
                      View Full Recipe 🔗
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeResult;
