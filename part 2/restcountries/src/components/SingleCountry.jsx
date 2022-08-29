import React from "react";

const SingleCountry = ({ country, weather }) => {
  console.log(weather)
  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>{country.capital}</p>
      <p>population {country.population}</p>

      <h2>continent</h2>
      <p>{country.continents}</p>

      <img src={country.flags.png} alt="" />

      <p><strong>temperature:</strong> {weather.temp_c} Celcius</p>

      <h3>{weather.wx_desc}</h3>

      <p><strong>wind:</strong> {weather.vis_km} mph direction {weather.winddir_compass}</p>
    </div>
  );
};

export default SingleCountry;
