import React, { useState, useEffect, useCallback } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import { Weather, api } from "./types";

type FetchState = "idle" | "loading" | "error";

function App(): JSX.Element {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchWeatherData = useCallback(
    async (name: string, country = ""): Promise<void> => {
      if (!name.trim()) return;

      setFetchState("loading");
      setErrorMessage(null);

      try {
        const query = country ? `${name},${country}` : name;
        const response = await fetch(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`,
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Location not found. Please try another city."
              : "Unable to fetch weather data. Please try again.",
          );
        }

        const data: Weather = await response.json();
        setWeather(data);
        setFetchState("idle");
        localStorage.setItem("lastSearchedCity", name);
      } catch (err) {
        setFetchState("error");
        setErrorMessage(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
      }
    },
    [],
  );

  useEffect(() => {
    const lastCity = localStorage.getItem("lastSearchedCity");
    if (lastCity) {
      fetchWeatherData(lastCity);
    }
  }, [fetchWeatherData]);

  const getTemperatureClass = (temp: number): string => {
    if (temp <= 5) return "cold-weather";
    if (temp <= 10) return "cool-weather";
    if (temp <= 28) return "warm-weather";
    return "hot-weather";
  };

  return (
    <div
      className={`app ${weather ? getTemperatureClass(weather.main.temp) : ""}`}
    >
      <main>
        <SearchBox
          onSearch={fetchWeatherData}
          isLoading={fetchState === "loading"}
        />

        {fetchState === "error" && errorMessage && (
          <div className="error-banner" role="alert">
            {errorMessage}
          </div>
        )}

        {fetchState === "loading" && (
          <div className="loading-state" aria-live="polite">
            <div className="spinner" />
          </div>
        )}

        {weather && fetchState !== "loading" && (
          <WeatherInfo
            weather={weather}
            fetchWeatherData={fetchWeatherData}
            setWeather={setWeather}
          />
        )}
      </main>
    </div>
  );
}

export default App;
