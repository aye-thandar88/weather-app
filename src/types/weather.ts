import type { ReactNode } from "react";

export type Units = "metric" | "imperial";

export interface Coord {
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  visibility: number;
  name: string;
  dt: number;
  coord: Coord;
  weather: { id: number; main: string; description: string; icon: string }[];
  main: {
    pressure: ReactNode;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: { speed: number };
  sys: {
      sunset: number;
      sunrise: number; country: string 
};
}

export interface ForecastItem {
  dt: number;
  main: { temp: number; humidity: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number };
  dt_txt: string;
}

export interface ForecastResponse {
  city: { name: string; country: string };
  list: ForecastItem[];
}
