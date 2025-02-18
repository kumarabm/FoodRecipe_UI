import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../style/recipe.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recipe = () => {
  const APP_ID = '70a32c28';
  const APP_KEY = '45f95b3eaf921b42d03d26b31e12a361';
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('burger');
  const [page, setPage] = useState(1); // Current page
  const [totalHits, setTotalHits] = useState(0); // Total number of recipes from the API
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [rowsOption, setRowsOption] = useState([10, 20, 30, 50]);  // Options for rows per page

  useEffect(() => {
    if (query) {
      setRecipes([]); // Clear existing recipes when the query changes
      setPage(1); // Reset to the first page when the query changes
      getRecipes(1); // Fetch the first page of recipes
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      getRecipes(page); // Fetch recipes when the page or rows per page changes
    }
  }, [page, rowsPerPage]);

  // Fetch recipes based on the current page and rowsPerPage
  const getRecipes = async (currentPage) => {
    const start = (currentPage - 1) * rowsPerPage;
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${start}&to=${start + rowsPerPage}`
      );
      const data = await response.json();
      console.log(data.count,"respose of api");
      
      setTotalHits(data.count); // Total number of recipes
      setRecipes(data.hits);
      updateRowsOption(data.count);// Set the current page recipes
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const updateRowsOption = (totalCount) => {
    const options = [];
    const maxOption = Math.min(100, totalCount); // Limit max rows per page option to 100
    let option = 10;
    while (option <= maxOption) {
      options.push(option);
      option *= 2; // Increase options dynamically (10, 20, 40, 80, ...)
    }
    setRowsOption(options);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1); // Reset to the first page when rows per page changes
  };

  // Decrease page number
  const handleDecPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Increase page number
  const handleIncPage = () => {
    if (page * rowsPerPage < totalHits) setPage(page + 1);
  };

  return (
    <div>
      <Navbar />
      <div
        className="container-fluid"
        style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '30px' }}
      >
        <div className="container py-5">
          <div className="row g-6">
            {recipes.length > 0 ? (
              <>
                <div className="row">
                  {recipes.map((recipeItem) => (
                    <div key={recipeItem.recipe.label} className="col-md-4 col-sm-6 d-flex">
                      <div className="card recipe">
                        <img
                          src={recipeItem.recipe.image}
                          className="card-img-top image"
                          alt={recipeItem.recipe.label}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{recipeItem.recipe.label}</h5>
                          <h6>Ingredients:</h6>
                          <div className="ingredients">
                            {recipeItem.recipe.ingredients.map((ingredient, index) => (
                              <p key={`${ingredient.text}-${index}`}>{ingredient.text}</p>
                            ))}
                          </div>
                        </div>
                        <div className="card-footer text-center">
                          <p>
                            <strong>Calories:</strong> {recipeItem.recipe.calories.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Container */}
                <div className="pagination-container mt-4">
                  <div className="rows-per-page">
                    <span>Rows per page:</span>
                    <select
                      id="rowsPerPage"
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                    >
                      {rowsOption.map((values, index) => (
                        <option key={index} value={values}>
                          {values}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="pagination-info">
                    <span id="rowsRange">
                      {((page - 1) * rowsPerPage) + 1} -{' '}
                      {Math.min(page * rowsPerPage, totalHits)}{' '}
                    </span>
                    &nbsp;
                    <span style={{ fontWeight: 'bold' }}>of</span>
                    &nbsp;<span id="totalRows">{totalHits}</span>
                  </div>
                  <div className="pagination-buttons">
                    <button
                      className="prev-btn"
                      aria-label="Previous page"
                      onClick={handleDecPage}
                      disabled={page <= 1}
                    >
                      &#9664;
                    </button>
                    <button
                      className="next-btn"
                      aria-label="Next page"
                      onClick={handleIncPage}
                      disabled={page * rowsPerPage >= totalHits}
                    >
                      &#9654;
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center">No recipes found. Try a different search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;