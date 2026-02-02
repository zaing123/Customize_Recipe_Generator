import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Customize from './Pages/Customize';
import About from './Pages/About';
import RecipeResult from './Pages/RecipeResult';
import SavedRecipeView from './Pages/SavedRecipeView';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ViewCustomRecipes from './Pages/ViewCustomRecipes'; // ✅ Import added
import PrivateRoute from './components/PrivateRoute';

import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/customize" element={<PrivateRoute><Customize /></PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/recipe" element={<RecipeResult />} />
          <Route path="/saved-recipe" element={<SavedRecipeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ViewCustomRecipes" element={<ViewCustomRecipes />} /> {/* ✅ New Route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
