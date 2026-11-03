#!/usr/bin/env python3
"""Builds demo/index.html, the static demo of the automations page for GitHub Pages.

page.html stays the single source. This wraps it in a full HTML document, as claude.ai does when it publishes a
page, adds a banner saying it's a demo, and loads demo.js, which stands in for claude.ai with made-up entries.
Run it again after any change to page.html:

    python3 demo/build.py
"""
from pathlib import Path

HERE = Path(__file__).resolve().parent
PAGE = HERE.parent / "page.html"
OUT = HERE / "index.html"

TITLE = "<title>My automations</title>"
DEMO_TITLE = "<title>My automations (demo)</title>"

# The same small reset that claude.ai puts around every published page.
RESET = (
    ":root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);"
    "padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}"
    "body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}"
    "img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}"
)

HEAD = """<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>""" + RESET + """</style>
<script src="demo.js"></script>
</head>
<body>
"""

# Uses the page's own colour and font tokens, so it follows light and dark mode with the page.
BANNER = """<style>
.demo-banner { background: var(--accent); color: var(--on-accent); font-family: var(--font-body); font-size: 0.875rem; line-height: 1.5; }
.demo-banner p {
  max-width: 64rem; margin: 0 auto; padding-block: 10px;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px));
}
.demo-banner a { color: inherit; font-weight: 600; }
.demo-banner a:focus-visible { outline-color: var(--on-accent); }
</style>
<div class="demo-banner" role="note"><p>This is a demo with made-up entries. Your own page is private to you and lists what’s really running for you. <a href="../">Set up your own</a></p></div>
"""

FOOT = "\n</body>\n</html>\n"


def main():
    page = PAGE.read_text(encoding="utf-8")
    if page.count(TITLE) != 1:
        raise SystemExit(f"Expected page.html to contain {TITLE} exactly once.")
    page = page.replace(TITLE, DEMO_TITLE)
    OUT.write_text(HEAD + BANNER + page.rstrip("\n") + FOOT, encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
