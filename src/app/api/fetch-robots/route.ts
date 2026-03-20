import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  try {
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Invalid URL protocol" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: { "User-Agent": "robotstxt-ai/1.0" },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({
          content: "# No robots.txt found (404)\n# This site has no robots.txt file",
          error: null,
        });
      }
      return NextResponse.json(
        { error: `Failed to fetch: HTTP ${response.status}` },
        { status: 400 }
      );
    }

    const content = await response.text();

    if (content.trim().startsWith("<!") || content.trim().startsWith("<html")) {
      return NextResponse.json(
        { error: "URL returned HTML instead of robots.txt" },
        { status: 400 }
      );
    }

    return NextResponse.json({ content, error: null });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch robots.txt";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
