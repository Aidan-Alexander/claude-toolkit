"""Builds demo/index.html, the live demo on GitHub Pages, from ../tracker.html.

The demo is the real page plus demo.js, which fakes the claude.ai data layer with made-up
calls. Run it after any change to tracker.html: python3 call-actions/demo/build.py
"""
from pathlib import Path

HERE = Path(__file__).resolve().parent
LEDE = ("What you took on in your calls, your Asana tasks, threads still waiting on a reply, what Claude has done about them, "
        "and anything you add yourself. Claude checks your calls and this page every hour on weekdays, 9–6, "
        "and looks for emails and Slack messages still waiting on a reply every Thursday.")
# The same base styles the claude.ai viewer wraps every page in; the page relies on its [hidden] rule.
BASE = ("<style>:root{color-scheme:light;box-sizing:border-box}body{margin:0;padding:0;"
        "font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}"
        "img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style>\n")
BANNER = """
  <p class="notice" style="margin:0">This is a demo with made-up calls and emails. Click around: nothing is saved or sent,
  and Claude's side is faked. <a href="https://github.com/Aidan-Alexander/claude-toolkit/tree/main/call-actions#readme">How it works and how to set it up</a></p>
"""


def main() -> None:
    page = (HERE.parent / "tracker.html").read_text(encoding="utf-8")
    assert page.count("{{LEDE}}") == 1, "tracker.html should have one {{LEDE}}"
    page = page.replace("{{LEDE}}", LEDE)
    head, main_tag, body = page.partition('<main class="wrap" id="app">')
    assert main_tag, "couldn't find the page's <main>"
    out = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
           '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
           + BASE + head + '<script src="demo.js"></script>\n</head>\n<body>\n'
           + main_tag + BANNER + body + "\n</body>\n</html>\n")
    (HERE / "index.html").write_text(out, encoding="utf-8")
    print("Wrote", HERE / "index.html")


if __name__ == "__main__":
    main()
