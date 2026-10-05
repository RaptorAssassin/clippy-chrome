const ANIMATIONS = [
  'anims/ballspin.webm',
  'anims/bounce.webm',
  'anims/still.webm',
]

function resolveAnimation(requested) {
  const normalized =
    typeof requested === 'string' ? requested.replace(/^\/+/, '') : ''
  if (ANIMATIONS.includes(normalized)) return normalized
  return ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)]
    if (gun.anim == true) {
    return ANIMATIONS[4]
}

function outerHeight(element) {
  if (!element || element.offsetHeight === 0) return 0
  const style = getComputedStyle(element)
  return (
    element.offsetHeight +
    parseFloat(style.marginTop || '0') +
    parseFloat(style.marginBottom || '0')
  )
}

function requestFit() {
  const hintElement = document.getElementById('hint')
  const video = document.getElementById('clippy-video')
  const height = Math.ceil(outerHeight(hintElement) + outerHeight(video)) || 300
  window.parent.postMessage({ type: 'clippyResize', height }, '*')
}

function showHint(message) {
  if (message?.type !== 'showHint' || typeof message.hint !== 'string') return
  const hintElement = document.getElementById('hint')
  const video = document.getElementById('clippy-video')
  if (!hintElement || !video) return
  hintElement.textContent = message.hint
  video.src = chrome.runtime.getURL(resolveAnimation(message.anim))
  video.muted = true
  video.playsInline = true
  video.load()
  video.play().catch((error) => {
    console.error('Unable to play Clippy animation:', error)
  })
  requestFit()
}

if (document.fonts?.ready) {
  document.fonts.ready.then(requestFit).catch(() => {})
}

window.addEventListener('load', requestFit)
requestFit()

window.addEventListener('message', (event) => {
  if (event.source !== window.parent) return
  decideIfShouldShowHint(event.data)
})

/**
 * Removes the Google AI Overview from the search results page if the user has enabled that setting.
 */
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

function decideIfShouldShowHint(data) {
  const settings = chrome.storage.local.get('settings')

  if (!settings.showHints || settings.hintChance <= 0) return
  if (settings.hintChance >= 100 || Math.random() * 100 < settings.hintChance)
    showHint(data)
}
