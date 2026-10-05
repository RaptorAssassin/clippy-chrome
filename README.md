# Clippy Chrome Extension

A Clippy browser extension that randomly pops up and gives more or less helpful tips for the website you're on!

![GitHub License](https://img.shields.io/github/license/RaptorAssassin/clippy-chrome?label=License)

## Features

-**Awesome Hints**: Clippy gives random hints, depending on the website you're on! If no specific hints are available, it falls back to some default ones.
-**Change chance of Clippy appearing**: If Clippy annoys you too much, you can decrease the chance of Clippy popping up on your sites or even disable him completely. But he will be really sad!
-**Remove Google AI overview from your search**: If the AI overview annoys you, Clippy's here for you and removes it.

## Technology

This extention was built with vanilla HTML, CSS and JavaScript. It's backend runs on a service worker, which triggers a Clippy hint everytime a site is opened or reloaded. This hint gets passed to the frontend where it gets decided whether to actually display the hint based on the user settings.

## Folder Structure

`/popup`: The popup that appears when you click the extention icon which contains settings for Clippy
`/content`: The on-page Clippy popup that shows hints
`/background`: Background service worker that generates the hints
`/data`: Contains hardcoded data like the hints and animation settings. They are picked randomly from these files.
`/anims`: All animations for Clippy
`/icons`: Contains the icon files
