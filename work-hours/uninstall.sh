#!/bin/bash
# Work hours: stops both jobs and removes their launchd files. It leaves ~/.work-hours
# (script, settings and log) where it is, which does nothing on its own. To turn the jobs
# back on, run install.sh.
for job in stop-work bedtime; do
  label="com.claude-toolkit.$job"
  launchctl bootout "gui/$(id -u)/$label" 2>/dev/null
  rm -f "$HOME/Library/LaunchAgents/$label.plist"
done
echo "Work hours is off. Your settings and log are still in ~/.work-hours."
