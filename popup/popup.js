function normalizeHostname(input) {
  if (typeof input !== 'string' || !input) return ''
  const trimmed = input.trim()
  if (!trimmed) return ''
  let host = trimmed
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    try {
      host = new URL(trimmed).hostname
    } catch {
      const match = trimmed.toLowerCase().match(/^(?:[a-z][a-z0-9+.-]*:\/\/)?([^/:?#@]+)/)
      host = match ? match[1].split('@').pop() : trimmed
    }
  } else {
    const match = trimmed.toLowerCase().match(/^([^/:?#@]+)/)
    host = match ? match[1].split('@').pop() : trimmed
  }
  host = host.toLowerCase()
  if (host.startsWith('[')) {
    const end = host.indexOf(']')
    return end !== -1 ? host.slice(1, end) : host
  }
  host = host.split(':')[0]
  host = host.replace(/^\.+|\.+$/g, '')
  host = host.replace(/^www\./, '')
  if (!host) return ''
  if (host === 'localhost' || /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || !host.includes('.')) return host
  const parts = host.split('.').filter(Boolean)
  if (parts.length < 2) return host
  let suffixLen = 1
  if (parts.length >= 3 && parts[parts.length - 1].length === 2 && parts[parts.length - 2].length <= 3) suffixLen = 2
  return parts[parts.length - 1 - suffixLen]
}

function sanitizeBlacklist(list) {
  if (!Array.isArray(list)) return []
  const out = []
  for (const entry of list) {
    const normalized = normalizeHostname(entry)
    if (normalized && !out.includes(normalized)) out.push(normalized)
  }
  return out
}

let settings = {
  showHints: true,
  hintChance: 100,
  removeAiOverview: true,
  blacklistedPages: [],
}

let editingIndex = -1

function saveSettings() {
  chrome.storage.local.set({ settings })
}

chrome.storage.local.get('settings', (data) => {
  if (data.settings) {
    settings = {
      showHints: data.settings.showHints ?? true,
      hintChance: data.settings.hintChance ?? 100,
      removeAiOverview: data.settings.removeAiOverview ?? true,
      blacklistedPages: sanitizeBlacklist(data.settings.blacklistedPages),
    }
  } else {
    chrome.storage.local.set({ settings })
  }
  document.getElementById('show-hints').checked = settings.showHints
  document.getElementById('hint-chance').value = settings.hintChance
  document.getElementById('hint-chance-value').innerText = settings.hintChance + '%'
  document.getElementById('hint-chance').disabled = !settings.showHints
  document.getElementById('remove-ai-overview').checked = settings.removeAiOverview
  updateBlacklist()
})

document.getElementById('close-button').onclick = () => {
  window.close()
}

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

document.getElementById('blacklist-add').onclick = () => {
  const input = document.getElementById('blacklist-input')
  addBlacklistedPage(input.value)
  input.value = ''
  input.focus()
}

document.getElementById('blacklist-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    document.getElementById('blacklist-add').click()
  }
})

function updateBlacklist() {
  const list = document.getElementById('blacklist')
  list.innerHTML = ''
  settings.blacklistedPages.forEach((site, index) => {
    const liEl = document.createElement('li')
    if (index === editingIndex) {
      const editInput = document.createElement('input')
      editInput.type = 'text'
      editInput.value = site
      editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          saveEditedPage(index, editInput.value)
        }
        if (e.key === 'Escape') {
          editingIndex = -1
          updateBlacklist()
        }
      })
      const saveBtn = document.createElement('button')
      saveBtn.textContent = 'Save'
      saveBtn.onclick = () => saveEditedPage(index, editInput.value)
      const cancelBtn = document.createElement('button')
      cancelBtn.textContent = 'Cancel'
      cancelBtn.onclick = () => {
        editingIndex = -1
        updateBlacklist()
      }
      liEl.appendChild(editInput)
      liEl.appendChild(saveBtn)
      liEl.appendChild(cancelBtn)
      list.appendChild(liEl)
      editInput.focus()
      editInput.select()
      return
    }
    const label = document.createElement('span')
    label.textContent = site
    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.onclick = () => {
      editingIndex = index
      updateBlacklist()
    }
    const delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.onclick = () => removeBlacklistedPage(site)
    liEl.appendChild(label)
    liEl.appendChild(editBtn)
    liEl.appendChild(delBtn)
    list.appendChild(liEl)
  })
}

function addBlacklistedPage(rawInput) {
  const hostname = normalizeHostname(rawInput)
  if (!hostname) {
    document.getElementById('blacklist-input').focus()
    return
  }
  if (settings.blacklistedPages.includes(hostname)) return
  settings.blacklistedPages.push(hostname)
  editingIndex = -1
  saveSettings()
  updateBlacklist()
}

function removeBlacklistedPage(hostname) {
  const index = settings.blacklistedPages.indexOf(hostname)
  if (index === -1) return
  settings.blacklistedPages.splice(index, 1)
  if (editingIndex === index) editingIndex = -1
  else if (editingIndex > index) editingIndex -= 1
  saveSettings()
  updateBlacklist()
}

function saveEditedPage(index, rawInput) {
  const hostname = normalizeHostname(rawInput)
  if (!hostname) {
    const input = document.querySelector('#blacklist li input')
    if (input) input.focus()
    return
  }
  const existing = settings.blacklistedPages.indexOf(hostname)
  if (existing !== -1 && existing !== index) {
    settings.blacklistedPages.splice(index, 1)
  } else {
    settings.blacklistedPages[index] = hostname
  }
  editingIndex = -1
  saveSettings()
  updateBlacklist()
}
