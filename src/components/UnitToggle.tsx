import type { Units } from "../types/weather";

type Props = { units: Units; onChange: (u: Units) => void };

export default function UnitToggle({ units, onChange }: Props) {
  return (
    <div className="inline-flex h-full rounded-md border overflow-hidden">
      <button
        onClick={() => onChange("metric")}
        className={`px-3  py-1 ${
          units === "metric" ? "bg-blue-600 text-white" : ""
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onChange("imperial")}
        className={`px-3 py-1 ${
          units === "imperial" ? "bg-blue-600 text-white" : ""
        }`}
      >
        °F
      </button>
    </div>
  );
}
