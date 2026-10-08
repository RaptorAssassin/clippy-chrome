# Clippy Chrome Extension

A Clippy browser extension that randomly pops up and gives more or less helpful tips for the website you're on!

![GitHub License](https://img.shields.io/github/license/RaptorAssassin/clippy-chrome?label=License)

## Features

**Awesome Hints**: Clippy gives random hints, depending on the website you're on! If no specific hints are available, it falls back to some default ones.  
**Change chance of Clippy appearing**: If Clippy annoys you too much, you can decrease the chance of Clippy popping up on your sites or even disable him completely. But he will be really sad!  
**Remove Google AI overview from your search**: If the AI overview annoys you, Clippy's here for you and removes it from your search results.  

## Technology

This extension was built with vanilla HTML, CSS and JavaScript. It's backend runs on a service worker, which triggers a Clippy hint everytime a site is opened or reloaded. This hint gets passed to the frontend where it gets decided whether to actually display the hint based on the user settings like the chance of Clippy appearing, the website blacklist etc.

## Folder Structure

`/popup`: The popup that appears when you click the extension icon which contains settings for Clippy.  
`/content`: The on-page Clippy popup that shows hints  
`/background`: Background service worker that generates the hints  
`/data`: Contains hardcoded data like the hints and animation settings. They are picked randomly from these files.  
`/anims`: All animations for Clippy  
`/icons`: Contains the icon files  

## Inspiration

These are the assets we used as a reference for our designs of the Clippy popup and the extension settings.

### Original Clippy

From this image, we got a lot of orientation how to design our extension. We took the colors for the Clippy speech bubble and also tried to find a similar-looking pixelated font. We chose "Pixelify Sans" for it.

*Upload Clippy image from wikipedia here*  

[wikipedia.org/office_assistant](https://en.wikipedia.org/wiki/Office_Assistant#/media/File:Clippy-letter.PNG)

### Windows 98

We decided to style the extension popup similar to a Windows 98 window, from the era where Clippy is from. The gradient colors for the title bar are inspired by [Win98js](https://98.js.org/).

*Wikihow windows 98 image*

[wikihow.com/install-windows-98](https://www.wikihow.com/Install-Windows-98)