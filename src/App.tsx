// App.tsx
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import { Weather, api } from "./types"; // Import Weather and api from types.ts

function App(): JSX.Element {
  const [weather, setWeather] = useState<Weather | {}>({});

  const searchWeather = (query: string) => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result: Weather) => {
        setWeather(result);
        console.log(result);
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
