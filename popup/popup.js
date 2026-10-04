let settings = { showHints: true, hintChance: 50 }

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
})

document.getElementById('show-hints').onchange = (e) => {
  settings = { ...settings, showHints: e.target.checked }
  chrome.storage.local.set({ settings })
}

document.getElementById('hint-chance').onchange = (e) => {
  settings = { ...settings, hintChance: Number(e.target.value) }
  chrome.storage.local.set({ settings })
  document.getElementById('hint-chance-value').innerText = e.target.value + '%'
}
