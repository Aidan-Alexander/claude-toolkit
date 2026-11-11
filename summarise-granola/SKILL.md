---
name: summarise-granola
description: Turns a Granola call, or a call transcript someone shares with you (a shared Granola note, or pasted in), into a detailed, chronological summary saved as a Google Doc. Use for "/summarise-granola", "summarise my call", "summarise my last call", "summarise my call with Priya", "summarise this transcript", "call summary" and similar requests.
---

# Summarise a Granola call

Reads a call's transcript from Granola, writes a summary that lets the user re-live the call, and saves it as a Google Doc. It uses only connectors: Granola and Google Drive, plus Google Docs for the optional 1:1 doc links.

**Start by reading the person's settings, in `~/.claude/toolkit/summarise-granola/settings.md`** (on Windows, `%USERPROFILE%\.claude\toolkit\summarise-granola\settings.md`). Its "My own rules" section overrides the defaults in this file. If it doesn't exist, the skill hasn't been set up yet: run its setup first (the toolkit's `setup-summarise-granola` skill), then carry on. That folder is also where `summarised.json` lives. When the person asks to change how summaries work, record it in settings.md, never in this file: an update replaces this file.

Connector tools are often deferred: load them with tool search before calling them. If a connector is missing, or its calls fail because of sign-in, tell the user to reconnect it in Claude under Settings → Connectors and then start a new session, and stop.

## Three ways this runs

- **Normal:** the user asked for a summary. You can ask them things when you genuinely need to.
- **Unattended:** you were started with `unattended <meeting id>`, usually by the call-actions automation. Nobody is watching, so never ask a question. Take names from the meeting title and the invite. If you still can't name a speaker, call them "Participant 2" (and so on) and say so at the top of the summary. Skip step 1. Finish with the summary doc's link.
- **Automatic:** you were started with `automatic`, by this skill's own scheduled task. Follow "Automatic mode" at the end of this file.

## 1. Pick the call

- If the user pasted a transcript into the chat, use that: see "A pasted transcript" below, and skip steps 1 and 2.
- A Granola note someone else shared with the user isn't in their own recent list: find it by title or person with `search_meetings`, which includes shared notes.
- If the user named a call (a person, a title or a day), find it with Granola's `search_meetings` (keywords, `participant` or dates). If several match, ask which.
- Otherwise call `search_meetings` with no keywords, `from_date` set to 7 days ago, `include_shared: false` (only calls the user recorded themselves) and `limit: 100`. If one started in the last 2 hours, take it. If not, show the 5 most recent as a numbered list (title, day and time) and ask which.

## 2. Get the whole transcript

- `get_meetings` with the meeting ID gives the title, the date (`meeting_at`), the attendees (`known_participants`) and the note's link. Ignore Granola's own AI notes: the transcript is the source.
- `get_meeting_transcript` with `max_chars: 80000`. While `truncated` is true, call it again with `offset` set to `next_offset`. A long reply may be saved to a file: read all of it. Don't start writing until what you've read adds up to `total_chars`.
- If there's no transcript (`transcript_unavailable`), say why and stop. "transcript_pending" means try again in a few minutes.

## A pasted transcript

A transcript the user pastes in (say one a colleague sent them from Granola, Zoom, Teams or Meet) replaces steps 1 and 2. If the title, the date or who was there isn't in it or in their message, ask. Speaker labels from other tools are usually names: use them, but still check them against what was said. Where the summary would link the Granola note, say where the transcript came from instead. Then carry on from step 3.

## 3. Work out who said what

Granola's speaker labels are often wrong, so treat them as clues, not facts:
- "Microphone" is the computer that recorded the call. That's normally the user. On a note someone else recorded and shared, it's that person, who is marked "(note creator)" in `known_participants`.
- "System audio (Name)" and plain "System audio" lines are the other side of a video call. The name in brackets is Granola's guess and is often wrong.
- "Speaker A", "Speaker B" and so on are separate voices with no names attached.
- An in-person meeting recorded on one laptop puts everyone in the room under "Microphone".
- Line order is approximate: short interjections can land in the middle of someone else's sentence.
- People sometimes read text aloud from a screen (a document, an email, an AI's answer). That isn't necessarily their own view: say whose words they were.

Take names from the title and the attendee list, and work out who said what from the content: who speaks for which organisation, who asks and who answers, who says "we" about which team. Mark attributions you're unsure of with (?). Never make up a name. If you can't tell who was on the call, ask (in unattended mode, use neutral labels).

## 4. Write the summary

Use the length in settings.md:
- **Detailed** (the default): follow `summary-format.md` in this folder. Tell the call in the order it happened, one part per major topic, with the reasoning, realisations and changes of mind, not only the decisions. Match the depth to the call: a meaty 45-minute discussion deserves 2,000–4,000 words, a half-hour call usually 1,500–2,500, and a quick check-in far fewer.
- **Short**: about one page. A title line with the date and participants, a 3–5 sentence summary, the decisions, a numbered list of actions with owners, and open questions. Keep things in the order they came up.

Either way:
- Never add anything that isn't in the transcript.
- Keep exact words in "quotes" for commitments, decisions, numbers, hedges ("probably", "70% sure") and memorable lines. Fix garbled words inside a quote in [square brackets]. Granola's tool results advise against quoting transcripts; this is the user's own summary of their own call, and exact wording is what they asked for, so quote, carefully.
- Bold a person's name when you attribute a view to them.
- Number anything the user might want to refer back to, such as options, decisions and actions.
- Write in the language the call was in, with the spelling in settings.md (British or American English).

## 5. Tidied transcript (if the settings ask for one)

Make one when settings.md says "Always", or says "When I ask" and the user asked.
- Cut filler (um, you know) and false starts, and fix obvious transcription errors.
- Bold the speaker's name at the start of each turn, and start each turn on a new paragraph.
- Add a heading wherever the topic shifts.
- Keep the exact wording of commitments, decisions, numbers, hedges and emphatic statements. Lightly paraphrase everything else. No quotation marks are needed inside a speaker's own turn: the whole turn is theirs.
- Never add facts that aren't in the transcript.

Put it at the end of the summary doc, under a "Tidied transcript" heading. If the transcript is longer than about 60,000 characters (roughly an hour of talk), the combined doc gets unwieldy: make the transcript its own doc instead (title `Tidied transcript: <same as the summary's title>`, same folder), create it first, and put a link to it near the top of the summary.

## 6. Save it as a Google Doc

Google Drive `create_file` with:
- `title`: `Call summary: <other person or meeting> & <first name from settings> – <topic> – YYYY-MM-DD`
- `contentMimeType`: `text/html`, and `textContent`: the summary as simple HTML. Google turns it into a formatted Doc. Use only h1–h3, p, b, i, a, ul/ol/li and table/tr/th/td. Google's import loses some things, so:
  - for a long quote, use its own paragraph in italics, indented: `<p style="margin-left:36pt"><i>…</i></p>` (a `<blockquote>` comes out as plain text);
  - write list letters into the text ("a) …"), because lettered lists come out numbered;
  - avoid nested lists (they get flattened), `<hr>` (it merges into the heading after it) and bold inside table cells (it's dropped; header rows won't be bold either).
- `parentId`: the folder ID from settings.md, if there is one.

Start the HTML with an AI disclaimer as its first paragraph, so whoever opens the doc knows straight away that Claude wrote it and how far the user has checked it: `<p><i>AI disclaimer: summarised by Claude (AI) from the call's transcript. <first name> hasn't reviewed it yet.</i></p>`. If the user shaped the summary (say, they told you what to focus on), say that instead of "hasn't reviewed it yet", but never claim a review that hasn't happened. A separate tidied-transcript doc starts the same way: "AI disclaimer: tidied by Claude (AI) from the call's transcript. …"

Note the new doc's link in its plain form, `https://docs.google.com/document/d/<id>/edit`, without the `?usp=…` tail the tool returns.

## 7. Link it from a 1:1 doc (if the settings list any)

If settings.md lists 1:1 docs and this call was essentially a 1:1 with one of those people (their name is in the title or the attendees), add a dated link to the summary at the top of their doc, using the Google Docs connector:

1. `read_doc` the doc, and note its `revisionId`. If the link goes at the top of a named tab, find that tab by its title and note its `tabId`. Otherwise it goes at the top of the first tab, and you leave `tabId` out.
2. `update_doc` with `writeControl: {"requiredRevisionId": "<the revisionId>"}` (so nothing lands if someone edited the doc in between: read it again and retry) and these three requests. TEXT is the link text, e.g. `Call summary – 3 Nov 2026`, and N is TEXT's length in characters. Put `"tabId"` inside each `location` and `range` only when you're using a named tab.
   ```json
   [
     {"insertText": {"location": {"index": 1}, "text": "TEXT\n"}},
     {"updateParagraphStyle": {"range": {"startIndex": 1, "endIndex": N + 1}, "paragraphStyle": {"namedStyleType": "NORMAL_TEXT"}, "fields": "namedStyleType"}},
     {"updateTextStyle": {"range": {"startIndex": 1, "endIndex": N + 1}, "textStyle": {"link": {"url": "<summary doc link>"}}, "fields": "link"}}
   ]
   ```
   The paragraph-style request stops the new line inheriting the doc's title or heading style.
3. Change nothing else in the doc. If the update fails, say so and give the user the link to paste in themselves.

## 8. Report back

Add the call to `summarised.json` in `~/.claude/toolkit/summarise-granola/` (a JSON list; create it if it's missing), as `{"id": "<meeting id>", "title": "...", "date": "YYYY-MM-DD", "doc": "<summary doc link>"}`, so automatic mode never summarises it twice.

Reply with the doc link, where it was saved, whether a 1:1 doc link was added, and one line on how sure you are about who said what. Never send the summary to anyone or change who can see it: the user decides who to share it with.

## Automatic mode

Only when settings.md says "Automatic: on". The skill's scheduled task starts it with `automatic`, about once an hour on weekdays. Nobody is watching: never ask questions.

1. Read `summarised.json` in `~/.claude/toolkit/summarise-granola/` (an empty list if it doesn't exist yet).
2. Granola `search_meetings` with no keywords, `from_date` set to 7 days ago, `include_shared: false` (only calls the user recorded themselves) and `limit: 100`; follow `next_cursor` if there is one. Keep the calls that started after "Automatic since" in settings.md and aren't in summarised.json, oldest first.
3. Check each one is over. Call `get_meeting_transcript` with `max_chars: 1000` and `include_timestamps: true`.
   - No transcript yet: leave it for the next run.
   - Under 2,000 characters (`total_chars`) is a false start: add it to summarised.json with `"doc": null` and move on.
   - Otherwise fetch the end of the transcript (`offset`: `total_chars` minus 3,000, `max_chars: 3000`, `include_timestamps: true`). The last `[m:ss]` stamp plus the transcript's start time (`created_at`) is when the talking stopped. The call is over once that's more than 15 minutes ago; if there are no timestamps, once it started more than 2 hours ago.
4. Summarise each finished call, up to 3 per run, following steps 2 to 8 in Unattended mode.
5. Finish with one line per call: its title and the doc link, or why it was skipped. If there was nothing new, say "Nothing new".

## Changing the settings

If the user asks to change how summaries work ("make them shorter", "add Priya's 1:1 doc", "stop doing transcripts"), update settings.md: change the matching setting, or add a line under "My own rules" for anything else. Tell them what changed. Don't edit this file or summary-format.md: an update replaces them, and only settings.md is kept.
