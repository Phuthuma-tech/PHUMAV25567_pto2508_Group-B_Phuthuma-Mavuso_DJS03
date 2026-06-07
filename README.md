# PodCast — Podcast Discovery App

> A responsive React landing page that lets users browse, filter, and explore podcast shows fetched live from an external API.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Component Reference](#component-reference)
- [Utility Reference](#utility-reference)
- [API Reference](#api-reference)
- [Responsive Breakpoints](#responsive-breakpoints)
- [User Stories Implemented](#user-stories-implemented)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**PodCast** is a single-page React application built for **DJS03**. It fetches a live list of podcast previews from a REST API on initial load and renders them in a responsive card grid. Users can filter by genre, sort by title or date, and click any card to open a detailed modal with season and episode information.

---

## Live Demo

```
npm install && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

| Feature | Detail |
|---|---|
| **Live data** | Fetches all podcast previews from `https://podcast-api.netlify.app/` on mount |
| **Loading state** | Animated spinner shown while the API request is in flight |
| **Error state** | Descriptive error panel shown if the API request fails |
| **Empty state** | Informative message shown when a filter returns no results |
| **Responsive grid** | CSS Grid with `auto-fill` columns — 1 column on mobile, 4+ on desktop |
| **Genre filter** | Dropdown filters the grid to a single genre in real time |
| **Sort controls** | Sort A–Z, Z–A, Newest first, or Oldest first |
| **Detail modal** | Clicking a card fetches the full show and displays all seasons/episodes |
| **Accessible** | ARIA roles, labels, keyboard navigation (Enter, Space, Escape) |
| **JSDoc** | Every function, component, and module is fully documented |

---

## Project Structure

```
podcast-app/
├── index.html                   # HTML shell — React mounts into #root
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # Entry point — ReactDOM.createRoot
    ├── App.jsx                  # Root component — state, fetching, orchestration
    ├── data/
    │   └── genres.js            # Static genre data (id, title, description, shows)
    ├── utils/
    │   ├── api.js               # API service — fetchPodcasts, fetchShowById
    │   ├── dateUtils.js         # formatRelativeDate, formatShortDate
    │   └── genreUtils.js        # getGenreNames — resolves IDs → titles
    ├── components/
    │   ├── Header.jsx           # Sticky header with branding + filter controls
    │   ├── PodcastGrid.jsx      # Renders the responsive grid of cards
    │   ├── PodcastPreviewCard.jsx  # Individual podcast card tile
    │   ├── PodcastModal.jsx     # Full-screen detail modal
    │   ├── LoadingSpinner.jsx   # Animated loading indicator
    │   └── ErrorMessage.jsx     # Error / empty state panel
    └── styles/
        └── styles.css           # Global stylesheet (tokens → layout → components → responsive)
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/podcast-app.git
cd podcast-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
# Output is placed in the /dist folder

npm run preview
# Serves the production build locally for verification
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build optimised production bundle into `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all `.js` and `.jsx` files in `/src` |

---

## Architecture & Design Decisions

### Single Responsibility
Each file has one clear job. `api.js` handles network requests, `dateUtils.js` handles formatting, and each component renders one distinct piece of UI.

### Props-Only Data Flow
All data flows from `App.jsx` downward via props. No component fetches its own data independently (except the modal detail fetch triggered by a user action in `App`). This makes every child component pure, testable, and reusable.

### Derived State Instead of Redundant State
The `displayedPodcasts` array is computed inline from `podcasts`, `filterGenre`, and `sortBy` on every render rather than being stored in a third state variable. This prevents state synchronisation bugs.

### Centralised API Layer
All `fetch` calls live in `src/utils/api.js`. If the API base URL or authentication changes, only one file needs updating.

### CSS Custom Properties (Design Tokens)
All colours, radii, and transitions are declared as CSS variables in `:root`. The existing `.tag`, `.modal`, `.banner`, and all other class names from the original `styles.css` are preserved and extended — no renames, no breaking changes.

---

## Component Reference

### `<App />`
Root component. Manages all application state and passes data to children via props.

| State | Type | Description |
|---|---|---|
| `podcasts` | `Object[]` | Full list from the API |
| `loading` | `boolean` | True while initial fetch is in flight |
| `error` | `string\|null` | Error message, or null |
| `selectedShow` | `Object\|null` | Full show detail for the open modal |
| `modalLoading` | `boolean` | True while a show detail fetch is in flight |
| `filterGenre` | `string` | Active genre ID, or `"all"` |
| `sortBy` | `string` | Active sort key |

---

### `<Header />`

| Prop | Type | Description |
|---|---|---|
| `filterGenre` | `string` | Current genre filter value |
| `onFilterGenreChange` | `Function` | Called with the new genre value on change |
| `sortBy` | `string` | Current sort value |
| `onSortByChange` | `Function` | Called with the new sort value on change |

---

### `<PodcastGrid />`

| Prop | Type | Description |
|---|---|---|
| `podcasts` | `Object[]` | Array of podcast preview objects to render |
| `onSelect` | `Function` | Called with the clicked podcast preview object |

---

### `<PodcastPreviewCard />`

| Prop | Type | Description |
|---|---|---|
| `podcast` | `Object` | A single podcast preview from the API |
| `onClick` | `Function` | Called with the podcast object on activation |

Renders: cover image · title · season count badge · relative date · up to 3 genre tags.

---

### `<PodcastModal />`

| Prop | Type | Description |
|---|---|---|
| `show` | `Object` | Full show detail object (includes `seasons` array) |
| `onClose` | `Function` | Called when the modal should close |

Closes on: `✕` button click · backdrop click · `Escape` key press.

---

### `<LoadingSpinner />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | `"Loading podcasts…"` | Text shown below the spinner |

---

### `<ErrorMessage />`

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Bold heading (e.g. `"Something went wrong"`) |
| `message` | `string` | Supporting detail text |

---

## Utility Reference

### `api.js`

| Function | Returns | Description |
|---|---|---|
| `fetchPodcasts()` | `Promise<Object[]>` | Fetches all podcast previews |
| `fetchShowById(id)` | `Promise<Object>` | Fetches a single show's full detail |

Both functions throw a descriptive `Error` on non-OK HTTP responses.

---

### `dateUtils.js`

| Function | Parameters | Returns | Example |
|---|---|---|---|
| `formatRelativeDate(isoString)` | ISO 8601 string | `string` | `"3 days ago"` |
| `formatShortDate(isoString)` | ISO 8601 string | `string` | `"15 Mar 2024"` |

---

### `genreUtils.js`

| Function | Parameters | Returns | Example |
|---|---|---|---|
| `getGenreNames(ids)` | `number[]` | `string[]` | `[1,3]` → `["Personal Growth","History"]` |

---

## API Reference

Base URL: `https://podcast-api.netlify.app`

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Returns array of podcast preview objects |
| `/id/:id` | GET | Returns a single show with full season and episode data |

### Podcast Preview Object

```json
{
  "id": "10716",
  "title": "Something Was Wrong",
  "description": "...",
  "seasons": 14,
  "image": "https://...",
  "genres": [2, 8],
  "updated": "2024-01-15T10:00:00.000Z"
}
```

### Show Detail Object

```json
{
  "id": "10716",
  "title": "Something Was Wrong",
  "seasons": [
    {
      "season": 1,
      "title": "Season 1",
      "image": "https://...",
      "episodes": [ { "title": "Episode 1", "description": "..." } ]
    }
  ]
}
```

---

## Responsive Breakpoints

| Breakpoint | Columns | Layout changes |
|---|---|---|
| ≥ 1200px (Desktop) | 4+ | Full header row, large hero text |
| ~768px (Tablet) | 2–3 | Header stacks vertically, filters wrap |
| ≤ 480px (Mobile) | 1 | Modal image goes full-width, font sizes reduce |

The grid uses `repeat(auto-fill, minmax(250px, 1fr))` — no hardcoded breakpoints needed for the column count itself.

---

## User Stories Implemented

| # | Story | Implementation |
|---|---|---|
| 1 | Fetch data on load | `useEffect` in `App.jsx` calls `fetchPodcasts()` once on mount |
| 2 | Loading state | `<LoadingSpinner />` rendered while `loading === true` |
| 3 | Error / empty state | `<ErrorMessage />` rendered on API failure or zero results |
| 4 | `useEffect` + `useState` | Used in `App.jsx`; `useCallback` for stable handlers |
| 5 | Grid of previews | `<PodcastGrid />` renders `auto-fill` CSS Grid |
| 6 | Reusable components | Seven focused components, each in its own file |
| 7 | Podcast image | `<img>` with `loading="lazy"` in `PodcastPreviewCard` |
| 8 | Podcast title | `<h2 className="card-title">` in `PodcastPreviewCard` |
| 9 | Season count | Seasons badge in `PodcastPreviewCard` |
| 10 | Genre names | `getGenreNames()` resolves IDs; rendered as tag chips |
| 11 | Human-readable date | `formatRelativeDate()` in `dateUtils.js` |
| 12 | Props for data | All components receive data exclusively through props |
| 13 | Clean layout | Design token–driven CSS, consistent spacing and typography |
| 14 | Responsive grid | CSS Grid `auto-fill` + media queries for tablet/mobile |
| 15 | Consistent style | CSS custom properties (`--accent`, `--radius`, etc.) throughout |
| 16 | JSDoc comments | Every function, component, and module is fully documented |
| 17 | Consistent formatting | Consistent indentation, naming conventions, and structure across all files |

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI library |
| Vite | 5 | Build tool and dev server |
| CSS (Custom Properties + Grid) | — | Styling and layout |
| Fetch API (native) | — | HTTP requests |
| JSDoc | — | Inline documentation |

No external UI libraries, no CSS frameworks, no date libraries — intentionally minimal dependencies.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow the existing JSDoc and formatting conventions throughout.

---

## License

This project is submitted as part of the **DJS03** assignment and is intended for educational purposes.
