# Twitter/X Thread

## Tweet 1
There are 20+ AI crawlers scraping your website right now.

GPTBot, ClaudeBot, PerplexityBot, Bytespider, Meta-ExternalAgent...

I built a free, open-source tool to manage them all from one place.

robotstxt.ai — a visual robots.txt manager for the AI era.

Thread:

## Tweet 2
The problem: every AI company has its own crawler with its own user-agent string. OpenAI alone has three (GPTBot, ChatGPT-User, OAI-SearchBot).

Writing robots.txt rules by hand means Googling user-agent strings and hoping you didn't miss any. It doesn't scale.

## Tweet 3
robotstxt.ai catalogs every known AI crawler in one visual interface.

Each bot shows the company, type (training crawler vs. AI search), and exact user-agent string.

Toggle each one on or off. Generate a clean robots.txt. Copy or download it.

That's it.

## Tweet 4
The Analyze feature is the part I use most.

Enter any URL and instantly see which AI bots that site is blocking vs. allowing.

Useful for:
- Auditing your own robots.txt
- Checking competitor policies
- Spotting AI crawlers you forgot about

## Tweet 5
Important nuance most people miss:

Blocking GPTBot stops training, but blocking ChatGPT-User stops web browsing citations.

Blocking Google-Extended opts out of Gemini training but does NOT affect Google Search.

These are different decisions. The tool makes the distinction clear.

## Tweet 6
It also ships with an MCP server.

If you use Claude Code or Cursor, you can add it as a tool and parse/generate robots.txt files from your AI coding workflow.

Everything is MIT-licensed and open source.

## Tweet 7
Try it: robotsai.sharozdawa.com
Source: github.com/sharozdawa/robotstxt-ai

No sign-up. No paywall. No tracking.

If I'm missing a crawler from the database, PRs welcome.

#opensource #webdev #SEO #AI #robotstxt
