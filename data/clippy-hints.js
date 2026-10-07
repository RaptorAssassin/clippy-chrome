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

  // Dev sites
  github: [
    {
      message:
        "Did you know? If you name a repository the same name as your GitHub username, it's README.md file will be displayed on your profile page.",
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
  ],

  // Other sites
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
        "The first Youtube video is titled 'Me at the zoo'. It shows the creator in the Zoo, talking about elephants.",
      weight: 1,
    },
    {
      message: 'Subscribe to @Cow_Aeronautics and @karl-albrecht',
      weight: 1,
    },
    {
      message: 'stop scrolling pls',
      weight: 3,
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
}

export const DEFAULT_HINTS = [
  // Clippy-related hints
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
      "Little history funfact: I was first created in 1997, but removed in 2007 for being 'too annoying', but I am back now, and better than ever!",
    weight: 3,
  },

  // General hints
  {
    message: 'Do your homework!',
    weight: 1,
  },
]
