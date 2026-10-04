document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('settings', (data) => {
    if (!data.settings) {
      // Set default settings if they don't exist
      chrome.storage.local.set({ settings: { showHints: true } })
      return
    }
    if (data.settings) {
      document.getElementById('show-hints').checked = data.settings.showHints
    }
  })
})

document.getElementById('show-hints').onchange = (e) => {
  chrome.storage.local.set({
    settings: { ...settings, showHints: e.target.checked },
  })
}
