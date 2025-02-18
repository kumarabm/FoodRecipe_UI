
// import React, { useState } from 'react';
// import { FaHome, FaHeart, FaInfoCircle, FaSearch } from 'react-icons/fa';
// import '../style/Navbar.css';

// const Navbar = ({ onSearch }) => {
//  const [searchTerm, setSearchTerm] = useState(''); 
//  const [query, setQuery] = useState('burger');

//   const handleSearchInput = (event) => {
//     setSearchTerm(event.target.value); // Update search term state
//   };

//   // Handle the actual search when user submits the search form
//   const handleSearch = (event) => {
//     event.preventDefault(); // Prevent page reload on form submit
//     setQuery(searchTerm); // Update query with search term
//   };

//   return (
//     <div className="navbar">
//       <div className="navbar__left">
//         <div className="navbar__icon">
//           <FaHome size={24} />
//           <span>Home</span>
//         </div>
//         <div className="navbar__icon">
//           <FaHeart size={24} />
//           <span>Favorites</span>
//         </div>
//         <div className="navbar__icon">
//           <FaInfoCircle size={24} />
//           <span>About</span>
//         </div>
//       </div>
//       <div className="navbar__right">
//         <form onSubmit={handleSearch} className="navbar__search">
//           <input
//             type="text"
//             className="navbar__search-input"
//             value={searchTerm}
//             onChange={handleSearchInput}
//             placeholder="Search for a recipe"
//           />
//           <button type="submit" className="navbar__search-button">
//             <FaSearch size={20} />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { FaHome, FaHeart, FaInfoCircle, FaSearch } from 'react-icons/fa';
import '../style/Navbar.css';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Store the search term input
  const [query, setQuery] = useState(''); // Store the query to search

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value); // Update the search term as user types
  };

  // Handle the actual search when user submits the search form
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    setQuery(searchTerm); // Set the query from the search term

    if (onSearch) {
      onSearch(searchTerm); // Call the onSearch function passed from parent component
    }

    // Optional: If you want to fetch data here instead of passing query to parent
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      console.log(data.meals); // Log the meal data for debugging

      // You can either use `onSearch` to pass the meals to the parent component
      if (onSearch) {
        onSearch(data.meals || []); // Pass the meals data to parent
      }
    } catch (error) {
      console.error('Error fetching meal data:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <div className="navbar__icon">
          <FaHome size={24} />
          <span>Home</span>
        </div>
        <div className="navbar__icon">
          <FaHeart size={24} />
          <span>Favorites</span>
        </div>
        <div className="navbar__icon">
          <FaInfoCircle size={24} />
          <span>About</span>
        </div>
      </div>
      <div className="navbar__right">
        <form onSubmit={handleSearch} className="navbar__search">
          <input
            type="text"
            className="navbar__search-input"
            value={searchTerm}
            onChange={handleSearchInput}
            placeholder="Search for a recipe"
          />
          <button type="submit" className="navbar__search-button">
            <FaSearch size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;