#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ============================================================================
// Bot Database (inlined from robotstxt-ai/src/lib/bots.ts)
// ============================================================================

interface Bot {
  name: string;
  userAgent: string;
  company: string;
  type: "ai-crawler" | "ai-search" | "search-engine" | "social" | "other";
  description: string;
  docsUrl: string;
  defaultBlocked: boolean;
}

const AI_BOTS: Bot[] = [
  {
    name: "GPTBot",
    userAgent: "GPTBot",
    company: "OpenAI",
    type: "ai-crawler",
    description:
      "Used by OpenAI to crawl web pages for training data and ChatGPT web browsing",
    docsUrl: "https://platform.openai.com/docs/bots/gptbot",
    defaultBlocked: false,
  },
  {
    name: "ChatGPT-User",
    userAgent: "ChatGPT-User",
    company: "OpenAI",
    type: "ai-search",
    description:
      "ChatGPT browsing feature when users ask it to search the web",
    docsUrl: "https://platform.openai.com/docs/bots/chatgpt-user",
    defaultBlocked: false,
  },
  {
    name: "OAI-SearchBot",
    userAgent: "OAI-SearchBot",
    company: "OpenAI",
    type: "ai-search",
    description: "OpenAI's dedicated search crawler for SearchGPT",
    docsUrl: "https://platform.openai.com/docs/bots",
    defaultBlocked: false,
  },
  {
    name: "ClaudeBot",
    userAgent: "ClaudeBot",
    company: "Anthropic",
    type: "ai-crawler",
    description:
      "Used by Anthropic to crawl web content for Claude's training",
    docsUrl: "https://docs.anthropic.com/en/docs/about-claude/crawlers",
    defaultBlocked: false,
  },
  {
    name: "anthropic-ai",
    userAgent: "anthropic-ai",
    company: "Anthropic",
    type: "ai-crawler",
    description: "Anthropic's general web crawler",
    docsUrl: "https://docs.anthropic.com/en/docs/about-claude/crawlers",
    defaultBlocked: false,
  },
  {
    name: "Google-Extended",
    userAgent: "Google-Extended",
    company: "Google",
    type: "ai-crawler",
    description:
      "Controls access to content used for Gemini training (does NOT affect Google Search)",
    docsUrl:
      "https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers",
    defaultBlocked: false,
  },
  {
    name: "Gemini",
    userAgent: "Google-Safety",
    company: "Google",
    type: "ai-search",
    description: "Google's AI assistant web access",
    docsUrl:
      "https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers",
    defaultBlocked: false,
  },
  {
    name: "PerplexityBot",
    userAgent: "PerplexityBot",
    company: "Perplexity",
    type: "ai-search",
    description: "Perplexity AI's web crawler for real-time search answers",
    docsUrl: "https://docs.perplexity.ai/guides/perplexitybot",
    defaultBlocked: false,
  },
  {
    name: "CCBot",
    userAgent: "CCBot",
    company: "Common Crawl",
    type: "ai-crawler",
    description:
      "Common Crawl's bot -- dataset widely used for AI training by many companies",
    docsUrl: "https://commoncrawl.org/ccbot",
    defaultBlocked: false,
  },
  {
    name: "Bytespider",
    userAgent: "Bytespider",
    company: "ByteDance",
    type: "ai-crawler",
    description:
      "ByteDance's crawler used for TikTok and AI model training",
    docsUrl: "https://darkvisitors.com/agents/bytespider",
    defaultBlocked: true,
  },
  {
    name: "Diffbot",
    userAgent: "Diffbot",
    company: "Diffbot",
    type: "ai-crawler",
    description: "Web scraping and knowledge graph construction",
    docsUrl: "https://docs.diffbot.com/reference/crawl",
    defaultBlocked: false,
  },
  {
    name: "cohere-ai",
    userAgent: "cohere-ai",
    company: "Cohere",
    type: "ai-crawler",
    description: "Cohere's web crawler for AI model training",
    docsUrl: "https://docs.cohere.com/docs/web-crawler",
    defaultBlocked: false,
  },
  {
    name: "Amazonbot",
    userAgent: "Amazonbot",
    company: "Amazon",
    type: "ai-crawler",
    description: "Amazon's crawler for Alexa AI and product search",
    docsUrl: "https://developer.amazon.com/amazonbot",
    defaultBlocked: false,
  },
  {
    name: "Meta-ExternalAgent",
    userAgent: "Meta-ExternalAgent",
    company: "Meta",
    type: "ai-crawler",
    description: "Meta's crawler for AI training data collection",
    docsUrl: "https://developers.facebook.com/docs/sharing/bot",
    defaultBlocked: false,
  },
  {
    name: "Meta-ExternalFetcher",
    userAgent: "Meta-ExternalFetcher",
    company: "Meta",
    type: "ai-crawler",
    description: "Meta's fetcher for AI product features",
    docsUrl: "https://developers.facebook.com/docs/sharing/bot",
    defaultBlocked: false,
  },
  {
    name: "AppleBot-Extended",
    userAgent: "Applebot-Extended",
    company: "Apple",
    type: "ai-crawler",
    description:
      "Apple's crawler for Apple Intelligence and Siri training",
    docsUrl: "https://support.apple.com/en-us/111855",
    defaultBlocked: false,
  },
  {
    name: "YouBot",
    userAgent: "YouBot",
    company: "You.com",
    type: "ai-search",
    description: "You.com AI search engine crawler",
    docsUrl: "https://about.you.com/youbot/",
    defaultBlocked: false,
  },
  {
    name: "Timpibot",
    userAgent: "Timpibot",
    company: "Timpi",
    type: "ai-crawler",
    description: "Decentralized search engine and AI data crawler",
    docsUrl: "https://timpi.io",
    defaultBlocked: true,
  },
  {
    name: "Scrapy",
    userAgent: "Scrapy",
    company: "Open Source",
    type: "other",
    description: "Popular open-source web scraping framework",
    docsUrl: "https://scrapy.org",
    defaultBlocked: true,
  },
  {
    name: "img2dataset",
    userAgent: "img2dataset",
    company: "Open Source",
    type: "ai-crawler",
    description:
      "Image dataset collection tool commonly used for AI training",
    docsUrl: "https://github.com/rom1504/img2dataset",
    defaultBlocked: true,
  },
];

const SEARCH_ENGINE_BOTS: Bot[] = [
  {
    name: "Googlebot",
    userAgent: "Googlebot",
    company: "Google",
    type: "search-engine",
    description:
      "Google Search crawler -- blocking this removes you from Google Search",
    docsUrl:
      "https://developers.google.com/search/docs/crawling-indexing/googlebot",
    defaultBlocked: false,
  },
  {
    name: "Bingbot",
    userAgent: "Bingbot",
    company: "Microsoft",
    type: "search-engine",
    description: "Bing Search crawler",
    docsUrl:
      "https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0",
    defaultBlocked: false,
  },
  {
    name: "YandexBot",
    userAgent: "YandexBot",
    company: "Yandex",
    type: "search-engine",
    description: "Yandex search engine crawler",
    docsUrl:
      "https://yandex.com/support/webmaster/robot-workings/check-yandex-robots.html",
    defaultBlocked: false,
  },
  {
    name: "Baiduspider",
    userAgent: "Baiduspider",
    company: "Baidu",
    type: "search-engine",
    description: "Baidu search engine crawler (China)",
    docsUrl: "https://www.baidu.com/search/robots_english.html",
    defaultBlocked: false,
  },
  {
    name: "DuckDuckBot",
    userAgent: "DuckDuckBot",
    company: "DuckDuckGo",
    type: "search-engine",
    description: "DuckDuckGo search engine crawler",
    docsUrl: "https://duckduckgo.com/duckduckbot",
    defaultBlocked: false,
  },
];

const ALL_BOTS: Bot[] = [...AI_BOTS, ...SEARCH_ENGINE_BOTS];

// ============================================================================
// Parser / Generator Logic (inlined from robotstxt-ai/src/lib/parser.ts)
// ============================================================================

interface RobotsRule {
  userAgent: string;
  rules: { type: "allow" | "disallow"; path: string }[];
}

interface ParsedRobots {
  rules: RobotsRule[];
  sitemaps: string[];
  raw: string;
}

function parseRobotsTxt(content: string): ParsedRobots {
  const lines = content.split("\n").map((l) => l.trim());
  const rules: RobotsRule[] = [];
  const sitemaps: string[] = [];
  let currentRule: RobotsRule | null = null;

  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;

    const lower = line.toLowerCase();

    if (lower.startsWith("user-agent:")) {
      const ua = line.slice("user-agent:".length).trim();
      if (currentRule && currentRule.rules.length === 0) {
        currentRule.userAgent = ua;
      } else {
        currentRule = { userAgent: ua, rules: [] };
        rules.push(currentRule);
      }
    } else if (lower.startsWith("disallow:") && currentRule) {
      const path = line.slice("disallow:".length).trim();
      if (path) {
        currentRule.rules.push({ type: "disallow", path });
      }
    } else if (lower.startsWith("allow:") && currentRule) {
      const path = line.slice("allow:".length).trim();
      if (path) {
        currentRule.rules.push({ type: "allow", path });
      }
    } else if (lower.startsWith("sitemap:")) {
      const url = line.slice("sitemap:".length).trim();
      if (url) sitemaps.push(url);
    }
  }

  return { rules, sitemaps, raw: content };
}

interface BotStatus {
  bot: Bot;
  blocked: boolean;
  rules: string[];
}

function analyzeBots(parsed: ParsedRobots): BotStatus[] {
  return ALL_BOTS.map((bot) => {
    const matchingRules: string[] = [];
    let blocked = false;

    for (const rule of parsed.rules) {
      const ua = rule.userAgent.toLowerCase();
      if (ua === "*" || ua === bot.userAgent.toLowerCase()) {
        for (const r of rule.rules) {
          if (r.type === "disallow" && r.path === "/") {
            blocked = true;
            matchingRules.push(`Disallow: /`);
          } else if (r.type === "disallow") {
            matchingRules.push(`Disallow: ${r.path}`);
          } else if (r.type === "allow" && r.path === "/") {
            blocked = false;
            matchingRules.push(`Allow: /`);
          }
        }
      }
    }

    return { bot, blocked, rules: matchingRules };
  });
}

interface BotToggleState {
  [userAgent: string]: boolean;
}

function generateRobotsTxt(
  blockedBots: BotToggleState,
  sitemapUrls: string[],
  customRules: string
): string {
  const lines: string[] = [];

  lines.push("# robots.txt generated by robotstxt.ai");
  lines.push(`# Generated: ${new Date().toISOString().split("T")[0]}`);
  lines.push("");

  // Wildcard rule -- allow all by default
  lines.push("# Allow all crawlers by default");
  lines.push("User-agent: *");
  lines.push("Allow: /");
  lines.push("");

  // Group blocked bots
  const blocked = Object.entries(blockedBots).filter(
    ([, isBlocked]) => isBlocked
  );

  if (blocked.length > 0) {
    lines.push("# AI Crawlers - Blocked");
    for (const [userAgent] of blocked) {
      lines.push(`User-agent: ${userAgent}`);
      lines.push("Disallow: /");
      lines.push("");
    }
  }

  // Custom rules
  if (customRules.trim()) {
    lines.push("# Custom Rules");
    lines.push(customRules.trim());
    lines.push("");
  }

  // Sitemaps
  if (sitemapUrls.length > 0) {
    lines.push("# Sitemaps");
    for (const url of sitemapUrls) {
      if (url.trim()) {
        lines.push(`Sitemap: ${url.trim()}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ============================================================================
// Helper: Format bot status results for display
// ============================================================================

function formatBotAnalysis(statuses: BotStatus[]): string {
  const blocked = statuses.filter((s) => s.blocked);
  const allowed = statuses.filter((s) => !s.blocked);

  const lines: string[] = [];

  lines.push(`## Summary`);
  lines.push(
    `- **${blocked.length}** bots blocked out of **${statuses.length}** total known bots`
  );
  lines.push("");

  if (blocked.length > 0) {
    lines.push("## Blocked Bots");
    for (const s of blocked) {
      lines.push(
        `- **${s.bot.name}** (${s.bot.company}) - ${s.bot.type} - ${s.bot.description}`
      );
      if (s.rules.length > 0) {
        lines.push(`  Matching rules: ${s.rules.join(", ")}`);
      }
    }
    lines.push("");
  }

  lines.push("## Allowed Bots");
  for (const s of allowed) {
    lines.push(
      `- **${s.bot.name}** (${s.bot.company}) - ${s.bot.type} - ${s.bot.description}`
    );
  }

  return lines.join("\n");
}

// ============================================================================
// MCP Server
// ============================================================================

const server = new McpServer({
  name: "robotstxt-ai",
  version: "1.0.0",
});

// Tool 1: fetch_robots
server.tool(
  "fetch_robots",
  "Fetch and analyze a robots.txt file from a URL. Returns which AI bots are blocked or allowed.",
  {
    url: z
      .string()
      .url()
      .describe(
        "The website URL to fetch robots.txt from (e.g. https://example.com)"
      ),
  },
  async ({ url }) => {
    try {
      // Normalize URL to get robots.txt
      const parsedUrl = new URL(url);
      const robotsUrl = `${parsedUrl.protocol}//${parsedUrl.host}/robots.txt`;

      const response = await fetch(robotsUrl, {
        headers: {
          "User-Agent": "robotstxt-ai-mcp/1.0",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Failed to fetch robots.txt from ${robotsUrl}: HTTP ${response.status} ${response.statusText}`,
            },
          ],
        };
      }

      const content = await response.text();
      const parsed = parseRobotsTxt(content);
      const statuses = analyzeBots(parsed);

      const sitemapInfo =
        parsed.sitemaps.length > 0
          ? `\n## Sitemaps Found\n${parsed.sitemaps.map((s) => `- ${s}`).join("\n")}`
          : "";

      return {
        content: [
          {
            type: "text" as const,
            text: `# robots.txt Analysis for ${parsedUrl.host}\n\n${formatBotAnalysis(statuses)}${sitemapInfo}\n\n## Raw robots.txt\n\`\`\`\n${content}\n\`\`\``,
          },
        ],
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text" as const,
            text: `Error fetching robots.txt from ${url}: ${message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool 2: analyze_robots
server.tool(
  "analyze_robots",
  "Analyze pasted robots.txt content. Returns which AI bots are blocked or allowed based on the rules.",
  {
    content: z
      .string()
      .describe("The robots.txt content to analyze"),
  },
  async ({ content }) => {
    const parsed = parseRobotsTxt(content);
    const statuses = analyzeBots(parsed);

    const sitemapInfo =
      parsed.sitemaps.length > 0
        ? `\n## Sitemaps Found\n${parsed.sitemaps.map((s) => `- ${s}`).join("\n")}`
        : "";

    return {
      content: [
        {
          type: "text" as const,
          text: `# robots.txt Analysis\n\n${formatBotAnalysis(statuses)}${sitemapInfo}`,
        },
      ],
    };
  }
);

// Tool 3: generate_robots
server.tool(
  "generate_robots",
  "Generate a robots.txt file with specified blocked bots, sitemap URLs, and custom rules.",
  {
    blocked_bots: z
      .array(z.string())
      .optional()
      .describe(
        "Array of bot user-agent strings to block (e.g. ['GPTBot', 'ClaudeBot', 'CCBot']). Use list_ai_bots to see available user-agents."
      ),
    block_all_ai: z
      .boolean()
      .optional()
      .describe(
        "If true, blocks all known AI crawlers (but not search engines like Googlebot)"
      ),
    sitemap_urls: z
      .array(z.string())
      .optional()
      .describe(
        "Array of sitemap URLs to include (e.g. ['https://example.com/sitemap.xml'])"
      ),
    custom_rules: z
      .string()
      .optional()
      .describe(
        "Additional custom robots.txt rules to append (raw robots.txt syntax)"
      ),
  },
  async ({ blocked_bots, block_all_ai, sitemap_urls, custom_rules }) => {
    const blockedState: BotToggleState = {};

    if (block_all_ai) {
      for (const bot of AI_BOTS) {
        blockedState[bot.userAgent] = true;
      }
    }

    if (blocked_bots) {
      for (const ua of blocked_bots) {
        blockedState[ua] = true;
      }
    }

    const generated = generateRobotsTxt(
      blockedState,
      sitemap_urls || [],
      custom_rules || ""
    );

    const blockedCount = Object.values(blockedState).filter(Boolean).length;

    return {
      content: [
        {
          type: "text" as const,
          text: `# Generated robots.txt\n\nBlocking **${blockedCount}** bot(s).\n\n\`\`\`\n${generated}\`\`\``,
        },
      ],
    };
  }
);

// Tool 4: list_ai_bots
server.tool(
  "list_ai_bots",
  "List all known AI bots with their user-agents, companies, and descriptions. Useful for deciding which bots to block.",
  {},
  async () => {
    const lines: string[] = [];

    lines.push("# Known AI & Search Engine Bots\n");

    const groups: Record<string, Bot[]> = {};
    for (const bot of ALL_BOTS) {
      const key = bot.type;
      if (!groups[key]) groups[key] = [];
      groups[key].push(bot);
    }

    const typeLabels: Record<string, string> = {
      "ai-crawler": "AI Crawlers (Training Data)",
      "ai-search": "AI Search Bots",
      "search-engine": "Search Engines",
      other: "Other Bots",
      social: "Social Bots",
    };

    for (const [type, bots] of Object.entries(groups)) {
      lines.push(`## ${typeLabels[type] || type}\n`);
      for (const bot of bots) {
        lines.push(`- **${bot.name}**`);
        lines.push(`  - User-Agent: \`${bot.userAgent}\``);
        lines.push(`  - Company: ${bot.company}`);
        lines.push(`  - ${bot.description}`);
        lines.push(
          `  - Default blocked: ${bot.defaultBlocked ? "Yes" : "No"}`
        );
        lines.push(`  - Docs: ${bot.docsUrl}`);
      }
      lines.push("");
    }

    return {
      content: [
        {
          type: "text" as const,
          text: lines.join("\n"),
        },
      ],
    };
  }
);

// Tool 5: check_bot_status
server.tool(
  "check_bot_status",
  "Check if a specific bot is blocked or allowed on a given website by fetching and analyzing its robots.txt.",
  {
    url: z
      .string()
      .url()
      .describe("The website URL to check (e.g. https://example.com)"),
    bot_name: z
      .string()
      .describe(
        "The bot user-agent string to check (e.g. 'GPTBot', 'ClaudeBot'). Use list_ai_bots to see available names."
      ),
  },
  async ({ url, bot_name }) => {
    try {
      const parsedUrl = new URL(url);
      const robotsUrl = `${parsedUrl.protocol}//${parsedUrl.host}/robots.txt`;

      const response = await fetch(robotsUrl, {
        headers: {
          "User-Agent": "robotstxt-ai-mcp/1.0",
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Could not fetch robots.txt from ${robotsUrl}: HTTP ${response.status}. If no robots.txt exists, the bot is allowed by default.`,
            },
          ],
        };
      }

      const content = await response.text();
      const parsed = parseRobotsTxt(content);
      const statuses = analyzeBots(parsed);

      // Find the specific bot
      const botStatus = statuses.find(
        (s) =>
          s.bot.userAgent.toLowerCase() === bot_name.toLowerCase() ||
          s.bot.name.toLowerCase() === bot_name.toLowerCase()
      );

      if (!botStatus) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Bot "${bot_name}" is not in the known bot database. Use list_ai_bots to see available bots.\n\nHowever, I can check the raw rules. Here are the user-agent directives found:\n${parsed.rules.map((r) => `- User-agent: ${r.userAgent}`).join("\n")}`,
            },
          ],
        };
      }

      const status = botStatus.blocked ? "BLOCKED" : "ALLOWED";
      const rulesInfo =
        botStatus.rules.length > 0
          ? `\nMatching rules:\n${botStatus.rules.map((r) => `  - ${r}`).join("\n")}`
          : "\nNo specific rules found for this bot (allowed by default).";

      return {
        content: [
          {
            type: "text" as const,
            text: `# Bot Status: ${botStatus.bot.name} on ${parsedUrl.host}\n\n**Status: ${status}**\n\n- Bot: ${botStatus.bot.name}\n- User-Agent: \`${botStatus.bot.userAgent}\`\n- Company: ${botStatus.bot.company}\n- Type: ${botStatus.bot.type}${rulesInfo}`,
          },
        ],
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text" as const,
            text: `Error checking bot status: ${message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// ============================================================================
// Start Server
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("robotstxt-ai MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
