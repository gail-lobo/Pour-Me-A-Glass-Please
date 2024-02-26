import React from 'react';
import { Link } from 'react-router-dom';

// Functional component to display a section of drinks
function DrinkSection({ drinksObj }) {
  return (
    <div className='drinksSection'>
      {/* Check if drinksObj is not null and contains drinks */}
      {drinksObj && drinksObj.drinks && drinksObj.drinks.length > 0 ? (
        // If drinks are found, map through them to create drink cards
        drinksObj?.drinks?.map((drinkElement, index) => {
          return (
            <div className='drinkCard' key={index}>
              {/* Link to each drink's details */}
              <Link to={`/${drinkElement.idDrink}`} style={{ textDecoration: 'none', color: 'burlywood' }}>
                <img src={drinkElement.strDrinkThumb} alt={drinkElement.strDrink} />
                <p>{drinkElement.strDrink}</p>
              </Link>
            </div>
          );
        })
      ) : (
        // If no drinks are found, display a message
        <p>Sorry, no match found!</p>
      )}
    </div>
  );
}

export default DrinkSection;

