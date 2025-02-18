// import React, { useState, useEffect } from 'react';
// import { Link, useLocation ,useNavigate} from "react-router-dom";
// import Navbar from '../components/Navbar';
// import { useParams } from 'react-router-dom'; // Import useParams hook

// const Viewrecipe = () => {
//   const { idMeal } = useParams(); // Get the idMeal from the URL params
//   const [mealDetails, setMealDetails] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchMealDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
//         );
//         const data = await response.json();
//         setMealDetails(data.meals[0]); // Set the details of the meal
//       } catch (error) {
//         console.error('Error fetching meal details:', error);
//       }
//     };

//     fetchMealDetails();
//   }, [idMeal]);

//   if (!mealDetails) return <p>Loading...</p>;

//   return (
//     <div>
//       <Navbar />

//      {/* Breadcrumb + Go Back Button */}
//      <div className="breadcrumb py-2 px-4">
//         <button onClick={() => navigate(-1)} className="back-button">
//           ⬅ Go Back
//         </button>
//         {/* &nbsp; | &nbsp;
//         <Link to="/">Home</Link> &gt;
//         <span className="text-muted"> {mealDetails.strMeal}</span> */}
//       </div>

//       <div className="container py-5">
//       <h3>{mealDetails.strMeal}</h3>
//       <img
//         src={mealDetails.strMealThumb}
//         alt={mealDetails.strMeal}
//         style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
//       />
//       <h4>Ingredients</h4>
//       <ul>
//         {Object.keys(mealDetails)
//           .filter((key) => key.includes('strIngredient') && mealDetails[key])
//           .map((key) => (
//             <li key={key}>{mealDetails[key]}</li>
//           ))}
//       </ul>
//       <h4>Instructions</h4>
//       <p>{mealDetails.strInstructions}</p>
//     </div>
//     </div>
   
//   );
// };

// export default Viewrecipe;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Navbar from './Navbar';

// const Viewrecipe = () => {
//   const { idMeal } = useParams();
//   const [mealDetails, setMealDetails] = useState(null);
//   const [translatedIngredients, setTranslatedIngredients] = useState([]);
//   const [translatedInstructions, setTranslatedInstructions] = useState('');
//   const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default: English
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAndTranslate = async () => {
//       try {
//         const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
//         const data = await response.json();
//         const meal = data.meals[0];
        
//         setMealDetails(meal); // Store original details

//         if (selectedLanguage === "en") {
//           // Set default values in English
//           setTranslatedInstructions(meal.strInstructions);
//           setTranslatedIngredients(
//             Object.keys(meal)
//               .filter((key) => key.includes('strIngredient') && meal[key])
//               .map((key) => meal[key])
//           );
//         } else {
//           // Translate ingredients and instructions
//           const ingredientsList = Object.keys(meal)
//             .filter((key) => key.includes('strIngredient') && meal[key])
//             .map((key) => meal[key]);

//           translateText(ingredientsList.join(','), (translatedText) => {
//             setTranslatedIngredients(translatedText.split(','));
//           });

//           translateLongText(meal.strInstructions, setTranslatedInstructions);
//         }
//       } catch (error) {
//         console.error('Error fetching meal details:', error);
//       }
//     };

//     fetchAndTranslate();
//   }, [idMeal, selectedLanguage]);

//   // Function to translate long text in parallel (optimized for speed)
//   const translateLongText = async (text, setState) => {
//     if (!text) return;
    
//     const maxLength = 450; // Keep under the 500-char API limit
//     let textChunks = text.match(new RegExp(`.{1,${maxLength}}`, 'g')) || [text]; // Split into chunks

//     try {
//       const translationPromises = textChunks.map(async (chunk) => {
//         const response = await fetch(
//           `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|${selectedLanguage}`
//         );
//         const data = await response.json();
//         return data.responseData?.translatedText || chunk; // Use original if translation fails
//       });

//       const translatedChunks = await Promise.all(translationPromises);
//       setState(translatedChunks.join(' ')); // Join translated parts
//     } catch (error) {
//       console.error('Translation error:', error);
//     }
//   };

//   // Function to translate small text like ingredient names
//   const translateText = async (text, setState) => {
//     if (!text) return;
//     try {
//       const response = await fetch(
//         `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${selectedLanguage}`
//       );
//       const data = await response.json();
//       setState(data.responseData?.translatedText || text); // Use original text as fallback
//     } catch (error) {
//       console.error('Translation error:', error);
//     }
//   };

//   if (!mealDetails) return <p>Loading...</p>;

//   return (
//     <div>
//       <Navbar />
//       <div className="breadcrumb py-2 px-4">
//         <button onClick={() => navigate(-1)} className="back-button">
//           ⬅ Go Back
//         </button>
//       </div>

//       <div className="container py-5">
//         <h3>{mealDetails.strMeal}</h3>
//         <img
//           src={mealDetails.strMealThumb}
//           alt={mealDetails.strMeal}
//           style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
//         />
// <br />
// <br/>
//         {/* Language Selector */}
//         <div className="language-selector">
//           <label>Select Language:</label>
//           <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
//             <option value="en">English</option>
//             <option value="ta">Tamil</option>
//             <option value="hi">Hindi</option>
//             <option value="ml">Malayalam</option>
//             <option value="te">Telugu</option>
//             <option value="fr">French</option>
//             <option value="es">Spanish</option>
//           </select>
//         </div>

//         <h4>Ingredients</h4>
//         <ul>
//           {translatedIngredients.map((ingredient, index) => (
//             <li key={index}>{ingredient}</li>
//           ))}
//         </ul>

//         <h4>Instructions</h4>
//         <ul>
//           {translatedInstructions
//             .split(/(\d+\.\s)/) // Splitting by numbered steps (e.g., "1. Step one")
//             .filter((step) => step.trim() !== '') // Remove empty entries
//             .map((step, index) => (
//               <li key={index}>{step}</li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Viewrecipe;

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const Viewrecipe = () => {
  const { idMeal } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const [translatedIngredients, setTranslatedIngredients] = useState([]);
  const [translatedInstructions, setTranslatedInstructions] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default: English
  const navigate = useNavigate();

  // Memoize translateLongText function
  const translateLongText = useCallback(async (text, setState) => {
    if (!text) return;
    
    const maxLength = 450; // Keep under the 500-char API limit
    let textChunks = text.match(new RegExp(`.{1,${maxLength}}`, 'g')) || [text]; // Split into chunks

    try {
      const translationPromises = textChunks.map(async (chunk) => {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|${selectedLanguage}`
        );
        const data = await response.json();
        return data.responseData?.translatedText || chunk; // Use original if translation fails
      });

      const translatedChunks = await Promise.all(translationPromises);
      setState(translatedChunks.join(' ')); // Join translated parts
    } catch (error) {
      console.error('Translation error:', error);
    }
  }, [selectedLanguage]);

  // Memoize translateText function
  const translateText = useCallback(async (text, setState) => {
    if (!text) return;
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${selectedLanguage}`
      );
      const data = await response.json();
      setState(data.responseData?.translatedText || text); // Use original text as fallback
    } catch (error) {
      console.error('Translation error:', error);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const fetchAndTranslate = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await response.json();
        const meal = data.meals[0];
        
        setMealDetails(meal); // Store original details

        if (selectedLanguage === "en") {
          // Set default values in English
          setTranslatedInstructions(meal.strInstructions);
          setTranslatedIngredients(
            Object.keys(meal)
              .filter((key) => key.includes('strIngredient') && meal[key])
              .map((key) => meal[key])
          );
        } else {
          // Translate ingredients and instructions
          const ingredientsList = Object.keys(meal)
            .filter((key) => key.includes('strIngredient') && meal[key])
            .map((key) => meal[key]);

          translateText(ingredientsList.join(','), (translatedText) => {
            setTranslatedIngredients(translatedText.split(','));
          });

          translateLongText(meal.strInstructions, setTranslatedInstructions);
        }
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    fetchAndTranslate();
  }, [idMeal, selectedLanguage, translateText, translateLongText]); // Add translateText and translateLongText to the dependency array

  if (!mealDetails) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="breadcrumb py-2 px-4">
        <button onClick={() => navigate(-1)} className="back-button">
          ⬅ Go Back
        </button>
      </div>

      <div className="container py-5">
        <h3>{mealDetails.strMeal}</h3>
        <img
          src={mealDetails.strMealThumb}
          alt={mealDetails.strMeal}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
        />
        <br />
        <br />

        {/* Language Selector */}
        <div className="language-selector">
          <label>Select Language:</label>
          <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="hi">Hindi</option>
            <option value="ml">Malayalam</option>
            <option value="te">Telugu</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <h4>Ingredients</h4>
        <ul>
          {translatedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h4>Instructions</h4>
        <ul>
          {translatedInstructions
            .split(/(\d+\.\s)/) // Splitting by numbered steps (e.g., "1. Step one")
            .filter((step) => step.trim() !== '') // Remove empty entries
            .map((step, index) => (
              <li key={index}>{step}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Viewrecipe;