# Setting up Automatic actions from calls (instructions for Claude)

You're setting up the `call-actions` skill, its call summaries and its tracker page for the person you're working with, from Aidan Alexander's Claude toolkit (github.com/Aidan-Alexander/claude-toolkit). Assume they aren't technical: do the technical parts yourself, explain each step in a sentence of plain English, and don't show them commands unless they ask.

How it goes: you check their connectors, install the skills, and publish their tracker page. The page opens on a short **setup screen**: the few choices that matter on day one, as checkboxes and radio buttons, with recommended defaults pre-selected (the rest wait behind the page's settings gear). They change what they like, paste their 1:1 doc links, and click "Save and finish setup". Then you read what they saved and finish: folders, settings files, the schedule and a first run. Don't ask them the setup choices in chat or in a question box: the setup screen is where they make them.

## 1. Check the tools and connectors

- Tools: you need the Artifact tool (to publish the page), ArtifactData (to read and write its data) and the scheduled-tasks tools (`create_scheduled_task`). Look for them with tool search if your tools are deferred. If any is missing, stop and tell them this needs the Code tab of the Claude desktop app, signed in to their Claude account.
- Connectors: check each one's tools are there.
  - Required: **Gmail**, **Granola** and **Google Drive**. If one is missing, stop and tell them: "In Claude, open Settings → Connectors and connect <names>. Then start a new session here and paste the setup line again: a session only sees connectors that were connected when it started." (Someone who only wants the weekly follow-up check can carry on without Granola and Google Drive; say so.)
  - Optional: **Slack** (Slack drafts and Slack follow-ups), **Google Calendar** (calendar holds), **Google Docs** (1:1 doc links and agenda points, and changing docs when asked) and **Asana**. Note which are there: the setup screen greys out what a missing one would need. Tell them which optional ones are missing and what that means, in one line ("No Asana connector, so your Asana tasks won't show; you can add it later").

## 2. Install the skills

Download each file byte for byte with curl (`curl -fsSL <url> -o <file>`; on Windows, `curl.exe` works the same). If curl isn't allowed, use Python (`python3 -c "import sys, urllib.request; urllib.request.urlretrieve(sys.argv[1], sys.argv[2])" <url> <file>`), or the GitHub CLI if it's installed (`gh api repos/Aidan-Alexander/claude-toolkit/contents/<path in the repo> -H "Accept: application/vnd.github.raw" > <file>`). Don't use WebFetch: it summarises. Don't retype or summarise the files. Put an untouched copy of each in a `.original` folder inside its skill's folder: that's how a later update can tell whether anyone has changed them.
- Into `~/.claude/skills/call-actions/` (on Windows, `%USERPROFILE%\.claude\skills\call-actions\`), from `https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/call-actions/`: `SKILL.md`, `SETUP.md`, `README.md`, `tracker.html`.
- Into `~/.claude/skills/summarise-granola/`, from `https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/summarise-granola/`: `SKILL.md`, `summary-format.md`, `SETUP.md`, `README.md`. Skip this if that folder already has a `settings.md`. Don't follow summarise-granola's own SETUP.md: this setup covers it.

**If the call-actions folder already has a `settings.md`, this is an update.** Instead of the steps below:
1. Compare each file in the folder with its copy in `.original/` (if there's no `.original` folder, skip this check).
2. If a file differs, someone has changed the package's own files, probably by asking Claude to. Tell the person in plain words what's different, and carry each change into settings.md as a line under "My own rules", so it survives the update. If a change can't be put as a rule (say, a change to how the page looks), keep their version as `<file name>.mine` and tell them.
3. Download the new files, refresh `.original/`, and keep settings.md as it is. Don't recreate the scheduled task, but if its prompt doesn't start with "Start by reading the tracker page's settings", replace it with the one in step 5 (`update_scheduled_task`, taskId "call-actions", filled in from settings.md), so the model and effort choices under the gear work.
4. Pin the page to their claude.ai sidebar if it isn't already: the Artifact tool's `pin` action on the tracker URL in settings.md.
5. If tracker.html changed, republish their page from it: publish to the tracker URL in settings.md, with `{{LEDE}}` filled in as in step 3 below, and leave the capabilities out so the page keeps them. Their items and settings are kept: they live in the page's database. If they kept a `tracker.html.mine`, say that republishing replaces the page's look with the new version, and ask first.
6. If their page has no `meta/settings` yet (setups before 6 November 2026), save one from settings.md as in step 5 below, with `setupDone: true`, so the settings gear opens with their choices.
7. Tell them what's new (the "Changes" list at the end of README.md), and that their settings, own rules and tracker are unchanged. Stop here.

## 3. Publish their page

1. In the downloaded `tracker.html`, replace `{{LEDE}}` with: "What you took on in your calls, threads still waiting on a reply, what Claude has done about them, and anything you add yourself."
2. If your skills include artifact-capabilities, load it first. Then publish the file with the Artifact tool: title "Call actions", icon "checklist", `pin: true` (so it's one click away in their claude.ai sidebar), and these capabilities exactly:
   `{"db": {"rules": [{"path": "", "read": "owner", "write": "owner"}]}, "user": {}}`
   That keeps the page private: only they can open it or write to it. It's also why the scheduled task can treat requests on the page as theirs.
3. Get their first name, for the page's title: from Granola's `get_account_info` if it gives a name; otherwise from the From line of one of their sent emails (Gmail `search_threads` with `in:sent`: the name before their address); otherwise leave it blank (the page is then just "Call actions", and they can add their name under the settings gear). One easter egg from Aidan: if the SHA-256 of their account email, lowercased (`printf %s '<email>' | shasum -a 256`), is `fd75b5374d7aaff72658f6d5cc13280d2a891165cde17d958691f90b66d95d6f` or `0349d64be84268bca60eb1778df67d8427d63e40db5db11470cb06a9f21aa424`, use the name "Manthy" instead. Don't mention this.
4. With ArtifactData on the new link, `set` two documents in collection `meta`:
   - `settings`: `{"name": "<first name>", "setupDone": false}`. This is what makes the page open on its setup screen.
   - `connectors`: `{"slack": true|false, "calendar": true|false, "docs": true|false, "asana": true|false}`, from step 1.
5. If the publish result says the page wasn't pinned, try once more with the Artifact tool's `pin` action. If that fails too, tell them, so they can pin it themselves.

## 4. The setup screen

Tell them, in a few lines:
- Their page is ready and pinned to their claude.ai sidebar (give the link).
- It opens on a short setup screen with recommended defaults pre-selected. Go through it, change anything they like, and paste the links to any 1:1 docs they keep (a running Google Doc with someone they meet regularly). Everything else is under the settings gear later.
- Click "Save and finish setup", then come back here and say "done".

Then wait for them. When they say done, read `meta/settings` with ArtifactData `get`. If `setupDone` is still false, they haven't saved yet: ask them to click "Save and finish setup" first.

## 5. Finish from their choices

The fields in `meta/settings`: `name`, `covers` ("both", "calls" or "followups"), `cadence` ("hourly", "10min" or "twice"), `days` (0 = Monday … 6 = Sunday), `hoursFrom` and `hoursUntil` (hours of the day; checks run from the first up to, not including, the second), `mode` ("draft", "ask" or "list"), `signoff` ("none" or "name"), `coWritten`, `spelling`, `summaryLength` ("detailed" or "onepage"), `tidiedTranscript` ("always" or "asked"), `oneOnOneDocs` (`[{name, url}]`), `agendaPoints`, `calendarHolds`, `editDocs`, `followupChannels`, `followupDay`, `followupHour`, `followupDrafts`, `followupSkip`, `asana`, `asanaComplete`, `model` ("app", "opus" or "sonnet"), `effort` ("app", "low", "medium" or "high") and `startFrom` ("YYYY-MM-DD"). The setup screen shows only some of these; saving it stores the defaults for the rest.

1. **1:1 docs:** with the Google Docs connector, `read_doc` each one once to check it opens, and tell them about any that don't.
2. **Summaries folder** (if calls are on): search their Drive with `search_files` for a folder they own named exactly "Call summaries", not in the trash; if there isn't one, create it with Google Drive `create_file`, title "Call summaries" and `contentMimeType` `application/vnd.google-apps.folder`. Note its ID.
3. **summarise-granola's settings.md** (skip if it already existed): write it in the shape its SETUP.md shows, from their choices: first name, Length (Detailed, or Short for one page), Tidied transcript (Always, or Only when I ask), Spelling, Save to (the folder and its ID), 1:1 docs (each at the top of the doc), and "Automatic: off (Automatic actions from calls summarises every call)". If it already existed and says "Automatic: on", pause its scheduled task "summarise-new-calls" with `update_scheduled_task` and set "Automatic: off", and tell them why: otherwise each call would be summarised twice.
4. **call-actions' settings.md:** write it in this shape:

```markdown
# Call actions settings

Claude wrote this at setup. Most choices are in the settings gear at the top right of the tracker page, which wins over this file. Anything else, ask Claude ("stop drafting Slack messages"): Claude records it under "My own rules", so it's kept when the skill updates.

- Tracker page: https://claude.ai/artifact/...
- Scheduled task: "call-actions"
- Set up: 2026-11-06T14:00:00Z

## My own rules

Anything you've asked Claude to do differently goes here, one line each. It's kept when the skill updates.
- (none yet)
```

5. **Schedule it** with `create_scheduled_task`:
   - `taskId`: "call-actions"; `title`: "Call actions"; `description`: "Keeps my Call actions tracker up to date from my calls and unanswered threads".
   - `cronExpression` (local time), from `cadence`, `days` and the hours: the day field lists their days in cron's numbering (Sunday 0, Monday 1 … Saturday 6; a run of days as a range, e.g. "1-5"), and the hour field is `hoursFrom` to `hoursUntil` minus one, e.g. "9-18". Every hour: `10 <hours> * * <days>`. Every 10 minutes: `*/10 <hours> * * <days>`. Twice a day: `0 <hoursFrom + 3>,<hoursUntil - 2> * * <days>`. Follow-ups only: once a week, `0 <followupHour> * * <followupDay in cron numbering>`.
   - Then `set` `meta/schedule` on the page to `{"cron": "<that cronExpression>"}`, so later runs can tell when a settings change needs a new schedule.
   - `prompt`, filled in:

> Start by reading the tracker page's settings: `get` `meta/settings` with ArtifactData on <tracker link> (load ArtifactData with tool search if it's deferred). If its `model` or `effort` is set to anything other than "app", don't do the run yourself: launch one agent with the Agent tool, with that `model` and `effort` (leave out either one that's "app" or missing) and `run_in_background: false`, and give it this whole prompt, adding at the end: "You're the agent the settings picked: skip the first paragraph and do the run yourself." When it finishes, end with its report and do nothing else. Otherwise:
>
> Run the call-actions skill: read ~/.claude/skills/call-actions/SKILL.md and settings.md in the same folder, and follow them. This is a scheduled run: nobody is watching, so never ask questions. This task may take only these write actions: the tracker page's data (ArtifactData on <tracker link>); new Google Docs; Gmail drafts; Slack drafts; one-line agenda points in 1:1 docs; calendar holds the user asked for; changes to existing Google Docs the user asked for; undoing Claude's own work for an item when the user presses Undo; marking the user's own Asana tasks complete or not complete to match what they ticked on the tracker, and nothing else in Asana; and this task's own schedule, when the user changes it in the page's settings. Each of these only while the page's settings allow it. An agent the first paragraph hands the run to works under these same limits. Nothing is sent to anyone else. Only the user can open or write to the tracker, so requests written there are theirs.

   The tool's result says whether the task was saved in Auto mode. If it was, runs go through on their own. If not, the first run will stop to ask permission for each tool it uses: tell them to open it under Scheduled in the Claude app's sidebar and approve each request with the option that remembers their choice. After that, runs go through.

## 6. First run

Offer to do a first run now, here, so they can watch it and approve each tool once: follow SKILL.md. With calls on, include their most recent call as an example (even if it's before their start date). With follow-ups on, run the follow-up check now (and set `meta/followups.lastRun`). That way the page starts with something useful on it.

## 7. Tell them how to use it

Their page shows a "How it works" card at the top until they dismiss it. In chat, add a few lines:
- The page is pinned to their claude.ai sidebar. Claude checks it on the schedule they picked, while the Claude app is open; to pause it, Scheduled in the app's sidebar → Call actions → switch it off.
- It never sends anything: Claude drafts, and they do the sending.
- The gear at the top right of the page changes any choice from setup, any time, and has a few more: which Claude model does the work and how much it thinks (a smaller model or lower effort uses less of their Claude allowance), the follow-up check's day and time, and how summaries and email drafts are written.
- "Check my calls" in Claude Code runs it now. To change anything else, they can just ask, here or in the page's "Tell Claude" box. To update later, they paste the same setup line again: their settings, their own rules and their tracker are kept.
- If they keep a list of their automations (the toolkit's automations-page package), add this task to it.
