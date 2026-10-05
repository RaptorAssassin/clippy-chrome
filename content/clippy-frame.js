const ANIMATIONS = ['anims/ballspin.webm', 'anims/bounce.webm', 'anims/still.webm']

function resolveAnimation(requested) {
  const normalized =
    typeof requested === 'string' ? requested.replace(/^\/+/, '') : ''
  if (ANIMATIONS.includes(normalized)) return normalized
  return ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)]
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
  const height =
    Math.ceil(outerHeight(hintElement) + outerHeight(video)) || 300
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
  showHint(event.data)
})
