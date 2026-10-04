let hostEl = null
let shadow = null

function ensureUI() {
  const existing = document.getElementById('clippy-host')
  if (existing?.shadowRoot?.querySelector('#clippy')) {
    hostEl = existing
    shadow = existing.shadowRoot
    return
  }
  existing?.remove()
  hostEl = document.createElement('div')
  hostEl.id = 'clippy-host'
  hostEl.style.position = 'fixed'
  hostEl.style.bottom = '20px'
  hostEl.style.right = '20px'
  hostEl.style.zIndex = '2147483647'
  hostEl.style.background = 'transparent'
  shadow = hostEl.attachShadow({ mode: 'open' })
  ;(document.body || document.documentElement).appendChild(hostEl)
  const stylesheet = document.createElement('link')
  stylesheet.rel = 'stylesheet'
  stylesheet.href = chrome.runtime.getURL('content/clippy.css')
  shadow.appendChild(stylesheet)
  const hint = document.createElement('h1')
  hint.id = 'hint'
  hint.textContent = 'HINT'
  shadow.appendChild(hint)
  const video = document.createElement('video')
  video.id = 'clippy'
  video.width = 300
  video.height = 300
  shadow.appendChild(video)
}

ensureUI()

function showHint(message) {
  if (message?.type !== 'showHint' || typeof message.hint !== 'string') return
  const hintElement = shadow.querySelector('#hint')
  const video = shadow.querySelector('#clippy')
  if (!hintElement || !video) return

  hintElement.textContent = message.hint
  const animations = [
    'anims/ballspin.webm',
    'anims/bounce.webm',
    'anims/still.webm',
  ]
  const requestedAnimation =
    typeof message.anim === 'string' ? message.anim.replace(/^\/+/, '') : ''
  const animation = animations.includes(requestedAnimation)
    ? requestedAnimation
    : animations[Math.floor(Math.random() * animations.length)]

  video.src = chrome.runtime.getURL(animation)
  video.muted = true
  video.playsInline = true
  video.load()
  video.play().catch((error) => {
    console.error('Unable to play Clippy animation:', error)
  })
}

chrome.runtime.onMessage.addListener(showHint)

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
