# Cringecraft studios - Best use of Falcon @ Stupid ideas hackathon

A **single-page React application** that simulates a multi-window desktop environment. Users work inside draggable, focus-managed windows, each hosting a self-contained creative tool. The project demonstrates **complex client-side UI state**, **browser media APIs**, and **client-side export** without a backend.

## Technical highlights

- **React 19** with hooks, composition, and a centralized window manager (position, z-order, minimize, taskbar integration).
- **Canvas and DOM capture** via **html2canvas** (dynamic import) for high-quality **PNG** exports from composed layouts.
- **Web Audio API** for procedural audio synthesis (fallback path when external media is unavailable).
- **YouTube IFrame API** loaded on demand: player lifecycle, origin-aware embed configuration, and **preloading** so playback aligns with browser user-activation policies.
- **MediaRecorder** and **CanvasRenderingContext2D** animation loops to encode short **WebM** clips from rendered frames.
- **CSS-driven 3D transforms**, animation, and layered visuals; **Fullscreen API** for presentation mode.
- **Create React App** toolchain: development server, production build, and Jest/React Testing Library setup.

## Application modules

| Module | Technical focus |
|--------|------------------|
| **Thumbnail composer** | Composable preview with client-side raster export. |
| **Intro sequence generator** | Parameterized scene (themes, particles, layout); background audio via embedded streaming player or synthesized audio. |
| **Typography & graphic studio** | Text processing pipeline, styled preview surface, optional **WebM** export via `captureStream` + `MediaRecorder`. |
| **Multi-card layout tool** | Reusable card grid, image upload handling, PNG export of the composed view. |

## Stack

| Area | Technology |
|------|------------|
| UI | React 19, JSX, CSS modules / global stylesheets |
| Build | react-scripts 5 (Webpack), npm |
| Capture / export | html2canvas, MediaRecorder, Canvas 2D |
| Audio / video | Web Audio API, YouTube IFrame API |
| Testing | React Testing Library, Jest (via CRA) |

## Prerequisites

- Node.js (LTS recommended) and npm  
- A modern evergreen browser with Web Audio, Canvas, and (for streaming audio in the intro module) support for embedded third-party video players

## Getting started

```bash
npm install
npm start
```

Application runs at `http://localhost:3000` with hot reload.

## Production build

```bash
npm run build
```

Static output is emitted to `build/` for deployment to any static host.

## Tests

```bash
npm test
```

## Repository structure (summary)

- `src/App.js` — Shell, window manager, and feature modules  
- `src/App.css` — Primary layout and desktop chrome  
- `src/introBackgroundMusic.js` — Web Audio synthesis  
- `src/introAlanWalkerYoutube.js` — YouTube player integration and preload logic  
- `public/` — Static assets referenced by the application  

## Notes for local development

- Streaming audio depends on third-party embed availability; ad blockers or network policy may affect playback during development.  
- WebM encoding support varies by browser; the implementation selects a supported `MediaRecorder` MIME type when possible.
