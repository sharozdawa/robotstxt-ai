"use client";

import { useState } from "react";
import { AI_BOTS, SEARCH_ENGINE_BOTS } from "@/lib/bots";
import { generateRobotsTxt, type BotToggleState } from "@/lib/parser";
import { BotCard } from "./BotCard";
import { RobotsOutput } from "./RobotsOutput";

export function GenerateTab() {
  const [blockedBots, setBlockedBots] = useState<BotToggleState>(() => {
    const initial: BotToggleState = {};
    for (const bot of [...AI_BOTS, ...SEARCH_ENGINE_BOTS]) {
      initial[bot.userAgent] = bot.defaultBlocked;
    }
    return initial;
  });
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [customRules, setCustomRules] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const handleToggle = (userAgent: string) => {
    setBlockedBots((prev) => ({ ...prev, [userAgent]: !prev[userAgent] }));
  };

  const handleBlockAllAI = () => {
    setBlockedBots((prev) => {
      const next = { ...prev };
      for (const bot of AI_BOTS) {
        next[bot.userAgent] = true;
      }
      return next;
    });
  };

  const handleAllowAllAI = () => {
    setBlockedBots((prev) => {
      const next = { ...prev };
      for (const bot of AI_BOTS) {
        next[bot.userAgent] = false;
      }
      return next;
    });
  };

  const output = generateRobotsTxt(
    blockedBots,
    sitemapUrl ? [sitemapUrl] : [],
    customRules
  );

  const blockedCount = Object.values(blockedBots).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleBlockAllAI}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600/20 transition-colors"
        >
          Block All AI Crawlers
        </button>
        <button
          onClick={handleAllowAllAI}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600/10 border border-green-500/20 text-green-400 hover:bg-green-600/20 transition-colors"
        >
          Allow All AI Crawlers
        </button>
        <div className="ml-auto text-sm text-gray-500 self-center">
          {blockedCount} bot{blockedCount !== 1 ? "s" : ""} blocked
        </div>
      </div>

      {/* AI Crawlers */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          AI Crawlers & AI Search Bots
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {AI_BOTS.map((bot) => (
            <BotCard
              key={bot.userAgent}
              bot={bot}
              blocked={blockedBots[bot.userAgent] || false}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      {/* Search Engine Bots */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Search Engine Bots
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          Blocking search engine bots removes your site from their search results. Handle with care.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SEARCH_ENGINE_BOTS.map((bot) => (
            <BotCard
              key={bot.userAgent}
              bot={bot}
              blocked={blockedBots[bot.userAgent] || false}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      {/* Sitemap & Custom Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Sitemap URL</label>
          <input
            type="text"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Custom Rules</label>
          <textarea
            value={customRules}
            onChange={(e) => setCustomRules(e.target.value)}
            placeholder={"# Add custom rules\nDisallow: /admin/\nDisallow: /private/"}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
          />
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={() => setShowOutput(true)}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-lg transition-all"
      >
        Generate robots.txt
      </button>

      {/* Output */}
      {showOutput && <RobotsOutput content={output} />}
    </div>
  );
}
