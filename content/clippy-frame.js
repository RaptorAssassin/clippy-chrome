chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'showHint') {
    const hint = message.hint
    console.log(`Received hint: ${hint}`)
    document.getElementById("hint").textContent = hint
    const anim = anim.anim
    function randint(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    const rand = randint(1, 40);
    if (rand == 24) {
      let animURL = chrome.runtime.getURL(anim);
      const clippy = document.getElementById("clippy");
      clippy.src = animURL;
      clippy.load()
    }
    else {
      let animURL = chrome.runtime.getURL(anims/still.mkv);
      const clippy = document.getElementById("clippy");
      clippy.src = animURL;
      clippy.load()
    }

  }
})
