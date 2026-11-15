# CUỘI Frameworks, Libraries, and Technology

This document was checked against `package.json`, `package-lock.json`, and the source code on 14 November 2026. The version columns below show versions locked in `package-lock.json`; allowed version ranges are declared in `package.json`.

## Runtime Libraries

| Library | Locked Version | Role in the Project |
| --- | --- | --- |
| React | 19.2.8 | Builds the website interface, menus, dialogue, challenges, and companion book using components and hooks. |
| React DOM | 19.2.8 | Mounts the React component tree in the HTML page through `createRoot` in `src/main.tsx`. |
| Phaser | 3.90.0 | Game engine for 2D scenes, character rendering, animation, movement, and interaction. Loaded dynamically in `src/game/GameCanvas.tsx`. |

## Languages and Development Tools

| Tool / Package | Locked Version | Role in the Project |
| --- | --- | --- |
| TypeScript | 5.9.3 | Provides typed code in `src/` and type checking before builds; `strict` is enabled. |
| Vite | 6.4.4 | Runs the development server, serves assets, and builds the website into `dist/`. Configured to split Phaser into its own chunk. |
| `@vitejs/plugin-react` | 4.7.0 | Integrates React with Vite, including JSX/TSX processing and Fast Refresh during development. |
| `@types/react` | 19.2.18 | TypeScript declarations for React. |
| `@types/react-dom` | 19.2.7 | TypeScript declarations for React DOM. |

Plain HTML and CSS provide page structure, styling, and responsive layouts. JavaScript is used for the API. Node.js runs Vite and TypeScript; npm manages packages and scripts in `package.json`. The current setup instructions require Node.js 22.12 or later; see the [README](../../README.md#setup-and-running).

## Browser APIs and Interface Assets

The following use browser capabilities directly rather than separate npm libraries:

| Component | Use |
| --- | --- |
| Web Audio API | Synthesizes background music and effects in `src/audio/`; a dedicated audio system manages playback and settings. |
| `localStorage` | Saves progress, language, and audio preferences in the browser. Progress logic is in `src/state/progress.ts`. |
| Fetch API | Sends HTTP requests, including requests to the visitor counter API. |
| SVG | Draws diagrams, illustrations, and some interface elements directly in components. |
| Lora and Be Vietnam Pro fonts | Bundled in `public/fonts/` and declared in `src/styles/fonts.css`; licenses and sources are kept in the font folders. |
| Static PDF files | The Vietnamese and English stories in `public/books/` open through links; these are story assets, not a PDF reader library. |

## Visitor Counter Services

| Component | Role |
| --- | --- |
| Vercel Function | Runs the `api/visitors.js` endpoint when deployed in a compatible environment. |
| Upstash Redis REST API | Stores a set of browser identifiers and returns the total visitor count. The API calls Redis using `fetch` and a Lua command to add an identifier and count set members. |

The counter requires two server-side environment variables: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. The current code calls REST directly and does not declare a Redis SDK in `package.json`. The interface and game build into static assets; the counter requires a separate server service.

## Checks and Builds

Specialized check scripts and browser fixtures were removed on 14 November 2026; Playwright and Google Chrome are no longer required project tools. TypeScript types are checked by `npm run typecheck` and during the build.

The main commands already available in `package.json` are:

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

Before deployment, test the game, book, and audio directly on the target browsers and devices; see the [listening checklist](../design/audio.md#checks).

## Repository Sources

- [package.json](../../package.json): direct dependencies and scripts.
- [package-lock.json](../../package-lock.json): locked package versions, including transitive dependencies.
- [vite.config.ts](../../vite.config.ts) and [tsconfig.json](../../tsconfig.json): build and TypeScript configuration.
- [src/main.tsx](../../src/main.tsx) and [src/game/GameCanvas.tsx](../../src/game/GameCanvas.tsx): React and Phaser initialization.
- [src/audio/game-audio.ts](../../src/audio/game-audio.ts): the Web Audio system.
- [api/visitors.js](../../api/visitors.js): the visitor counter API and Redis connection.

This document focuses on direct dependencies and technologies clearly used by the source code. All transitive packages installed through Vite, Phaser, or other tools are recorded in the lockfile.
