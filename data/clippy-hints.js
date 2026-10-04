/* 
hint shape:

{
    "message": "Message Content",
    "weight": 100
}
*/

export const DEFAULT_WEIGHT = 1

export const WEBSITE_HINTS = {
    "github.com": [
        {
            "message": "Did you know? If you name a repository the same name as your GitHub username, it's README.md file will be displayed on your profile page.",
            "weight": 3
        },
        {
            "message": "You can use GitHub's 'gist' feature to share code snippets and notes with others. Just go to gist.github.com and create a new gist.",
            "weight": 1
        }
    ],
}

export const DEFAULT_HINTS = [
    {
        "message": "Did you know? You can use the Clippy extension to get helpful hints on any website you visit.",
        "weight": 1
    }
]