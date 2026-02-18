import React, { useEffect, useState, useCallback } from "react";
import { Weather, SavedLocation } from "./types";
import WindCompass from "./WindCompass";

interface WeatherInfoProps {
  weather: Weather;
  fetchWeatherData: (name: string, country?: string) => Promise<void>;
  setWeather: React.Dispatch<React.SetStateAction<Weather | null>>;
}

const STORAGE_KEY = "savedLocations";
const MAX_SAVED = 5;

const getWindDirection = (degrees: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(degrees / 22.5) % 16];
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const readSavedLocations = (): SavedLocation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedLocation[]) : [];
  } catch {
    return [];
  }
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  weather,
  fetchWeatherData,
}) => {
  const [savedLocations, setSavedLocations] =
    useState<SavedLocation[]>(readSavedLocations);

  useEffect(() => {
    setSavedLocations(readSavedLocations());
  }, [weather]);

  const handleSaveLocation = useCallback(() => {
    const incoming: SavedLocation = {
      name: weather.name,
      country: weather.sys.country,
    };
    setSavedLocations((prev) => {
      const filtered = prev.filter(
        (l) => !(l.name === incoming.name && l.country === incoming.country),
      );
      const updated = [incoming, ...filtered].slice(0, MAX_SAVED);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [weather]);

  const handleRemoveLocation = useCallback((index: number) => {
    setSavedLocations((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isLocationSaved = savedLocations.some(
    (l) => l.name === weather.name && l.country === weather.sys.country,
  );

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div>
      <div className="location-box">
        <div className="location">
          {weather.name}, {weather.sys.country}
          {!isLocationSaved && (
            <button
              className="save-location-button"
              onClick={handleSaveLocation}
            >
              + Save
            </button>
          )}
        </div>
        <div className="date">{formatDate(new Date())}</div>
      </div>

      <div className="weather-box">
        <div className="temp-container">
          <div className="temp">
            <div>{Math.round(weather.main.temp)}°c</div>
            <div className="feels-like">
              Feels like: {Math.round(weather.main.feels_like)}°c
            </div>
          </div>
        </div>

        <div className="weather">
          <div className="wind-info">
            <div className="weather-description">
              <img
                src={iconUrl}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
              <span className="small-text">
                {weather.weather[0].description}
              </span>
            </div>
            <div className="wind">
              <div>
                Wind speed: {Math.round(weather.wind.speed * 2.237)} mph
              </div>
              <div>Direction: {getWindDirection(weather.wind.deg)}</div>
            </div>
          </div>

          <div className="compass-container">
            <WindCompass windDirection={weather.wind.deg} />
          </div>
        </div>
      </div>

      {savedLocations.length > 0 && (
        <div className="stored-locations">
          <h2 className="stored-locations-heading">Saved Locations</h2>
          <div className="location-buttons-container">
            {savedLocations.map((location, index) => (
              <div
                key={`${location.name}-${location.country}`}
                className="stored-location-box"
              >
                <button
                  className="remove-location-button"
                  onClick={() => handleRemoveLocation(index)}
                  aria-label={`Remove ${location.name}`}
                >
                  ×
                </button>
                <button
                  className="button-location"
                  onClick={() =>
                    fetchWeatherData(location.name, location.country)
                  }
                >
                  {location.name}, {location.country}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
