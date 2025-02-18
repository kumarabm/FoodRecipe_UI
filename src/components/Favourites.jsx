import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';



const Favorites = ({ favorites }) => {
const navigate = useNavigate();

  return (
    <div>
         <Navbar />
         <div className="breadcrumb py-2 px-4">
        <button onClick={() => navigate(-1)} className="back-button">
          ⬅ Go Back
        </button>
      </div>
  <div className="container py-5">
      <h2>Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="row">
          {favorites.map((meal) => (
            <div key={meal.idMeal} className="col-md-4 col-sm-6 d-flex">
              <div className="card recipe">
                <img
                  src={meal.strMealThumb}
                  className="card-img-top image"
                  alt={meal.strMeal}
                />
                <div className="card-body">
                  <h5 className="card-title">{meal.strMeal}</h5>
                  <Link to={`/recipe/${meal.idMeal}`} className="btn btn-primary">
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
 
  );
};

export default Favorites;
