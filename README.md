# Aidan's Claude toolkit

*Easier to read on the website: [aidan-alexander.com/claude-tooling](https://aidan-alexander.com/claude-tooling/)*

No time to look at this yourself? [Ask your Claude to check this site and recommend tools from it that might be a good fit for your workflow](ASK-CLAUDE.md).

I'm Aidan Alexander, COO at Ambitious Impact (AIM). This is a bunch of systems I've set up so that Claude helps me work better and more efficiently. My Claude has written it up so colleagues and anyone else in the AIM community can borrow the useful bits.

Some systems/tools I've packaged up for you to install: You paste one line into Claude Code and it does the rest, asking you a few questions as it goes. No coding needed.

Most of these started as a one-line request to Claude Code, like "every Thursday, find emails I sent that got no reply".

I also list other skills I have installed that I haven't packaged up, in case it gives you ideas for skills on your Claude.

## Packaged for you to install – from my Claude to yours 💌

| Tool | What it does | Why it's useful | Connectors you'll need | Set it up: paste this into Claude Code |
|---|---|---|---|---|
| [**Automatic actions from calls**](call-actions/) | After each call, it adds what you said you'd do to a to-do list, and does them for you when it can (as drafts for you to check). Once a week it adds emails and Slack messages still waiting on a reply, yours or ones sent to you, and it can bring in your Asana tasks too. As you use it, it collects your feedback on what counts as an action it should add, and when and how it can take actions for you, so it keeps getting better. [Try the demo](https://aidan-alexander.com/claude-tooling/call-actions/demo/). | I have lots of calls, each with several small actions I need to keep track of and act on, and busy inboxes where it's easy to drop a ball. This catches them all in one place, and Claude does the easy ones. | Gmail; Granola and Google Drive for calls | `Set up "call-actions" from Aidan's Claude toolkit. If the aidan-toolkit plugin isn't installed, install it from GitHub first (claude plugin install aidan-toolkit --marketplace Aidan-Alexander/claude-toolkit, using the Claude Code inside the Claude app if claude isn't on the PATH), then follow its call-actions/SETUP.md.` |
| [**Fancy call summaries**](summarise-granola/) | Checks regularly for new calls you've recorded in Granola (or does one when you ask), turns each into a detailed, chronological summary in a Google Doc, and files it in a folder on your Drive. It can also add a link to each summary in your 1:1 doc with that person. | Granola's own notes are a quick list of bullets. These tell the story of the call: the reasoning behind decisions, who thought what, the exact words for commitments, and the open questions, so I can pick up a thread weeks later. They also make it far cheaper to miss a meeting and just read the summary, because it gives a far more detailed narrative of the conversation. So I can skip meetings I need to follow but not contribute to: someone shares the Granola note with me, or sends me the transcript to paste into Claude, and the skill summarises it. | Granola, Google Drive | `Set up "summarise-granola" from Aidan's Claude toolkit. If the aidan-toolkit plugin isn't installed, install it from GitHub first (claude plugin install aidan-toolkit --marketplace Aidan-Alexander/claude-toolkit, using the Claude Code inside the Claude app if claude isn't on the PATH), then follow its summarise-granola/SETUP.md.` |
| [**MailSmüsh**](https://github.com/Aidan-Alexander/mailsmush) | A Mac app that keeps all your Gmail inboxes and Google Calendars in one window, outside your browser. Each account gets its own icon (any picture or gif you like) with its unread count, the app icon can be yours too, and when Google asks you to sign in again a touch of your fingerprint fills in the password. Mac only. | I have three inboxes and calendars: personal, AIM and FarmKind. This keeps them all in one place, as a desktop app outside Chrome, so email isn't one tab among dozens. | None | `Set up MailSmüsh for me: clone https://github.com/Aidan-Alexander/mailsmush to ~/MailSmush-source (or git pull there if it's already there), then follow SETUP.md in that folder.` |
| [**Calendfree**](https://github.com/Aidan-Alexander/calendfree) | A free meeting scheduler, like Calendly, at a web address of your own (e.g. on your personal website, your organisation's website, or a free Netlify domain). Lots of flexibility -- you can: (1) Create shared booking pages with colleagues based on everyone's availability (e.g. schedule a call with your entire 3 person board; e.g. share a discovery call link with any one of your sales team), (2) Create different booking links with different settings, (3) Have multiple meeting length options, (4) Easily share links for specific lengths, e.g. add #45 to the url if you want them to book a 45 minute meeting, (5) Show preferred meeting times first, with extra availability as backup, (6) Let people who can't find a time send you a message (e.g. with their time zone and a link to their own scheduling page), so you can offer other options. [Try the demo](https://aidan-alexander.com/meet/demo). | It's flexible and free. You can customise it further to your needs (adding and removing functionality). | None, but you'll need a free Netlify account and a Google account | `Set up Calendfree for me: clone https://github.com/Aidan-Alexander/calendfree to ~/calendfree, then follow SETUP.md in that folder. It installs the Netlify command-line tool (netlify-cli) from npm if I don't have it.` |
| [**Work hours enforcer**](work-hours/) | Ends your workday at a set time, and puts your laptop to sleep at bedtime, unless you click to skip. Mac only. | It's there to help me with my work-life balance. Firstly, it automatically closes my computer at a certain time to push me to leave the office. Secondly, it shuts down work apps so when I open my computer later I'm less likely to see work tabs and get sucked back in. | None | `Set up "work-hours" from Aidan's Claude toolkit. If the aidan-toolkit plugin isn't installed, install it from GitHub first (claude plugin install aidan-toolkit --marketplace Aidan-Alexander/claude-toolkit, using the Claude Code inside the Claude app if claude isn't on the PATH), then follow its work-hours/SETUP.md.` |
| [**Automations page**](automations-page/) | One page listing everything that runs on a schedule for you, and whether each one is working. Claude keeps it up to date. [Try the demo](https://aidan-alexander.com/claude-tooling/automations-page/demo/). | Automations are easy to set up and easy to forget, and a broken one fails quietly. This is one place to see what's running, whether it's working, and how to pause it. | None | `Set up "automations-page" from Aidan's Claude toolkit. If the aidan-toolkit plugin isn't installed, install it from GitHub first (claude plugin install aidan-toolkit --marketplace Aidan-Alexander/claude-toolkit, using the Claude Code inside the Claude app if claude isn't on the PATH), then follow its automations-page/SETUP.md.` |

You set all six up in **Claude Code**: the Code tab of the Claude desktop app, not the usual chat. If you haven't used it before, [Getting started](GETTING-STARTED.md) covers the one-off setup, which takes about 10 minutes.

Why Claude Code? It does everything Chat and Cowork do, and other things besides. Apart from Projects, there's basically no reason to use Chat and Cowork, at least for me. When you first use it, switch it to Auto mode, so it isn't constantly asking your permission for tiny things.

Each tool lists the connectors it needs. You connect them once in Claude, under Settings → Connectors, and each tool's setup checks they're there and tells you what to do if one's missing.

Apart from Calendfree's calendar invites when someone books a meeting with you, none of them ever send anything for you. They write drafts and documents, and you do the sending.

## PSA – you can change your Claude thinking words!

While Claude Code works, it shows a word like "Pondering…" or "Combobulating…". You can swap these for your own. For example, I've added about 30, including Cuddling… Faffing… Nematoding… Fibremaxxing… and Going through puberty…

Paste this into Claude Code:

```
I want to change the words Claude Code shows while it's working ("Thinking…", "Pondering…" and so on). They're the "spinnerVerbs" setting in ~/.claude/settings.json. Show me the current list as a numbered list: if I haven't changed it yet, find Claude Code's built-in list in its installed files or its documentation. Then ask me which to remove and what to add. Save the result as "spinnerVerbs" with "mode": "replace" and my full list in "verbs", keep every other setting as it is, and show me the final list.
```

## Other skills and automations I use

### Keeping track of AIM's portfolio of charities

- **ask-mel:** answers questions about AIM's charities from our monitoring database, with a source and a date for every claim. Once a month, Claude sorts any feedback on its answers into "the skill got it wrong" and "the data is wrong", and emails me a digest. Built for AIM staff: ask me for it.
- **mel-guru:** a guided way to log a plan, a hypothesis or an experiment in our monitoring database, which also challenges whether it's worth doing. AIM staff only.
- **grant-sweep:** checks public grant databases and charity newsletters for new grants to AIM charities, and adds the missing ones to our funding table. It runs on the 1st of each month, adds only clear-cut grants, and lists anything doubtful for me to check.
- **Slack to database:** every morning, it checks the mel-intake Slack channel for threads people have forwarded to our MEL Airtable. This way we can capture news people share in our database so our repository of knowledge about our charities' journeys is more complete.
- **Charity newsletters:** saves the newsletter updates we receive from our charities into our database so our repository of knowledge about our charities' journeys is more complete, posts a weekly roundup in Slack so AIM staff get all the updates in one place, and every quarter lists charities we haven't heard from last quarter so we can make sure we're subscribed to their newsletter.
- **Charity call notes:** when we have a Q&A session with one of our charities in the team meeting, it copies the summary and transcript into our MEL database so our repository of knowledge about our charities' journeys is more complete.

### My Claude setup

- **open-source:** whenever Claude builds or changes a skill or automation for me, it checks whether colleagues could use it too, packages it with a plain-English write-up and a one-line setup, and keeps the write-ups here current (it's the skill that keeps this resource up to date!).

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
- **MEL intake scripts:** the code behind "Slack to database" and "Charity newsletters" above: small scripts GitHub runs every day. [See the code](https://github.com/Aidan-Alexander/mel-intake).

## Credits

Fancy call summaries grew out of [HartreeWorks' summarise-call skill](https://github.com/HartreeWorks/skill--summarise-call).

## Licence

[MIT](LICENSE): use, change and share these freely.
