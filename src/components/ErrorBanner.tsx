type Props = { message?: string };

export default function ErrorBanner({ message }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-3 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
      {message || "Something went wrong. Please try again."}
    </div>
  );
}
