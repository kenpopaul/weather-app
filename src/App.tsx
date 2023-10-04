import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import { Weather, api } from "./types";

function App(): JSX.Element {
  const [weather, setWeather] = useState<Weather | {}>({});

  const fetchWeatherData = async (
    name: string,
    country: string
  ): Promise<Weather> => {
    const response = await fetch(
      `${api.base}weather?q=${name},${country}&units=metric&APPID=${api.key}`
    );
    return response.json();
  };

  useEffect(() => {
    const lastSearchedLocation = localStorage.getItem("lastSearchedLocation");
    if (lastSearchedLocation) {
      fetchWeatherData(lastSearchedLocation, "")
        .then((result) => setWeather(result))
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, []);

  const searchWeather = (query: string) => {
    fetchWeatherData(query, "")
      .then((result) => setWeather(result))
      .catch((error) => console.error("Error fetching weather data:", error));
  };

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
