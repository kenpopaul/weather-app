import React from "react";
import { Weather } from "./types";

import sunnyIcon from "./assets/sunny-icon.png";
import rainyIcon from "./assets/rainy-icon.png";
import cloudyIcon from "./assets/cloudy-icon.png";
import fogIcon from "./assets/fog-icon.png";
import hailIcon from "./assets/hail-icon.png";
import snowIcon from "./assets/snow-icon.png";

interface WeatherInfoProps {
  weather: Weather;
}

// Utility function to get wind direction
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

// Utility function to get formatted date
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

const weatherIcons: Record<string, string> = {
  Clear: sunnyIcon,
  Rain: rainyIcon,
  Clouds: cloudyIcon,
  Fog: fogIcon,
  Hail: hailIcon,
  Snow: snowIcon,
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  return (
    <div>
      <div className="location-box">
        <div className="location">
          Location: {weather.name}, {weather.sys.country}
        </div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}°c</div>
        {/* Weather Icons */}
        <div className="weather">
          <div className="weather-icon-pic">
            <img
              src={weatherIcons[weather.weather[0].main]}
              alt="Weather Icon"
              className="weather-icon"
            />
          </div>
          {/* Wind Speed & Direction */}
          {weather.weather[0].main}
          <div className="wind">
            <div>
              Wind speed: {Math.round(weather.wind.speed * 2.23694)} mph
            </div>
            Wind Direction: {getWindDirection(weather.wind.deg)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
