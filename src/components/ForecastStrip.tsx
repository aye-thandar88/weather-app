import type { ForecastResponse, Units } from "../types/weather";

function iconUrl(code: string) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

type Props = {
  data: ForecastResponse;
  units: Units;
};

export default function ForecastStrip({ data, units }: Props) {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const daily = data.list.filter((_, i) => i % 8 === 7);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {daily.map((item) => {
        const dateObj = new Date(item.dt * 1000);
        const dayName = dateObj.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const dateStr = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return (
          <div
            key={item.dt}
            className="rounded-2xl p-4 bg-white shadow hover:shadow-lg transition text-center border border-blue-100"
          >
            {/* Day Name */}
            <div className="text-lg font-semibold text-blue-600">{dayName}</div>
            {/* Date */}
            <div className="text-xs text-gray-500 mb-2">{dateStr}</div>

            {/* Weather Icon */}
            <img
              src={iconUrl(item.weather[0].icon)}
              alt={item.weather[0].description}
              className="mx-auto w-16 h-16"
            />

            {/* Temp */}
            <div className="mt-2 text-xl font-bold text-gray-800">
              {Math.round(item.main.temp)}
              {tempUnit}
            </div>

            {/* Description */}
            <div className="text-xs capitalize text-gray-500 mt-1">
              {item.weather[0].description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
