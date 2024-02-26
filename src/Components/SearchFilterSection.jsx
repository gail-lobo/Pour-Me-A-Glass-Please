import React, { useState, useEffect } from "react";
import Axios from "axios";
import DrinkSection from "./DrinkSection";

// Component for search and filter functionality
function SearchFilterSection() {
  const [searchString, setSearchString] = useState(""); // State for search string
  const [filterDrinks, setFilterDrinks] = useState("Non_Alcoholic&&a=Alcoholic"); // State for drink filter
  const [drinksObj, setDrinksObj] = useState(null); // State for storing drink data

  // Function to fetch drinks based on search and filter criteria
  const fetchData = async () => {
    let searchResult = "";

    if (searchString === "") {
      // If search string is empty, fetch drinks based on filter
      const filterResult = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filterDrinks}`
      ).then((response) => {
        return response.data;
      });
      setDrinksObj(filterResult);
    } else {
      // If search string is not empty, fetch drinks based on search string and filter
      searchResult = await Axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchString}`
      ).then((response) => {
        return response.data;
      });

      if (searchResult && searchResult.drinks && searchResult.drinks.length > 0) {
        let filteredResult;
        if (filterDrinks === "Alcoholic") {
          // Filter alcoholic drinks
          filteredResult = {
            drinks: searchResult.drinks.filter((n) => {
              return n.strAlcoholic === "Alcoholic";
            }),
          };
        } else if (filterDrinks === "Non_Alcoholic") {
          // Filter non-alcoholic drinks
          filteredResult = {
            drinks: searchResult.drinks.filter((n) => {
              return n.strAlcoholic === "Non alcoholic";
            }),
          };
        } else {
          // No filter, use search result directly
          filteredResult = searchResult;
        }
        setDrinksObj(filteredResult);
      } else {
        // No search result found
        setDrinksObj("");
      }
    }
  };

  // Fetch data on component mount or when filter changes
  useEffect(() => {
    fetchData();
  }, [filterDrinks]);

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Function to handle filter change
  const handleFilter = (e) => {
    e.preventDefault();
    setFilterDrinks(e.target.value);
  };

  return (
    <>
      <div>
        {/* Search and filter form */}
        <form className="searchBar" onSubmit={handleSearch}>
          <div>
            <input
              type="text"
              id="search"
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              placeholder="Find your favorite drink !!"
            />
          </div>
          <div>
            <select
              id="filterDrinks"
              value={filterDrinks}
              onChange={handleFilter}
            >
              <option value="Non_Alcoholic&&a=Alcoholic">All</option>
              <option value="Alcoholic">Alcoholic</option>
              <option value="Non_Alcoholic">Non Alcoholic</option>
            </select>
            <button id="searchBtn" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Component to display drink section */}
      <DrinkSection drinksObj={drinksObj}></DrinkSection>
    </>
  );
}

export default SearchFilterSection;
