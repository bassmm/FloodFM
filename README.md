# FloodFM

FloodFM is a React + TypeScript dashboard that monitors flood risk across villages in Pakistan using Open-Meteo's Flood API. It features an interactive choropleth map, severity-sorted village list, filters, and auto-refreshing data.

## Features

- React 19 + Vite for fast development
- Open-Meteo Flood API integration with graceful fallback
- Villages list sorted by severity (critical > warning > normal)
- Overview shows only warning/critical villages; Villages tab shows all
- Filters by province and alert level in Villages tab
- Interactive Leaflet map with Pakistan-only bounds and district coloring
- Themed UI via PicoCSS; animated theme toggle
- Small right-aligned refresh icon in tab bar

## Tech Stack

- React, TypeScript, Vite
- Leaflet + react-leaflet
- @picocss/pico
- Open-Meteo `openmeteo` package

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Install

```pwsh
pnpm install
```

### Run Dev Server

```pwsh
pnpm dev
```

The app will start on `http://localhost:5173` (or similar).

### Build

```pwsh
pnpm build
```

### Preview Production Build

```pwsh
pnpm preview
```

## Project Structure (key files)

- `src/App.tsx`: App shell, tabs, refresh icon
- `src/components/Tabs/OverviewTab.tsx`: Dashboard view (shows warning/critical + map)
- `src/components/Tabs/VillagesTab.tsx`: Villages view (filters + full list)
- `src/components/Map/FloodMap.tsx`: Leaflet-based choropleth + village markers
- `src/hooks/useFloodData.ts`: Open-Meteo Flood API data fetching
- `src/constants/*.ts`: Village data, thresholds, contacts
- `src/utils/*.ts`: Alert levels, formatting, calculations

## Map Notes

- Pakistan districts GeoJSON (ADM2) is used for coloring by alert severity
- Basemap opacity is reduced so choropleth colors are clearly visible
- Map is constrained to Pakistan bounds and starts at zoom level 7

## Customization

- Update villages in `src/constants/villages.ts`
- Adjust thresholds in `src/constants/thresholds.ts`
- Tweak styles in `src/styles/global.css` and `src/components/Map/FloodMap.css`

## Known Limitations

- Theme toggles library has peer warnings with React 19 (harmless with `pnpm`)
- If remote GeoJSON is unavailable, district coloring may not render

## Troubleshooting

- If districts aren’t colored: ensure ADM2 GeoJSON loads (network tab) and village district names match GeoJSON properties (`ADM2_EN`/`NAME_2`).
- If map shows the world: check `maxBounds` and `fitBounds` logic in `FloodMap.tsx`.

## License

Proprietary project; do not redistribute without permission.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
