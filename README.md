# 🌤 Weather App

A responsive Weather App built with **React + TypeScript + Vite + Tailwind CSS**.  
It fetches real-time weather data from the **OpenWeatherMap API** and shows **current weather**, **forecasts**, and other details with a beautiful and dynamic UI.

## 🚀 Features
- 📍 **Current Location Detection** — Auto-selects your city when the app starts.
- 🔍 **Search by City** — Quickly search and view weather for any city worldwide.
- 🌡 **Current Weather** — Temperature, humidity, wind, pressure, sunrise/sunset.
- 📊 **5-Day Forecast** — Weather trends displayed with dynamic cards.
- 🌍 **Multi-language Support** — Change UI language.
- ⛅ **Animated Weather Icons** — Smooth, dynamic weather visuals.
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop.

## 🛠 Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS
- **API:** OpenWeatherMap API
- **State/Data:** React Query
- **Icons:** react-animated-weather (custom TypeScript types), lucide-react
- **Chart:** chart.js
- **Build/Deploy:** Vercel

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/weather-app.git
cd weather-app

# Install dependencies
npm install

🔑 API Key Setup

# This project uses OpenWeatherMap API.
# Create an account at https://openweathermap.org/api
# Get your API key.
# Create a .env file in the root directory and add:

VITE_OWM_API_KEY=your_api_key_here

▶ Running Locally

# Start the development server
npm run dev

The app will be available at http://localhost:3000

🌐 Deployment

- Deploy easily on Vercel:
- Push to GitHub
- Import repository in Vercel
- Add environment variable VITE_OWM_API_KEY

The production app will be available at (https://weather-app-gamma-puce-43.vercel.app/)
