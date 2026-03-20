# Product Hunt Launch

## Tagline
Visual robots.txt manager for AI crawlers. Open source.

## Description

**Paragraph 1:**
AI companies are crawling your website right now. GPTBot, ClaudeBot, PerplexityBot, Bytespider, Meta-ExternalAgent — there are over 20 AI crawlers actively scraping the web, and most website owners have no idea which ones are hitting their site or how to control them. The standard approach is to manually edit a robots.txt file and hope you got the user-agent strings right. That's not good enough anymore.

**Paragraph 2:**
robotstxt.ai is a free, open-source visual tool that lets you see every known AI crawler in one place, toggle each one on or off with a single click, and generate a production-ready robots.txt file in seconds. It also works in reverse — paste any URL and instantly analyze which AI bots that site is currently blocking or allowing.

**Paragraph 3:**
No sign-up, no paywall, no tracking. It's a Next.js app you can self-host or use directly at robotsai.sharozdawa.com. There's also an MCP server so you can integrate robots.txt analysis directly into your AI coding workflow with tools like Claude Code or Cursor.

## First Comment as Maker

Hey everyone, Sharoz here.

I built robotstxt.ai because I got tired of Googling user-agent strings every time I needed to update a robots.txt file. The AI crawler landscape changes fast — new bots appear constantly, and keeping track of which company uses which user-agent string is genuinely tedious.

So I put together a visual tool that catalogs 20+ AI crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Bytespider, Meta-ExternalAgent, and more), lets you toggle each one, and spits out a clean robots.txt you can copy or download.

The Analyze tab is the part I use most myself — drop in any URL and see exactly which AI bots a site is blocking. Useful for competitive research or just sanity-checking your own setup.

The whole thing is MIT-licensed and the source is on GitHub. Would love to hear what crawlers I'm missing from the database or what features would make this more useful for your workflow.

## 3 Key Features

1. **Visual Bot Toggle** — 20+ AI crawlers cataloged with company, type, and documentation links. Toggle each one on/off and generate a valid robots.txt instantly. Includes GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Bytespider, Meta-ExternalAgent, CCBot, and more.

2. **Instant Analyzer** — Enter any URL or paste a robots.txt file and immediately see which AI bots are blocked vs. allowed, with a clear visual breakdown. No more guessing whether your robots.txt actually does what you think it does.

3. **MCP Server Integration** — Ships with an MCP (Model Context Protocol) server so AI coding tools like Claude Code or Cursor can parse, analyze, and generate robots.txt files programmatically. Bring robots.txt management into your AI-assisted dev workflow.

## Topics / Tags

- Developer Tools
- Open Source
- SEO
- Artificial Intelligence
- Web Development
