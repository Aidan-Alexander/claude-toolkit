#!/bin/bash
# Work hours: turns the jobs on or off to match settings.txt. Run it again after any change
# to settings.txt. For each job that's on, it copies the job's launchd file into
# ~/Library/LaunchAgents, fills in full paths and your warning time, and loads it. launchd
# then runs work-hours.sh every day at the warning time, and the script checks the day.
# Jobs that are off are unloaded and their launchd files removed.
DIR="$HOME/.work-hours"
AGENTS="$HOME/Library/LaunchAgents"
setting() { grep -m1 "^$1:" "$DIR/settings.txt" | cut -d: -f2- | sed 's/^[[:space:]]*//; s/[[:space:]]*$//'; }
is_time() { case "$1" in [01][0-9]:[0-5][0-9]|2[0-3]:[0-5][0-9]) return 0 ;; *) return 1 ;; esac; }

[ -f "$DIR/settings.txt" ] || { echo "There's no $DIR/settings.txt yet. SETUP.md explains how to write it."; exit 1; }
mkdir -p "$AGENTS"

for job in stop-work bedtime; do
  label="com.claude-toolkit.$job"
  plist="$AGENTS/$label.plist"
  state=$(setting "$job"); days=$(setting "$job days"); warn=$(setting "$job warning"); at=$(setting "$job time")

  # Check this job's settings before changing anything
  if [ "$state" = on ]; then
    [ -n "$days" ] || { echo "$job: no days set."; exit 1; }
    for day in $days; do
      case "$day" in Mon|Tue|Wed|Thu|Fri|Sat|Sun) ;; *) echo "$job: \"$day\" isn't a day. Use Mon Tue Wed Thu Fri Sat Sun."; exit 1 ;; esac
    done
    if ! is_time "$warn" || ! is_time "$at" || [ "${warn/:/}" -ge "${at/:/}" ]; then
      echo "$job: times must be HH:MM, with the warning before the time on the same day (warning \"$warn\", time \"$at\")."; exit 1
    fi
  fi

  # Unload the old version, if there is one
  launchctl bootout "gui/$(id -u)/$label" 2>/dev/null
  rm -f "$plist"
  if [ "$state" != on ]; then echo "$job: off"; continue; fi

  # Fill in the template and load it
  cp "$DIR/$label.plist" "$plist"
  /usr/libexec/PlistBuddy \
    -c "Set :ProgramArguments:1 $DIR/work-hours.sh" \
    -c "Set :StandardErrorPath $DIR/errors.txt" \
    -c "Set :StartCalendarInterval:Hour $((10#${warn%:*}))" \
    -c "Set :StartCalendarInterval:Minute $((10#${warn#*:}))" "$plist"
  if launchctl bootstrap "gui/$(id -u)" "$plist"; then
    echo "$job: on ($days: warning at $warn, then $at)"
  else
    echo "$job: couldn't load it. Try running install.sh again."
  fi
done

# A misspelt Shortcut name would only show up at the end of the day, so check it now
shortcut=$(setting "stop-work shortcut")
if [ "$(setting stop-work)" = on ] && [ -n "$shortcut" ] && command -v shortcuts > /dev/null; then
  shortcuts list | grep -qxF "$shortcut" || echo "Warning: there's no Shortcut called \"$shortcut\". Check its exact name in the Shortcuts app."
fi
