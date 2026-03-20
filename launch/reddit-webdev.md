# Reddit — r/webdev

## Title

Open source tool to generate and analyze robots.txt for AI crawlers — built with Next.js + TypeScript

## Body

I got annoyed looking up AI crawler user-agent strings every time I needed to update a robots.txt, so I built a tool for it.

**robotstxt.ai** is a visual robots.txt generator and analyzer focused on AI crawlers. It catalogs 20+ bots — GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Bytespider, Meta-ExternalAgent, CCBot, Amazonbot, cohere-ai, and more — and lets you toggle each one to generate a valid robots.txt file.

**What it does:**

- **Generate tab:** All known AI crawlers listed with their actual user-agent strings, company, and type (training crawler vs. AI search bot). Toggle on/off, add sitemap URL and custom rules, get a robots.txt you can copy or download.
- **Analyze tab:** Enter a URL or paste raw robots.txt content. It fetches the file, parses it, and shows which of the 20+ AI bots are blocked vs. allowed with a visual breakdown.
- **MCP server:** Ships with a Model Context Protocol server, so if you use Claude Code, Cursor, or similar AI coding tools, you can parse and generate robots.txt files from your editor.

**Tech stack:**

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS 4
- No database, no auth, no external API calls (except the proxy endpoint for fetching remote robots.txt files)
- Bot database is a typed array in `src/lib/bots.ts` — dead simple to add new crawlers

**Self-hosting:**

```
git clone https://github.com/sharozdawa/robotstxt-ai
cd robotstxt-ai
npm install
npm run dev
```

That's it. No environment variables needed.

The parser handles the standard robots.txt spec — User-agent, Allow, Disallow, Sitemap directives. It groups rules correctly and handles wildcard (`*`) user-agent matching.

**Live demo:** https://robotsai.sharozdawa.com
**Source:** https://github.com/sharozdawa/robotstxt-ai
**License:** MIT

If you want to add a missing crawler, it's literally adding an object to an array in `bots.ts` — PRs welcome.

Happy to answer questions about the implementation or take feature requests.
