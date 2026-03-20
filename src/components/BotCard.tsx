"use client";

import { type Bot } from "@/lib/bots";

const TYPE_COLORS = {
  "ai-crawler": { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", label: "AI Crawler" },
  "ai-search": { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", label: "AI Search" },
  "search-engine": { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", label: "Search Engine" },
  social: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", label: "Social" },
  other: { bg: "bg-gray-500/10", text: "text-gray-400", border: "border-gray-500/20", label: "Other" },
};

const COMPANY_LOGOS: Record<string, string> = {
  OpenAI: "bg-emerald-600",
  Anthropic: "bg-orange-600",
  Google: "bg-blue-600",
  Perplexity: "bg-teal-600",
  Meta: "bg-blue-700",
  Apple: "bg-gray-600",
  Amazon: "bg-amber-600",
  Microsoft: "bg-cyan-700",
  ByteDance: "bg-pink-600",
  "Common Crawl": "bg-yellow-700",
  Cohere: "bg-violet-600",
  Diffbot: "bg-indigo-600",
  "You.com": "bg-sky-600",
  Timpi: "bg-lime-700",
  Yandex: "bg-red-600",
  Baidu: "bg-blue-800",
  DuckDuckGo: "bg-orange-500",
  "Open Source": "bg-gray-700",
};

interface BotCardProps {
  bot: Bot;
  blocked: boolean;
  onToggle: (userAgent: string) => void;
}

export function BotCard({ bot, blocked, onToggle }: BotCardProps) {
  const colors = TYPE_COLORS[bot.type];
  const logoBg = COMPANY_LOGOS[bot.company] || "bg-gray-600";

  return (
    <div
      className={`relative rounded-xl border ${
        blocked ? "border-red-500/30 bg-red-500/5" : "border-gray-800 bg-gray-900/50"
      } p-4 transition-all duration-200 hover:border-gray-700`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`${logoBg} w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0`}
          >
            {bot.company.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-white">{bot.name}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
              >
                {colors.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{bot.company}</p>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{bot.description}</p>
            <code className="text-xs text-gray-500 mt-1 block">User-agent: {bot.userAgent}</code>
          </div>
        </div>

        <button
          onClick={() => onToggle(bot.userAgent)}
          className={`shrink-0 relative w-12 h-6 rounded-full transition-colors duration-200 ${
            blocked ? "bg-red-600" : "bg-green-600"
          }`}
          title={blocked ? "Click to allow" : "Click to block"}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
              blocked ? "left-0.5" : "left-6"
            }`}
          />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className={`text-xs font-medium ${blocked ? "text-red-400" : "text-green-400"}`}>
          {blocked ? "BLOCKED" : "ALLOWED"}
        </span>
        <a
          href={bot.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Docs &rarr;
        </a>
      </div>
    </div>
  );
}
