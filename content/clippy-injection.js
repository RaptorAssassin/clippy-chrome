let hostEl = null
let frame = null
let frameLoaded = false
let pendingMessages = []
let requestedHeight = 340

const MIN_HEIGHT = 320

function normalizeHostname(input) {
  if (typeof input !== 'string' || !input) return ''
  const trimmed = input.trim()
  if (!trimmed) return ''
  let host = trimmed
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    try {
      host = new URL(trimmed).hostname
    } catch {
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

function sanitizeBlacklist(list) {
  if (!Array.isArray(list)) return []
  const out = []
  for (const entry of list) {
    const normalized = normalizeHostname(entry)
    if (normalized && !out.includes(normalized)) out.push(normalized)
  }
  return out
}

let blockedHosts = []
let blockedLoaded = false

function isCurrentHostBlocked() {
  const current = normalizeHostname(window.location.hostname)
  if (!current) return false
  return blockedHosts.includes(current)
}

function removeHost() {
  document.getElementById('clippy-host')?.remove()
  hostEl = null
  frame = null
  frameLoaded = false
  pendingMessages = []
}

chrome.storage.local.get('settings', (data) => {
  blockedHosts = sanitizeBlacklist(data.settings?.blacklistedPages)
  blockedLoaded = true
  if (isCurrentHostBlocked()) {
    removeHost()
  } else {
    ensureUI()
  }
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes.settings) return
  blockedHosts = sanitizeBlacklist(changes.settings.newValue?.blacklistedPages)
  blockedLoaded = true
  if (isCurrentHostBlocked()) {
    removeHost()
  } else {
    ensureUI()
  }
})


function clampHeight(px) {
  const max = Math.max(MIN_HEIGHT, Math.floor(window.innerHeight * 0.9))
  const value = Math.round(Number(px))
  if (!Number.isFinite(value)) return MIN_HEIGHT
  return Math.min(Math.max(value, MIN_HEIGHT), max)
}

function applyHeight(px) {
  requestedHeight = px
  const height = clampHeight(px) + 'px'
  if (frame) frame.style.height = height
  if (hostEl) hostEl.style.height = height
}

function ensureUI() {
  const existing = document.getElementById('clippy-host')
  if (existing?.shadowRoot?.querySelector('iframe')) {
    hostEl = existing
    frame = existing.shadowRoot.querySelector('iframe')
    return
  }
  existing?.remove()
  hostEl = document.createElement('div')
  hostEl.id = 'clippy-host'
  hostEl.style.position = 'fixed'
  hostEl.style.bottom = '10px'
  hostEl.style.right = '12.5px'
  hostEl.style.zIndex = '2147483647'
  hostEl.style.background = 'transparent'
  hostEl.style.backgroundColor = 'transparent'
  hostEl.style.border = 'none'
  hostEl.style.boxShadow = 'none'
  hostEl.style.overflow = 'hidden'
  hostEl.style.width = '300px'
  hostEl.style.height = clampHeight(requestedHeight) + 'px'
  hostEl.style.pointerEvents = 'none'
  const shadow = hostEl.attachShadow({ mode: 'open' })
  frame = document.createElement('iframe')
  frame.src = chrome.runtime.getURL('content/clippy.html')
  frame.style.border = 'none'
  frame.style.width = '300px'
  frame.style.height = clampHeight(requestedHeight) + 'px'
  frame.style.background = 'transparent'
  frame.style.backgroundColor = 'transparent'
  frame.style.colorScheme = 'light'
  frame.style.pointerEvents = 'auto'
  frame.allow = 'autoplay'
  frame.setAttribute('allowtransparency', 'true')
  frame.setAttribute('scrolling', 'no')
  frame.setAttribute('frameborder', '0')
  frame.addEventListener('load', () => {
    frameLoaded = true
    for (const message of pendingMessages) {
      frame.contentWindow.postMessage(message, '*')
    }
    pendingMessages = []
  })
  shadow.appendChild(frame)
  ;(document.body || document.documentElement).appendChild(hostEl)
}

function deliverToFrame(message) {
  ensureUI()
  if (!frameLoaded || !frame?.contentWindow) {
    pendingMessages.push(message)
    return
  }
  frame.contentWindow.postMessage(message, '*')
}

function forwardToFrame(message) {
  if (message?.type !== 'showHint' || typeof message.hint !== 'string') return
  if (!blockedLoaded) {
    chrome.storage.local.get('settings', (data) => {
      blockedHosts = sanitizeBlacklist(data.settings?.blacklistedPages)
      blockedLoaded = true
      if (isCurrentHostBlocked()) {
        removeHost()
        return
      }
      deliverToFrame(message)
    })
    return
  }
  if (isCurrentHostBlocked()) {
    removeHost()
    return
  }
  deliverToFrame(message)
}

chrome.runtime.onMessage.addListener(forwardToFrame)

window.addEventListener('message', (event) => {
  if (event.source !== frame?.contentWindow) return
  if (event.data?.type !== 'clippyResize') return
  applyHeight(event.data.height)
})

window.addEventListener('resize', () => {
  applyHeight(requestedHeight)
})

function maybeRemoveAiOverview() {
  let url
  try {
    url = new URL(window.location.href)
  } catch {
    return
  }
  if (!url.hostname.includes('google')) return
  if (url.pathname !== '/search') return
  chrome.storage.local.get('settings', (data) => {
    const remove = data.settings?.removeAiOverview ?? true
    if (!remove) {
      if (url.searchParams.get('udm') !== '14') return
      url.searchParams.delete('udm')
      if (url.toString() !== window.location.href) {
        window.location.replace(url.toString())
      }
      return
    }
    if (url.searchParams.has('udm')) return
    url.searchParams.set('udm', '14')
    window.location.replace(url.toString())
  })
}

maybeRemoveAiOverview()
