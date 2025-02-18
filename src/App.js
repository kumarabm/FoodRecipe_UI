import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Recipe from './components/recipe';
import Viewrecipe from './components/Viewrecipe';
import Favorites from './components/Favourites'; // Import Favorites
import About from './components/About';
import '../src/App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]); // Store favorites globally

  const handleLogin = (status) => {
    setIsLoggedIn(status); // Update login status
  };

  const addToFavorites = (meal) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.idMeal === meal.idMeal);
      if (!isAlreadyFavorite) {
        return [...prevFavorites, meal];
      }
      return prevFavorites;
    });
  };

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/" element={isLoggedIn ? <Recipe addToFavorites={addToFavorites} favorites={favorites} /> : <Login onLogin={handleLogin} />} />
        
        {/* Recipe route */}
        <Route path="/" element={isLoggedIn ? <Recipe favorites={favorites} setFavorites={setFavorites} /> : <Navigate to="/login" />} />
        
        {/* Viewrecipe route */}
        <Route path="/recipe/:idMeal" element={<Viewrecipe />} />
        
        {/* Favorites route */}
        <Route path="/favorites" element={<Favorites favorites={favorites} />} />

        <Route path="/about" element={<About />} /> {/* Add the About route */}
        
        {/* Redirect any other routes */}
        <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
