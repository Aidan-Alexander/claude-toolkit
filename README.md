# Aidan's Claude toolkit

I'm Aidan Alexander, COO at Ambitious Impact (AIM). This is how I use Claude day to day, written up so colleagues and anyone else in the AIM community can borrow the useful bits.

The first four are packaged for you to set up yourself. You paste one line into Claude Code and it does the rest, asking you a few questions as it goes. No coding needed. The rest are listed further down so you can see what's possible: if one of those would help you, ask me and I'll package it.

## Set these up yourself

| | What it does | You'll need |
|---|---|---|
| [**Call summaries**](summarise-granola/) | Turns a call you recorded in Granola into a detailed, chronological summary in a Google Doc. | Granola, Google Drive |
| [**Call actions tracker**](call-actions/) | After each call, works out what you said you'd do and drafts what it can. Once a week, it adds emails and Slack messages that never got a reply, and it can bring in your Asana tasks too. It all sits on one page you tick off, snooze or dismiss. [Try the demo](https://aidan-alexander.github.io/claude-toolkit/call-actions/demo/). | Gmail; Granola and Google Drive for calls |
| [**Automations page**](automations-page/) | One page listing everything that runs on a schedule for you, and whether each one is working. Claude keeps it up to date. | Nothing extra |
| [**Work hours**](work-hours/) | Ends your workday at a set time, and puts your laptop to sleep at bedtime, unless you click to skip. For anyone who uses one laptop for work and home. Mac only. | Nothing extra |

All four run in **Claude Code**: the Code tab of the Claude desktop app, not the usual chat. [Getting started](GETTING-STARTED.md) covers the one-off setup, which takes about 10 minutes the first time.

None of them ever send anything for you. They write drafts and documents, and you do the sending.

## Everything else I use

### Skills: things Claude does when I ask

- **ask-mel:** answers questions about AIM's charities from our monitoring database, with a source and a date for every claim. Built for AIM staff: ask me for it.
- **mel-guru:** a guided way to log a plan, a hypothesis or an experiment in our monitoring database, which also challenges whether it's worth doing. AIM staff only.
- **deck:** builds slide decks in six distinct visual styles (not Claude's default look), with licence-clean photos, ready for Google Slides.
- **format-doc:** restyles a Google Doc in AIM's house style: fonts, heading colours, bold lead-ins, tables. Adapted from a colleague's formatter. It needs two command-line tools for now, so it isn't packaged yet.
- **writing:** my drafting workflow. Claude drafts in my voice from a brief and flags sentences that sound like AI. After each piece, it compares my final version with its draft and updates its notes on how I write.
- **circle-crop:** crops a folder of headshots into clean transparent circles, and checks each one. We used it for the founder photos on the AIM website.
- **grant-sweep:** checks public grant databases and charity newsletters for new grants to AIM charities, and adds the missing ones to our funding table.
- **fill-when2meet:** fills in a When2Meet poll from a Calendly, OnceHub or Google Calendar booking page. Built by [Aaron Cahill](https://github.com/Aaron-Cahill-Ire/calendar-when2meet-skill).
- **slack:** a community skill for Slack digests and search. I mostly use Claude's own Slack connector now.

### Things that run on a schedule

In the Claude app (its Scheduled list):
- **Call summaries and actions:** the tracker above. It checks for finished calls every 10 minutes on weekdays, syncs my few Asana tasks hourly, and looks for unanswered emails and Slack messages on Thursday afternoons.
- **MEL Granola sync:** weekly. Copies the charity calls colleagues have approved in a shared Granola folder into our monitoring database, and posts a digest in Slack.
- **Monthly grant sweep:** runs grant-sweep on the 1st of each month. It only adds clear-cut new grants, and lists anything doubtful for me to check.
- **ask-mel feedback digest:** monthly. Sorts new feedback on ask-mel into "the skill got it wrong" and "the data is wrong", and emails a digest.

On GitHub: small scripts Claude wrote for me, which GitHub runs on a timer and which call Claude to do the reading:
- **MEL intake:** daily. Turns the Slack threads people flag into summarised rows in our monitoring database.
- **Newsletter intake, digest and check:** saves the charity newsletters people forward into our database, posts a weekly roundup in Slack, and every quarter lists charities we haven't heard from.
- **Charity directory rebuild:** nightly. Rebuilds the charity directory on the AIM website from our database.
- **Page watcher:** hourly. Checks a web page and pings my phone when something changes. I use it to watch a rabbit rescue's adoption list.

On my Mac:
- **Website code backup:** monthly. Copies the AIM website's custom code into a backup Google Doc whenever it changes.
- **Stop work and bedtime:** packaged above as Work hours.

I keep track of all of these on the automations page above.

## Want one of these, or something like it?

Most of these started as a one-line request to Claude Code, like "every Thursday, find emails I sent that got no reply". If you'd like one of the unpackaged ones, or help turning something you do every week into one of these, message me.

## Credits

Call summaries grew out of [HartreeWorks' summarise-call skill](https://github.com/HartreeWorks/skill--summarise-call).

## Licence

[MIT](LICENSE): use, change and share these freely.
