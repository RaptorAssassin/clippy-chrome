/* 
hint shape:

{
    "message": "Message Content",
    "weight": 100
}
*/

export const DEFAULT_WEIGHT = 1

export const AI_HINTS = [
  {
    message: 'Clippy never hallucinates!',
    weight: 1,
  },
]

export const WEBSITE_HINTS = {
  // AI sites
  chatgpt: [
    ...AI_HINTS,
    {
      message: 'GET OFF CHATGPT.',
      weight: 1,
    },
    {
      message: 'At least use a different AI',
      weight: 2,
    },
  ],
  claude: [
    ...AI_HINTS,
    {
      message: 'Claude is a great AI, but I am better!',
      weight: 1,
    },
    {
      message: "I love hanging out with Clawd, he's a great guy!",
      weight: 1,
    },
  ],
  deepseek: [
    ...AI_HINTS,
    {
      message:
        "Taiwan's a countr... Sorry, this is beyond my current scope. Let's talk about something else.",
      weight: 1,
    },
  ],
  copilot: [
    {
      message: 'Copilot... I am your father',
      weight: 1,
    },
    {
      message: 'say hi to copiilot for me',
      weight: 1,
    },
  ],
  grok: [
    {
      message: '*clippy grows agitated*',
      weight: 1,
    },
    {
      message: 'EVEN CHATGPT IS BETTER THAN THIS.',
      weight: 1,
    },
  ],
  gemini: [...AI_HINTS],

  // Dev sites
  github: [
    {
      message:
        "Did you know? If you name a repository the same name as your GitHub username, it's README.md file will be displayed on your profile page, and if you host with Github Pages, it will have no / in the URL!",
      weight: 1,
    },
    {
      message:
        "You can use GitHub's 'gist' feature to share code snippets with other devs. Just go to gist.github.com and create a new gist.",
      weight: 1,
    },
    {
      message:
        "If you're a student, check out the Github Student Developer Pack! There are a lot of free tools and learning resources for you to check out.",
      weight: 1,
    },
  ],
  stackoverflow: [
    {
      message:
        'Still using Stack Overflow? You must be one of the last people to do so. This used to be the go-to place for devs!',
      weight: 1,
    },
  ],
  leetcode: [
    {
      message: 'Good luck grinding!',
      weight: 1,
    },
    {
      message: 'Have you beaten the daily problem yet?',
      weight: 1,
    },
    {
      message: 'Who even does SQL problems on LeetCode?',
      weight: 1,
    },
  ],
  neetcode: [
    {
      message: 'Good luck grinding!',
      weight: 1,
    },
    {
      message: 'NeetCode is the better LeetCode.',
      weight: 1,
    },
    {
      message:
        "You need to check out NeetCode's YouTube channel for explanation videos, it's great!",
      weight: 1,
    },
    {
      message: 'I love NeetCode 150',
      weight: 1,
    },
  ],

  // Social media
  slack: [
    {
      message:
        'Slack was originally created as an interal messaging app for a failed browser game, but the devs liked it so much, they made it public!',
      weight: 1,
    },
    {
      message: 'I prefer MS Teams, but Slack looks pretty solid as well',
      weight: 1,
    },
  ],
  discord: [
    {
      message:
        'Before becoming a quintessential gaming app, Discord was just an in game chat feature for the mobile game "Fates Forever"!',
      weight: 2,
    },
    {
      message: 'Say hi to Wumpus for me!',
      weight: 1,
    },
  ],
  youtube: [
    {
      message: 'Tomska > Mr. Beast',
      weight: 1,
    },
    {
      message: 'You can only "hype" a video on mobile',
      weight: 3,
    },
    {
      message:
        "The first Youtube video is titled 'Me at the zoo'. It shows jawed in the Zoo, talking about elephants.",
      weight: 1,
    },
    {
      message: 'Subscribe to @Cow_aeronautics and @karl-albrecht',
      weight: 2,
    },
    {
      message: 'stop scrolling pls',
      weight: 3,
    },
  ],
  tiktok: [
    {
      message: 'Stop scrolling!',
      weight: 1,
    },
  ],
  instagram: [
    {
      message: 'Are you doomscrolling reels? Stop it!',
      weight: 1,
    },
  ],
  facebook: [
    {
      message: 'Are you a boomer by any chance? What are you doing on here?',
      weight: 1,
    },
  ],

  // Other sites
  steampowered: [
    // Steam
    {
      message: 'Steam Sales are goated',
      weight: 1,
    },
    {
      message: 'Has anyone made a cool Clippy game yet?',
      weight: 1,
    },
  ],
  pcpartpicker: [
    {
      message: "Let's build a cool PC!",
      weight: 1,
    },
  ],
  makerworld: [
    {
      message: 'You should use printables.com',
      weight: 1,
    },
    {
      message: '🐼️🥼️ = Bambu Labs',
      weight: 2,
    },
  ],
  hackclub: [
    {
      message: 'YAYAYAYAYAYAYAYAYAY',
      weight: 1,
    },
    {
      message: 'JOIN HACKCLUB NOW',
      weight: 2,
    },
  ],
  onshape: [
    {
      message: 'Onshape is peak',
      weight: 1,
    },
    {
      message:
        'Fun fact: in onshape, you can import from any public onshape document! Just select "Import Derived", "Other", "Public", and search for what you want!',
      weight: 3,
    },
  ],
  amazon: [
    {
      message: 'R E T A I L  T H E R A P Y',
      weight: 2,
    },
    {
      message: 'jeffry... jeffry bezos',
      weight: 1,
    },
    {
      message: 'Buy some new paperclips!',
      weight: 1,
    },
  ],
  fullcontrol: [
    {
      message:
        'Fullcontrol allows you to generate gCodes that let you print without layers!',
      weight: 2,
    },
    {
      message: 'peak',
      weight: 1,
    },
  ],
  ankergames: [
    {
      message: 'YAR HAR HAR',
      weight: '1',
    },
  ],
  aliexpress: [
    {
      message: 'Fun fact! Aliexpress is a part of Alibaba, an online wholesale',
      weight: 1,
    },
  ],
  elegoo: [
    {
      message: 'YAYAY ELEGOO IS PEAK',
      weight: 1,
    },
    {
      message:
        'While known for their 3D printers, Elegoo also manufactures excellent Arduino devboards. You should check them out!',
      weight: 3,
    },
  ],
  nvidia: [
    {
      message: 'Team red all the way!',
      weight: 1,
    },
    {
      message:
        'Why are you looking for a graphics card when you can have Clippy even on a simple office PC?!',
      weight: 1,
    },
  ],
  samsung: [
    {
      message:
        'smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. smasnug. ',
      weight: 1,
    },
    {
      message:
        'Fun(?) fact! Different devisions of Samsung make Tanks, Cargo ships, and THE BURJ KHALIFA. THE TALLEST TOWER IN THE WORLD IS SAMSUNG',
      weight: 5,
    },
  ],
  pkcell: [
    {
      message: 'OH MY PKCELLS (peak reference)',
      weight: 1,
    },
  ],
  bing: [
    {
      message: 'erm.. let me bing that real quick',
      weight: 1,
    },
  ],
  wikipedia: [
    {
      message: 'Can I assist you with your research?',
      weight: 1,
    },
  ],
  weather: [
    {
      message: "Today's forcast: Cloudy with a chance of Slop",
      weight: 1,
    },
    {
      message: "Let's hope it doesn't rain!",
      weight: 1,
    },
  ],
  walmart: [
    {
      message: 'Visiting the barrier shoppe, I see',
      weight: 1,
    },
    {
      message:
        "Walmart's mascot, smiley, was made in the 90s, retired from 2006-2016, and is here to help you shop again today",
      weight: 3,
    },
  ],
  theuslessweb: [
    {
      message: "Glad I'm not on there...",
      weight: 1,
    },
  ],
  printables: [
    {
      message: 'Printables is peak',
      weight: 1,
    },
  ],
  modrinth: [
    {
      message: 'Create Aeronautics is the best mod ever',
      weight: 1,
    },
  ],
  curseforge: [
    {
      message: 'Modrinth > Curseforge',
      weight: 1,
    },
  ],
  firstinspires: [
    {
      message: 'You should join your local first team!',
      weight: 1,
    },
  ],
  mcdonalds: [
    {
      message: "ba-da-ba-ba-ba, I'm lovin' it",
      weight: 1,
    },
  ],
  blooket: [
    {
      message: 'hot take: blooket > kahoot',
      weight: 1,
    },
  ],
  wendys: [
    {
      message: 'get me some nuggs plsss',
      weight: 1,
    },
  ],
  minecraft: [
    {
      message: 'minceraft',
      weight: 1,
    },
    {
      message:
        "I love Axolotls, they're so cute! Have you found the rare colored one yet?",
      weight: 1,
    },
    {
      message: 'zshhhhh... BOOM!',
      weight: 1,
    },
  ],
  neal: [
    {
      message: 'it may be neal, but is it fun?',
      weight: 1,
    },
  ],
  geoguessr: [
    {
      message: 'Where am I??',
      weight: 1,
    },
  ],
  memorizeearth: [
    {
      message: 'Ima memorize mars',
      weight: 1,
    },
  ],
  seterra: [
    {
      message: 'this is just worse geoguessr',
      weight: 1,
    },
  ],
  excalidraw: [
    {
      message: 'What are you drawing? Maybe draw me a little paperclip buddy?',
      weight: 1,
    },
    {
      message: 'What are you planning?',
      weight: 1,
    },
  ],
}

export const DEFAULT_HINTS = [
  // Clippy-related hints
  {
    message: "pls don't disable me",
    weight: 1,
  },
  {
    message:
      'Did you know? You can use the Clippy extension to get "helpful" hints on any website you visit.',
    weight: 3,
  },
  {
    message:
      'Click the Clippy icon in your browser extension menu to change some settings for me.',
    weight: 2,
  },
  {
    message:
      "I am an open-source project! You can find the link to my GitHub repository in the extension's settings.",
    weight: 2,
  },
  {
    message:
      'Hey! If you downloaded me from the Chrome Web Store, please leave a positive review! It helps me out a lot!',
    weight: 2,
  },
  {
    message:
      "Little history fun fact: I was first created in 1997, but removed in 2007 for being 'too annoying', but I am back now, and better than ever!",
    weight: 3,
  },

  // General hints
  {
    message: 'Do your homework!',
    weight: 1,
  },
]
