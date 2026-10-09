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

const SITE_HINT_BOOST = 3

const RECENT_HINT_COUNT = 10

/**
 * Normalizes the website hostname by removing subdomains, protocols, ports etc., for example: "https://www.gist.github.com/anything" -> "github"
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
  const parts = host.split('.').filter(Boolean)
  if (parts.length < 2) return host
  let suffixLen = 1
  if (
    parts.length >= 3 &&
    parts[parts.length - 1].length === 2 &&
    parts[parts.length - 2].length <= 3
  )
    suffixLen = 2
  return parts[parts.length - 1 - suffixLen]
}

/**
 * Returns a random weighted hint for the hostname. Returns a default hint when there are no hints for the hostname. Returns null when there are no hints at all.
 * @param {*} hostname The hostname to get a hint for
 * @returns The hint message, or null if there are no hints
 */
function pickWeightedHint(hints) {
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

function chooseHintPool(hostname) {
  const siteHints = WEBSITE_HINTS[normalizeHostname(hostname)] || []
  if (!siteHints.length) return DEFAULT_HINTS
  if (Math.random() < SITE_HINT_BOOST / (SITE_HINT_BOOST + 1))
    return siteHints
  return DEFAULT_HINTS
}

function getRandomHint(hostname) {
  return pickWeightedHint(chooseHintPool(hostname))
}

function getRecentHints() {
  return chrome.storage.local.get('recentHints').then((data) =>
    Array.isArray(data.recentHints)
      ? data.recentHints.filter((hint) => typeof hint === 'string')
      : []
  )
}

function pushRecentHint(hint) {
  return getRecentHints().then((recent) => {
    const updated = [...recent.filter((entry) => entry !== hint), hint].slice(
      -RECENT_HINT_COUNT
    )
    return chrome.storage.local.set({ recentHints: updated })
  })
}

async function getFreshHint(hostname) {
  try {
    const recent = await getRecentHints()
    const pool = chooseHintPool(hostname)
    const fresh = pool.filter((hint) => !recent.includes(hint.message))
    const hint = pickWeightedHint(fresh.length ? fresh : pool)
    if (typeof hint === 'string') await pushRecentHint(hint)
    return hint
  } catch {
    return getRandomHint(hostname)
  }
}

function sendHint(tabId, message, retries = 1) {
  chrome.tabs.sendMessage(tabId, message).catch(() => {
    if (retries > 0) {
      setTimeout(() => sendHint(tabId, message, retries - 1), 500)
    }
  })
}

chrome.webNavigation.onCompleted.addListener(
  (details) => {
    if (details.frameId !== 0) return
    const url = details.url
    const normalized = normalizeHostname(url)
    const anim = getRandomAnim(url)
    getFreshHint(url).then((hint) => {
      if (!hint) return
      console.log(`Hint for ${normalized}: ${hint}`)
      sendHint(details.tabId, { type: 'showHint', hint, anim })
    })
  },
  { url: [{ schemes: ['http', 'https'] }] }
)

function getRandomAnim(hostname) {
  const websiteAnims = WEBSITE_ANIMS[normalizeHostname(hostname)] || []
  const anims = websiteAnims.filter(
    (anim) => typeof anim.anim === 'string' && anim.anim.trim()
  )
  const availableAnims = anims.length
    ? anims
    : DEFAULT_ANIMS.filter(
        (anim) => typeof anim.anim === 'string' && anim.anim.trim()
      )
  if (!availableAnims.length) return null
  const totalWeight = availableAnims.reduce(
    (sum, anim) => sum + Math.max(0, anim.weight ?? DEFAULT_ANIM_WEIGHT),
    0
  )
  if (totalWeight <= 0) return availableAnims[0]?.anim ?? null
  let randomWeight = Math.random() * totalWeight
  for (const anim of availableAnims) {
    randomWeight -= Math.max(0, anim.weight ?? DEFAULT_ANIM_WEIGHT)
    if (randomWeight <= 0) {
      return anim.anim
    }
  }
  return availableAnims[availableAnims.length - 1]?.anim ?? null
}
