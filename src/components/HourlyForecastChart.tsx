import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import type { ForecastResponse, Units } from "../types/weather";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

type Props = { data: ForecastResponse; units: Units };

export default function HourlyForecastChart({ data, units }: Props) {
  const items = data.list.slice(0, 8); // next ~24h (3h step)
  const labels = items.map((i) =>
    new Date(i.dt * 1000).toLocaleTimeString([], { hour: "2-digit" })
  );
  const temps = items.map((i) => i.main.temp);
  const unitLabel = units === "metric" ? "°C" : "°F";

  return (
    <div className="rounded-2xl p-4 shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">
        Next 24 Hours
      </h3>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: `Temperature (${unitLabel})`,
              data: temps,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.2)",
              tension: 0.35,
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { display: true } } }}
      />
    </div>
  );
}
