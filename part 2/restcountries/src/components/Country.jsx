import React, { useEffect, useState } from "react";
import SingleCountry from "./SingleCountry";
import axios from "axios";

const Country = ({ country, countriesToShow, handleClick }) => {
  const [weather, setWeather] = useState("");

  const API_KEY= process.env.REACT_APP_API_KEY
  const APP_ID = process.env.REAC_APP_APP_ID

  useEffect(() => {
    axios.get(`http://api.weatherunlocked.com/api/current/${country.latlng[0]},${country.latlng[1]}?app_id=${APP_ID}&app_key=${API_KEY}`).then(response => {
      setWeather(response.data)
    })
  }, [country.latlng, API_KEY,APP_ID])
  
  let show = true;

  const clickToShow = show ? (
    <div key={country.name.official}>
      {country.name.official}
      <button onClick={handleClick} id={country.name.official}>
        show
      </button>
    </div>
  ) : (
    <SingleCountry country={country} weather={weather}/>
  );

  return (
    <div>
      {countriesToShow.length === 1 ? (
        <SingleCountry country={country}  weather={weather}/>
      ) : (
        clickToShow
      )}
    </div>
  );
};

export default Country;
