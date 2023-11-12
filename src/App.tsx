import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import { Weather, api } from "./types";

function App(): JSX.Element {
  const [weather, setWeather] = useState<Weather | {}>({});

  // Async function to fetch weather data from the API
  const fetchWeatherData = async (
    name: string,
    country: string
  ): Promise<Weather> => {
    const response = await fetch(
      // Construct API endpoint URL with provided parameters
      `${api.base}weather?q=${name},${country}&units=metric&APPID=${api.key}`
    );
    return response.json();
  };

  // useEffect hook to fetch weather data when the component mounts
  useEffect(() => {
    // Retrieve the last searched location from local storage
    const lastSearchedLocation = localStorage.getItem("lastSearchedLocation");
    // If a last searched location exists, fetch weather data and set the state
    if (lastSearchedLocation) {
      fetchWeatherData(lastSearchedLocation, "")
        .then((result) => setWeather(result))
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, []);

  // Function to search for weather data based on a query
  const searchWeather = (query: string) => {
    // Fetch weather data based on the query and set the state
    fetchWeatherData(query, "")
      .then((result) => setWeather(result))
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  // Function to determine temperature class based on temperature value
  const getTemperatureClass = (temp: number): string => {
    if (temp <= 5) {
      return "cold-weather";
    } else if (temp <= 10) {
      return "cool-weather";
    } else if (temp <= 28) {
      return "warm-weather";
    } else {
      return "hot-weather";
    }
  };

  // Render the main component with conditional class based on temperature
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
          <WeatherInfo
            weather={weather as Weather}
            fetchWeatherData={fetchWeatherData}
            setWeather={setWeather}
          />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
