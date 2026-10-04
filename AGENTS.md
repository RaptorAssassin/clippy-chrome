# AGENTS.md

- Do NOT add code comments in this project. No JSDoc, no inline `//` explanations, no block header describing data shapes. Keep existing comments only if editing surrounding lines requires it; never add new ones.

## Stack

- Vanilla Chrome Extension, Manifest V3. No `package.json`, bundler, deps, tests, lint, or CI.
- Entrypoints: `manifest.json` -> `popup/popup.html` (action popup, currently empty), `background/service-worker.js` (`type: module`, so relative ES `import` works).

## Structure

- `background/service-worker.js`: `normalizeHostname()` + `getRandomHint()` + `chrome.webNavigation.onCompleted` listener filtered to `http`/`https`.
- `data/clippy-hints.js`: sole hint store. Exports `WEBSITE_HINTS` (base-domain keyed, e.g. `github.com`), `DEFAULT_HINTS`, `DEFAULT_WEIGHT`. Hint shape is `{ message: string, weight: number }`.
- `icons/`, `anims/ballspin.mkv` are static assets; `anims/` is currently unreferenced.

## Hostname + hint logic

- `normalizeHostname()` strips protocol, port, `www.`, and subdomains down to base domain (`www.gist.github.com` -> `github.com`). Preserves `localhost`, IPv4, and single-label hosts as-is. `getRandomHint()` falls back to `DEFAULT_HINTS` and does weighted random selection; missing/zero `weight` falls back to `DEFAULT_WEIGHT`.
- Keep `WEBSITE_HINTS` keys in normalized base-domain form or lookups will miss.

## Verify

- No automated checks. Syntax-check touched JS with `node --check <file>`.
- Manual test: `chrome://extensions` -> Developer mode -> Load unpacked -> select repo root -> navigate to http/https pages and inspect service worker console.
- `webNavigation` + `<all_urls>` are required for the current listener; do not remove.
