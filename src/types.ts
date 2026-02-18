export interface WeatherDescription {
  main: string;
  description: string;
  icon: string;
}

export interface Weather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: WeatherDescription[];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
}

export interface SavedLocation {
  name: string;
  country: string;
}

export const api = {
  key: "15706b4115981325eed7a8e8d00c9aec",
  base: "https://api.openweathermap.org/data/2.5/",
} as const;
