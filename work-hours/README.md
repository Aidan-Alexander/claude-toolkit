# Work hours enforcer

**Runs in:** your Mac (Mac only), set up by Claude Code (the Code tab of the Claude desktop app) · **Needs:** no connectors · **Setup:** about 10 minutes

Two scheduled stops for a Mac you use for both work and home. **Stop work** warns you a few minutes before your workday ends, then runs a Shortcut you've made, say one that turns on a Focus and quits Slack. **Bedtime** warns you, then puts the Mac to sleep. You can skip either one from the warning.

It's there to help me with my work-life balance. I use one laptop for work and everything else, so I run both.

This isn't really a Claude feature. It's a small script that your Mac's own scheduler runs. Claude Code sets it up for you: it asks how you'd like it, installs it and tests it with you. After that, Claude isn't involved. It runs whether or not the Claude app is open, and doesn't count towards your Claude usage.

## Why not just use Screen Time or a Focus?

macOS can do some of this already. Screen Time's Downtime can block apps on a schedule, and a Focus can turn on at a set time. Both are easy to wave away in the moment, and neither puts the Mac to sleep. This gives you a few minutes' warning, makes carrying on a deliberate choice, and then runs your whole end-of-day routine in one go.

## What it looks like

At the warning time, a small window appears with your times in it. Stop work's window says "Work stops at 18:01. Save what you're doing." and has two buttons, **Skip today** and **OK**. If you chose to give reasons, it adds "To keep working today, type why and click Skip today." and a box to type in. Bedtime's window says "Your Mac goes to sleep at 23:10." and its skip button is **Not tonight**.

## What it does

1. **Warns you** at the time you set, on the days you choose. The warning is an ordinary window, so it won't take over a video call: it can sit behind it.
2. **Lets you skip.** Click **Skip today** or **Not tonight**. If you chose to, you type a reason first. That's a small speed bump, so you only skip when you mean to. Skips and reasons go in a log you can look back at.
3. **Acts at the set time**, unless you skipped. The warning closes and stop work runs your Shortcut. With no Shortcut, it shows a message saying it's time to stop. Bedtime puts the Mac to sleep. It doesn't shut it down, so your apps and unsaved work are still there when you wake it.
4. **Never acts late.** If the Mac is asleep or switched off at the set time, nothing happens when you open it later. No surprise sleep the next morning.

## Choices you'll be asked about at setup

| Choice | Options | What I use |
|---|---|---|
| Which | Stop work, bedtime, or both | Both |
| Stop work: when | Any days and time, with a warning a few minutes before | Weekdays: warning at 17:55, stop at 18:01 |
| Stop work: what happens | Run a Shortcut you've made, or just show a reminder | My "Stop work" Shortcut |
| Bedtime: when | Any nights and time, with a warning a few minutes before | Sunday to Thursday: warning at 23:05, sleep at 23:10 |
| Skipping | One click, or type a reason first. You choose for each. | A reason for stop work, one click for bedtime |

You can change any of these later by asking Claude ("move my work-hours bedtime to 23:30").

## Your stop-work Shortcut

A Shortcut is a small routine you build in Apple's Shortcuts app, which comes with your Mac. You make it from ready-made actions, such as "turn on a Focus" or "quit an app", without writing any code. Stop work runs yours at the end of the day, so it can do whatever ending work means for you.

Mine quits my work apps (Slack, Wispr Flow, Asana and Granola), hides my Chrome windows so I don't catch sight of work by accident, opens WhatsApp full size, and puts the Mac to sleep.

To make one:
1. Open the Shortcuts app: press Cmd+Space, type "Shortcuts" and press Return.
2. Click **+** at the top of the window to start a new Shortcut.
3. Click its name at the top and call it something plain, such as "Stop work".
4. Search the list of actions on the right, and double-click an action (or drag it across) to add it. Add as many as you like: they run from top to bottom.
5. Click the play button at the top to try it, then close the window. It saves as you go.

Claude can't make the Shortcut for you, but it will talk you through these steps at setup.

Actions people often use to end the workday:
- **Set Focus:** turn on a Focus such as Do Not Disturb or Personal, so work notifications stop. If you use Apple's Mail and Calendar, the Focus can also hide your work email and calendars: in System Settings → Focus, choose the Focus and add a Focus filter.
- **Quit App:** quit Slack, Mail, Calendar or Teams. Leave out anything you might still be on a call in.
- **Hide App:** hide your work browser, so its tabs aren't the first thing you see when you open the Mac in the evening.
- **Sleep:** end with a **Run Shell Script** action containing `pmset sleepnow` to put the Mac to sleep, as mine does.
- **Open App** or **Open URLs:** open something for the evening, such as WhatsApp, Music, Books or a recipe site.

## Set it up

1. If you haven't used Claude Code before, follow [Getting started](../GETTING-STARTED.md) first (about 10 minutes, once).
2. If you'd like stop work to run a Shortcut, you can make it now (see above), or Claude will help you during setup.
3. Start a new session in Claude Code and paste this in:

```
Set up "work-hours" from Aidan's Claude toolkit. Fetch https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/SETUP.md exactly as written (e.g. with curl) and follow it.
```

Claude checks you're on a Mac, asks you the questions above, sets it up, and shows you the warning once as a test. The test counts down from 20 seconds and does nothing else: no Shortcut, no sleep.

## Using it

- **Skip a day:** in the warning, click **Skip today** or **Not tonight** (type your reason first, if you chose that). It's back to normal the next day.
- **Pause, change or remove it:** ask Claude Code, and say "work-hours" so it knows what you mean. For example: "pause my work-hours bedtime", "turn my work-hours bedtime back on", "move my work-hours stop time to 17:30" or "remove work-hours".
- **Look back:** "show my work-hours log" lists each day it ran and each skip, with your reasons.

## Good to know

- **What goes on your Mac:** a hidden folder in your home folder, `.work-hours`, which holds the script, your settings and the log. There's also one small file per job in `~/Library/LaunchAgents`, which tells macOS when to run it. Nothing else is installed, and nothing leaves your Mac.
- **It isn't in the Claude app's Scheduled list.** Your Mac runs it, so the Claude app doesn't need to be open. If you use the [automations page](../automations-page/), Claude adds these two to it.
- **Calls at stop time:** the warning won't interrupt a call, but your Shortcut still runs on time. If it quits Zoom or Teams and you're often on calls then, leave those apps out of it, or skip the day.
- **Opening the Mac during the warning period,** say a few minutes before bedtime, brings up the warning with the time that's left.
- **macOS may say "background items" were added.** That's these jobs. If you switch them off in System Settings → General → Login Items, they won't run.
- **Older Macs:** the Shortcut needs macOS 12 (Monterey) or later. Bedtime and the plain reminder don't.
- **Updating:** paste the setup line again. Your settings are kept, and if the scripts on your Mac were changed, Claude shows you what's different and asks before replacing them.
- **Removing:** ask Claude Code to "remove work-hours". It switches both off and keeps your settings and log, in case you want them back.

## Changes

- 2026-11-03: First version.
