# robotstxt-ai MCP Server

An MCP (Model Context Protocol) server that provides tools for parsing, analyzing, and generating robots.txt files with a focus on AI bot detection.

## Tools

| Tool | Description |
|------|-------------|
| `fetch_robots` | Fetch and analyze a robots.txt from any URL. Shows which AI bots are blocked/allowed. |
| `analyze_robots` | Analyze pasted robots.txt content for AI bot blocking status. |
| `generate_robots` | Generate a robots.txt with specified blocked bots, sitemaps, and custom rules. |
| `list_ai_bots` | List all known AI bots with user-agents, companies, and descriptions. |
| `check_bot_status` | Check if a specific bot is blocked on a given website. |

## Tracked Bots

The server knows about 25+ bots including:

- **AI Crawlers**: GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Diffbot, cohere-ai, Amazonbot, Meta-ExternalAgent, and more
- **AI Search**: ChatGPT-User, OAI-SearchBot, PerplexityBot, YouBot
- **Search Engines**: Googlebot, Bingbot, YandexBot, Baiduspider, DuckDuckBot

## Installation

```bash
cd mcp-server
npm install
npm run build
```

## Usage with Claude Desktop

Add this to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "robotstxt-ai": {
      "command": "node",
      "args": ["/absolute/path/to/robotstxt-ai/mcp-server/dist/index.js"]
    }
  }
}
```

## Usage with Cursor

Add to your Cursor MCP settings (`.cursor/mcp.json` in your project or global config):

```json
{
  "mcpServers": {
    "robotstxt-ai": {
      "command": "node",
      "args": ["/absolute/path/to/robotstxt-ai/mcp-server/dist/index.js"]
    }
  }
}
```

## Usage with Claude Code

```bash
claude mcp add robotstxt-ai node /absolute/path/to/robotstxt-ai/mcp-server/dist/index.js
```

## Usage via npx (after publishing)

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

## Example Tool Calls

### Fetch and analyze a site's robots.txt

```
fetch_robots({ url: "https://nytimes.com" })
```

### Analyze pasted content

```
analyze_robots({
  content: "User-agent: GPTBot\nDisallow: /\n\nUser-agent: *\nAllow: /"
})
```

### Generate a robots.txt blocking all AI crawlers

```
generate_robots({
  block_all_ai: true,
  sitemap_urls: ["https://example.com/sitemap.xml"]
})
```

### Generate with specific bots blocked

```
generate_robots({
  blocked_bots: ["GPTBot", "ClaudeBot", "CCBot", "Bytespider"],
  sitemap_urls: ["https://example.com/sitemap.xml"],
  custom_rules: "User-agent: *\nCrawl-delay: 10"
})
```

### Check a specific bot

```
check_bot_status({ url: "https://nytimes.com", bot_name: "GPTBot" })
```

### List all known bots

```
list_ai_bots()
```

## Development

```bash
npm install
npm run build
npm start
```

## License

MIT
