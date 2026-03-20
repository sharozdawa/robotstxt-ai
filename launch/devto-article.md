# Dev.to Article

## Title

I built an open-source visual robots.txt manager for the AI crawler era

## Tags

webdev, opensource, ai, seo

## Cover Image Suggestion

A dark-themed screenshot of the robotstxt.ai Generate tab showing the bot toggle cards with some bots blocked (red) and some allowed (green). Alternatively, a split screenshot showing the Generate tab on the left and the Analyze tab results on the right.

---

## Article

There are over 20 AI crawlers actively scraping the web right now. GPTBot, ClaudeBot, PerplexityBot, Bytespider, Google-Extended, Meta-ExternalAgent — the list keeps growing. Every major AI company has at least one bot, and some have three.

If you own a website, these bots are almost certainly hitting it. The only control mechanism most site owners have is `robots.txt`. But writing robots.txt rules for AI crawlers means knowing the exact user-agent string for each bot, understanding the difference between a training crawler and an AI search retriever, and keeping up as new bots appear.

I got tired of Googling user-agent strings, so I built [robotstxt.ai](https://robotsai.sharozdawa.com) — a free, open-source tool to generate and analyze robots.txt files with AI crawlers in mind.

### The problem in more detail

The traditional robots.txt workflow was simple. You had Googlebot, Bingbot, maybe a few others. You wrote your rules once and forgot about them.

That stopped working around 2023. Here's a partial list of AI-related user-agents you might want to manage today:

| Bot | Company | Purpose |
|-----|---------|---------|
| GPTBot | OpenAI | Training data collection |
| ChatGPT-User | OpenAI | ChatGPT web browsing |
| OAI-SearchBot | OpenAI | SearchGPT crawler |
| ClaudeBot | Anthropic | Training data collection |
| anthropic-ai | Anthropic | General web crawler |
| Google-Extended | Google | Gemini training (does NOT affect Google Search) |
| PerplexityBot | Perplexity | Real-time search answers |
| Bytespider | ByteDance | TikTok / AI model training |
| Meta-ExternalAgent | Meta | AI training data collection |
| Meta-ExternalFetcher | Meta | AI product features |
| CCBot | Common Crawl | Dataset used by many AI companies |
| Amazonbot | Amazon | Alexa AI and product search |
| Applebot-Extended | Apple | Apple Intelligence / Siri training |
| cohere-ai | Cohere | AI model training |

And that's not all of them. The tool tracks 20+ bots across these categories.

The nuance matters too. Blocking `GPTBot` stops OpenAI from using your content for training, but blocking `ChatGPT-User` means ChatGPT won't be able to browse your site when a user asks it to. Blocking `Google-Extended` opts you out of Gemini training but has zero effect on your Google Search rankings. These are different decisions with different trade-offs.

### What robotstxt.ai does

The tool has two main features:

**Generate**

All 20+ AI crawlers are displayed as visual cards showing the bot name, company, type (AI Crawler, AI Search, Search Engine), user-agent string, and a link to the official documentation. Each bot has a toggle switch.

Turn on blocking for the bots you want to exclude, optionally add your sitemap URL and any custom rules, and hit Generate. You get a properly formatted robots.txt with syntax highlighting, line numbers, copy-to-clipboard, and a download button.

There are also bulk actions — "Block All AI Crawlers" and "Allow All AI Crawlers" — for when you want to set a blanket policy and then fine-tune from there.

**Analyze**

Enter any URL and the tool fetches that site's robots.txt, parses it, and maps every rule against the known AI bot database. You get a visual report showing:

- Total bots tracked
- How many are allowed vs. blocked
- Each bot's status with the specific rules that affect it

You can also paste raw robots.txt content directly if you want to analyze a file without fetching it from a live URL.

I've found the Analyze feature surprisingly useful for competitive research. Checking how major publishers, news sites, and tech companies handle AI crawlers reveals some interesting patterns.

### Technical implementation

The stack is straightforward:

- **Next.js 16** with the App Router
- **React 19** with client components for the interactive UI
- **TypeScript** throughout
- **Tailwind CSS 4** for styling
- No database, no authentication, no external APIs (beyond a simple proxy endpoint for fetching remote robots.txt files)

The parser (`src/lib/parser.ts`) handles standard robots.txt directives — `User-agent`, `Allow`, `Disallow`, and `Sitemap`. It groups rules by user-agent block and correctly handles wildcard (`*`) matching.

The bot database (`src/lib/bots.ts`) is a typed array of objects. Each bot has a name, user-agent string, company, type classification, description, documentation URL, and a default block recommendation. Adding a new crawler is literally adding an object to this array.

No environment variables are required. Clone it, `npm install`, `npm run dev`, and you're running.

### MCP server

The project also includes an MCP (Model Context Protocol) server in the `mcp-server/` directory. If you use AI coding tools like Claude Code or Cursor that support MCP, you can add this server to expose robots.txt operations as tools your AI assistant can call.

This means you can ask your AI coding assistant to analyze a site's robots.txt, generate one with specific rules, or check if a particular bot is blocked — all without leaving your editor.

### Self-hosting

```bash
git clone https://github.com/sharozdawa/robotstxt-ai
cd robotstxt-ai
npm install
npm run dev
```

That's the entire setup. The app runs at `localhost:3000` by default.

For the MCP server:

```bash
cd mcp-server
npm install
npm run build
```

### What's next

The bot database is the most valuable part of this project, and it needs to stay current. AI companies launch new crawlers regularly, and existing ones change behavior. I plan to keep updating the database as new bots emerge.

If you know of an AI crawler that's missing from the list, PRs are welcome — it's a single file edit.

### Links

- **Live tool:** [robotsai.sharozdawa.com](https://robotsai.sharozdawa.com)
- **GitHub:** [github.com/sharozdawa/robotstxt-ai](https://github.com/sharozdawa/robotstxt-ai)
- **License:** MIT

---

Built by [Sharoz Dawa](https://sharozdawa.com). If you find it useful, a GitHub star would be appreciated.
