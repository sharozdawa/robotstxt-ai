# Reddit — r/SEO

## Title

I built a free, open-source tool to manage robots.txt rules for AI crawlers (20+ bots indexed)

## Body

If you've been paying attention to your log files, you've probably noticed a growing list of AI bots crawling your sites — GPTBot, ClaudeBot, PerplexityBot, Bytespider, Google-Extended, Meta-ExternalAgent, and a bunch of others. Managing them in robots.txt is getting messy.

I built **robotstxt.ai** to make this easier. It's a free visual tool — no sign-up, no paywall — that does two things:

**1. Generate a robots.txt with AI bot controls**

All 20+ known AI crawlers are listed with their actual user-agent strings, the company behind them, and whether they're training crawlers or search/retrieval bots. You toggle each one on or off and it generates a clean, valid robots.txt you can copy or download.

It also distinguishes between AI crawlers (GPTBot, ClaudeBot, CCBot, Bytespider) and AI search bots (ChatGPT-User, PerplexityBot, OAI-SearchBot). This matters because blocking GPTBot stops OpenAI from using your content for training, but blocking ChatGPT-User means ChatGPT can't cite your pages when users ask it to browse the web. Different trade-offs.

**2. Analyze any site's robots.txt**

Drop in a URL and see exactly which AI bots that site is blocking. I've found this useful for checking competitors, seeing industry trends, and just making sure my own robots.txt is actually doing what I intended.

**Why this matters for SEO:**

- AI crawlers consume crawl budget without contributing to traditional search rankings
- Some AI bots (like Bytespider) are aggressive and contribute nothing to most sites
- The difference between blocking a training crawler vs. an AI search bot has real visibility implications — if you block PerplexityBot, your content won't appear in Perplexity answers
- Google-Extended specifically controls Gemini training access but does NOT affect Google Search indexing — a nuance a lot of people miss

The tool is completely open source (MIT license) and you can self-host it if you prefer.

**Live:** https://robotsai.sharozdawa.com
**GitHub:** https://github.com/sharozdawa/robotstxt-ai

Curious what the community thinks. Are you blocking AI crawlers on your sites? Selectively or all of them?
