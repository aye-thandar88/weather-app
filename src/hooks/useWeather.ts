import { useQuery } from "@tanstack/react-query";
import type { Units } from "../types/weather";
import {
  fetchCurrentByCity,
  fetchCurrentByCoords,
  fetchForecastByCity,
} from "../api/weatherApi";

export function useCurrentWeather(
  city: string | null,
  coords: { lat: number; lon: number } | null,
  units: Units,
  lang = "en"
) {
  return useQuery({
    queryKey: ["current", city, coords?.lat, coords?.lon, units, lang],
    queryFn: () =>
      city
        ? fetchCurrentByCity(city, units, lang)
        : fetchCurrentByCoords(coords!.lat, coords!.lon, units, lang),
    enabled: !!(city || coords),
    staleTime: 1000 * 60, // 1 min
  });
}

export function useForecast(city: string | null, units: Units, lang = "en") {
  return useQuery({
    queryKey: ["forecast", city, units, lang],
    queryFn: () => fetchForecastByCity(city!, units, lang),
    enabled: !!city,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}
