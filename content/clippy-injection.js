chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'showHint') {
    const hint = message
    console.log(`Received hint: ${hint}`)
  }
})

let hostEl = null
let shadow = null

function ensureUI() {
  const existing = document.getElementById('clippy-host')
  if (existing) {
    hostEl = existing
    shadow = existing.shadowRoot
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
  const iframe = document.createElement('iframe')
  const src = chrome.runtime.getURL('content/clippy.html')
  iframe.src = src
  iframe.style.border = 'none'
  iframe.style.width = '300px'
  iframe.style.height = '220px'
  iframe.style.background = 'transparent'
  iframe.style.display = 'block'
  shadow.appendChild(iframe)
}

ensureUI()
