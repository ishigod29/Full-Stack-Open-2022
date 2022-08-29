import React, { useState, useEffect } from "react";
import axios from "axios";
import CountriesList from "./components/CountriesList";
import SearchForm from "./components/SearchForm";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleClick = (e) => {
    const id = e.target.id;
    setNewSearch(id);
  };

  const handleSearchChange = (e) => {
    const inputText = e.target.value;
    setNewSearch(inputText);
  };

  return (
    <div>
      <SearchForm
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <div>
        <CountriesList
          newSearch={newSearch}
          countries={countries}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default App;
