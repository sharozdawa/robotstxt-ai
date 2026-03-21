<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=220&section=header&text=robotstxt.ai&fontSize=48&fontColor=22c55e&fontAlignY=35&desc=Visual%20robots.txt%20Manager%20for%20AI%20Crawlers&descSize=16&descColor=ffffff&descAlignY=55&animation=fadeIn" width="100%" />

<br />

![npm](https://img.shields.io/npm/v/robotstxt-ai-mcp?style=flat-square&color=22c55e)
![GitHub stars](https://img.shields.io/github/stars/sharozdawa/robotstxt-ai?style=flat-square&color=22c55e)
![License](https://img.shields.io/github/license/sharozdawa/robotstxt-ai?style=flat-square)

**Manage which AI bots can crawl your website — visually.**

Toggle GPTBot, ClaudeBot, PerplexityBot, and 20+ AI crawlers on/off with a simple UI. Analyze any site's robots.txt instantly.

</div>

---

## Features

- **Visual Toggle UI** — Block or allow AI bots with simple on/off switches
- **20+ AI Bots Database** — GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Diffbot, cohere-ai, Amazonbot, Meta-ExternalAgent, and more
- **Analyze Existing robots.txt** — Paste or fetch any robots.txt to see which AI bots are blocked
- **Generate robots.txt** — Create a complete robots.txt with your chosen rules
- **MCP Server** — Use with Claude Desktop, Cursor, or any MCP-compatible AI assistant
- **Check Bot Status** — Verify if a specific bot is blocked on any website

## MCP Tools

| Tool | Description |
|------|-------------|
| `fetch_robots` | Fetch and analyze a robots.txt from any URL |
| `analyze_robots` | Analyze pasted robots.txt content for AI bot blocking status |
| `generate_robots` | Generate a robots.txt with specified blocked bots and custom rules |
| `list_ai_bots` | List all known AI bots with user-agents, companies, and descriptions |
| `check_bot_status` | Check if a specific bot is blocked on a given website |

## Installation

### Web App

```bash
git clone https://github.com/sharozdawa/robotstxt-ai.git
cd robotstxt-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### MCP Server — Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "robotstxt-ai": {
      "command": "npx",
      "args": ["-y", "robotstxt-ai-mcp"]
    }
  }
}
```

### MCP Server — Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "robotstxt-ai": {
      "command": "npx",
      "args": ["-y", "robotstxt-ai-mcp"]
    }
  }
}
```

## Tracked Bots

The server knows about 25+ bots including:

- **AI Crawlers**: GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Diffbot, cohere-ai, Amazonbot, Meta-ExternalAgent
- **AI Search**: ChatGPT-User, OAI-SearchBot, PerplexityBot, YouBot
- **Search Engines**: Googlebot, Bingbot, YandexBot, Baiduspider, DuckDuckBot

## Why robotstxt.ai vs Manual Editing

| Feature | robotstxt.ai | Manual Editing |
|---------|-------------|----------------|
| Visual toggle UI | Yes | No |
| 20+ AI bots database | Yes | Research yourself |
| Analyze existing robots.txt | Yes | No |
| MCP Server | Yes | No |
| Price | Free | Free but tedious |

## More Open Source SEO Tools

| Tool | Description |
|------|-------------|
| [awesome-seo-mcp-servers](https://github.com/sharozdawa/awesome-seo-mcp-servers) | Curated list of SEO MCP servers and agent skills |
| [indexnow-mcp](https://github.com/sharozdawa/indexnow-mcp) | Instant URL indexing via IndexNow |
| [schema-gen](https://github.com/sharozdawa/schema-gen) | Schema.org JSON-LD markup generator |
| [ai-visibility](https://github.com/sharozdawa/ai-visibility) | AI brand visibility tracker |

## License

MIT

---

<div align="center">

Built by **[Sharoz Dawa](https://sharozdawa.com)** — SEO Professional & Digital Marketing Expert

[![GitHub](https://img.shields.io/badge/GitHub-@sharozdawa-181717?style=flat-square&logo=github)](https://github.com/sharozdawa)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=100&section=footer" width="100%" />

</div>
