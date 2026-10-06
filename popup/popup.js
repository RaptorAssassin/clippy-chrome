let settings = { showHints: true, hintChance: 100, removeAiOverview: true }

chrome.storage.local.get('settings', (data) => {
  if (data.settings) {
    settings = data.settings
  } else {
    chrome.storage.local.set({ settings })
  }
  document.getElementById('show-hints').checked = settings.showHints
  document.getElementById('hint-chance').value = settings.hintChance
  document.getElementById('hint-chance-value').innerText =
    settings.hintChance + '%'
  document.getElementById('remove-ai-overview').checked =
    settings.removeAiOverview
})

document.getElementById('show-hints').onchange = (e) => {
  settings = { ...settings, showHints: e.target.checked }
  if (!e.target.checked) {
    document.getElementById('hint-chance').disabled = true
  } else {
    document.getElementById('hint-chance').disabled = false
  }
  chrome.storage.local.set({ settings })
}

document.getElementById('hint-chance').onchange = (e) => {
  settings = { ...settings, hintChance: Number(e.target.value) }
  chrome.storage.local.set({ settings })
  document.getElementById('hint-chance-value').innerText = e.target.value + '%'
}

document.getElementById('remove-ai-overview').onchange = (e) => {
  settings = { ...settings, removeAiOverview: e.target.checked }
  chrome.storage.local.set({ settings })
}

document.getElementById('close-button').onclick = () => {
  window.close()
}
