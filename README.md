# Stellar Stories — Space Weather Dashboard

A clean, minimalist dashboard that displays real-time space weather data including solar flare status, geomagnetic storm levels, and aurora visibility chances. Built with vanilla HTML, CSS, and JavaScript using a beautiful glassmorphic design.

![Desktop View](https://github.com/user-attachments/assets/33d2cf71-dc9d-4099-8329-dc31bda635f3)

## 🚀 Features

- **Real-time Space Weather Data**: Fetches live data from NOAA SWPC APIs
- **Glassmorphic Design**: Beautiful translucent cards with backdrop blur effects
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Accessibility Ready**: Full keyboard navigation and screen reader support
- **Offline Support**: Intelligent caching with graceful fallback to mock data
- **Interactive Modals**: Click any card to view detailed information
- **Auto-refresh**: Configurable automatic data updates every 5 minutes

## 📱 Mobile Support

![Mobile View](https://github.com/user-attachments/assets/1acc8b08-6183-43bd-b2da-7d912e0eb2f9)

The dashboard is fully responsive and provides an excellent mobile experience with:
- Single-column card layout on mobile devices
- Touch-friendly interactive elements
- Optimized typography and spacing

## 🎯 Space Weather Indicators

### Solar Flares
- **A/B/C Class**: Calm (Green)
- **M Class**: Watch (Orange) 
- **X Class**: Storm (Red)

### Geomagnetic Activity (Kp Index)
- **Kp 0-2**: Calm (Green)
- **Kp 3-4**: Minor (Yellow)
- **Kp 5-6**: Strong (Orange)
- **Kp 7-9**: Severe (Red)

### Aurora Visibility
- **Low**: Visible only in polar regions
- **Moderate**: Visible in high latitude regions
- **High**: Visible in mid-latitude regions

## 🛠 How to Run

### Option 1: Direct File Access
Simply open `index.html` in a modern web browser.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Then visit http://localhost:8000
```

### Option 3: GitHub Pages
This project is configured for GitHub Pages deployment. Simply enable Pages in your repository settings.

## 📡 API Endpoints Used

The dashboard integrates with NOAA Space Weather Prediction Center APIs:

- **Solar Flares**: `https://services.swpc.noaa.gov/json/goes/primary/xray-flares-1-day.json`
- **Kp Index**: `https://services.swpc.noaa.gov/json/planetary-k-index-1m.json`
- **Solar Wind**: `https://services.swpc.noaa.gov/json/ace/swepam.json`

### Fallback Strategy
When live APIs are unavailable, the app gracefully falls back to:
1. Cached data (up to 5 minutes old)
2. Stale cached data (if available)
3. Mock data (`assets/mock.json`)

## ♿ Accessibility Features

- **Keyboard Navigation**: Full tab navigation support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast Support**: Adapts to user's contrast preferences
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Focus Management**: Clear focus indicators and modal focus trapping

## 🎨 Design System

### Color Palette
- **Primary Sky Blue**: `#15A3F7`
- **Light Gradient**: `#E6F7FF` → `#DFF6FF`
- **Glass Background**: `rgba(255,255,255,0.12)`
- **Glass Border**: `rgba(255,255,255,0.18)`
- **Text Dark**: `#0B2540`

### Severity Colors
- **Calm/Success**: `#2ECC71`
- **Minor/Warning**: `#F1C40F`
- **Strong/Orange**: `#F39C12`
- **Severe/Danger**: `#E74C3C`

## 🏗 Architecture

### File Structure
```
/
├── index.html          # Main HTML structure
├── styles.css          # Glassmorphic styles and responsive design
├── js/
│   ├── app.js          # Application bootstrap and state management
│   ├── api.js          # Data fetching with caching
│   ├── ui.js           # UI rendering and interactions
│   └── utils.js        # Utility functions and data processing
├── assets/
│   └── mock.json       # Fallback data
└── README.md           # This file
```

### Technology Stack
- **HTML5**: Semantic markup with ARIA labels
- **CSS3**: Modern features including backdrop-filter, grid, and flexbox
- **JavaScript ES6+**: Modules, async/await, and modern APIs
- **Chart.js**: Lightweight sparkline charts (optional)

## 🔧 Configuration

### Auto-refresh Settings
The dashboard automatically refreshes data every 5 minutes. This can be customized by:
- Using the toggle in the footer to disable auto-refresh
- Modifying `AUTO_REFRESH_INTERVAL` in `app.js`

### Cache Settings
Default cache duration is 5 minutes. Customize by modifying `DEFAULT_CACHE_TIME` in `api.js`.

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Required Features
- ES6 Modules
- CSS Grid and Flexbox
- Backdrop Filter
- Fetch API
- LocalStorage

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Data Sources

Space weather data is provided by:
- [NOAA Space Weather Prediction Center](https://www.swpc.noaa.gov/)
- Real-time APIs and historical data archives

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Built with ❤️ for space weather enthusiasts and developers interested in real-time data visualization.
