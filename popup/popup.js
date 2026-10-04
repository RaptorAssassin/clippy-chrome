document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('settings', (data) => {
    if (!data.settings) {
      // Set default settings if they don't exist
      chrome.storage.local.set({
        settings: { showHints: true, hintChance: 50 },
      })
      return
    }
    if (data.settings) {
      document.getElementById('show-hints').checked = data.settings.showHints
      document.getElementById('hint-chance').value = data.settings.hintChance
    }
  })
})

document.getElementById('show-hints').onchange = (e) => {
  chrome.storage.local.set({
    settings: { ...settings, showHints: e.target.checked },
  })
}

document.getElementById('hint-chance').onchange = (e) => {
  chrome.storage.local.set({
    settings: { ...settings, hintChance: e.target.value },
  })
  document.getElementById('hint-chance-value').innerText = e.target.value + '%'
}
