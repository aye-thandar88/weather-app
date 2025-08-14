import ReactAnimatedWeather from "react-animated-weather";
import type { CurrentWeather, Units } from "../types/weather";
import { getWeatherIcon } from "../utils/weatherIcons";

type Props = {
  data: CurrentWeather;
  units: Units;
};

export default function CurrentWeatherCard({ data, units }: Props) {
  const tempUnit = units === "metric" ? "°C" : "°F";

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-2xl p-6 shadow-lg bg-white hover:shadow-xl transition">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center text-center sm:text-left">
        <div>
          <h2 className="text-2xl font-bold text-blue-700">
            {data.name}, {data.sys.country}
          </h2>
          <h5 className="font-bold text-lg text-gray-600 mt-2">Today</h5>
          <div className="text-4xl sm:text-5xl font-extrabold text-gray-800 mt-2">
            {Math.round(data.main.temp)}
            {tempUnit}
          </div>
          <div className="capitalize text-lg text-gray-600 mt-2">
            {data.weather[0].description}
          </div>
        </div>

        <div className="flex justify-center">
          <ReactAnimatedWeather
            icon={getWeatherIcon(data.weather[0].icon)}
            color="#8298afff"
            size={120}
            animate={true}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          🌡 <span>Feels Like:</span>
          <span className="font-medium">
            {Math.round(data.main.feels_like)}
            {tempUnit}
          </span>
        </div>
        <div className="flex items-center gap-2">
          💧 <span>Humidity:</span>
          <span className="font-medium">{data.main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          💨 <span>Wind:</span>
          <span className="font-medium">
            {Math.round(data.wind.speed)} {units === "metric" ? "m/s" : "mph"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          👁 <span>Visibility:</span>
          <span className="font-medium">
            {(data.visibility / 1000).toFixed(1)} km
          </span>
        </div>
        <div className="flex items-center gap-2">
          ⬇ <span>Pressure:</span>
          <span className="font-medium">{data.main.pressure} hPa</span>
        </div>
        <div className="flex items-center gap-2">
          🌅 <span>Sunrise:</span>
          <span className="font-medium">{sunrise}</span>
        </div>
        <div className="flex items-center gap-2">
          🌇 <span>Sunset:</span>
          <span className="font-medium">{sunset}</span>
        </div>
      </div>
    </div>
  );
}
