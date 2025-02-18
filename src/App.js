import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/components/Login';
import Recipe from '../src/components/recipe';
import Viewrecipe from './components/Viewrecipe';
import '../src/App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status); // Update login status when the user successfully logs in
  };

  return (
    <Router>
      <Routes>
        {/* Home route: show Recipe if logged in, otherwise Login */}
        <Route path="/" element={isLoggedIn ? <Recipe /> : <Login onLogin={handleLogin} />} />
        
        {/* Viewrecipe route: show the full recipe details page */}
        <Route path="/recipe/:idMeal" element={<Viewrecipe />} />
        
        {/* Redirect all other routes to the home or login page based on login status */}
        <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;