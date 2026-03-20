# Reddit — r/ClaudeAI

## Title

Built an open-source robots.txt manager for AI crawlers — includes an MCP server for Claude Code

## Body

I put together a tool called **robotstxt.ai** that helps manage robots.txt rules for AI crawlers, and I wanted to share it here because it ships with an MCP server that works with Claude Code and other MCP-compatible tools.

**The problem:** There are now 20+ AI crawler user-agents — GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, Bytespider, Meta-ExternalAgent, CCBot, and plenty of others. Every AI company has at least one, some have three. Keeping your robots.txt up to date with the right user-agent strings is a chore.

**The web tool** (https://robotsai.sharozdawa.com) gives you a visual interface to toggle each AI crawler on/off and generate a production-ready robots.txt. You can also analyze any website's robots.txt to see which AI bots it's blocking.

**The MCP server** is what I think this community will find most interesting. It's a standalone Model Context Protocol server that exposes robots.txt parsing, analysis, and generation as tools. You can add it to your Claude Code or Cursor setup and then do things like:

- Ask Claude to "analyze the robots.txt for example.com" and it'll fetch, parse, and report which AI bots are blocked
- Ask it to "generate a robots.txt that blocks all AI training crawlers but allows AI search bots" and it'll produce the right output
- Use it as part of a larger workflow — e.g., during a site deployment, have Claude check that your robots.txt matches your intended policy

The MCP server is in the `mcp-server/` directory of the repo. It uses the official `@modelcontextprotocol/sdk` package.

**Setup for Claude Code:**

Add to your MCP config:
```json
{
  "mcpServers": {
    "robotstxt-ai": {
      "command": "node",
      "args": ["path/to/robotstxt-ai/mcp-server/dist/index.js"]
    }
  }
}
```

Everything is open source under MIT license.

**Live:** https://robotsai.sharozdawa.com
**GitHub:** https://github.com/sharozdawa/robotstxt-ai

Interested to hear if anyone has been thinking about robots.txt management as part of their Claude workflow, or if there are other MCP tools you'd want for web/SEO tasks.
