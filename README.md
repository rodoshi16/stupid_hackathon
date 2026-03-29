# CringeCraft OS

A single-page **fake desktop** themed like a dusty **2016 Minecraft YouTuber** machine: draggable windows, a taskbar, fake ads, and four parody “apps” that generate clickbait-style visuals and text. Built with **React** (Create React App). Nothing here is a real game client or social product—it is **satire**.

## Features

| App | What it does |
|-----|----------------|
| **Thumbnail Forge** | Compose a parody thumbnail (title, face slot, accents) and export a still via **html2canvas**. |
| **Intro Blaster** | 3D-style intro scene with themes, particles, and fullscreen. **Generate** randomizes the scene and starts background audio: **Alan Walker tracks** via the **YouTube IFrame API** (embedded player, random pick from a small list). If YouTube fails, it falls back to an **in-browser Web Audio** synth bed. **Replay** plays a short synthetic stinger. |
| **Ragebaiter** | “Rage translator” text transforms plus a chaotic **catfish meme** layout, rage meter styling, and optional **WEBM** export of the meme clip. |
| **Catfish Generator** | Parody “hot singles” / virus-banner vibes with profile cards and PNG export. |

Sound effects and UI chrome lean into the joke (airhorn, boot screen, notifications).

## Requirements

- **Node.js** (LTS recommended) and **npm**
- A modern browser with **Web Audio**, **Canvas**, and (for Intro Blaster music) **YouTube embeds** allowed (not blocked by extensions or strict network rules)

## Setup

```bash
npm install
```

## Development

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000) with hot reload.

## Production build

```bash
npm run build
```

Outputs an optimized bundle under `build/`, suitable for static hosting.

## Tests

```bash
npm test
```

## Project layout (high level)

- `src/App.js` — Main shell: fake OS, windows, and app UIs
- `src/App.css`, `src/catfish-meme.css` — Layout and meme styling
- `src/introBackgroundMusic.js` — Web Audio fallback pad for Intro Blaster
- `src/introAlanWalkerYoutube.js` — YouTube IFrame API helper for intro music
- `public/` — Static assets (e.g. sounds referenced by the app)

## Notes on Intro Blaster audio

- Music uses **embedded YouTube** playback, not bundled MP3s.
- The player is **preloaded** when Intro Blaster is open with audio enabled so **Generate** can start playback reliably after a click.
- If nothing plays, check the browser **console**, disable **ad blockers** for local dev, and confirm **taskbar sound** / **Audio** toggles in the app are on.

## License / intent

This repository is a **parody / art project**. Thumbnail and “creator” tropes are exaggerated for humor. Do not use generated output to harass, deceive, or impersonate real people.

---

*“Recovered from a dusty 2016 USB stick.”*
