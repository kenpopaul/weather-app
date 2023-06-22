import React, { useState, KeyboardEvent } from "react";

interface Weather {
  main: {
    temp: number;
  };
  name: string;
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const api = {
  key: "15706b4115981325eed7a8e8d00c9aec",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App(): JSX.Element {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<Weather | {}>({});

  const search = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result: Weather) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
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

  return (
    <div
      className={
        typeof (weather as Weather).main != "undefined"
          ? (weather as Weather).main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof (weather as Weather).main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {(weather as Weather).name}, {(weather as Weather).sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round((weather as Weather).main.temp)}°c
              </div>
              <div className="weather">
                {(weather as Weather).weather[0].main}
                <div className="wind">
                  Wind speed: {Math.round((weather as Weather).wind.speed)} mph
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
