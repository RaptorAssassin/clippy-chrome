let hostEl = null
let shadow = null
let iframe = null
let iframeReady = false
let pendingMessage = null

function sendToFrame(message) {
  if (!iframeReady || !iframe?.contentWindow) {
    pendingMessage = message
    return
  }
  iframe.contentWindow.postMessage(message, new URL(iframe.src).origin)
}

function ensureUI() {
  const existing = document.getElementById('clippy-host')
  if (existing) {
    hostEl = existing
    shadow = existing.shadowRoot
    iframe = shadow.querySelector('iframe')
    return
  }
  hostEl = document.createElement('div')
  hostEl.id = 'clippy-host'
  hostEl.style.position = 'fixed'
  hostEl.style.bottom = '20px'
  hostEl.style.right = '20px'
  hostEl.style.zIndex = '2147483647'
  shadow = hostEl.attachShadow({ mode: 'open' })
  ;(document.body || document.documentElement).appendChild(hostEl)
  iframe = document.createElement('iframe')
  const src = chrome.runtime.getURL('content/clippy.html')
  iframe.src = src
  iframe.style.border = 'none'
  iframe.style.width = '300px'
  iframe.style.height = '220px'
  iframe.style.background = 'transparent'
  iframe.style.display = 'block'
  iframe.addEventListener('load', () => {
    iframeReady = true
    if (pendingMessage) {
      sendToFrame(pendingMessage)
      pendingMessage = null
    }
  })
  shadow.appendChild(iframe)
}

ensureUI()

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === 'showHint') sendToFrame(message)
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
  if (url.searchParams.get('udm') === '14') return
  chrome.storage.local.get('settings', (data) => {
    const remove = data.settings?.removeAiOverview ?? true
    if (!remove) return
    if (url.searchParams.get('udm') === '14') return
    url.searchParams.set('udm', '14')
    window.location.replace(url.toString())
  })
}

maybeRemoveAiOverview()
