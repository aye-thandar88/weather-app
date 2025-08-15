import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCurrentWeather, useForecast } from "../hooks/useWeather";
import SearchBar from "../components/SearchBar";
import UnitToggle from "../components/UnitToggle";
import Spinner from "../components/Spinner";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import ForecastStrip from "../components/ForecastStrip";
import type { Units } from "../types/weather";
import ErrorBanner from "../components/ErrorBanner";
import HourlyForecastChart from "../components/HourlyForecastChart";
import LanguageSelect from "../components/LanguageSelect";
import { Menu, X } from "lucide-react";
import AQICard from "../components/AQICard";
import { fetchAirQuality } from "../api/weatherApi";

export function WeatherPage() {
  const { coords, error: geoError } = useGeolocation();
  const [city, setCity] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>("metric");
  const [lang, setLang] = useState<string>("en");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!coords && !city && geoError) setCity("Yangon");
  }, [coords, city, geoError]);

  const currentQ = useCurrentWeather(city, coords, units, lang);
  const forecastQ = useForecast(
    city ?? currentQ.data?.name ?? (undefined as any),
    units,
    lang
  );
  const [aqi, setAqi] = useState<{
    aqi: number;
    components?: Record<string, number>;
  } | null>(null);

  useEffect(() => {
    const c = currentQ.data;
    if (!c) return;
    (async () => {
      try {
        const aqiData = await fetchAirQuality(c.coord.lat, c.coord.lon);
        const item = aqiData?.list?.[0];
        if (item?.main?.aqi)
          setAqi({ aqi: item.main.aqi, components: item.components });
      } catch {}
    })();
  }, [currentQ.data]);

  const handleSearch = (q: string) => {
    if (q) {
      setCity(q);
    } else {
      setCity(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex justify-between items-center w-full md:w-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 tracking-tight">
              🌤 Weather App
            </h1>
            {/* Mobile toggle button */}
            <button
              className="md:hidden text-blue-600"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop: always show, Mobile: toggle */}
          <div
            className={`flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center md:flex ${
              open ? "flex" : "hidden"
            }`}
          >
            <SearchBar onSearch={handleSearch} />
            <div className="flex gap-2 md:gap-4 items-center">
              <UnitToggle units={units} onChange={setUnits} />
              <span>|</span>
              <LanguageSelect value={lang} onChange={setLang} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full mx-auto px-6 py-6 space-y-3">
        {geoError && <ErrorBanner message={`Location error: ${geoError}`} />}

        {/* Current Weather section */}
        {currentQ.isLoading && <Spinner />}
        {currentQ.isError && (
          <ErrorBanner
            message={`Failed to fetch current weather: ${currentQ.error.message}`}
          />
        )}
        {currentQ.data && (
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-8">
            <CurrentWeatherCard data={currentQ.data} units={units} />

            {aqi && <AQICard aqi={aqi.aqi} components={aqi.components} />}
          </div>
        )}

        {/* Forecast Weather section */}
        {forecastQ.isFetching && <Spinner />}
        {forecastQ.isError && (
          <ErrorBanner
            message={`Failed to fetch forecast weather: ${forecastQ.error.message}`}
          />
        )}
        {forecastQ.data && (
          <section className="max-w-6xl mx-auto px-4 py-3">
            <HourlyForecastChart data={forecastQ.data} units={units} />
            <h2 className="text-xl font-semibold mt-8 mb-2">Next 5 Days</h2>
            <ForecastStrip data={forecastQ.data} units={units} />
          </section>
        )}
      </main>

      <footer className="mt-auto text-center text-sm text-gray-500 p-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        Built with <span className="font-semibold">React</span> + TypeScript +
        Vite + Tailwind + React Query • Powered by{" "}
        <span className="font-semibold">OpenWeatherMap API</span>
      </footer>
    </div>
  );
}
