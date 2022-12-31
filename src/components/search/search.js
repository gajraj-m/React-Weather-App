/*
  Main function of the search component is to find the city name from the prefix typed in search bar and 
  find out the latitute longitude to be used to fetch weather details of the respective cities
*/
import "./search.css";
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json()) // fetch returns a promise for that we have to use a .then function
      .then((response) => { // res.json returns another promise for which we have to use another .then function 
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`, // lat lon found and sent to onSearchChange
              label: `${city.name}, ${city.country}`, // what is displayed under the search bar, list of all possible city names starting from the prefix typed
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="search">
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600} // every 600 ms whatever typed that will be searched
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
