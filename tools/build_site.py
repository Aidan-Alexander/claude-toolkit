#!/usr/bin/env python3
"""Builds the toolkit's website, site/, from the write-ups in this repo.

The website is a friendlier front end for the same files: a home page made from README.md, a page
per package made from its README.md, the getting-started guide, the example summary, and the live
demos. Markdown goes through GitHub's own renderer (via the gh command-line tool), so pages say
exactly what the repo says. Run tools/publish.sh after changing a write-up or demo: it calls this,
then deploys site/ to Netlify. site/ is a build output and isn't kept in git.

Pages are built under /claude-tooling/ (site/claude-tooling/): aidan-alexander.com/claude-tooling proxies to this
Netlify site, and site/_redirects sends the old top-level paths there.
"""
import html
import posixpath
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
REPO = "Aidan-Alexander/claude-toolkit"
GITHUB = f"https://github.com/{REPO}"
NETLIFY = "https://aidan-claude-toolkit.netlify.app"
BASE = "/claude-tooling"
HOMEPAGE = "https://aidan-alexander.com"
CANONICAL = HOMEPAGE + BASE
OUT = SITE / BASE.strip("/")
PACKAGES = ["summarise-granola", "call-actions", "automations-page", "work-hours"]
THUMBS = {"summarise-granola": "summarise-granola/example.png", "call-actions": "call-actions/screenshot.png",
          "automations-page": "automations-page/screenshot.png", "mailsmush": "images/mailsmush/thumb.gif",
          "calendfree": "images/calendfree/thumb.png"}
IMAGES = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp")
# Old links (from before the move under /claude-tooling/) follow the pages to their new place.
REDIRECTS = "\n".join(
    [f"/  {BASE}/  301!"]
    + [f"/{p}/*  {BASE}/{p}/:splat  301!" for p in PACKAGES + ["getting-started", "ask-claude", "images"]]
    + [f"/{n}  {BASE}/{n}  301!" for n in ("site.css", "site.js")]) + "\n"

# The work-hours package has no screenshot, so its card shows the warning window in HTML.
STOP_WORK_MOCK = """<div class="mock" role="img" aria-label="The stop-work warning: work stops at 18:01, with Skip today and OK buttons">
  <div class="mock-window">
    <p class="mock-title">Stop work</p>
    <p>Work stops at 18:01. Save what you're doing.</p>
    <p class="mock-hint">To keep working today, type why and click Skip today.</p>
    <div class="mock-input"></div>
    <div class="mock-buttons"><span>Skip today</span><span class="mock-ok">OK</span></div>
  </div>
</div>"""


def render(md: str) -> str:
    """Markdown to HTML with GitHub's renderer."""
    out = subprocess.run(["gh", "api", "markdown", "-f", f"text={md}", "-f", "mode=gfm", "-f", f"context={REPO}"],
                         capture_output=True, text=True, check=True)
    return out.stdout


def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", html.unescape(re.sub(r"<[^>]+>", "", text)).lower()).strip("-")


def fix_url(url: str, src_dir: str) -> str:
    """Point a link from a write-up at the right place on the site, or at GitHub."""
    for prefix in (CANONICAL, NETLIFY + BASE, NETLIFY):
        if url.startswith(prefix):
            return BASE + (url[len(prefix):] or "/")
    if re.match(r"^[a-z][a-z0-9+.-]*:", url) or url.startswith(("#", "//")):
        return url
    path, _, frag = url.partition("#")
    resolved = posixpath.normpath(posixpath.join(src_dir, path)) if path else src_dir
    resolved = "" if resolved == "." else resolved
    top = resolved.split("/")[0]
    if resolved in PACKAGES or (resolved.endswith("/README.md") and top in PACKAGES):
        target = f"{BASE}/{top}/"
    elif resolved in ("", "README.md"):
        target = f"{BASE}/"
    elif resolved == "GETTING-STARTED.md":
        target = f"{BASE}/getting-started/"
    elif resolved == "ASK-CLAUDE.md":
        target = f"{BASE}/ask-claude/"
    elif resolved == "summarise-granola/example-summary.md":
        target = f"{BASE}/summarise-granola/example/"
    elif resolved.lower().endswith(IMAGES):
        copy_asset(resolved)
        target = f"{BASE}/{resolved}"
    else:
        kind = "tree" if (ROOT / resolved).is_dir() else "blob"
        target = f"{GITHUB}/{kind}/main/{resolved}"
    return target + (f"#{frag}" if frag else "")


def copy_asset(rel: str) -> None:
    dest = OUT / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / rel, dest)


def tidy(fragment: str, src_dir: str) -> str:
    """Tidy GitHub's HTML for the site: plain tables, bare images, ids on headings, fixed links."""
    fragment = fragment.replace("<markdown-accessiblity-table>", '<div class="table-wrap">').replace("</markdown-accessiblity-table>", "</div>")
    fragment = re.sub(r'<a target="_blank" rel="noopener noreferrer" href="[^"]*">(<img [^>]*>)</a>', r"\1", fragment)
    fragment = re.sub(r'<p(?: dir="auto")?>((?:\s*<img [^>]*>\s*){2,})</p>', r'<p class="img-row">\1</p>', fragment)
    fragment = re.sub(r'<(h[1-4])(?: [^>]*)?>(.*?)</\1>', lambda m: f'<{m.group(1)} id="{slug(m.group(2))}">{m.group(2)}</{m.group(1)}>', fragment)
    fragment = re.sub(r'(href|src)="([^"]*)"', lambda m: f'{m.group(1)}="{html.escape(fix_url(html.unescape(m.group(2)), src_dir))}"', fragment)
    fragment = re.sub(r'<a href="(https?://[^"]+)"', r'<a href="\1" target="_blank" rel="noopener"', fragment)
    fragment = re.sub(r'<pre class="notranslate"><code class="notranslate">(Set up &quot;)', r'<pre class="setup-line"><code>\1', fragment)
    return fragment


def page(title: str, body: str, description: str, home: bool = False) -> str:
    full_title = "Aidan's Claude toolkit" if home else f"{title} · Aidan's Claude toolkit"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(full_title)}</title>
<meta name="description" content="{html.escape(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="{BASE}/site.css">
</head>
<body>
<header class="bar"><div class="wrap bar-inner">
  <div class="trail"><a class="home" href="{HOMEPAGE}/">Aidan Alexander</a><span class="sep" aria-hidden="true">/</span><a class="brand" href="{BASE}/">Claude toolkit</a></div>
  <nav><a href="{BASE}/getting-started/">Getting started</a><a href="{GITHUB}" target="_blank" rel="noopener">GitHub</a></nav>
</div></header>
<main class="wrap">
{body}
</main>
<footer class="wrap foot">
  <p>Everything here lives on <a href="{GITHUB}" target="_blank" rel="noopener">GitHub</a>, including the files Claude reads when it sets things up. This site is built from those files.</p>
  {FOOTER}
</footer>
<script src="{BASE}/site.js"></script>
</body>
</html>
"""


def split_sections(md: str) -> dict:
    """README sections by their ## heading ('' holds everything before the first one)."""
    parts, current = {"": []}, ""
    for line in md.splitlines():
        m = re.match(r"^## (.+)$", line)
        if m:
            current = m.group(1).strip()
            parts[current] = []
        else:
            parts[current].append(line)
    return {k: "\n".join(v).strip() for k, v in parts.items()}


def package_rows(table_md: str) -> list[dict]:
    rows = []
    for line in table_md.splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        m = re.match(r"\[\*\*(.+?)\*\*\]\((.+?)/?\)", cells[0]) if cells else None
        if not m or len(cells) < 5:
            continue
        demo = re.search(r"\[Try the demo\]\((.+?)\)\.?", cells[1])
        rows.append({"name": m.group(1), "folder": m.group(2).strip("/"),
                     "what": re.sub(r"\s*\[Try the demo\]\(.+?\)\.?", "", cells[1]).strip(),
                     "demo": fix_url(demo.group(1), "") if demo else None,
                     "why": cells[2], "needs": cells[3], "setup": cells[4].strip("`")})
    return rows


def inline(md: str) -> str:
    """One line of Markdown to HTML (renders through GitHub, then drops the wrapping paragraph)."""
    out = tidy(render(md), "")
    return re.sub(r"^\s*<p[^>]*>(.*)</p>\s*$", r"\1", out, flags=re.S)


def packaged_key(sections: dict) -> str:
    """The README section with the install table; its heading may carry a tagline after ' – '."""
    return next(k for k in sections if k.startswith("Packaged for you to install"))


def setup_box(line: str) -> str:
    return (f'<div class="setup"><p class="label">Set it up: paste this into Claude Code</p>'
            f'<pre class="setup-line" title="{html.escape(line)}"><code>{html.escape(line)}</code></pre></div>')


def build_home(readme: str) -> None:
    sections = split_sections(readme)
    title = re.search(r"^# (.+)$", sections[""], re.M).group(1)
    intro_lines = [l for l in sections[""].splitlines() if not l.startswith("# ") and "Easier to read on the website" not in l]
    ask_line = next((l for l in intro_lines if l.startswith("No time to look at this yourself?")), "")
    intro_md = "\n".join(l for l in intro_lines if l != ask_line)
    ask_html = f'<p class="ask-callout">{inline(ask_line)}</p>' if ask_line else ""
    key = packaged_key(sections)
    packaged = sections[key]
    heading, _, tagline = key.partition(" – ")
    heading_html = html.escape(heading) + (f' <span class="h2-dash">–</span> <span class="from-claude">{html.escape(tagline)}</span>' if tagline else "")
    table = "\n".join(l for l in packaged.splitlines() if l.startswith("|"))
    after_table = "\n".join(l for l in packaged.splitlines() if not l.startswith("|"))
    cards = []
    for row in package_rows(table):
        f = row["folder"]
        external = f.startswith("http")  # a tool that lives in its own repo, like MailSmüsh
        href = f if external else f"{BASE}/{f}/"
        ext = ' target="_blank" rel="noopener"' if external else ""
        thumb = THUMBS.get(f.rstrip("/").rsplit("/", 1)[-1] if external else f)
        if thumb:
            copy_asset(thumb)
            shot = f'<a class="pkg-shot" href="{href}"{ext} tabindex="-1" aria-hidden="true"><img src="{BASE}/{thumb}" alt="" loading="lazy"></a>'
        else:
            shot = f'<a class="pkg-shot mock-shot" href="{href}"{ext} tabindex="-1" aria-hidden="true">{STOP_WORK_MOCK}</a>'
        links = [f'<a href="{href}"{ext}>How it works</a>']
        if row["demo"]:
            links.append(f'<a href="{row["demo"]}">Try the demo</a>')
        cards.append(f"""<article class="pkg">
  {shot}
  <div class="pkg-main">
    <h3><a href="{href}"{ext}>{html.escape(row["name"])}</a></h3>
    <p class="what">{inline(row["what"])}</p>
    <div class="facts">
      <p><span class="label">Why it's useful</span>{inline(row["why"])}</p>
      <p><span class="label">Connectors you'll need</span>{inline(row["needs"])}</p>
    </div>
    {setup_box(row["setup"])}
    <p class="pkg-links">{" ".join(links)}</p>
  </div>
</article>""")
    psa = "\n\n".join(f"## {name}\n\n{text}" for name, text in sections.items() if name.startswith("PSA"))
    others = "\n\n".join(f"## {name}\n\n{text}" for name, text in sections.items()
                         if name not in ("", key, "Credits", "Licence") and not name.startswith("PSA"))
    body = f"""<section class="hero">
  <p class="eyebrow">My open-source systems for working with Claude</p>
  <h1>{html.escape(title)}</h1>
  {ask_html}
  <div class="intro">{tidy(render(intro_md), "")}</div>
</section>
<section class="packaged" id="packaged">
  <h2>{heading_html}</h2>
  <div class="pkgs">
{chr(10).join(cards)}
  </div>
  <div class="after">{tidy(render(after_table), "")}</div>
</section>
{f'<section class="prose psa">{tidy(render(psa), "")}</section>' if psa else ""}
<section class="prose others">
{tidy(render(others), "")}
</section>"""
    write("index.html", page(title, body, "How Aidan Alexander uses Claude at Ambitious Impact, with tools you can install in Claude Code.", home=True))


def build_package(folder: str, setup_line: str, demo: str | None) -> None:
    md = (ROOT / folder / "README.md").read_text(encoding="utf-8")
    title = re.search(r"^# (.+)$", md, re.M).group(1)
    meta_line = next((l for l in md.splitlines() if l.startswith("**Runs in:**")), "")
    facts = []
    for part in meta_line.split(" · "):
        m = re.match(r"\*\*(.+?):\*\*\s*(.+)", part.strip())
        if m:
            facts.append(f'<li><span class="label">{html.escape(m.group(1))}</span>{inline(m.group(2))}</li>')
    body_md = "\n".join(l for l in md.splitlines() if not l.startswith("# ") and l != meta_line)
    body_html = tidy(render(body_md), folder)
    if folder == "work-hours":
        body_html = body_html.replace('<h2 id="what-it-looks-like">What it looks like</h2>',
                                      '<h2 id="what-it-looks-like">What it looks like</h2>\n' + STOP_WORK_MOCK, 1)
    links = [f'<a href="{demo}">Try the demo</a>'] if demo else []
    links.append(f'<a href="{GITHUB}/tree/main/{folder}" target="_blank" rel="noopener">See the files on GitHub</a>')
    body = f"""<nav class="crumb"><a href="{BASE}/">← All tools</a></nav>
<header class="page-head">
  <h1>{html.escape(title)}</h1>
  <ul class="meta">{"".join(facts)}</ul>
  {setup_box(setup_line)}
  <p class="pkg-links">{" ".join(links)}</p>
</header>
<article class="prose">
{body_html}
</article>"""
    first_para = next((l for l in md.splitlines()[3:] if l and not l.startswith(("#", "**", "!", "|"))), title)
    write(f"{folder}/index.html", page(title, body, re.sub(r"[*_`\[\]]|\(.*?\)", "", first_para)))


def build_doc(src: str, dest: str, crumb_href: str, crumb_text: str) -> None:
    md = (ROOT / src).read_text(encoding="utf-8")
    title = re.search(r"^# (.+)$", md, re.M).group(1)
    body_md = "\n".join(l for l in md.splitlines() if not l.startswith("# "))
    body = f"""<nav class="crumb"><a href="{crumb_href}">← {crumb_text}</a></nav>
<header class="page-head"><h1>{html.escape(title)}</h1></header>
<article class="prose">
{tidy(render(body_md), posixpath.dirname(src))}
</article>"""
    write(dest, page(title, body, title))


def build_ask() -> None:
    """The page with the prompt that asks someone's own Claude which tools would suit them."""
    md = (ROOT / "ASK-CLAUDE.md").read_text(encoding="utf-8")
    title = re.search(r"^# (.+)$", md, re.M).group(1)
    before, _, rest = md.partition("```\n")
    prompt, _, after = rest.partition("\n```")
    before = "\n".join(l for l in before.splitlines() if not l.startswith("# "))
    body = f"""<nav class="crumb"><a href="{BASE}/">← All tools</a></nav>
<header class="page-head">
  <h1>{html.escape(title)}</h1>
  <div class="intro">{tidy(render(before), "")}</div>
</header>
<div class="setup ask-box"><p class="label">Paste this into Claude</p><pre class="setup-line"><code>{html.escape(prompt.strip())}</code></pre></div>
<article class="prose">
{tidy(render(after), "")}
</article>"""
    write("ask-claude/index.html", page(title, body, "A prompt that asks your own Claude which of these tools would suit your work."))


def write(rel: str, text: str) -> None:
    dest = OUT / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(text, encoding="utf-8")


FOOTER = ""


def main() -> None:
    global FOOTER
    if SITE.exists():
        shutil.rmtree(SITE)
    OUT.mkdir(parents=True)
    (SITE / "_redirects").write_text(REDIRECTS, encoding="utf-8")
    for name in ("site.css", "site.js"):
        shutil.copyfile(ROOT / "tools" / name, OUT / name)
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    sections = split_sections(readme)
    FOOTER = tidy(render(f"**Credits.** {sections['Credits']}\n\n**Licence.** {sections['Licence']}"), "")
    build_home(readme)
    rows = {r["folder"]: r for r in package_rows(sections[packaged_key(sections)])}
    for folder in PACKAGES:
        build_package(folder, rows[folder]["setup"], rows[folder]["demo"])
    build_doc("GETTING-STARTED.md", "getting-started/index.html", f"{BASE}/", "All tools")
    build_ask()
    build_doc("summarise-granola/example-summary.md", "summarise-granola/example/index.html", f"{BASE}/summarise-granola/", "Fancy call summaries")
    for folder in ("call-actions", "automations-page"):
        for name in ("index.html", "demo.js"):
            copy_asset(f"{folder}/demo/{name}")
    print("Built", SITE)


if __name__ == "__main__":
    main()
