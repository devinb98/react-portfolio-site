# Personal Project Showcase App 🌴

A single-page React application for a creative agency to showcase their work.
Visitors can browse a list of projects, add new projects through a form, and
filter the list in real time with a search box. Styled with a neon
**Miami Vice** theme (pink + cyan on midnight purple) built on Material UI.

Built for the *Summative Lab: Single Page Application (SPA) with React*.

---

## Features

- **Project landing page** — displays a list of projects with a thumbnail,
  title, and description.
- **Add projects dynamically** — a controlled form (Title + Description) adds
  new projects to the top of the list without a page reload. Title is required
  and shows an inline validation message when missing.
- **Live search** — filters the list as you type, matching against both the
  project title *and* description (case-insensitive).
- **Empty state** — a friendly "No projects found." message when a search
  matches nothing.
- **Responsive design** — a single-column, centered layout that adapts from
  mobile to desktop using Material UI's `Container` and `Stack`.
- **Miami Vice theme** — a maintainable, token-driven MUI theme; change the
  colors in one file (`src/styles/theme.js`) to retint the whole app.

---

## Tech Stack

| Concern        | Choice                                    |
| -------------- | ----------------------------------------- |
| Build tool     | [Vite](https://vite.dev/)                 |
| UI library     | [React](https://react.dev/) 19            |
| Component / styling | [Material UI (MUI)](https://mui.com/) + Emotion |
| State          | `useState` + a custom `useProjects` hook  |
| Testing        | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) |

> **A note on testing tools:** the lab brief mentions *Jest*. This project uses
> **Vitest**, the Vite-native test runner. Vitest is intentionally
> Jest-compatible — the same `describe`/`it`/`expect` API and the same React
> Testing Library — so the tests read exactly like Jest tests and require no
> separate Jest/Babel configuration in a Vite project.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (developed on Node 24)
- npm 9+

### Installation

```bash
# from the project root (the folder containing package.json)
npm install
```

### Run the app (development)

```bash
npm run dev
```

Then open the URL Vite prints (usually <http://localhost:5173>). The dev server
supports hot-module reload, so edits appear instantly.

### Build for production

```bash
npm run build      # outputs an optimized bundle to dist/
npm run preview    # serve the production build locally to verify it
```

---

## Usage

1. **Browse** the three seeded projects on load.
2. **Add a project:** type a Title (required) and Description in the
   *Add Project* card, then click **Add**. It appears at the top of the list.
3. **Search:** type in the *Search Projects* box to filter the list live. Clear
   the box to see everything again.

---

## Testing

```bash
npm test           # run tests in watch mode
npm run test:run   # run the suite once (CI-style)
npm run coverage   # run once and print a coverage report
```

The suite has **20 tests across 5 files** covering the hook logic and the key
user interactions (form submission, validation, and live search):

- `useProjects.test.js` — add, whitespace trimming, unique ids, and filtering.
- `AddProjectForm.test.jsx` — submit calls back with values, inputs reset,
  required-title validation blocks submission.
- `SearchBar.test.jsx` — controlled input reports every keystroke.
- `ProjectList.test.jsx` — renders rows and the empty state.
- `App.test.jsx` — end-to-end: added projects show in the list, search filters
  the visible projects, and newly added projects are searchable.

---

## Project Structure

```
portfolio-site/
├── index.html                  # Vite HTML entry point
├── vite.config.js              # Vite + Vitest configuration
├── src/
│   ├── main.jsx                # React entry — mounts <App/>
│   ├── App.jsx                 # Top-level component; owns shared state
│   ├── index.css               # Global reset + themed background
│   ├── components/             # Presentational + form components
│   │   ├── Header.jsx
│   │   ├── AddProjectForm.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ProjectList.jsx
│   │   └── ProjectCard.jsx
│   ├── hooks/
│   │   └── useProjects.js       # Projects state + add/filter logic
│   ├── styles/
│   │   └── theme.js             # Material UI (Miami Vice) theme
│   ├── data/
│   │   └── initialProjects.js   # Seed project data
│   └── tests/                   # Vitest + RTL tests and helpers
│       ├── setup.js
│       ├── testUtils.jsx
│       └── *.test.js(x)
```

### Architecture notes

- **State lives at the nearest common parent.** `App` is the single owner of
  the projects array and the search term (via the `useProjects` hook). Data
  flows *down* as props; changes flow *up* through callbacks
  (`onAddProject`, `onSearchChange`). `AddProjectForm` and `ProjectList` never
  talk to each other directly.
- **`useProjects` custom hook** keeps the data rules (how a project is added,
  how the search filters) in one testable place, separate from layout. The
  filtered list is memoized with `useMemo`.
- **The form keeps its own local state** for the in-progress Title/Description
  text, because no other component needs those keystrokes — only the finished
  project is lifted up on submit.

---

## Known Limitations

- **No persistence.** Projects live in memory only; a page refresh resets to the
  three seeded projects. A backend or `localStorage` would fix this.
- **No routing / project detail pages.** This is a true single-page view, so no
  React Router is included. Project thumbnails are decorative placeholders
  rather than real images.
- **Client-side only.** There is no image upload or edit/delete for existing
  projects — the brief scoped the app to *add* and *search*.

---

## Available Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start the Vite dev server with HMR       |
| `npm run build`    | Production build to `dist/`              |
| `npm run preview`  | Preview the production build locally     |
| `npm run lint`     | Run ESLint                               |
| `npm test`         | Run Vitest in watch mode                 |
| `npm run test:run` | Run the test suite once                  |
| `npm run coverage` | Run tests once with a coverage report    |
