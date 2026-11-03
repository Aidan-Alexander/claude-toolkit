# Aidan's Claude toolkit

*Easier to read on the website: [aidan-claude-toolkit.netlify.app](https://aidan-claude-toolkit.netlify.app)*

I'm Aidan Alexander, COO at Ambitious Impact (AIM). This is a bunch of systems I've set up so that Claude helps me work better and more efficiently. My Claude has written it up so colleagues and anyone else in the AIM community can borrow the useful bits.

Some systems/tools I've packaged up for you to install: You paste one line into Claude Code and it does the rest, asking you a few questions as it goes. No coding needed.

Most of these started as a one-line request to Claude Code, like "every Thursday, find emails I sent that got no reply".

I also list other skills I have installed that I haven't packaged up, in case it gives you ideas for skills on your Claude.

## Packaged for you to install

| Tool | What it does | Why it's useful | You'll need | Set it up: paste this into Claude Code |
|---|---|---|---|---|
| [**Call summaries**](summarise-granola/) | Turns a call you recorded in Granola into a detailed, chronological summary in a Google Doc. | Granola's own notes are a quick list of bullets. These tell the story of the call: the reasoning behind decisions, who thought what, the exact words for commitments, and the open questions, so I can pick up a thread weeks later. | Granola, Google Drive | `Set up "summarise-granola" from Aidan's Claude toolkit. Fetch https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/summarise-granola/SETUP.md exactly as written (e.g. with curl) and follow it.` |
| [**Call actions tracker**](call-actions/) | After each call, works out what you said you'd do and drafts what it can. Once a week, it adds emails and Slack messages that never got a reply, and it can bring in your Asana tasks too. It all sits on one page you tick off, snooze or dismiss. [Try the demo](https://aidan-claude-toolkit.netlify.app/call-actions/demo/). | I have lots of calls, each with several small actions I need to keep track of and act on, and busy inboxes where it's easy to drop a ball. This catches them all in one place, and Claude does the easy ones. | Gmail; Granola and Google Drive for calls | `Set up "call-actions" from Aidan's Claude toolkit. Fetch https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/call-actions/SETUP.md exactly as written (e.g. with curl) and follow it.` |
| [**Automations page**](automations-page/) | One page listing everything that runs on a schedule for you, and whether each one is working. Claude keeps it up to date. [Try the demo](https://aidan-claude-toolkit.netlify.app/automations-page/demo/). | Automations are easy to set up and easy to forget, and a broken one fails quietly. This is one place to see what's running, whether it's working, and how to pause it. | Nothing extra | `Set up "automations-page" from Aidan's Claude toolkit. Fetch https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/automations-page/SETUP.md exactly as written (e.g. with curl) and follow it.` |
| [**Work hours**](work-hours/) | Ends your workday at a set time, and puts your laptop to sleep at bedtime, unless you click to skip. Mac only. | I use one laptop for work and everything else, so it's easy to drift back into work in the evening or stay up too late. This makes stopping the default, and carrying on a deliberate choice. | Nothing extra | `Set up "work-hours" from Aidan's Claude toolkit. Fetch https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/SETUP.md exactly as written (e.g. with curl) and follow it.` |

All four run in **Claude Code**: the Code tab of the Claude desktop app, not the usual chat. If you haven't used it before, [Getting started](GETTING-STARTED.md) covers the one-off setup, which takes about 10 minutes.

None of them ever send anything for you. They write drafts and documents, and you do the sending.

## Other skills and automations I use

### Charity monitoring at AIM

- **ask-mel:** answers questions about AIM's charities from our monitoring database, with a source and a date for every claim. Once a month, Claude sorts any feedback on its answers into "the skill got it wrong" and "the data is wrong", and emails me a digest. Built for AIM staff: ask me for it.
- **mel-guru:** a guided way to log a plan, a hypothesis or an experiment in our monitoring database, which also challenges whether it's worth doing. AIM staff only.
- **grant-sweep:** checks public grant databases and charity newsletters for new grants to AIM charities, and adds the missing ones to our funding table. It runs on the 1st of each month, adds only clear-cut grants, and lists anything doubtful for me to check.
- **Charity call notes:** every week, copies the charity calls colleagues have approved in a shared Granola folder into our monitoring database, and posts a digest in Slack.

### Writing, docs and slides

- **writing:** my drafting workflow. Claude drafts in my voice from a brief and flags sentences that sound like AI. After each piece, it compares my final version with its draft and updates its notes on how I write. Still a work in progress: it isn't working well for me yet.
- **deck:** builds slide decks in six distinct visual styles (not Claude's default look), with licence-clean photos, ready for Google Slides. Still a work in progress: it isn't working well for me yet.
- **format-doc:** restyles a Google Doc in AIM's house style: fonts, heading colours, bold lead-ins, tables. Adapted from a colleague's formatter. It needs two command-line tools for now, so it isn't packaged yet.

### The AIM website

- **Charity directory rebuild:** nightly. Rebuilds the charity directory on the AIM website from our database so that the latest changes to the database are reflected.
- **Website code backup:** every month, copies the website's custom code into a backup Google Doc whenever it has changed.
- **circle-crop:** crops a folder of headshots into clean transparent circles, and checks each one. We used it for the founder photos on the AIM website.

### Scheduling

- **fill-when2meet:** fills in a When2Meet poll from a Calendly, OnceHub or Google Calendar booking page. Built by [Aaron Cahill](https://github.com/Aaron-Cahill-Ire/calendar-when2meet-skill).

### Life

- **Bunny watcher:** hourly. Checks a rabbit sanctuary's adoption page and sends my phone a push notification when the status of one of the bunnies changes, e.g. "Ravioli is now reserved 😭"

I keep track of everything that runs on its own on my automations page (above).

## Things I've built with Claude

- **Team meeting timer:** the timer we use for AIM's team meetings, with animated farm animals, a spin-the-wheel and a few joke modes. [Use it](https://aimteammeeting.netlify.app) or [see the code](https://github.com/Aidan-Alexander/aim-meeting-timer).
- **AIM blog archive:** the old Charity Entrepreneurship blog posts, rebuilt from web archives after our website moved, so old links still work. [Read it](https://aim-blog-archive.netlify.app).
- **MailSmush:** a Mac app that puts my three Gmail and Google Calendar accounts in one window. It isn't public yet: ask me if you'd like it.
- **MEL intake scripts:** small scripts GitHub runs every day. They turn the Slack threads people flag into summarised rows in our monitoring database, save the charity newsletters people forward, post a weekly newsletter roundup in Slack, and every quarter list the charities we haven't heard from. [See the code](https://github.com/Aidan-Alexander/mel-intake).

## Credits

Call summaries grew out of [HartreeWorks' summarise-call skill](https://github.com/HartreeWorks/skill--summarise-call).

## Licence

[MIT](LICENSE): use, change and share these freely.
