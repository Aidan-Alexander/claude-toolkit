# Setting up Fancy call summaries (instructions for Claude)

You're installing the `summarise-granola` skill for the person you're working with, from Aidan Alexander's Claude toolkit (github.com/Aidan-Alexander/claude-toolkit). Assume they aren't technical: do the technical parts yourself, explain each step in a sentence of plain English, and don't show them commands unless they ask.

## 1. Check the connectors

The skill needs the **Granola** and **Google Drive** connectors (and **Google Docs**, only for the optional 1:1 doc links). Look for their tools, using tool search if your tools are deferred: Granola's `search_meetings` and `get_meeting_transcript`, and Google Drive's `create_file`.

If Granola or Google Drive is missing, stop and tell them:
> In Claude, open Settings → Connectors and connect Granola and Google Drive (sign in when asked). Then start a new session here and say "set up call summaries" again: a session only sees connectors that were connected when it started.

Don't try to install command-line tools, Python packages or other MCP servers instead.

## 2. Find the skill and their settings folder

The skill came with Aidan's Claude toolkit plugin, so there's nothing to download: it's in `${CLAUDE_PLUGIN_ROOT}/summarise-granola/`. (If `${CLAUDE_PLUGIN_ROOT}` hasn't been filled in with a real path, it means the plugin's folder: the folder above the one this file is in.) Never change the plugin's own files: an update replaces them.

What's this person's own lives in `~/.claude/toolkit/summarise-granola/` (on Windows, `%USERPROFILE%\.claude\toolkit\summarise-granola\`): settings.md, and summarised.json, the list of calls already summarised. Create the folder if it doesn't exist.

**An install from before the toolkit was a plugin.** If `~/.claude/skills/summarise-granola/` exists and came from the toolkit (it has a `.original` folder, or its README.md mentions Aidan's Claude toolkit), move it over first. A folder of the same name that didn't come from the toolkit is the person's own skill: leave it alone, and tell them its name clashes with the toolkit's.
1. If it has a `.original` folder, compare each file with its copy there. If one differs, someone changed the package's own files, probably by asking Claude to. Tell the person in plain words what's different, and carry each change into settings.md as a line under "My own rules". If a change can't be put as a rule, keep their version as `<file name>.mine` in the new folder and tell them.
2. Move settings.md, summarised.json and any `.mine` files into `~/.claude/toolkit/summarise-granola/`.
3. Move the old folder to the Trash (on Windows, the Recycle Bin), and tell them why in a line: the plugin has the skill now, and two copies would clash.

**If `~/.claude/toolkit/summarise-granola/settings.md` exists now, this is an update.** If the scheduled task "summarise-new-calls" exists and its prompt isn't the one in step 4 below, replace the prompt with `update_scheduled_task`. Then tell them the skill is updated, what's new (the "Changes" list at the end of `${CLAUDE_PLUGIN_ROOT}/summarise-granola/README.md`), and that their settings and own rules are unchanged. Stop here.

## 3. Ask how they'd like it to work

Ask these together (with AskUserQuestion if you have it), each with its one-line reason. Say which option Aidan uses, as a pointer, not a recommendation.

1. **Your first name**, for the doc titles ("Call summary: Priya & Sam – …").
2. **How long**: *Detailed* tells the call's story in order, with the reasoning, quotes and open questions, so you can re-live it weeks later (2,000–4,000 words for a meaty call; Aidan uses this). *Short* is about a page: summary, decisions, actions and open questions.
3. **Tidied transcript**, a cleaned-up transcript added to the end of the summary doc: *Always* (Aidan's choice), *Only when I ask*, or *Never*.
4. **Spelling**: British or American English.
5. **Where to save**: a "Call summaries" folder in their Google Drive (recommended, and Aidan's choice; you'll create it if needed), the top level of My Drive, or a folder they name.
6. **1:1 docs** (optional, and fairly niche): "Do you keep a running Google Doc with anyone you meet regularly, such as a 1:1 agenda doc with a manager or report? If you like, each call's summary gets a dated link at the top of that person's doc." Aidan uses this for his direct reports. If yes, ask for each person's name and the doc's link, and whether the link should go at the top of the doc or at the top of a particular tab (they give the tab's name). This needs the Google Docs connector: check for its `read_doc` and `update_doc` tools, and if it's missing, tell them to connect Google Docs in Settings → Connectors and start a new session before it'll work. Record the docs either way. Tell them they can add more later: if they're also setting up Automatic actions from calls, under the settings gear at the top right of their Call actions page; otherwise by asking Claude ("add my 1:1 doc with Priya").
7. **Automatic:** "Should Claude check for new calls every hour on weekdays, 9–6, and summarise them by itself? It runs while the Claude app is open. Or only when you ask?" If they're also installing Automatic actions from calls, suggest *only when I ask*: the tracker summarises every call itself. Aidan's calls are summarised automatically, by Automatic actions from calls.

## 4. Do what their answers need

- **Folder:** if they chose a "Call summaries" folder, search their Drive with `search_files` for a folder they own with exactly that name, not in the trash. If there isn't one, create it with Google Drive `create_file`, title "Call summaries" and `contentMimeType` `application/vnd.google-apps.folder`. Note its ID. Do the same lookup for a folder they named.
- **1:1 docs:** for each doc, `read_doc` it once to check it opens. If they named a tab, check it exists and tell them if it doesn't.
- **Automatic:** if they said yes, create a scheduled task with `create_scheduled_task`: `taskId` "summarise-new-calls", `title` "Summarise new calls", `cronExpression` `40 9-18 * * 1-5` (local time), and this `prompt`: "Use the summarise-granola skill from Aidan's Claude toolkit in Automatic mode (load it with the Skill tool: `aidan-toolkit:summarise-granola`), with the settings in ~/.claude/toolkit/summarise-granola/settings.md, and follow its Automatic mode. Nobody is watching: never ask questions. This task may only create Google Docs in the summaries folder, add one dated link at the top of the 1:1 docs listed in settings.md, and write summarised.json in ~/.claude/toolkit/summarise-granola/. Nothing is sent or shared." The tool's result says whether it was saved in Auto mode; if not, tell them the first run will stop to ask permission for each tool, and to approve each with the option that remembers it. It only runs while the Claude app is open.

## 5. Write settings.md

Write `~/.claude/toolkit/summarise-granola/settings.md` in this shape:

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
- Automatic: on (scheduled task "summarise-new-calls", every hour on weekdays, 9–6)
- Automatic since: 2026-11-03T14:00:00Z (calls before this are left alone)
```

Write "1:1 docs: none" if they skipped that question, and "Automatic: off" (with no "Automatic since" line) if they only want summaries when they ask. End the file with this section:

```markdown
## My own rules

Anything you've asked Claude to do differently goes here, one line each. It's kept when the skill updates.
- (none yet)
```

## 6. Offer a test run

Offer to summarise their most recent Granola call now, following `${CLAUDE_PLUGIN_ROOT}/summarise-granola/SKILL.md`. If they say yes, do it and give them the doc link.

## 7. Tell them how to use it

In a few lines:
- In any new Claude Code session, say "summarise my last call", "summarise my call with Priya", or type `/summarise-granola`. A session that was already open may not see the new skill until it's restarted.
- If automatic is on, new calls get summarised by themselves, about an hour after they end, while the Claude app is open. To pause it: Scheduled in the Claude app's sidebar → Summarise new calls → switch it off.
- It never sends or shares anything: the doc is private until they share it.
- To change how it works, they can just ask ("stop adding transcripts"). To get the latest version later, they say "update Aidan's toolkit": their settings, and any changes they've asked for, are kept.
- If they'd like it to happen automatically after every call, plus a tracker of what they said they'd do, that's the call-actions package: https://aidan-alexander.com/claude-tooling/call-actions/
