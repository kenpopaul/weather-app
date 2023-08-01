import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import { Weather, api } from "./types";

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

  const getTemperatureClass = (temp: number): string => {
    if (temp <= 5) {
      return "cold-weather";
    } else if (temp > 5 && temp <= 10) {
      return "cool-weather";
    } else if (temp > 10 && temp <= 28) {
      return "warm-weather";
    } else {
      return "hot-weather";
    }
  };

  return (
    <div
      className={`app ${
        typeof (weather as Weather).main !== "undefined"
          ? getTemperatureClass((weather as Weather).main.temp)
          : ""
      }`}
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
