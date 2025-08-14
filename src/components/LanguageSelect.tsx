import { langs } from "../utils/languages";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function LanguageSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
      aria-label="Language"
      title="Language"
    >
      {langs.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
