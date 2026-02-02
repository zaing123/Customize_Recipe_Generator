import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewCustomRecipes.css';

const ViewCustomRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState({});
  const [newReview, setNewReview] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recipesRes, ratingsRes, reviewsRes] = await Promise.all([
        axios.get('https://localhost:7075/api/RecipesApi'),
        axios.get('https://localhost:7075/api/RatingsApi'),
        axios.get('https://localhost:7075/api/ReviewsApi'),
      ]);

      setRecipes(recipesRes.data);
      setRatings(ratingsRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error("❌ Error loading data:", error);
      alert("❌ Failed to load data.");
    }
  };

  const getRatingsForRecipe = (recipeId) =>
    ratings.filter(r => r.recipeId === recipeId || r.RecipeId === recipeId);

  const getAverageRating = (recipeId) => {
    const recipeRatings = getRatingsForRecipe(recipeId);
    if (recipeRatings.length === 0) return "No ratings yet";
    const avg = recipeRatings.reduce((sum, r) => sum + (r.score || r.Score), 0) / recipeRatings.length;
    return `${avg.toFixed(1)} / 5 ⭐`;
  };

  const getReviewsForRecipe = (recipeId) =>
    reviews.filter(r => r.recipeId === recipeId || r.RecipeId === recipeId);

  const handleRatingChange = (recipeId, value) =>
    setNewRating(prev => ({ ...prev, [recipeId]: value }));

  const handleReviewChange = (recipeId, value) =>
    setNewReview(prev => ({ ...prev, [recipeId]: value }));

  const handleSubmit = async (recipeId) => {
    const rating = newRating[recipeId];
    const comment = newReview[recipeId];

    try {
      if (rating) {
        await axios.post('https://localhost:7075/api/RatingsApi', {
          recipeId,
          score: parseInt(rating),
          createdAt: new Date().toISOString()
        });
      }

      if (comment && comment.trim() !== "") {
        await axios.post('https://localhost:7075/api/ReviewsApi', {
          recipeId,
          comment,
          createdAt: new Date().toISOString()
        });
      }

      alert("✅ Submitted successfully!");
      setNewRating(prev => ({ ...prev, [recipeId]: '' }));
      setNewReview(prev => ({ ...prev, [recipeId]: '' }));
      fetchData();
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("❌ Failed to submit.");
    }
  };

  return (
    <div className="view-recipes-container">
      <h1>📖 All Custom Recipes</h1>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <div key={recipe.id} className="recipe-card">
              <h3>🍽 {recipe.title || `Recipe #${index + 1}`}</h3>
              <p><strong>Created By:</strong> {recipe.createdBy || "Unknown"}</p>

              <h4>Ingredients:</h4>
              {recipe.ingredients ? (
                <ul>
                  {recipe.ingredients.split(',').map((ing, i) => (
                    <li key={i}>{ing.trim()}</li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients listed.</p>
              )}

              <h4>Instructions:</h4>
              <p>{recipe.instructions || "No instructions provided."}</p>

              <h4>⭐ Average Rating:</h4>
              <p>{getAverageRating(recipe.id)}</p>

              <h4>🗣 Reviews:</h4>
              <ul>
                {getReviewsForRecipe(recipe.id).map((review, idx) => (
                  <li key={idx}>📝 {review.comment || review.Comment}</li>
                ))}
                {getReviewsForRecipe(recipe.id).length === 0 && <li>No reviews yet.</li>}
              </ul>

              {/* Styled Rating & Review Section */}
              <div className="rating-review-section">
                <label>⭐ Rate this recipe:</label>
                <select
                  value={newRating[recipe.id] || ""}
                  onChange={e => handleRatingChange(recipe.id, e.target.value)}
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
                  ))}
                </select>

                <label>📝 Write a review:</label>
                <textarea
                  value={newReview[recipe.id] || ""}
                  onChange={e => handleReviewChange(recipe.id, e.target.value)}
                  placeholder="Your thoughts..."
                />

                <button onClick={() => handleSubmit(recipe.id)}>✅ Submit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCustomRecipes;
