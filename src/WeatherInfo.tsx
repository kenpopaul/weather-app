import React, { useEffect, useState } from "react";
import { Weather } from "./types";
import WindCompass from "./WindCompass";

interface LocationData {
  name: string;
  country: string;
}

interface WeatherInfoProps {
  weather: Weather;
  fetchWeatherData: (name: string, country: string) => Promise<Weather>;
  setWeather: React.Dispatch<React.SetStateAction<Weather>>;
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

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  weather,
  fetchWeatherData,
  setWeather,
}) => {
  const [lastVisitedLocations, setLastVisitedLocations] = useState<
    LocationData[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  const handleAddLocation = () => {
    if (weather) {
      const currentLocation: LocationData = {
        name: weather.name,
        country: weather.sys?.country || "",
      };
      saveLocationToLocalStorage(currentLocation);
      const lastLocationsFromStorage = getLocationsFromLocalStorage();
      setLastVisitedLocations(lastLocationsFromStorage);
    }
  };

  const handleStoredLocationClick = (location: LocationData) => {
    fetchWeatherData(location.name, location.country)
      .then((result: Weather) => {
        setWeather(result);
        setSelectedLocation(location);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  const handleRemoveLocation = (index: number) => {
    const updatedLocations = [...lastVisitedLocations];
    updatedLocations.splice(index, 1);
    setLastVisitedLocations(updatedLocations);
    localStorage.setItem(
      "lastVisitedLocations",
      JSON.stringify(updatedLocations)
    );
  };

  const saveLocationToLocalStorage = (locationData: LocationData) => {
    const storedLocations = getLocationsFromLocalStorage();
    const updatedLocations = [locationData, ...storedLocations.slice(0, 4)];
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

  useEffect(() => {
    const lastLocationsFromStorage = getLocationsFromLocalStorage();
    setLastVisitedLocations(lastLocationsFromStorage);
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  const isLocationStored = lastVisitedLocations.some(
    (location) =>
      location.name === weather.name &&
      location.country === weather.sys?.country
  );

  const weatherIconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

  return (
    <div>
      <div className="location-box">
        <div className="location">
          Location: {weather.name}, {weather.sys?.country}
          {!isLocationStored && <button onClick={handleAddLocation}>+</button>}
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
            <div className="weather-description">
              <img src={iconUrl} alt="Weather Icon" className="weather-icon" />
              <span className="small-text">
                {weather.weather[0].description}
              </span>
            </div>
            <div className="wind">
              <div>
                Wind speed: {Math.round(weather.wind.speed * 2.23694)} mph
              </div>
              <div>Wind Direction: {getWindDirection(weather.wind.deg)}</div>
            </div>
          </div>

          <div className="compass-container">
            <WindCompass windDirection={weather.wind.deg} />
          </div>
        </div>
      </div>
      <div className="stored-locations">
        <h2 className="stored-locations-heading">Stored Locations:</h2>
        <div className="location-buttons-container">
          {lastVisitedLocations.map((location, index) => (
            <div key={index} className="stored-location-box">
              <button
                onClick={() => handleRemoveLocation(index)}
                className="remove-location-button"
              >
                X
              </button>
              <button
                onClick={() => handleStoredLocationClick(location)}
                className="button-location"
              >
                {location.name}, {location.country}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
