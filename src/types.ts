export interface Weather {
  main: {
    temp: number;
    feels_like: number;
  };
  name: string;
  sys: {
    country: string;
  };
  weather: WeatherDescription[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherDescription {
  main: string;
  description: string;
  icon: string;
}

export const api: { key: string; base: string } = {
  key: "15706b4115981325eed7a8e8d00c9aec",
  base: "https://api.openweathermap.org/data/2.5/",
};
