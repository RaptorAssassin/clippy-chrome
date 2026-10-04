import {
  WEBSITE_HINTS,
  DEFAULT_HINTS,
  DEFAULT_WEIGHT,
} from '../data/clippy-hints.js'
import {
  WEBSITE_ANIMS,
  DEFAULT_ANIMS,
  DEFAULT_ANIM_WEIGHT,
} from '../data/anims.js'

/**
 * Normalizes the website hostname by removing subdomains, protocols, ports etc., for example: "https://www.gist.github.com/anything" -> "github.com"
 * @param {*} input - The input hostname to normalize
 * @returns The normalized hostname, or an empty string if the input is invalid
 */
function normalizeHostname(input) {
  if (typeof input !== 'string' || !input) return ''
  const trimmed = input.trim()
  if (!trimmed) return ''
  let host = trimmed
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    try {
      host = new URL(trimmed).hostname
    } catch {
      // Fall through to regex extraction below
      const match = trimmed
        .toLowerCase()
        .match(/^(?:[a-z][a-z0-9+.-]*:\/\/)?([^/:?#@]+)/)
      host = match ? match[1].split('@').pop() : trimmed
    }
  } else {
    const match = trimmed.toLowerCase().match(/^([^/:?#@]+)/)
    host = match ? match[1].split('@').pop() : trimmed
  }
  host = host.toLowerCase()
  if (host.startsWith('[')) {
    const end = host.indexOf(']')
    return end !== -1 ? host.slice(1, end) : host
  }
  host = host.split(':')[0]
  host = host.replace(/^\.+|\.+$/g, '')
  host = host.replace(/^www\./, '')
  if (!host) return ''
  if (
    host === 'localhost' ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(host) ||
    !host.includes('.')
  )
    return host
  const base = host.match(/([^.]+\.[^.]+)$/)
  return base ? base[1] : host
}

/**
 * Returns a random weighted hint for the hostname. Returns a default hint when there are no hints for the hostname. Returns null when there are no hints at all.
 * @param {*} hostname The hostname to get a hint for
 * @returns The hint message, or null if there are no hints
 */
function getRandomHint(hostname) {
  const hints = WEBSITE_HINTS[normalizeHostname(hostname)] || DEFAULT_HINTS
  if (!hints.length) return null
  const totalWeight = hints.reduce(
    (sum, hint) => sum + Math.max(0, hint.weight ?? DEFAULT_WEIGHT),
    0
  )
  if (totalWeight <= 0) return hints[0]?.message ?? null
  let randomWeight = Math.random() * totalWeight
  for (const hint of hints) {
    randomWeight -= Math.max(0, hint.weight ?? DEFAULT_WEIGHT)
    if (randomWeight <= 0) {
      return hint.message
    }
  }
  return hints[hints.length - 1]?.message ?? null
}

chrome.webNavigation.onCompleted.addListener(
  (details) => {
    const url = details.url
    const normalized = normalizeHostname(url)
    const hint = getRandomHint(url)
    const anim = getRandomAnim(url)
    if (!hint) return
    console.log(`Hint for ${normalized}: ${hint}`)
    // Send hint to Clippy UI
    chrome.tabs.sendMessage(details.tabId, { type: 'showHint', hint })
  },
  { url: [{ schemes: ['http', 'https'] }] }
)

function getRandomAnim(hostname) {
  const anims = WEBSITE_ANIMS[normalizeHostname(hostname)] || DEFAULT_ANIMS
  if (!anims.length) return null
  const totalWeight = anims.reduce(
    (sum, anim) => sum + Math.max(0, anim.weight ?? DEFAULT_ANIM_WEIGHT),
    0
  )
  if (totalWeight <= 0) return anims[0]?.anim ?? null
  let randomWeight = Math.random() * totalWeight
  for (const anim of anims) {
    randomWeight -= Math.max(0, anim.weight ?? DEFAULT_ANIM_WEIGHT)
    if (randomWeight <= 0) {
      return anim.anim
    }
  }
  return anims[anims.length - 1]?.anim ?? null
}
