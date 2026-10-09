# AGENTS.md

- Do NOT add code comments. No JSDoc, no inline `//`, no block headers. Keep existing comments only if editing surrounding lines requires it; never add new ones.
- Style follows `.prettierrc` (no semicolons, single quotes, 2-space, width 200). No prettier runner installed; match it manually. No `package.json`, bundler, tests, lint, or CI.

## Structure

- Vanilla MV3 extension. `manifest.json` is source of truth: background `type: module` service worker, `http(s)` content script at `document_idle`, popup at `popup/popup.html`.
- `background/service-worker.js`: picks hint + anim on `chrome.webNavigation.onCompleted` (`frameId === 0`, `http`/`https` only), sends `{ type: 'showHint', hint, anim }` via `tabs.sendMessage` with one 500ms retry.
- `content/clippy-injection.js`: content script. Owns `#clippy-host` shadow-DOM + `content/clippy.html` iframe, blacklist gating, `clippyResize` height sync (`MIN_HEIGHT` 320, max 90vh), Google AI-overview `udm=14` redirect.
- `content/clippy-frame.js`: iframe UI. Gates display on settings (`decideIfShouldShowHint`), renders hint + video, reports height via `clippyResize`.
- `popup/popup.js|html|css`: settings UI only. Reads/writes `chrome.storage.local.settings`.
- `data/clippy-hints.js`: `WEBSITE_HINTS`, `DEFAULT_HINTS`, `DEFAULT_WEIGHT`, `AI_HINTS` spread. Hint shape `{ message, weight }`.
- `data/anims.js`: `WEBSITE_ANIMS`, `DEFAULT_ANIMS`, `DEFAULT_ANIM_WEIGHT`. Anim shape `{ anim, weight }`.
- `anims/*.webm` + `icons/clippy-icon.png` are runtime assets; `clippy_base.blend` is unreferenced source art.

## Gotchas

- `normalizeHostname()` is copy-pasted in `background/service-worker.js`, `content/clippy-injection.js`, `popup/popup.js`. It returns a single label (`www.gist.github.com` -> `github`), not a full domain. Keep the three copies in sync; keep `WEBSITE_HINTS` / `WEBSITE_ANIMS` keys in that single-label form or lookups miss. Preserves `localhost`, IPv4, single-label hosts.
- Weighted pick: missing/`null` weight falls back to `DEFAULT_WEIGHT` / `DEFAULT_ANIM_WEIGHT` (both `1`); zero/negative weights count as `0` with fallback to first entry when total is `<= 0`.
- Settings shape: `{ showHints, hintChance, removeAiOverview, blacklistedPages[] }`. Blacklist entries are normalized + deduped via `sanitizeBlacklist()` on every read/write. Defaults disagree between files (`popup.js` uses `hintChance: 100`, `clippy-frame.js` fallback is `50`); first popup open persists `100`.
- Adding an animation requires touching `ANIMATIONS` allowlist in `content/clippy-frame.js` (unknown `anim` values fall back to random) plus `data/anims.js`. Manifest `web_accessible_resources` already globs `anims/*.webm`, `content/clippy.html`, `content/clippy-frame.js`, `content/clippy.css`, `icons/clippy-icon.png`.
- `webNavigation` + `storage` + `<all_urls>` are required for the current flow; do not remove.

## Verify

- No automated checks. Syntax-check touched JS with `node --check <file>`.
- Manual test: `chrome://extensions` -> Developer mode -> Load unpacked -> repo root -> navigate http/https pages, inspect service worker console (`Hint for <host>: ...`).
