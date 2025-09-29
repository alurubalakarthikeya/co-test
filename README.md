# Stellar Stories - Space Weather Dashboard

A clean, minimalist single-page application that displays real-time space weather data including solar flare status, geomagnetic storm levels (Kp index), and aurora forecasts.

## Features

- **Solar Flare Status**: Real-time monitoring of solar flare activity with current and peak levels
- **Geomagnetic Storm Tracking**: Kp index display with 24-hour trend visualization
- **Aurora Forecast**: Visibility chance percentage and optimal viewing locations
- **Interactive Charts**: Custom fallback chart implementation with hover tooltips
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Live Data Integration**: Fetches from NOAA/NASA APIs with graceful fallback to cached data
- **Auto-refresh**: Updates every 5 minutes with pause/resume on page visibility

## Tech Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript ES6+**: Modular architecture with separate controllers for data, UI, and charts
- **Chart.js**: Optional integration for enhanced data visualization (falls back to custom implementation)

## Project Structure

```
├── index.html              # Main HTML structure
├── styles.css              # All CSS styling and responsive design
└── js/
    ├── app.js              # Main application controller
    ├── dataService.js      # Data fetching and processing
    ├── uiController.js     # UI updates and error handling
    └── chartController.js  # Chart rendering (Chart.js + fallback)
```

## Data Sources

- **NOAA Space Weather Prediction Center**: Real-time space weather data
- **NASA**: Supplementary space weather information
- **Fallback**: Cached mock data when live sources are unavailable

## Getting Started

1. Clone the repository
2. Serve the files using any HTTP server:
   ```bash
   python3 -m http.server 8080
   # or
   npx serve .
   ```
3. Open `http://localhost:8080` in your browser

## Features in Detail

### Solar Flare Monitoring
- Real-time classification (A, B, C, M, X classes)
- Current activity level and daily peak
- Visual status indicators with color coding

### Geomagnetic Activity
- Kp index from 0-9 scale
- Storm level classification (Quiet, Minor, Moderate, Strong, Severe, Extreme)
- 24-hour trend visualization

### Aurora Forecasting
- Visibility chance percentage
- Best viewing locations based on current conditions
- Peak activity time predictions

### Technical Features
- Modular ES6+ JavaScript architecture
- Responsive CSS Grid layout
- Graceful degradation for blocked CDN resources
- Error handling with user-friendly notifications
- Auto-refresh with visibility API integration
