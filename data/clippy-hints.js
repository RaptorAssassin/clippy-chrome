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

export const CLAUDE_HINTS = [
  ...AI_HINTS,
  { message: 'Claude is a great AI, but I am better!', weight: 1 },
  { message: "I love hanging out with Clawd, he's a great guy!", weight: 1 },
]

export const WEBSITE_HINTS = {
  // AI sites
  'chatgpt.com': [
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
  'claude.com': [...CLAUDE_HINTS],
  'claude.ai': [...CLAUDE_HINTS],
  'deepseek.com': [
    ...AI_HINTS,
    {
      message:
        "Taiwan's a countr... Sorry, this is beyond my current scope. Let's talk about something else.",
      weight: 1,
    },
  ],
  'copilot.com': [
    {
      message: 'Copilot... I am your father',
      weight: 1,
    },
    {
      message: 'say hi to copiilot for me',
      weight: 1,
    },
  ],

  // Other sites
  'github.com': [
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
  'youtube.com': [
    {
      message: 'Tomska > Mr. Beast',
      weight: 1,
    },
    {
      message: "You can only 'hype' a video on mobile",
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
  'makerworld.com': [
    {
      message: 'You should use printables.com',
      weight: 1,
    },
    {
      message: '🐼️🥼️ = Bambu Labs',
      weight: 2,
    },
  ],
  'hackclub.com': [
    {
      message: 'YAYAYAYAYAYAYAYAYAY',
      weight: 1,
    },
    {
      message: 'JOIN HACKCLUB NOW',
      weight: 2,
    },
  ],
  'onshape.com': [
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
  'amazon.com': [
    {
      message: 'R E T A I L  T H E R A P Y',
      weight: 2,
    },
    {
      message: 'jeffry... jeffry bezos',
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
      "Little history funfact: I was first created in 1997, but removed in 2007 for being 'too annoying', but I am back now, and better than ever!",
    weight: 3,
  },
  {
    message:
      "I am an open-source project! You can find the link to my GitHub repository in the extension's settings.",
    weight: 2,
  },
  // General hints
  {
    message: 'Do your homework!',
    weight: 1,
  },
]
