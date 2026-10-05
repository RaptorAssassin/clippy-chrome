let hostEl = null
let frame = null
let frameLoaded = false
let pendingMessages = []
let requestedHeight = 340

const MIN_HEIGHT = 320


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

function forwardToFrame(message) {
  if (message?.type !== 'showHint' || typeof message.hint !== 'string') return
  ensureUI()
  if (!frameLoaded || !frame?.contentWindow) {
    pendingMessages.push(message)
    return
  }
  frame.contentWindow.postMessage(message, '*')
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

ensureUI()

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
