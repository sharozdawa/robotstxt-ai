# Hacker News — Show HN

## Title

Show HN: robotstxt.ai – Visual robots.txt manager for 20+ AI crawlers (open source)

## Comment

I built a tool to manage robots.txt rules for AI crawlers because the manual approach stopped scaling.

There are now 20+ distinct AI crawler user-agents — GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, Bytespider, Meta-ExternalAgent, Meta-ExternalFetcher, CCBot, Amazonbot, cohere-ai, Applebot-Extended, and more. Each company has its own user-agent strings, some have multiple, and they keep adding new ones. Getting the robots.txt right by hand is tedious and error-prone.

robotstxt.ai does two things:

**Generate** — Toggle individual AI crawlers on/off from a visual list, add your sitemap URL and any custom rules, and get a valid robots.txt you can copy or download.

**Analyze** — Enter any URL (or paste raw robots.txt content) and see which of the 20+ known AI bots are blocked vs. allowed. Useful for auditing your own site or checking how others handle AI crawlers.

It also ships with an MCP server, so AI coding tools that support the Model Context Protocol (Claude Code, Cursor, etc.) can programmatically parse and generate robots.txt files.

Tech stack: Next.js, TypeScript, Tailwind. No database, no auth, no server-side state. The bot database is a typed array in the source code — easy to contribute new crawlers via PR.

Live: https://robotsai.sharozdawa.com
Source: https://github.com/sharozdawa/robotstxt-ai
License: MIT

Happy to hear feedback on missing crawlers, edge cases in the parser, or features that would be useful.
