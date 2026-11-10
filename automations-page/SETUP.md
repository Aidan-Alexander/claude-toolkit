# Setting up the automations page (instructions for Claude)

You're installing the `automations-page` skill for the person you're working with, from Aidan Alexander's Claude toolkit (github.com/Aidan-Alexander/claude-toolkit). It gives them a private page on claude.ai that lists every automation running for them, with a status for each, and you keep that page up to date. Assume they aren't technical: do the technical parts yourself, explain each step in a sentence of plain English, and don't show them commands unless they ask.

## 1. Check your tools

You need the **Artifact** tool, to publish the page, and the **ArtifactData** tool, to write its list. Look for them, using tool search if your tools are deferred.

If either is missing, stop and tell them:
> This needs Claude Code in the Claude desktop app (the Code tab), signed in to your claude.ai account. Open it there, start a new session and say "set up my automations page" again.

Also look for the tools that find what's already running: `list_scheduled_tasks` and `list_task_runs` (the Claude app's Scheduled tasks) and `RemoteTrigger` (claude.ai routines). If any are missing, carry on: in step 5 you'll ask about those automations instead. Don't try to install command-line tools, Python packages or MCP servers.

## 2. Find the skill and their settings folder

The skill came with Aidan's Claude toolkit plugin, so there's nothing to download: it's in `${CLAUDE_PLUGIN_ROOT}/automations-page/`. (If `${CLAUDE_PLUGIN_ROOT}` hasn't been filled in with a real path, it means the plugin's folder: the folder above the one this file is in.) Never change the plugin's own files: an update replaces them.

What's this person's own lives in `~/.claude/toolkit/automations-page/` (on Windows, `%USERPROFILE%\.claude\toolkit\automations-page\`): settings.md, with the page's link. Create the folder if it doesn't exist.

**An install from before the toolkit was a plugin.** If `~/.claude/skills/automations-page/` exists and came from the toolkit (it has a `.original` folder, or its README.md mentions Aidan's Claude toolkit), move it over first. A folder of the same name that didn't come from the toolkit is the person's own skill: leave it alone, and tell them its name clashes with the toolkit's.
1. If it has a `.original` folder, compare each file with its copy there. If one differs, someone changed the package's own files, probably by asking Claude to. Tell the person in plain words what's different, and carry each change into settings.md as a line under "My own rules". If a change can't be put as a rule, keep their version as `<file name>.mine` in the new folder and tell them.
2. Move settings.md and any `.mine` files into `~/.claude/toolkit/automations-page/`.
3. Move the old folder to the Trash (on Windows, the Recycle Bin), and tell them why in a line: the plugin has the skill now, and two copies would clash.

**If `~/.claude/toolkit/automations-page/settings.md` exists now, this is an update.** Keep settings.md as it is, and put the plugin's page.html on their existing page: read the page first with the Artifact tool's `read` action and the link in settings.md (the tool needs that before it publishes over a page), then publish exactly as in step 3, adding `url` set to that link and leaving out `icon`. If they kept a `page.html.mine`, say that republishing replaces the page's look with the new version, and ask first. Their list is kept, because it lives in the page's database, not in the page itself. If their `~/.claude/CLAUDE.md` has the rule from step 6 and it still says `~/.claude/skills/automations-page/settings.md`, change just that path to `~/.claude/toolkit/automations-page/settings.md`. Tell them the page is updated and their list is unchanged, and stop here.

## 3. Publish their page

Publish page.html itself, as it is. Don't start from an Artifact type, and don't edit or restyle the page: the skill depends on it. Read it in full first, as the Artifact tool requires for a file you didn't write, then call the Artifact tool with:
- `action`: `"publish"`
- `file_path`: the full path of `${CLAUDE_PLUGIN_ROOT}/automations-page/page.html`
- `title`: `"My automations"`
- `icon`: `"clock"`
- `description`: `"Everything that runs on its own for me, with a status for each."`
- `capabilities`: `{"db": {"rules": [{"path": "", "read": "view", "write": "admin"}]}}`

The capabilities give the page its own small database. Everyone who can open the page can read it, and only its owner (and anyone they make an Editor) can change it. Don't add any other capabilities.

Note the page's link from the result. Tell them it's a private page on claude.ai, and nobody else can see it unless they share it. It says "Nothing is listed yet" until step 5.

## 4. Write settings.md

Write `~/.claude/toolkit/automations-page/settings.md` in this shape:

```markdown
# Automations page settings

Claude wrote this at setup. If the page's link ever changes, update it here.

- Page: https://claude.ai/artifact/...

## My own rules

Anything you've asked Claude to do differently goes here, one line each. It's kept when the skill updates.
- (none yet)
```

## 5. Fill in the page

Tell them you'll now find what's already running. Follow "Checking statuses" in `${CLAUDE_PLUGIN_ROOT}/automations-page/SKILL.md`: the page is empty, so everything you find is new.
- The Claude app's Scheduled tasks, with `list_scheduled_tasks` and `list_task_runs`.
- Their claude.ai routines, with `RemoteTrigger` (action `list`).
- Anything else. Ask them once: "Is anything else running on its own for you? For example a Zapier or Make zap, a Google Apps Script trigger, an Airtable or Slack automation, a GitHub Action, or a scheduled job on your computer. Tell me roughly what each one does and I'll add it."

If a tool from step 1 was missing, ask them about those automations too. Add what they know and leave out what they don't.

Write one entry per automation, as the data section of SKILL.md describes, all in one ArtifactData `batch` of `set` writes, plus `meta/page` with `checkedAt`. Then `list` the `automations` collection once to check the entries are there. Tell them in a line what's on the page ("6 automations: 4 working, 1 needs a look, 1 switched off") and give them the link.

If nothing is running anywhere, say so. The page stays empty until they set something up, and you'll add it then.

## 6. Offer to keep it current

Explain in a sentence: the page only stays accurate if Claude updates it whenever an automation changes, and a short rule in their personal Claude instructions file (`~/.claude/CLAUDE.md`, which every Claude Code session reads) makes that happen. Show them this exact text and ask whether to add it:

```markdown
## My automations page

My automations page lists everything that runs on its own for me. Its link is in ~/.claude/toolkit/automations-page/settings.md. Whenever you set up, change, pause or remove an automation for me (a Claude app scheduled task, a claude.ai routine or anything else), or I tell you I have, update the page in the same session, following the automations-page skill, and tell me you did.
```

Only write it if they say yes. Add it at the end of the file (on Windows, `%USERPROFILE%\.claude\CLAUDE.md`), creating the file if it doesn't exist, and change nothing else in it. If the rule is already there, leave it. The app may ask them to allow the change.

## 7. Offer to pin it

Offer to pin the page in their claude.ai sidebar, so it's one click away. If they say yes, call the Artifact tool with `action: "pin"` and the page's link as `url`.

## 8. Tell them how to use it

In a few lines:
- Their page is at the link (and in their sidebar, if they pinned it). It's private until they share it.
- The page doesn't check anything itself. To update the statuses, they say "check my automations" in any new Claude Code session. A session that was already open may not see the new skill until it's restarted.
- To add something new, such as a Zapier zap they made themselves, they tell Claude what it does and ask it to add it to their automations page.
- To get the latest version later, they say "update Aidan's toolkit". Their page keeps its link and its list, and any changes they've asked for are kept.
