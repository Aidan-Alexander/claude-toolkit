# Setting up the automations page (instructions for Claude)

You're installing the `automations-page` skill for the person you're working with, from Aidan Alexander's Claude toolkit (github.com/Aidan-Alexander/claude-toolkit). It gives them a private page on claude.ai that lists every automation running for them, with a status for each, and you keep that page up to date. Assume they aren't technical: do the technical parts yourself, explain each step in a sentence of plain English, and don't show them commands unless they ask.

## 1. Check your tools

You need the **Artifact** tool, to publish the page, and the **ArtifactData** tool, to write its list. Look for them, using tool search if your tools are deferred.

If either is missing, stop and tell them:
> This needs Claude Code in the Claude desktop app (the Code tab), signed in to your claude.ai account. Open it there, start a new session and paste the setup line again.

Also look for the tools that find what's already running: `list_scheduled_tasks` and `list_task_runs` (the Claude app's Scheduled tasks) and `RemoteTrigger` (claude.ai routines). If any are missing, carry on: in step 5 you'll ask about those automations instead. Don't try to install command-line tools, Python packages or MCP servers.

## 2. Download the skill

The skill lives in the user's personal skills folder: `~/.claude/skills/automations-page/` (on Windows, `%USERPROFILE%\.claude\skills\automations-page\`). Create the folder if it doesn't exist.

Download each of these files from `https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/automations-page/` into that folder, byte for byte (for example `curl -fsSL <url> -o <file>`; on Windows, `curl.exe` works the same). Don't retype or summarise them.
- `SKILL.md`
- `page.html`
- `SETUP.md`
- `README.md`

Check that SKILL.md starts with `---` and contains `name: automations-page`, and that page.html contains `<title>My automations</title>`. Then put an untouched copy of each downloaded file in a `.original` folder inside the skill's folder: that's how a later update can tell whether anyone has changed them.

If the folder already has a `settings.md`, this is an update. Before you download anything, compare each file in the folder with its copy in `.original/` (skip this if there's no `.original` folder). If one differs, someone has changed the package's own files: tell the person in plain words what's different, carry each change into settings.md as a line under "My own rules", and if a change can't be put as a rule (say, a change to how the page looks), keep their version as `<file name>.mine` and ask before you republish the page. Then download the new files, refresh `.original/`, keep settings.md as it is, and put the new page.html on their existing page: read the page first with the Artifact tool's `read` action and the link in settings.md (the tool needs that before it publishes over a page), then publish exactly as in step 3, adding `url` set to that link and leaving out `icon`. Their list is kept, because it lives in the page's database, not in the page itself. Tell them the skill and the page are updated and their list is unchanged, and stop here.

## 3. Publish their page

Publish page.html itself, as it is. Don't start from an Artifact type, and don't edit or restyle the page: the skill depends on it. Read it in full first, as the Artifact tool requires for a file you didn't write, then call the Artifact tool with:
- `action`: `"publish"`
- `file_path`: the full path of page.html in the skill's folder
- `title`: `"My automations"`
- `icon`: `"clock"`
- `description`: `"Everything that runs on its own for me, with a status for each."`
- `capabilities`: `{"db": {"rules": [{"path": "", "read": "view", "write": "admin"}]}}`

The capabilities give the page its own small database. Everyone who can open the page can read it, and only its owner (and anyone they make an Editor) can change it. Don't add any other capabilities.

Note the page's link from the result. Tell them it's a private page on claude.ai, and nobody else can see it unless they share it. It says "Nothing is listed yet" until step 5.

## 4. Write settings.md

Write `settings.md` in the skill's folder, in this shape:

```markdown
# Automations page settings

Claude wrote this at setup. If the page's link ever changes, update it here.

- Page: https://claude.ai/artifact/...

## My own rules

Anything you've asked Claude to do differently goes here, one line each. It's kept when the skill updates.
- (none yet)
```

## 5. Fill in the page

Tell them you'll now find what's already running. Follow "Checking statuses" in SKILL.md: the page is empty, so everything you find is new.
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

My automations page lists everything that runs on its own for me. Its link is in ~/.claude/skills/automations-page/settings.md. Whenever you set up, change, pause or remove an automation for me (a Claude app scheduled task, a claude.ai routine or anything else), or I tell you I have, update the page in the same session, following the automations-page skill, and tell me you did.
```

Only write it if they say yes. Add it at the end of the file (on Windows, `%USERPROFILE%\.claude\CLAUDE.md`), creating the file if it doesn't exist, and change nothing else in it. If the rule is already there, leave it. The app may ask them to allow the change.

## 7. Offer to pin it

Offer to pin the page in their claude.ai sidebar, so it's one click away. If they say yes, call the Artifact tool with `action: "pin"` and the page's link as `url`.

## 8. Tell them how to use it

In a few lines:
- Their page is at the link (and in their sidebar, if they pinned it). It's private until they share it.
- The page doesn't check anything itself. To update the statuses, they say "check my automations" in any new Claude Code session. A session that was already open may not see the new skill until it's restarted.
- To add something new, such as a Zapier zap they made themselves, they tell Claude what it does and ask it to add it to their automations page.
- To update the skill later, they paste the same setup line again. Their page keeps its link and its list, and any changes they've asked for are kept.
