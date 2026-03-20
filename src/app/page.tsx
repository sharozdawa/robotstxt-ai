"use client";

import { useState } from "react";
import { AnalyzeTab } from "@/components/AnalyzeTab";
import { GenerateTab } from "@/components/GenerateTab";

export default function Home() {
  const [tab, setTab] = useState<"generate" | "analyze">("generate");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-white">robotstxt</span>
                <span className="text-blue-500">.ai</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Visual robots.txt manager for the AI era
              </p>
            </div>
            <a
              href="https://github.com/sharozdawa/robotstxt-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Control which <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI bots</span> crawl your site
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          20+ AI crawlers indexed. Toggle GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and more.
          Generate a production-ready robots.txt in seconds.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Free & Open Source
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            No Sign-up Required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            20+ AI Bots
          </span>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-1 p-1 bg-gray-900 rounded-xl w-fit mx-auto mb-8">
          <button
            onClick={() => setTab("generate")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              tab === "generate"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Generate
          </button>
          <button
            onClick={() => setTab("analyze")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              tab === "analyze"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Analyze
          </button>
        </div>

        {/* Content */}
        <div className="pb-20">
          {tab === "generate" ? <GenerateTab /> : <AnalyzeTab />}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
          <p>
            Built by{" "}
            <a
              href="https://sharozdawa.com"
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sharoz Dawa
            </a>
            {" "}&middot;{" "}
            <a
              href="https://github.com/sharozdawa/robotstxt-ai"
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Source on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
