import { Wind, Droplets, Cloud, AlertTriangle } from "lucide-react";

interface Props {
  aqi: number;
  components?: Record<string, number>;
}

function aqiColor(aqi: number) {
  if (aqi <= 50) return "from-green-400 to-green-600";
  if (aqi <= 100) return "from-yellow-300 to-yellow-500";
  if (aqi <= 150) return "from-orange-400 to-orange-600";
  if (aqi <= 200) return "from-red-400 to-red-600";
  if (aqi <= 300) return "from-purple-400 to-purple-600";
  return "from-gray-500 to-gray-700";
}

function aqiLabel(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export default function AQICard({ aqi, components }: Props) {
  return (
    <div className="rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center gap-2">
        <Wind className="text-blue-500 w-5 h-5" /> Air Quality
      </h3>

      {/* AQI Badge */}
      <div
        className={`inline-flex items-center gap-2 text-white px-4 py-2 rounded-full bg-gradient-to-r ${aqiColor(
          aqi
        )} shadow`}
      >
        <span className="font-bold text-lg">AQI {aqi}</span>
        <span className="text-sm">{aqiLabel(aqi)}</span>
      </div>

      {/* Pollutants */}
      {components && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 text-sm">
          {Object.entries(components)
            .slice(0, 6)
            .map(([key, value]) => (
              <div
                key={key}
                className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 bg-gray-50 dark:bg-gray-900 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <span className="flex items-center gap-1 font-medium text-gray-800 dark:text-gray-200">
                  {getPollutantIcon(key)}
                  {key.toUpperCase()}
                </span>
                <span className="text-gray-600 dark:text-gray-300 font-semibold">
                  {value.toFixed(1)}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function getPollutantIcon(key: string) {
  switch (key.toLowerCase()) {
    case "pm2_5":
    case "pm10":
      return <Cloud className="w-4 h-4 text-gray-500" />;
    case "no2":
    case "so2":
    case "o3":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case "co":
      return <Droplets className="w-4 h-4 text-blue-500" />;
    default:
      return <Wind className="w-4 h-4 text-gray-500" />;
  }
}
