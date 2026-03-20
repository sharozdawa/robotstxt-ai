"use client";

import { useState } from "react";

interface RobotsOutputProps {
  content: string;
}

export function RobotsOutput({ content }: RobotsOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/80">
        <span className="text-sm font-medium text-gray-300">robots.txt</span>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Download
          </button>
        </div>
      </div>
      <pre className="p-4 text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed max-h-96 overflow-y-auto">
        {content.split("\n").map((line, i) => (
          <div key={i} className="flex">
            <span className="w-8 text-right pr-3 text-gray-600 select-none shrink-0">{i + 1}</span>
            <span
              className={
                line.startsWith("#")
                  ? "text-gray-500"
                  : line.startsWith("User-agent:")
                  ? "text-blue-400"
                  : line.startsWith("Disallow:")
                  ? "text-red-400"
                  : line.startsWith("Allow:")
                  ? "text-green-400"
                  : line.startsWith("Sitemap:")
                  ? "text-purple-400"
                  : "text-gray-300"
              }
            >
              {line || " "}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}
