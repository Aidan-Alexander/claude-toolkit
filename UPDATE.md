# Updating Aidan's Claude toolkit (instructions for Claude)

The person wants the latest version of Aidan Alexander's Claude toolkit (github.com/Aidan-Alexander/claude-toolkit), a Claude Code plugin called `aidan-toolkit`. Assume they aren't technical: do the technical parts yourself, explain each step in a sentence of plain English, and don't show them commands unless they ask. Their settings and pages are kept throughout.

## 1. Get the latest plugin

Find the Claude Code command-line tool: `claude` if it's on the PATH; otherwise the one that comes with the Claude desktop app (on a Mac, the newest `~/Library/Application Support/Claude/claude-code/<version>/<folder>/claude.app/Contents/MacOS/claude`; on Windows, look under `%APPDATA%\Claude\claude-code\`). Run its `plugin list`.

- If the toolkit is listed as `aidan-toolkit@synced`, it came from their organisation's plugin library on claude.ai, and updates arrive by themselves. Go to step 2.
- Otherwise run `plugin update aidan-toolkit@aidan-alexander`. If that can't run, tell them to update it in the app instead: type `/plugin`, open **Installed**, choose Aidan's Claude toolkit and **Update now** (or use **+** next to the message box → **Plugins** → **Manage plugins**). While they're there, they can switch on auto-update under **Marketplaces** → aidan-alexander → **Enable auto-update**, so later versions arrive by themselves.

The new version loads in their next session. You don't need to wait for that: in step 2, use the newest copy on disk, the most recently changed folder under `~/.claude/plugins/cache/aidan-alexander/aidan-toolkit/` (or `${CLAUDE_PLUGIN_ROOT}` if nothing newer is there). Call it the plugin folder.

## 2. Bring each package they use in step

For each package below that's set up, follow its setup file from the plugin folder, with `${CLAUDE_PLUGIN_ROOT}` in it meaning the plugin folder. Each setup sees that it's an update and does only the update steps: it keeps their settings, carries across anything they changed, republishes their page if the page changed, and fixes its scheduled task if needed.

- **Automatic actions from calls**, if `~/.claude/toolkit/call-actions/settings.md` exists, or a toolkit copy is still in `~/.claude/skills/call-actions/`: `call-actions/SETUP.md`. It covers its call summaries too.
- **Fancy call summaries** on their own, if `~/.claude/toolkit/summarise-granola/settings.md` exists (or a toolkit copy is still in `~/.claude/skills/summarise-granola/`) and call actions isn't set up: `summarise-granola/SETUP.md`.
- **Automations page**, if `~/.claude/toolkit/automations-page/settings.md` exists, or a toolkit copy is still in `~/.claude/skills/automations-page/`: `automations-page/SETUP.md`.
- **Work hours enforcer**, if `~/.work-hours/settings.txt` exists: `work-hours/SETUP.md`.

A copy in `~/.claude/skills/` counts as the toolkit's only if it has a `.original` folder or its README.md mentions Aidan's Claude toolkit. If none of the packages is set up, tell them the toolkit is up to date and that they can set any package up by asking ("set up call actions").

## 3. Tell them what's new

In a few lines: what's new in each package they use (the latest entries under "Changes" at the end of its README.md in the plugin folder), and that their settings, own rules and pages are unchanged. Remind them that a session that was already open keeps the old version until it's restarted.
