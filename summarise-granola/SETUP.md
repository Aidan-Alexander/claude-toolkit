# Setting up call summaries (instructions for Claude)

You're installing the `summarise-granola` skill for the person you're working with, from Aidan Alexander's Claude toolkit (github.com/Aidan-Alexander/claude-toolkit). Assume they aren't technical: do the technical parts yourself, explain each step in a sentence of plain English, and don't show them commands unless they ask.

## 1. Check the connectors

The skill needs the **Granola** and **Google Drive** connectors (and **Google Docs**, only for the optional 1:1 doc links). Look for their tools, using tool search if your tools are deferred: Granola's `list_meetings` and `get_meeting_transcript`, and Google Drive's `create_file`.

If Granola or Google Drive is missing, stop and tell them:
> In Claude, open Settings → Connectors and connect Granola and Google Drive (sign in when asked). Then start a new session here and paste the setup line again: a session only sees connectors that were connected when it started.

Don't try to install command-line tools, Python packages or other MCP servers instead.

## 2. Download the skill

The skill lives in the user's personal skills folder: `~/.claude/skills/summarise-granola/` (on Windows, `%USERPROFILE%\.claude\skills\summarise-granola\`). Create the folder if it doesn't exist.

Download each of these files from `https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/summarise-granola/` into that folder, byte for byte (for example `curl -fsSL <url> -o <file>`; on Windows, `curl.exe` works the same). Don't retype or summarise them.
- `SKILL.md`
- `summary-format.md`
- `SETUP.md`
- `README.md`

Check that SKILL.md starts with `---` and contains `name: summarise-granola`. Then put an untouched copy of each downloaded file in a `.original` folder inside the skill's folder: that's how a later update can tell whether anyone has changed them.

**If the folder already has a `settings.md`, this is an update.** Before you download anything:
1. Compare each file in the folder with its copy in `.original/` (if there's no `.original` folder, skip this check).
2. If a file differs, someone has changed the package's own files, probably by asking Claude to. Tell the person in plain words what's different, and carry each change into settings.md as a line under "My own rules", so it survives the update. If a change can't be put as a rule, keep their version as `<file name>.mine` and tell them.
3. Then download the new files, refresh `.original/`, and keep settings.md as it is.
4. Tell them the skill is updated, what's new (the "Changes" list at the end of README.md), and that their settings and own rules are unchanged. Stop here.

## 3. Ask how they'd like it to work

Ask these together (with AskUserQuestion if you have it), each with its one-line reason. Say which option Aidan uses, as a pointer, not a recommendation.

1. **Your first name**, for the doc titles ("Call summary: Priya & Sam – …").
2. **How long**: *Detailed* tells the call's story in order, with the reasoning, quotes and open questions, so you can re-live it weeks later (2,000–4,000 words for a meaty call; Aidan uses this). *Short* is about a page: summary, decisions, actions and open questions.
3. **Tidied transcript**, a cleaned-up transcript added to the end of the summary doc: *Always* (Aidan's choice), *Only when I ask*, or *Never*.
4. **Spelling**: British or American English.
5. **Where to save**: a "Call summaries" folder in their Google Drive (recommended, and Aidan's choice; you'll create it if needed), the top level of My Drive, or a folder they name.
6. **1:1 docs** (optional, and fairly niche): "Do you keep a running Google Doc with anyone you meet regularly, such as a 1:1 agenda doc with a manager or report? If you like, each call's summary gets a dated link at the top of that person's doc." Aidan uses this for his direct reports. If yes, ask for each person's name and the doc's link, and whether the link should go at the top of the doc or at the top of a particular tab (they give the tab's name). This needs the Google Docs connector: check for its `read_doc` and `update_doc` tools, and if it's missing, tell them to connect Google Docs in Settings → Connectors and start a new session before it'll work. Record the docs either way.

## 4. Do what their answers need

- **Folder:** if they chose a "Call summaries" folder, search their Drive with `search_files` for a folder they own with exactly that name, not in the trash. If there isn't one, create it with Google Drive `create_file`, title "Call summaries" and `contentMimeType` `application/vnd.google-apps.folder`. Note its ID. Do the same lookup for a folder they named.
- **1:1 docs:** for each doc, `read_doc` it once to check it opens. If they named a tab, check it exists and tell them if it doesn't.

## 5. Write settings.md

Write `settings.md` in the skill's folder, in this shape:

```markdown
# Call summaries settings

Claude wrote this at setup. Change anything by asking Claude ("make my call summaries shorter"): Claude records the change here, so it's kept when the skill updates.

- First name: Sam
- Length: Detailed
- Tidied transcript: Always
- Spelling: British English
- Save to: the "Call summaries" folder (Drive folder ID 1AbCdEf...)
- 1:1 docs (each summary gets a dated link at the top):
  - Priya Shah: https://docs.google.com/document/d/... (top of the doc)
  - Tom Reid: https://docs.google.com/document/d/... (top of the tab "Call summaries")
```

Write "1:1 docs: none" if they skipped that question. End the file with this section:

```markdown
## My own rules

Anything you've asked Claude to do differently goes here, one line each. It's kept when the skill updates.
- (none yet)
```

## 6. Offer a test run

Offer to summarise their most recent Granola call now, following SKILL.md. If they say yes, do it and give them the doc link.

## 7. Tell them how to use it

In a few lines:
- In any new Claude Code session, say "summarise my last call", "summarise my call with Priya", or type `/summarise-granola`. A session that was already open may not see the new skill until it's restarted.
- It never sends or shares anything: the doc is private until they share it.
- To change how it works, they can just ask ("stop adding transcripts"). To update the skill later, they paste the same setup line again: their settings, and any changes they've asked for, are kept.
- If they'd like it to happen automatically after every call, plus a tracker of what they said they'd do, that's the call-actions package: https://aidan-claude-toolkit.netlify.app/call-actions/
