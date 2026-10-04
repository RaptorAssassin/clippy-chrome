chrome.runtime.onMessage.addListener((message) => {
  if (message?.type !== 'showHint' || typeof message.hint !== 'string') return

  const hintElement = document.getElementById('hint')
  const video = document.getElementById('clippy')
  if (!hintElement || !video) return

  hintElement.textContent = message.hint

  const animation =
    typeof message.anim === 'string' && message.anim.trim()
      ? message.anim.replace(/^\/+/, '')
      : Math.floor(Math.random() * 40) === 23
        ? 'anims/ballspin.mkv'
        : 'anims/still.mkv'

  video.src = chrome.runtime.getURL(animation)
  video.muted = true
  video.playsInline = true
  video.load()
  video.play().catch((error) => {
    console.error('Unable to play Clippy animation:', error)
  })
})
