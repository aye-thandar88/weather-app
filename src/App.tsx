import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherPage } from "./pages/weather";

const qc = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={qc}>
      <WeatherPage />
    </QueryClientProvider>
  );
}

export default App;
