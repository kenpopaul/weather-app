import React, { useEffect, useState } from "react";
import { Weather } from "./types";
import WindCompass from "./WindCompass";

interface LocationData {
  name: string;
  country: string;
}

interface WeatherInfoProps {
  weather: Weather;
}

const getWindDirection = (degrees: number): string => {
  const directions: string[] = [
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
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const dateBuilder = (currentDate: Date): string => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day: string = days[currentDate.getDay()];
  const date: number = currentDate.getDate();
  const month: string = months[currentDate.getMonth()];
  const year: number = currentDate.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  const [weatherIcon, setWeatherIcon] = useState<string | null>(null);
  const [lastVisitedLocations, setLastVisitedLocations] = useState<
    LocationData[]
  >([]);

  useEffect(() => {
    const weatherIconCode = weather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
    setWeatherIcon(iconUrl);

    const currentLocation: LocationData = {
      name: weather.name,
      country: weather.sys.country,
    };
    saveLocationToLocalStorage(currentLocation);

    const lastLocationsFromStorage = getLocationsFromLocalStorage();
    setLastVisitedLocations(lastLocationsFromStorage);
  }, [weather]);

  const saveLocationToLocalStorage = (locationData: LocationData) => {
    const storedLocations = getLocationsFromLocalStorage();
    const updatedLocations = [locationData, ...storedLocations.slice(0, 3)];
    localStorage.setItem(
      "lastVisitedLocations",
      JSON.stringify(updatedLocations)
    );
  };

  const getLocationsFromLocalStorage = (): LocationData[] => {
    const storedLocationsString = localStorage.getItem("lastVisitedLocations");
    if (storedLocationsString) {
      return JSON.parse(storedLocationsString);
    }
    return [];
  };

  return (
    <div>
      <div className="location-box">
        <div className="location">
          Location: {weather.name}, {weather.sys.country}
        </div>
        <div className="date">{dateBuilder(new Date())}</div>
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
            {weatherIcon && (
              <div className="weather-description">
                <img
                  src={weatherIcon}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <span className="small-text">
                  {weather.weather[0].description}
                </span>
              </div>
            )}
            <div className="wind">
              <div>
                Wind Speed: {Math.round(weather.wind.speed * 2.23694)} mph
              </div>
              <div>Wind Direction: {getWindDirection(weather.wind.deg)}</div>
            </div>
          </div>

          <div className="compass-container">
            <WindCompass windDirection={weather.wind.deg} />
          </div>
        </div>
      </div>

      <div className="last-visited-locations">
        <h2>Last 4 Visited Locations:</h2>
        <ul>
          {lastVisitedLocations.map((location, index) => (
            <li key={index}>
              {location.name}, {location.country}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherInfo;
