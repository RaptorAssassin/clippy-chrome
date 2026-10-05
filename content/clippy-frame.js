const ANIMATIONS = ['anims/ballspin.webm', 'anims/bounce.webm', 'anims/still.webm']

function resolveAnimation(requested) {
  const normalized =
    typeof requested === 'string' ? requested.replace(/^\/+/, '') : ''
  if (ANIMATIONS.includes(normalized)) return normalized
  return ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)]
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
}

window.addEventListener('message', (event) => {
  if (event.source !== window.parent) return
  showHint(event.data)
})
