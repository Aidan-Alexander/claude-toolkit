#!/bin/bash
# Work hours, from the Claude toolkit at github.com/Aidan-Alexander/claude-toolkit
#
# launchd runs this every day at your warning time, as "work-hours.sh stop-work" or
# "work-hours.sh bedtime". On your days it shows a warning. Then, at the set time, it runs
# your stop-work Shortcut (or, with no Shortcut, says it's time to stop), or puts the Mac
# to sleep. You can skip from the warning, with a typed reason if settings.txt says so.
# The warning is an ordinary window, so it can sit behind a video call. At the set time it
# closes and acts anyway. Runs and skips go in log.txt.
#
# Test: TEST=1 bash ~/.work-hours/work-hours.sh stop-work
# This shows the warning straight away with a 20-second countdown. It never runs the
# Shortcut or sleeps the Mac, and its log lines end in "(test)".

job="$1"
DIR="$HOME/.work-hours"

# setting "bedtime time" gives that line's value from settings.txt, such as 23:10
setting() { grep -m1 "^$1:" "$DIR/settings.txt" | cut -d: -f2- | sed 's/^[[:space:]]*//; s/[[:space:]]*$//'; }
log() { echo "$(date '+%F %a %H:%M') $job $*${TEST:+ (test)}" >> "$DIR/log.txt"; }

days=$(setting "$job days")
warn=$(setting "$job warning")
at=$(setting "$job time")
need_reason=$(setting "$job reason")

case "$job" in
  stop-work)
    title="Stop work"; skip="Skip today"; shortcut=$(setting "stop-work shortcut")
    message="Work stops at $at. Save what you're doing."
    hint="To keep working today, type why and click Skip today." ;;
  bedtime)
    title="Bedtime"; skip="Not tonight"
    message="Your Mac goes to sleep at $at."
    hint="To keep it awake tonight, type why and click Not tonight." ;;
  *)
    echo "Usage: work-hours.sh stop-work, or work-hours.sh bedtime" >&2; exit 1 ;;
esac
if [ "$need_reason" = yes ]; then message="$message"$'\n\n'"$hint"; fi

if [ -z "$TEST" ]; then
  # Only on your days, and only between the warning and the set time. The time check skips
  # the catch-up run launchd makes when the Mac wakes after sleeping through the warning.
  case " $days " in *" $(LC_ALL=C date +%a) "*) ;; *) exit 0 ;; esac
  now=$(date +%H%M)
  [ "$now" -ge "${warn/:/}" ] && [ "$now" -lt "${at/:/}" ] || exit 0
  secs=$(( $(date -j -f "%H:%M:%S" "$at:00" +%s) - $(date +%s) ))
else
  secs=20
fi
[ "$secs" -lt 5 ] && secs=5
deadline=$(( $(date +%s) + secs ))

# Show the warning until the set time. If a reason is needed but the box is empty, ask again.
while :; do
  left=$(( deadline - $(date +%s) ))
  [ "$left" -le 0 ] && break
  result=$(osascript - "$title" "$message" "$skip" "$need_reason" "$left" <<'OSA'
on run argv
  set {theTitle, theMessage, skipButton, needReason, secondsLeft} to argv
  try
    if needReason is "yes" then
      set r to display dialog theMessage default answer "" buttons {skipButton, "OK"} default button "OK" with title theTitle giving up after (secondsLeft as integer)
      if button returned of r is skipButton then return "SKIP:" & text returned of r
    else
      set r to display dialog theMessage buttons {skipButton, "OK"} default button "OK" with title theTitle giving up after (secondsLeft as integer)
      if button returned of r is skipButton then return "SKIP:"
    end if
  on error errorText
    return "ERROR:" & errorText
  end try
  return "OK"
end run
OSA
)
  case "$result" in
    SKIP:*)
      reason="${result#SKIP:}"
      if [ "$need_reason" = yes ] && [ -z "$reason" ]; then continue; fi
      log "skipped${reason:+: $reason}"
      exit 0 ;;
    ERROR:*)
      echo "$(date '+%F %H:%M') $job: couldn't show the warning: ${result#ERROR:}" >&2
      break ;;
    *) break ;;   # OK, or the window closed itself at the set time
  esac
done

# Wait for the set time. If the Mac slept through it (say the lid was shut during the
# countdown), don't act when it wakes up, which could be hours later.
left=$(( deadline - $(date +%s) )); [ "$left" -gt 0 ] && sleep "$left"
if [ $(( $(date +%s) - deadline )) -gt 120 ]; then log "missed (the Mac was asleep)"; exit 0; fi

log "ran"
if [ -n "$TEST" ]; then
  echo "TEST: not skipped, so this is where it would act. A test stops here."
elif [ "$job" = bedtime ]; then
  pmset sleepnow
elif [ -n "$shortcut" ]; then
  shortcuts run "$shortcut" || log "couldn't run the Shortcut \"$shortcut\" (see errors.txt)"
else
  # No Shortcut: just say it's time to stop. The message closes itself after an hour.
  osascript -e "display dialog \"It's $at. Time to stop work.\" buttons {\"OK\"} default button \"OK\" with title \"Stop work\" giving up after 3600" > /dev/null
fi
