chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'showHint') {
    const hint = message.hint
    console.log(`Received hint: ${hint}`)
    document.getElementById("hint").textContent = hint
  }
})
