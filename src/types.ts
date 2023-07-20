// types.ts
export interface Weather {
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
    deg: number;
  };
}

export const api = {
  key: "15706b4115981325eed7a8e8d00c9aec",
  base: "https://api.openweathermap.org/data/2.5/",
};
