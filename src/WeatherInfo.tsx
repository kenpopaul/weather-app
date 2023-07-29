import React, { useEffect, useState } from "react";
import { Weather } from "./types";
import WindCompass from "./WindCompass";

interface WeatherInfoProps {
  weather: Weather;
}

const getWindDirection = (deg: number): string => {
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
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

const dateBuilder = (d: Date): string => {
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

  const day: string = days[d.getDay()];
  const date: number = d.getDate();
  const month: string = months[d.getMonth()];
  const year: number = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  const [weatherIcon, setWeatherIcon] = useState<string | null>(null);

  useEffect(() => {
    const weatherIconCode = weather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
    setWeatherIcon(iconUrl);
    localStorage.setItem("lastSearchedLocation", weather.name);
  }, [weather]);

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

        {/* Weather Icons */}
        <div className="weather">
          <div className="wind-info">
            {/* Weather Icon and Description */}
            {weatherIcon && (
              <div className="weather-description">
                <img
                  src={weatherIcon}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <div>{weather.weather[0].description}</div>
              </div>
            )}
            {/* Wind Speed & Direction */}
            <div className="wind">
              <div>
                Wind speed: {Math.round(weather.wind.speed * 2.23694)} mph
              </div>
              <div>Wind Direction: {getWindDirection(weather.wind.deg)}</div>
            </div>
          </div>

          {/* WindCompass component */}
          <div className="compass-container">
            <WindCompass windDirection={weather.wind.deg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
