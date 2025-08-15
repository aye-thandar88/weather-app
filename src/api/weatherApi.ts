import axios, { AxiosError } from "axios";
import type { CurrentWeather, ForecastResponse, Units } from "../types/weather";

const API = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});
const key = import.meta.env.VITE_OWM_API_KEY as string;

export async function fetchCurrentByCity(
  city: string,
  units: Units,
  lang?: string
) {
  try {
    const { data } = await API.get<CurrentWeather>("/weather", {
      params: { q: city, appid: key, units, lang },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseData = error.response?.data;
      throw new Error(
        responseData?.message || "Failed to fetch current weather."
      );
    }
  }
}

export async function fetchCurrentByCoords(
  lat: number,
  lon: number,
  units: Units,
  lang?: string
) {
  try {
    const { data } = await API.get<CurrentWeather>("/weather", {
      params: { lat, lon, appid: key, units, lang },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseData = error.response?.data;
      throw new Error(
        responseData?.message || "Failed to fetch current weather."
      );
    }
  }
}

export async function fetchForecastByCity(
  city: string,
  units: Units,
  lang?: string
) {
  try {
    const { data } = await API.get<ForecastResponse>("/forecast", {
      params: { q: city, appid: key, units, lang },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseData = error.response?.data;
      throw new Error(responseData?.message || "Failed to fetch forecast.");
    }
  }
}

export async function fetchAirQuality(lat: number, lon: number) {
  try {
    const { data } = await API.get("/air_pollution", {
      params: { lat, lon, appid: key },
    });
    return data as {
      list: {
        main: { aqi: 1 | 2 | 3 | 4 | 5 };
        components: Record<string, number>;
      }[];
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const responseData = error.response?.data;
      throw new Error(responseData?.message || "Failed to fetch Air Quality.");
    }
  }
}
