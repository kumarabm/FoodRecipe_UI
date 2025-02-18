// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import '../style/recipe.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Recipe = () => {
//   const APP_ID = '70a32c28';
//   const APP_KEY = '45f95b3eaf921b42d03d26b31e12a361';
//   const [recipes, setRecipes] = useState([]);
//   const [query, setQuery] = useState('burger');
 
//   useEffect(() => {
//     if (query) {
//       setRecipes([]); // Clear existing recipes
//       getRecipes(0, 100);
//     }
//   }, [query]);

//   const getRecipes = async (start = 0, end = 100) => {
//     const response = await fetch(
//       `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${start}&to=${end}`
//     );
//     const data = await response.json();
//     setRecipes((prevRecipes) => [...prevRecipes, ...data.hits]); // Append new results
//   };

//   const loadMoreRecipes = () => {
//     getRecipes(recipes.length, recipes.length + 100);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div
//         className="container-fluid"
//         style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '30px' }}
//       >
//         <div className="container py-5">
//           <div className="row g-6">
//             {recipes.length > 0 ? (
//               <>
//                 <div className="row">
//                   {recipes.map((recipeItem) => (
//                     <div key={recipeItem.recipe.label} className="col-md-4 col-sm-6 d-flex">
//                       <div className="card recipe">
//                         <img
//                           src={recipeItem.recipe.image}
//                           className="card-img-top image"
//                           alt={recipeItem.recipe.label}
//                         />
//                         <div className="card-body">
//                           <h5 className="card-title">{recipeItem.recipe.label}</h5>
//                           <h6>Ingredients:</h6>
//                           <div className="ingredients">
//                             {recipeItem.recipe.ingredients.map((ingredient, index) => (
//                               <p key={`${ingredient.text}-${index}`}>
//                                 {ingredient.text}.
//                               </p>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="card-footer text-center">
//                           <p>
//                             <strong>Calories:</strong> {recipeItem.recipe.calories.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Button to load more recipes */}
//                 <div className="text-center mt-4">
//                   <button className="btn btn-primary" onClick={loadMoreRecipes}>
//                     Load More Recipes
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <p className="text-center">No recipes found. Try a different search.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recipe;


// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import '../style/recipe.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Recipe = () => {
//   const APP_ID = '70a32c28';
//   const APP_KEY = '45f95b3eaf921b42d03d26b31e12a361';
//   const [recipes, setRecipes] = useState([]);
//   const [query, setQuery] = useState('burger'); // Default search query
//   const [page, setPage] = useState(1); // Current page
//   const [totalHits, setTotalHits] = useState(0); // Total number of recipes from the API
//   const [recipesPerPage] = useState(10); // How many recipes per page

//   // Fetch recipes whenever the query changes or the page changes
//   useEffect(() => {
//     if (query) {
//       setRecipes([]); // Clear existing recipes when the query changes
//       setPage(1); // Reset to the first page when the query changes
//       getRecipes(1); // Fetch the first page of recipes
//     }
//   }, [query]);

//   useEffect(() => {
//     if (query) {
//       getRecipes(page); // Fetch recipes when the page number changes
//     }
//   }, [page]);

//   // Function to get recipes from the Edamam API
//   const getRecipes = async (currentPage) => {
//     const start = (currentPage - 1) * recipesPerPage; // Calculate the start index for pagination
//     try {
//       const response = await fetch(
//         `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${start}&to=${start + recipesPerPage}`
//       );
//       const data = await response.json();
//       setTotalHits(data.count); // Set the total number of recipes
//       setRecipes(data.hits); // Set the current page recipes
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   // Function to handle pagination
//   const handlePagination = (direction) => {
//     if (direction === 'next' && page * recipesPerPage < totalHits) {
//       setPage(page + 1); // Go to the next page
//     } else if (direction === 'prev' && page > 1) {
//       setPage(page - 1); // Go to the previous page
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div
//         className="container-fluid"
//         style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '30px' }}
//       >
//         <div className="container py-5">
//           <div className="row g-6">
//             {recipes.length > 0 ? (
//               <>
//                 <div className="row">
//                   {recipes.map((recipeItem) => (
//                     <div key={recipeItem.recipe.label} className="col-md-4 col-sm-6 d-flex">
//                       <div className="card recipe">
//                         <img
//                           src={recipeItem.recipe.image}
//                           className="card-img-top image"
//                           alt={recipeItem.recipe.label}
//                         />
//                         <div className="card-body">
//                           <h5 className="card-title">{recipeItem.recipe.label}</h5>
//                           <h6>Ingredients:</h6>
//                           <div className="ingredients">
//                             {recipeItem.recipe.ingredients.map((ingredient, index) => (
//                               <p key={`${ingredient.text}-${index}`}>{ingredient.text}</p>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="card-footer text-center">
//                           <p>
//                             <strong>Calories:</strong> {recipeItem.recipe.calories.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination Controls */}
//                 <div className="text-center mt-4">
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handlePagination('prev')}
//                     disabled={page === 1}
//                   >
//                     Previous
//                   </button>
//                   <span className="mx-3">
//                     Page {page} of {Math.ceil(totalHits / recipesPerPage)}
//                   </span>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handlePagination('next')}
//                     disabled={page * recipesPerPage >= totalHits}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <p className="text-center">No recipes found. Try a different search.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recipe;


// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import '../style/recipe.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Recipe = () => {
//   const APP_ID = '70a32c28';
//   const APP_KEY = '45f95b3eaf921b42d03d26b31e12a361';
//   const [recipes, setRecipes] = useState([]);
//   const [query, setQuery] = useState('burger');
//   const [page, setPage] = useState(1); // Current page
//   const [totalHits, setTotalHits] = useState(0); // Total number of recipes from the API
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
//   const [rowsOption, setRowsOption] = useState([10, 20, 30, 50]);  // Options for rows per page

//   useEffect(() => {
//     if (query) {
//       setRecipes([]); // Clear existing recipes when the query changes
//       setPage(1); // Reset to the first page when the query changes
//       getRecipes(1); // Fetch the first page of recipes
//     }
//   }, [query]);

//   useEffect(() => {
//     if (query) {
//       getRecipes(page); // Fetch recipes when the page or rows per page changes
//     }
//   }, [page, rowsPerPage]);

//   // Fetch recipes based on the current page and rowsPerPage
//   const getRecipes = async (currentPage) => {
//     const start = (currentPage - 1) * rowsPerPage;
//     try {
//       const response = await fetch(
//         `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${start}&to=${start + rowsPerPage}`
//       );
//       const data = await response.json();
//       console.log(data.count,"respose of api");
      
//       setTotalHits(data.count); // Total number of recipes
//       setRecipes(data.hits);
//       updateRowsOption(data.count);// Set the current page recipes
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   const updateRowsOption = (totalCount) => {
//     const options = [];
//     const maxOption = Math.min(100, totalCount); // Limit max rows per page option to 100
//     let option = 10;
//     while (option <= maxOption) {
//       options.push(option);
//       option *= 2; // Increase options dynamically (10, 20, 40, 80, ...)
//     }
//     setRowsOption(options);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(Number(event.target.value));
//     setPage(1); // Reset to the first page when rows per page changes
//   };

//   // Decrease page number
//   const handleDecPage = () => {
//     if (page > 1) setPage(page - 1);
//   };

//   // Increase page number
//   const handleIncPage = () => {
//     if (page * rowsPerPage < totalHits) setPage(page + 1);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div
//         className="container-fluid"
//         style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '30px' }}
//       >
//         <div className="container py-5">
//           <div className="row g-6">
//             {recipes.length > 0 ? (
//               <>
//                 <div className="row">
//                   {recipes.map((recipeItem) => (
//                     <div key={recipeItem.recipe.label} className="col-md-4 col-sm-6 d-flex">
//                       <div className="card recipe">
//                         <img
//                           src={recipeItem.recipe.image}
//                           className="card-img-top image"
//                           alt={recipeItem.recipe.label}
//                         />
//                         <div className="card-body">
//                           <h5 className="card-title">{recipeItem.recipe.label}</h5>
//                           <h6>Ingredients:</h6>
//                           <div className="ingredients">
//                             {recipeItem.recipe.ingredients.map((ingredient, index) => (
//                               <p key={`${ingredient.text}-${index}`}>{ingredient.text}</p>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="card-footer text-center">
//                           <p>
//                             <strong>Calories:</strong> {recipeItem.recipe.calories.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination Container */}
//                 <div className="pagination-container mt-4">
//                   <div className="rows-per-page">
//                     <span>Rows per page:</span>
//                     <select
//                       id="rowsPerPage"
//                       value={rowsPerPage}
//                       onChange={handleChangeRowsPerPage}
//                     >
//                       {rowsOption.map((values, index) => (
//                         <option key={index} value={values}>
//                           {values}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="pagination-info">
//                     <span id="rowsRange">
//                       {((page - 1) * rowsPerPage) + 1} -{' '}
//                       {Math.min(page * rowsPerPage, totalHits)}{' '}
//                     </span>
//                     &nbsp;
//                     <span style={{ fontWeight: 'bold' }}>of</span>
//                     &nbsp;<span id="totalRows">{totalHits}</span>
//                   </div>
//                   <div className="pagination-buttons">
//                     <button
//                       className="prev-btn"
//                       aria-label="Previous page"
//                       onClick={handleDecPage}
//                       disabled={page <= 1}
//                     >
//                       &#9664;
//                     </button>
//                     <button
//                       className="next-btn"
//                       aria-label="Next page"
//                       onClick={handleIncPage}
//                       disabled={page * rowsPerPage >= totalHits}
//                     >
//                       &#9654;
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <p className="text-center">No recipes found. Try a different search.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recipe;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../style/recipe.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recipe = ({ addToFavorites, favorites }) => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchMealsByCategory = async (category) => {
    if (!category) return;
    setRecipes([]); // Clear previous recipes when a new category is selected

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setRecipes(data.meals || []); // Set meals data to recipes state
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchMealsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleAddToFavorites = (meal) => {
    addToFavorites(meal); // Add meal to favorites list
  };

  return (
    <div>
      <Navbar favorites={favorites} />
      <div className="container py-5">
        <h2>Meal Categories</h2>
        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category.strCategory}
              onClick={() => setSelectedCategory(category.strCategory)}
              className="category-btn"
            >
              {category.strCategory}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div>
            <h3>Meals in {selectedCategory}</h3>
            <div className="row">
              {recipes.length > 0 ? (
                recipes.map((meal) => (
                  <div key={meal.idMeal} className="col-md-4 col-sm-6 d-flex">
                    <div className="card recipe">
                      <img
                        src={meal.strMealThumb}
                        className="card-img-top image"
                        alt={meal.strMeal}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{meal.strMeal}</h5>
                        {/* Link to navigate to the detailed recipe page */}
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                        >
                          View Recipe
                        </button>
                        <button
                          className="btn btn-secondary mt-2"
                          onClick={() => handleAddToFavorites(meal)}
                        >
                          Add to Favorites
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No meals found in this category.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;



