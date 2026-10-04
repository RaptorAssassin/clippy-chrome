function showHint(message) {
  if (message?.type !== 'showHint' || typeof message.hint !== 'string') return

  const hintElement = document.getElementById('hint')
  const video = document.getElementById('clippy')
  if (!hintElement || !video) return

  hintElement.textContent = message.hint

  const animations = [
    'anims/ballspin.mkv',
    'anims/bounce.mkv',
    'anims/still.mkv',
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
  setTimeout(() => {
    console.log("anim complete");
  }, 3000);
}

window.addEventListener('message', (event) => {
  if (event.source === window.parent) showHint(event.data)
})
