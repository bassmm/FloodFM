# OpenStreetMap Integration - Installation Instructions

## Required Packages

To use the interactive map feature, you need to install the following packages:

```powershell
npm install leaflet react-leaflet
npm install --save-dev @types/leaflet
```

## What's Included

The map integration includes:

- **Interactive map** centered on Pakistan showing all 18 monitored villages
- **Color-coded markers** based on alert levels:
  - 🟢 Green = Normal (< 1,000 m³/s)
  - 🟠 Orange = Warning (1,000-3,000 m³/s)
  - 🔴 Red = Critical (> 3,000 m³/s)
- **Hover tooltips** displaying village data (name, province, population, discharge, alert level)
- **Click functionality** to view detailed village information below the map
- **Pulsing animation** on critical alert markers
- **Responsive design** that works on mobile devices
- **Theme support** - tooltips adapt to light/dark mode

## Files Created

- `src/components/Map/FloodMap.tsx` - Main map component using react-leaflet
- `src/components/Map/FloodMap.css` - Custom styling for markers and tooltips
- `src/components/Tabs/MapTab.tsx` - Map tab with legend and selected village details

## Features

### Interactive Markers

- Hover over any marker to see quick village information
- Click a marker to view detailed statistics below the map
- Markers scale up on hover for better visibility

### Alert Level Legend

The map displays a color-coded legend showing counts for each alert level.

### Auto-fit Bounds

The map automatically adjusts to show all village markers when loaded.

### OpenStreetMap Tiles

Uses free OpenStreetMap tiles with proper attribution included.

## Usage

Once packages are installed, the Map tab will be available in the dashboard navigation. Simply click the "Map" tab to view the interactive map.

## Customization Options

### Change Tile Provider

Edit `FloodMap.tsx` to use different tile styles:

```typescript
// CartoDB Light (cleaner style)
url = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

// CartoDB Dark (for dark mode)
url = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

// Humanitarian Style (emphasizes infrastructure)
url = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
```

### Adjust Map Height

Modify the `height` in the `MapContainer` style prop in `FloodMap.tsx`.

### Customize Marker Size

Change `iconSize` in the `DivIcon` configuration in `FloodMap.tsx`.

## Browser Support

Works in all modern browsers that support Leaflet:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

The map is optimized for the 18 village markers. All tiles are cached by the browser for fast loading.
