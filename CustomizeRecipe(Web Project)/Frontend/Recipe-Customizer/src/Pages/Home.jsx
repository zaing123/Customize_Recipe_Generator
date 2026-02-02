import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const categorizedIngredients = {
  "🥩 Meat": [
    '🍗 Chicken', '🥩 Beef', '🥓 Bacon', '🍖 Mutton', '🦃 Turkey',
    '🐖 Pork', '🐄 Veal', '🦌 Venison', '🦐 Shrimp', '🦞 Lobster',
    '🐟 Fish', '🦑 Squid', '🦀 Crab'
  ],
  "🥬 Vegetables": [
    '🍅 Tomato', '🧅 Onion', '🧄 Garlic', '🥕 Carrot', '🥔 Potato',
    '🍄 Mushrooms', '🥬 Spinach', '🥦 Broccoli', '🥬 Cabbage', '🌽 Corn',
    '🥒 Cucumber', '🌶️ Chili Pepper', '🥗 Lettuce', ' Peas', '🫑 Bell Pepper'
  ],
  "🧀 Dairy": [
    '🧀 Cheese', '🥛 Milk', '🍶 Yogurt', '🧈 Butter', '🧁 Cream',
    '🥚 Eggs', '🧃 Lassi', '🍼 Formula', '🥞 Cream Cheese', '🍨 Ice Cream'
  ],
  "🍞 Grains & Bakery": [
    '🍞 Bread', '🥐 Croissant', '🥯 Bagel', '🥖 Baguette', '🥙 Roti',
    '🥨 Pretzel', '🥞 Pancakes', '🧇 Waffles', '🥮 Mooncake', '🥠 Fortune Cookie',
    '🌾 Flour', '🍘 Rice Cracker', '🍙 Onigiri'
  ],
  "🧂 Spices & Condiments": [
    '🧂 Salt', ' Pepper', '🧄 Garlic Powder', '🧃 Vinegar', ' Olive Oil',
    '🌶️ Chili Powder', '🧊 Ice Cubes', '🍯 Honey', '🧈 Ghee', '🍋 Lemon Juice', '🥫 Tomato Paste'
  ],
  "🍝 Staples": [
    '🍝 Pasta', '🍚 Rice', '🥨 Noodles', '🍜 Ramen', '🍲 Stew', '🍛 Curry',
    '🍢 Oden', '🍱 Bento', '🥣 Cereal'
  ],
  "🍎 Fruits": [
    '🍎 Apple', '🍌 Banana', '🍍 Pineapple', '🍇 Grapes', '🍓 Strawberry',
    '🍒 Cherries', '🥝 Kiwi', '🍉 Watermelon', '🍊 Orange', '🍋 Lemon',
    '🥭 Mango', '🍑 Peach', '🍈 Melon', ' Blueberries'
  ]
};

const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleGenerateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      alert('Please select at least one ingredient!');
      return;
    }

    const apiKey = 'c1c1823f6e23429282fd9797adf5328e';
    const joinedIngredients = selectedIngredients.map(i => i.replace(/[^a-zA-Z]/g, '')).join(',');

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${joinedIngredients}&number=5&apiKey=${apiKey}`
      );

      const data = await response.json();

      navigate('/recipe', {
        state: {
          selected: selectedIngredients,
          apiRecipes: data
        }
      });
    } catch (error) {
      console.error('API error:', error);
      alert('❌ Failed to fetch recipes. Please try again.');
    }
  };

  return (
    <div className="home-page">
      <h1 className="title">🍲 Select Your Ingredients</h1>

      <div className="ingredients-panel">
        {Object.entries(categorizedIngredients).map(([category, items]) => (
          <div key={category} className="ingredient-category">
            <h3 className="category-title">{category}</h3>
            <div className="category-items">
              {items.map((ingredient, index) => (
                <button
                  key={index}
                  className={`ingredient-btn ${selectedIngredients.includes(ingredient) ? 'selected' : ''}`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="basket-section">
        <h2>🗑 Your Basket</h2>
        <div className="basket-items">
          {selectedIngredients.length === 0 ? (
            <p style={{ color: '#888' }}>No ingredients selected.</p>
          ) : (
            selectedIngredients.map((item, index) => (
              <span key={index} className="basket-item">{item}</span>
            ))
          )}
        </div>
        <button className="generate-btn" onClick={handleGenerateRecipe}>
          Cook Now 🍽️
        </button>
      </div>
    </div>
  );
};

export default Home;
