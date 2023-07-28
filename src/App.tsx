import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import { Weather, api } from "./types"; // Import Weather and api from types.ts

function App(): JSX.Element {
  const [weather, setWeather] = useState<Weather | {}>({});

  // Retrieve the last searched location from localStorage when the app is first loaded
  useEffect(() => {
    const lastSearchedLocation = localStorage.getItem("lastSearchedLocation");
    if (lastSearchedLocation) {
      fetchWeatherData(lastSearchedLocation);
    }
  }, []);

  const searchWeather = (query: string) => {
    fetchWeatherData(query);
  };

  const fetchWeatherData = (query: string) => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result: Weather) => {
        setWeather(result);
        console.log(result);

        // Save the last searched location in localStorage
        localStorage.setItem("lastSearchedLocation", query);
      });
  };

  return (
    <div
      className={
        typeof (weather as Weather).main !== "undefined"
          ? (weather as Weather).main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <SearchBox onSearch={searchWeather} />
        {typeof (weather as Weather).main !== "undefined" ? (
          <WeatherInfo weather={weather as Weather} />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
