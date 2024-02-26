import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

// Component for displaying details of a specific drink
function DrinkDetailPage() {

  const [drinkArr, setDrinkArr] = useState(""); // State for storing drink details
  let [ingredientNames, setIngredientNames] = useState([]); // State for storing ingredient names
  let [ingredientMeasure, setIngredientMeasure] = useState([]); // State for storing ingredient measures

  let { drinkId } = useParams(); // Get drink ID from URL parameter

  // Function to fetch drink details from API
  const fetchData = async () => {
    try {
      const drinkDetails = await Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then((response) => { return response.data });
      setDrinkArr(drinkDetails.drinks);

      let ingredientNameArray = [];
      let ingredientMeasureArray = [];
      const drinkObject = drinkDetails.drinks[0];

      // Extract ingredient names and measures from drink object
      for (let key in drinkObject) {
        if (drinkObject[key] !== null) {
          if (key.startsWith('strIngredient')) {
            ingredientNameArray.push(drinkObject[key]);
          } else if (key.startsWith('strMeasure')) {
            ingredientMeasureArray.push(drinkObject[key]);
          }
        }
      }

      setIngredientNames(ingredientNameArray);
      setIngredientMeasure(ingredientMeasureArray);
    } catch (error) {
      console.error('Error fetching drink details: ', error);
    }
  }

  useEffect(() => {
    fetchData(); // Fetch drink details when component mounts
  }, []);

  return (
    <div className="detailsContainer">
      <div className="imageTitle">
        <div className="drinkDetailsImage">
          <img src={drinkArr[0]?.strDrinkThumb} alt={drinkArr[0]?.strDrink} />
        </div>
        <h2>{drinkArr[0]?.strDrink}</h2>
      </div>

      <div className="ingredientsInstruction">
        <h3>Ingredients:</h3>
        {/* Display list of ingredients and measures */}
        {ingredientNames?.map((n, index) => {
          return <ul key={index}><li>{ingredientMeasure[index]} {n}</li></ul>
        })}
        <h3 className="instructions">Instructions:</h3>
        <p>{drinkArr[0]?.strInstructions}</p>
        <div className="buttonSection">
          {/* Button to navigate back to drink list */}
          <Link to={`/`}>
            <button>Back to List</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DrinkDetailPage;
