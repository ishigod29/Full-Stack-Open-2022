import React from "react";
import Country from "./Country";

const CountriesList = ({ newSearch, countries, handleClick }) => {
  const countriesToShow =
    newSearch === ""
      ? countries.filter((country) => country.name.official === "")
      : countries.filter((country) =>
          country.name.official.toLowerCase().includes(newSearch.toLowerCase())
        );

  return (
    <div>
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <div>
          {countriesToShow.map((country, i) => (
            <Country
              key={i}
              country={country}
              handleClick={handleClick}
              countriesToShow={countriesToShow}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesList;
