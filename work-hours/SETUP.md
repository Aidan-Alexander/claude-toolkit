# Setting up work hours (instructions for Claude)

You're setting up the `work-hours` package for the person you're working with, from Aidan Alexander's Claude toolkit (github.com/Aidan-Alexander/claude-toolkit). It's two schedules for their Mac, and they can have either or both:
- **Stop work:** on their workdays, a warning a few minutes before work ends. Then, at the set time, a Shortcut of theirs runs, or, with no Shortcut, a message says it's time to stop.
- **Bedtime:** on the nights they choose, a warning, then the Mac goes to sleep. It sleeps; it doesn't shut down.

They can skip either one from the warning, with a typed reason if they like, and skips go in a log. It's one small shell script that launchd, the Mac's built-in scheduler, runs. Once it's set up, it runs without you.

Assume they aren't technical: do the technical parts yourself, explain each step in a sentence of plain English, and don't show them commands unless they ask.

## 1. Check it's a Mac

Run `uname -s`. If it doesn't print `Darwin`, stop, and tell them kindly that this one only works on a Mac, because it relies on the Mac's own scheduler and Shortcuts app. Don't try to rebuild it with other tools.

Also run `sw_vers -productVersion`. A Shortcut needs macOS 12 or later. On anything older, offer bedtime and a reminder-only stop work.

## 2. Download the files

Everything goes in a hidden folder in their home folder, `~/.work-hours/`. Create it if it doesn't exist.

Download each of these into that folder, byte for byte, for example with `curl -fsSL <url> -o ~/.work-hours/<file>`. Don't retype or summarise them.
- https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/work-hours.sh
- https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/install.sh
- https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/uninstall.sh
- https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/com.claude-toolkit.stop-work.plist
- https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/com.claude-toolkit.bedtime.plist
- https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/README.md
- https://raw.githubusercontent.com/Aidan-Alexander/claude-toolkit/main/work-hours/SETUP.md

Then run `chmod +x ~/.work-hours/*.sh`, and check that `work-hours.sh` starts with `#!/bin/bash`. Put an untouched copy of each downloaded file in `~/.work-hours/.original/`: that's how a later update can tell whether anyone has changed them.

If `~/.work-hours/settings.txt` already exists, this is an update. Before you download anything, compare each file in `~/.work-hours` with its copy in `~/.work-hours/.original/` (skip this if there's no `.original` folder). If one differs, someone has changed it on purpose: tell them in plain words what's different, keep their version as `<file name>.mine`, and ask whether to replace it with the new version. Then download what they agree to, refresh `.original/`, keep settings.txt as it is, run `bash ~/.work-hours/install.sh` so the jobs pick up the new files, tell them it's updated and their settings are unchanged, and stop here.

Otherwise, check they don't already have something similar running: look in `launchctl list` for a label that mentions stop work, bedtime or work hours and doesn't start with `com.claude-toolkit.`. If you find one, tell them and ask before going on, so they don't end up with two warnings.

## 3. Ask how they'd like it

Ask these together (with AskUserQuestion if you have it), each with its one-line reason. Say what Aidan uses, as a pointer, not a recommendation. Only ask about the ones they want, and if your question tool can't fit everything, ask which ones first, then the rest.

1. **Which:** *stop work* (a warning, then their end-of-day Shortcut runs), *bedtime* (a warning, then the Mac sleeps), or *both*. Aidan has both.
2. **Stop work, when:** which days, what time work stops, and how much warning. Aidan: Monday to Friday, warning at 17:55, stop at 18:01.
3. **Stop work, what happens then:** *run a Shortcut I already have* (ask its name), *help me make one*, or *no Shortcut, just a reminder* (a message at that time saying it's time to stop). Aidan runs his own Shortcut, called "Stop work".
4. **Bedtime, when:** which nights, what time the Mac sleeps, and how much warning. Aidan: Sunday to Thursday, the nights before workdays, with the warning at 23:05 and sleep at 23:10.
5. **Skipping**, for each one they chose: *one click*, or *type a reason first*. Typing a reason is a small speed bump that stops you skipping on autopilot, and the reason goes in the log. Aidan types a reason to skip stop work, and skips bedtime with one click.

Times are 24-hour, and the warning has to come before the time on the same day (so not 23:58 for 00:03). For a bedtime after midnight, the days are the mornings it falls on: a 00:30 bedtime on Sunday to Thursday nights runs Mon Tue Wed Thu Fri.

## 4. Help with the Shortcut, if they need one

Skip this if they chose just a reminder.

Don't try to build the Shortcut yourself. Talk them through it, a step or two at a time, and wait for them to say they've done each:
1. Open the Shortcuts app: press Cmd+Space, type "Shortcuts" and press Return.
2. Click **+** at the top of the window to start a new Shortcut.
3. Click its name at the top and call it something plain, such as "Stop work".
4. Search the list of actions on the right, and double-click an action (or drag it across) to add it. They run from top to bottom. Suggest a few:
   - **Set Focus**, to turn on a Focus such as Do Not Disturb or Personal, so work notifications stop.
   - **Quit App**, for work apps such as Slack, Mail, Calendar or Teams. Suggest leaving out any app they might still be on a call in.
   - **Hide App**, to hide their work browser, so its tabs aren't the first thing they see in the evening.
   - **Open App** or **Open URLs**, to open something for the evening, such as WhatsApp, Music or Books.
   - **Run Shell Script** containing `pmset sleepnow`, as the last action, to put the Mac to sleep (Aidan's does this). If Shortcuts says running scripts is turned off, they can switch on Allow Running Scripts in the Shortcuts app's Settings, under Advanced.
5. Close the window. It saves as they go.

Then run `shortcuts list`, which lists their Shortcuts by name, and use the name exactly as it appears there. Do the same if they named a Shortcut they already have. If the name has quotation marks in it, suggest renaming it to plain words.

Suggest they run it once from the Shortcuts app, with the play button at the top, at a moment that suits them, since it will really do its job. If macOS asks for permission to do something, they should allow it (Always Allow, where offered), so it doesn't stop to ask at the end of the day.

## 5. Write settings.txt

Write `~/.work-hours/settings.txt` in this shape, with their answers. Keep both sections: set a job they don't want to `off`, and leave Aidan's values in it so it's easy to turn on later. Write values without quotation marks, and leave `stop-work shortcut:` empty for a reminder only.

```
# Work hours settings. Claude wrote these at setup.
# To change something, ask Claude, or edit a line and then run: bash ~/.work-hours/install.sh
# Claude: SETUP.md in this folder explains how, under "Changing it later".
#
# on or off turns each one on or off. Days are any of: Mon Tue Wed Thu Fri Sat Sun
# Times are 24-hour (HH:MM), with the warning before the time, on the same day.
# shortcut is the Shortcut's exact name. Leave it empty for just a reminder.
# reason: yes means skipping needs a typed reason; no means one click.

stop-work: on
stop-work days: Mon Tue Wed Thu Fri
stop-work warning: 17:55
stop-work time: 18:01
stop-work shortcut: Stop work
stop-work reason: yes

bedtime: on
bedtime days: Sun Mon Tue Wed Thu
bedtime warning: 23:05
bedtime time: 23:10
bedtime reason: no
```

## 6. Turn it on

Run `bash ~/.work-hours/install.sh`, and tell them this hands the schedule to the Mac's own scheduler. For each job that's on, it puts a small job file in `~/Library/LaunchAgents/` and loads it, then prints one line per job.
- If it reports a problem with a time or a day, fix settings.txt and run it again.
- If it warns that there's no Shortcut with that name, check the name against `shortcuts list`.

install.sh writes outside your working folder and talks to launchd, and the test in step 7 opens a window. If your commands run in a sandbox, run these outside it; the person may be asked to allow that.

Check that `launchctl list | grep com.claude-toolkit` shows each job that's on.

macOS may show a notice that background items were added. Tell them that's expected: it's these jobs.

## 7. Test it safely

Tell them a test warning is about to appear, that it may be hidden behind this window, and that it counts down from 20 seconds and then stops: it won't run their Shortcut or sleep the Mac. Suggest they try the skip button once (typing a reason, if they chose that), and let another test count down without touching it.

For each job that's on, run one of these. Each takes up to about 20 seconds.
- `TEST=1 bash ~/.work-hours/work-hours.sh stop-work`
- `TEST=1 bash ~/.work-hours/work-hours.sh bedtime`

Ask whether they saw the window. A test that wasn't skipped prints a line saying where it would have acted, and if the window couldn't open, it prints why. Then show them the last few lines of `~/.work-hours/log.txt`: test lines end in "(test)".

## 8. Tell them how to use it

In a few lines:
- When it happens: the days and times they chose, and what happens at the set time.
- To skip a day, they click **Skip today** or **Not tonight** in the warning, typing a reason first if they chose that.
- To pause, change or remove it, they ask Claude Code and mention work-hours: "pause my work-hours bedtime", "move my work-hours stop time to 17:30", "remove work-hours".
- "Show my work-hours log" lists each run and skip. The log is `~/.work-hours/log.txt`.
- To update it later, they paste the same setup line again. Their settings are kept, and if they've changed the scripts, Claude asks before replacing them.

## 9. Add it to their automations page, if they have one

If they've set up the toolkit's automations page (there's a `~/.claude/skills/automations-page/` folder, or their CLAUDE.md mentions their automations page), add an entry for each job that's on, following that skill's instructions, and tell them you did. Use:
- `name`: "Stop work" or "Bedtime"
- `place`: `elsewhere`, with `where`: "Your Mac"
- `schedule`, in plain words, such as "Weekdays: warning at 17:55, Shortcut at 18:01"
- `what`, in a line, such as "Warns you, then runs your Stop work Shortcut unless you skip"
- `results`: where they'll see it, such as "A warning window, then the Shortcut runs. Runs and skips are listed in ~/.work-hours/log.txt"
- `pause`: "Ask Claude Code to pause your work-hours stop work (or bedtime)"
- `source`: `~/.work-hours/`
- `ref`: `launchd:com.claude-toolkit.stop-work` or `launchd:com.claude-toolkit.bedtime`
- `status`: `pending`

## Changing it later

This part is for you, in a later session, when they ask for a change. The settings are in `~/.work-hours/settings.txt`, and the jobs only pick up a change once `bash ~/.work-hours/install.sh` has run.
- **Change a day, a time, the Shortcut or the skipping rule:** edit that line in settings.txt, run install.sh, and tell them the new schedule.
- **Pause:** set `stop-work: off` or `bedtime: off`, then run install.sh. **Turn back on:** set it to `on` and run install.sh again.
- **Remove:** run `bash ~/.work-hours/uninstall.sh`. It stops both jobs and removes their files from `~/Library/LaunchAgents`, but leaves `~/.work-hours` (script, settings and log), which does nothing on its own. If they want that gone too, move it to the Bin rather than deleting it outright.
- **Not working?** Check `launchctl list | grep com.claude-toolkit`, then `~/.work-hours/errors.txt` and `~/.work-hours/log.txt`. The usual cause is a renamed Shortcut: compare `shortcuts list` with settings.txt. Also check that background items aren't switched off in System Settings → General → Login Items.
- **Automations page:** if they have one, update the entry to match, as in step 9. When they pause a job, set its `status` to `off`.
