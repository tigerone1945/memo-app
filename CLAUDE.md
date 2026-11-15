# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`memo-app` is a minimal single-page memo (note-taking) app built with React 19 + Vite. There is no backend — all data lives in `localStorage` under the key `memo-app:memos`.

## Commands

```bash
npm install      # install dependencies
npm run dev       # start Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # lint with oxlint
```

There is no test suite configured in this project.

## Architecture

The entire app logic lives in `src/App.jsx` as a single component — there is no router, no component tree, and no state management library:

- Memo state is a single array of `{ id, text, createdAt }` objects, initialized from `localStorage` via `loadMemos()` and persisted back on every change via a `useEffect` keyed on the `memos` state.
- `crypto.randomUUID()` generates memo IDs; `Date.now()` stamps creation time, formatted for display with `toLocaleString('ja-JP')`.
- UI text (labels, placeholders, empty state) is in Japanese.
- Styling is plain CSS in `src/App.css` / `src/index.css` — no CSS framework or CSS-in-JS.

`src/main.jsx` mounts `<App />` into `#root` inside `<StrictMode>`; `index.html` is the Vite entry point.

## Linting

oxlint is configured (`.oxlintrc.json`) with the `react` and `oxc` plugins, enforcing `react/rules-of-hooks` as an error.
