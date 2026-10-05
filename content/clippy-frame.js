const ANIMATIONS = [
  'anims/ballspin.webm',
  'anims/bounce.webm',
  'anims/still.webm',
  'anims/gun.webm',
]

function resolveAnimation(requested) {
  const normalized =
    typeof requested === 'string' ? requested.trim().replace(/^\/+/, '') : ''
  if (normalized && ANIMATIONS.includes(normalized)) return normalized
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
  const height = Math.ceil(outerHeight(hintElement) + outerHeight(video)) || 300
  window.parent.postMessage({ type: 'clippyResize', height }, '*')
}

/**
 * Show a hint in the CLippy UI
 * @param {*} message
 */
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
  if (event.data?.type === 'showHint') {
    decideIfShouldShowHint(event.data)
  }
})

function getHintSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get('settings', (data) => {
      resolve(
        data.settings ?? {
          showHints: true,
          hintChance: 50,
          removeAiOverview: true,
        }
      )
    })
  })
}

/**
 * Decides if the hint should be shown based on the settings and a random chance.
 * @param {*} data - The hint data that gets passed to the hint function
 * @returns {Promise<boolean>} - A promise that resolves to true if the hint should be shown, false otherwise.
 */
async function decideIfShouldShowHint(data) {
  if (data?.type !== 'showHint') return false
  const settings = await getHintSettings()

  if (!settings.showHints) return false
  if (settings.hintChance <= 0) return false
  if (settings.hintChance >= 100 || Math.random() * 100 < settings.hintChance) {
    showHint(data)
    return true
  }
  return false
}
