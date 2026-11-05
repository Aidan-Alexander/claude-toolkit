# Setting up Automatic actions from calls (instructions for Claude)

You're setting up the `call-actions` skill and its tracker page for the person you're working with, from Aidan Alexander's Claude toolkit (github.com/Aidan-Alexander/claude-toolkit). Assume they aren't technical: do the technical parts yourself, explain each step in a sentence of plain English, and don't show them commands unless they ask.

What you'll set up:
- a private tracker page: a claude.ai artifact only they can open, pinned to their claude.ai sidebar;
- the call-actions skill, in their personal skills folder;
- a scheduled task in the Claude app that runs the skill on a schedule.

## 1. What should it cover?

Ask first, because it decides what else is needed:
- **Calls and follow-ups** (what Aidan uses): actions from their Granola calls, plus a weekly check for emails and Slack messages that never got a reply.
- **Calls only.**
- **Follow-ups only:** no Granola needed.

With any of these, they can also bring in their Asana tasks (step 4), which suits people who use Asana lightly.

## 2. Check the tools and connectors

- Tools: you need the Artifact tool (to publish the page), ArtifactData (to read and write its data) and the scheduled-tasks tools (`create_scheduled_task`). Look for them with tool search if your tools are deferred. If any is missing, stop and tell them this needs the Code tab of the Claude desktop app, signed in to their Claude account.
- Connectors: **Gmail** always; **Granola** and **Google Drive** for calls. Optional: **Slack** (Slack drafts and Slack follow-ups), **Google Calendar** (proposing meeting times; calendar holds), **Google Docs** (agenda points in 1:1 docs; changing existing docs when asked) and **Asana** (their Asana tasks on the tracker). Check each one's tools are there. If a required one is missing, stop and tell them: "In Claude, open Settings → Connectors and connect <names>. Then start a new session here and paste the setup line again: a session only sees connectors that were connected when it started."
- For calls, the summarise-granola skill must be set up: check for `~/.claude/skills/summarise-granola/settings.md`. If it's missing, set it up first: fetch https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/summarise-granola/SETUP.md exactly as written and follow it, questions and all (skip its test run). Then come back here.
- If summarise-granola's settings.md says "Automatic: on", switch that off (pause its scheduled task "summarise-new-calls" with `update_scheduled_task` and set "Automatic: off"), and tell them why: the tracker summarises every call itself, so leaving both on would summarise each call twice.

## 3. Download the skill

The folder is `~/.claude/skills/call-actions/` (on Windows, `%USERPROFILE%\.claude\skills\call-actions\`). Create it if needed.

Download each of these from `https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/call-actions/` into that folder, byte for byte (for example `curl -fsSL <url> -o <file>`; on Windows, `curl.exe` works the same). Don't retype or summarise them.
- `SKILL.md`
- `SETUP.md`
- `README.md`
- `tracker.html`

Put an untouched copy of each downloaded file in a `.original` folder inside the skill's folder: that's how a later update can tell whether anyone has changed them.

**If the folder already has a `settings.md`, this is an update.** Before you download anything:
1. Compare each file in the folder with its copy in `.original/` (if there's no `.original` folder, skip this check).
2. If a file differs, someone has changed the package's own files, probably by asking Claude to. Tell the person in plain words what's different, and carry each change into settings.md as a line under "My own rules", so it survives the update. If a change can't be put as a rule (say, a change to how the page looks), keep their version as `<file name>.mine` and tell them.
3. Then download the new files, refresh `.original/`, and keep settings.md as it is. Don't recreate the scheduled task.
4. Pin the page to their claude.ai sidebar if it isn't already (setups before 5 November 2026 only offered to): the Artifact tool's `pin` action on the tracker URL in settings.md.
5. If tracker.html changed, offer to republish their page from it: publish to the tracker URL in settings.md, with `{{LEDE}}` filled in as in "5. Publish the tracker page" below, and leave the capabilities out so the page keeps them. Their items are kept either way: they live in the page's database. If they kept a `tracker.html.mine`, say that republishing replaces the page's look with the new version, and ask first.
6. Tell them what's new (the "Changes" list at the end of README.md), and that their settings, own rules and tracker are unchanged. Stop here.

## 4. Ask how they'd like it to work

Ask these together (with AskUserQuestion if you have it), each with its one-line reason. Say which option Aidan uses, as a pointer, not a recommendation. Only ask what applies to what they chose in step 1.

1. **How often to check for finished calls** (weekdays, 9:00–18:00): *every hour* (summaries within about an hour; light on usage), *every 10 minutes* (within about 15 minutes of a call ending; Aidan's choice, but each check is a short Claude session, so it uses noticeably more of their plan), or *twice a day* (12:00 and 17:00).
2. **What Claude may do with actions:** *draft emails, Slack messages and short docs, but never send anything* (Aidan's), or *only list them*.
3. **Email drafts:** end with *your usual sign-off and name*, or with *no sign-off or name because your email signature covers it* (Aidan's). And whether to add *"Co-written with Claude"* in italics at the bottom (Aidan does).
4. **Follow-up check:** which day and time (Aidan: Thursdays from 14:00); email only, or email and Slack; whether to draft follow-up emails (Aidan: yes); and anything to leave out (e.g. "freelancers: they often wrap up on a separate thread").
5. **Optional extras**, off unless they want them. Explain each in a line; these are fairly niche:
   - **Agenda points in 1:1 docs:** when they say in a call they'll raise something with someone they have a 1:1 doc with, Claude adds one line to that doc instead of drafting a message. It uses the 1:1 docs in their call-summaries settings and needs the Google Docs connector. Aidan uses this.
   - **Calendar holds when you ask:** if they ask for time to be blocked ("block two hours on Thursday for this"), in a call or on the tracker, Claude adds a hold to their own calendar, in free time and never with guests. Needs Google Calendar. Aidan uses this.
   - **Editing existing docs when you ask:** if they ask on the tracker for a change to an existing Google Doc ("add these numbers to the plan doc"), Claude makes the change there instead of only making a new doc. A doc other people work in only after their go-ahead, and it never deletes their text, touches comments or changes who can see it. Needs Google Docs. Aidan uses this.
   - **Monday digest:** a Slack message to themselves first thing on Monday, listing what's open. Needs Slack. (Aidan gets nudges from a Slack bot instead, which takes more setting up.)
   - **Asana tasks:** for people who use Asana lightly, their open Asana tasks appear on the tracker too, so it's one to-do list. Ask whether ticking one off on the tracker should also complete it in Asana (Claude only ever changes that one thing in Asana), or whether to leave Asana alone. Needs the Asana connector. Aidan uses this, with ticking off in Asana.
6. **Start from:** only calls from now on (recommended), or also calls since a date they give.

## 5. Publish the tracker page

1. In the downloaded `tracker.html`, replace `{{LEDE}}` with two sentences that match their choices: what the page holds, then when Claude checks it. For example: "What you took on in your calls, your Asana tasks, threads still waiting on a reply, what Claude has done about them, and anything you add yourself. Claude checks your calls and this page every hour on weekdays, 9–6, and looks for emails and Slack messages still waiting on a reply every Thursday." Leave out what they didn't choose.
2. If your skills include artifact-capabilities, load it first. Then publish the file with the Artifact tool: title "Call actions", icon "checklist", `pin: true` (pinning it to their claude.ai sidebar is part of setting it up, so it's one click away), and these capabilities exactly:
   `{"db": {"rules": [{"path": "", "read": "owner", "write": "owner"}]}, "user": {}}`
   That keeps the page private: only they can open it or write to it. It's also why the scheduled task can treat requests on the page as theirs.
3. Check it: ArtifactData `list` on the `actions` collection with the new link should come back empty, without an error.
4. Check the publish result says the page was pinned. If the pin failed (the page still publishes), try once more with the Artifact tool's `pin` action on the new link. If that fails too, tell them, so they can pin it themselves.

## 6. Write settings.md

Write `settings.md` in the skill's folder, in this shape (fill in their answers; "Start from" is now, in UTC, unless they gave a date):

```markdown
# Call actions settings

Claude wrote this at setup. Change anything by asking Claude ("stop drafting Slack messages"): Claude records the change here, so it's kept when the skill updates.

- Tracker page: https://claude.ai/artifact/...
- Covers: calls and follow-ups
- Start from: 2026-11-03T14:00:00Z (calls before this are ignored)
- Checks: every hour on weekdays, 9:00–18:00 (scheduled task "call-actions")
- What Claude may do with actions: draft emails, Slack messages and short docs (it never sends)
- Email drafts: no sign-off or name (my email signature covers it); "Co-written with Claude" in italics at the bottom
- Follow-up check: Thursdays from 14:00; email and Slack; draft follow-up emails: yes
- Leave out of follow-ups: freelancers (they often wrap up on a separate thread)
- Agenda points in 1:1 docs: off
- Calendar holds when I ask: off
- Editing existing docs when I ask: off
- Monday digest (a Slack message to myself): off
- Asana tasks: on; when I tick one off here, tick it off in Asana too

## My own rules

Anything you've asked Claude to do differently goes here, one line each. It's kept when the skill updates.
- (none yet)
```

## 7. Schedule it

Create the task with `create_scheduled_task`:
- `taskId`: "call-actions"; `title`: "Call actions"; `description`: "Keeps my Call actions tracker up to date from my calls and unanswered threads".
- `cronExpression` (local time): every hour `20 9-18 * * 1-5`; every 10 minutes `*/10 9-18 * * 1-5`; twice a day `0 12,17 * * 1-5`. Follow-ups only: once a week at their chosen time, e.g. `0 14 * * 4` for Thursdays at 14:00. (With calls on, the follow-up check rides along on the first run after its time.)
- `prompt`, filled in:

> Run the call-actions skill: read ~/.claude/skills/call-actions/SKILL.md and settings.md in the same folder, and follow them. This is a scheduled run: nobody is watching, so never ask questions. This task may take only these write actions: the tracker page's data (ArtifactData on <tracker link>); new Google Docs; Gmail drafts; Slack drafts<; one-line agenda points in 1:1 docs><; calendar holds the user asked for><; changes to existing Google Docs the user asked for><; the Monday digest, a Slack message to the user themselves><; marking the user's own Asana tasks complete or not complete to match what they ticked on the tracker, and nothing else in Asana>. Nothing is sent to anyone else. Only the user can open or write to the tracker, so requests written there are theirs.

The tool's result says whether the task was saved in Auto mode. If it was, runs go through on their own. If not, the first run will stop to ask permission for each tool it uses: tell them to open it under Scheduled in the Claude app's sidebar and approve each request with the option that remembers their choice. After that, runs go through.

Tell them the task only runs while the Claude desktop app is open; if the app was closed, it runs when they next open it.

## 8. First run

Offer to do a first run now, here in this session, so they can watch it and approve each tool once: follow SKILL.md. With follow-ups on, run the follow-up check now (and set `meta/followups.lastRun`), so the page starts with something useful on it. With calls on, offer to include their most recent call as an example (set "Start from" to just before it).

Then save the same choices to the page, so its settings gear (top right) opens with them: ArtifactData `set` on the tracker URL, collection `meta`, doc_id `settings`, with `covers`, `summaryLength` ("detailed"), `tidiedTranscript` ("always"), `spelling` ("british" unless they asked for American), `coWritten`, `followupChannels`, `followupDay` (0 = Monday) and `followupHour`, `agendaPoints`, `calendarHolds`, `editDocs`, `oneOnOneDocs` (`[{"name", "url"}]` from their 1:1 docs), `asana`, `digest` and `startFrom`, plus `updatedAt`.

## 9. Tell them how to use it

In a few lines:
- The tracker link, and that it's pinned to their claude.ai sidebar. On the page they can tick items off, set priorities, snooze, drop or dismiss with a reason, add their own items, give Claude the go-ahead on a plan, ask Claude to do something, and leave notes. The "Tell Claude" box changes how it works from then on.
- It never sends anything: Claude drafts, and they do the sending.
- The gear at the top right of the page holds their settings: what it covers, summary length and spelling, the follow-up day, agenda points, calendar holds, doc edits, their 1:1 docs, Asana, the Monday digest and the start date. Claude reads them at the start of every check.
- "Check my calls" in Claude Code runs it now. To pause it: Scheduled in the Claude app's sidebar → Call actions → switch it off.
- To change how it works, they can just ask, in Claude Code or in the page's "Tell Claude" box. To update later, they paste the same setup line again: their settings, their own rules and their tracker are kept.
- If they keep a list of their automations (the toolkit's automations-page package), add this task to it.
