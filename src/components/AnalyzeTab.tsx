"use client";

import { useState } from "react";
import { parseRobotsTxt, analyzeBots } from "@/lib/parser";
import { BotCard } from "./BotCard";

export function AnalyzeTab() {
  const [url, setUrl] = useState("");
  const [robotsTxt, setRobotsTxt] = useState("");
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeBots> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"url" | "paste">("url");

  const handleFetch = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    try {
      const cleanUrl = url.replace(/\/$/, "");
      const robotsUrl = cleanUrl.includes("/robots.txt") ? cleanUrl : `${cleanUrl}/robots.txt`;
      const res = await fetch(`/api/fetch-robots?url=${encodeURIComponent(robotsUrl)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setRobotsTxt(data.content);
      const parsed = parseRobotsTxt(data.content);
      setAnalysis(analyzeBots(parsed));
    } catch {
      setError("Failed to fetch robots.txt");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzePaste = () => {
    if (!robotsTxt.trim()) return;
    const parsed = parseRobotsTxt(robotsTxt);
    setAnalysis(analyzeBots(parsed));
  };

  const blockedCount = analysis?.filter((b) => b.blocked).length || 0;
  const allowedCount = analysis?.filter((b) => !b.blocked).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("url")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "url" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          Fetch from URL
        </button>
        <button
          onClick={() => setMode("paste")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "paste" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          Paste robots.txt
        </button>
      </div>

      {mode === "url" ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetch()}
            placeholder="https://example.com"
            className="flex-1 px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={handleFetch}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium transition-colors"
          >
            {loading ? "Fetching..." : "Analyze"}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            value={robotsTxt}
            onChange={(e) => setRobotsTxt(e.target.value)}
            placeholder="Paste your robots.txt content here..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
          />
          <button
            onClick={handleAnalyzePaste}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            Analyze
          </button>
        </div>
      )}

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {analysis && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 text-center">
              <p className="text-3xl font-bold text-white">{analysis.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total Bots</p>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center">
              <p className="text-3xl font-bold text-green-400">{allowedCount}</p>
              <p className="text-sm text-gray-500 mt-1">Allowed</p>
            </div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
              <p className="text-3xl font-bold text-red-400">{blockedCount}</p>
              <p className="text-sm text-gray-500 mt-1">Blocked</p>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.map((status) => (
              <BotCard
                key={status.bot.userAgent}
                bot={status.bot}
                blocked={status.blocked}
                onToggle={() => {}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
