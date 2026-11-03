/*
  Demo stand-in for claude.ai, used only by demo/index.html.

  On claude.ai the automations page reads its list from the page's own database, through
  window.claude.use("db"). This file answers the same calls from made-up entries held in memory, so the page
  can run anywhere, such as GitHub Pages. It supports exactly what page.html calls:
    claude.use("db")   -> db.collection("automations").onSnapshot(next, error)
                          db.doc("meta/page").onSnapshot(next, error)
    claude.use("user") -> user.isOwner()
  Any other capability resolves null, as it does on claude.ai when a view can't run it.
  All times are worked out from now, so the demo never looks out of date.
*/
(function () {
  var now = new Date();
  var HOUR = 36e5;
  var WEEKDAYS = [1, 2, 3, 4, 5];
  var EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];

  // A local time on a day counted from today (negative is the past).
  function at(dayOffset, hour, minute) {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, hour, minute || 0);
  }
  // The latest and next times a schedule fires around now. `days` lists the weekdays it runs on
  // (0 is Sunday); a monthly schedule gives `date`, the day of the month, instead.
  function around(rule) {
    var last = null;
    var next = null;
    for (var offset = -40; offset <= 40; offset++) {
      var d = at(offset, rule.hour, rule.minute);
      var fits = rule.date ? d.getDate() === rule.date : rule.days.indexOf(d.getDay()) >= 0;
      if (!fits) continue;
      if (d <= now) last = d;
      else if (!next) next = d;
    }
    return { lastRun: last && last.toISOString(), nextRun: next && next.toISOString() };
  }
  function ago(hours) { return new Date(now.getTime() - hours * HOUR).toISOString(); }
  function day(dayOffset) { return at(dayOffset, 12).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); }
  function entry(fields, times) {
    return Object.freeze(Object.assign({ links: [], lastRun: null, nextRun: null }, fields, times || {}));
  }

  var automations = {
    'claude-morning-briefing': entry({
      name: 'Morning briefing', place: 'claude', order: 1,
      schedule: 'Weekdays at 08:30', cron: '30 8 * * 1-5',
      what: 'Reads today’s calendar and unread email, then writes a short plan for the day.',
      results: 'A new chat in the Claude app’s Scheduled list.',
      pause: 'In the Claude app, open Scheduled, choose Morning briefing and switch it off. Or ask Claude to pause it.',
      ref: 'scheduled:morning-briefing',
      status: 'ok', statusNote: 'The last run worked.'
    }, around({ days: WEEKDAYS, hour: 8, minute: 30 })),

    'claude-grant-deadlines': entry({
      name: 'Grant deadlines', place: 'claude', order: 2,
      schedule: 'Mondays at 09:00', cron: '0 9 * * 1',
      what: 'Goes through the funding tracker and lists the grant deadlines in the next fortnight.',
      results: 'A new chat in the Claude app, and a draft email to yourself in Gmail.',
      pause: 'In the Claude app, open Scheduled, choose Grant deadlines and switch it off.',
      ref: 'scheduled:grant-deadlines',
      status: 'attention',
      statusNote: 'The last run couldn’t open Google Drive. Reconnect Google Drive in Settings → Connectors.'
    }, around({ days: [1], hour: 9 })),

    'claude-monthly-receipts': entry({
      name: 'Monthly receipts round-up', place: 'claude', order: 3,
      schedule: 'The 1st of each month at 10:00', cron: '0 10 1 * *',
      what: 'Finds last month’s receipts in your inbox and lists them for your expense claim.',
      results: 'A new chat in the Claude app.',
      pause: 'In the Claude app, open Scheduled, choose Monthly receipts round-up and switch it off.',
      ref: 'scheduled:monthly-receipts',
      status: 'pending', statusNote: 'Set up this week, so it hasn’t run yet.'
    }, { nextRun: around({ date: 1, hour: 10 }).nextRun }),

    'routine-news-scan': entry({
      name: 'Sector news scan', place: 'routine', order: 1,
      schedule: 'Every day at 07:00', cron: '0 7 * * *',
      what: 'Searches the news for stories about the causes and organisations you follow, and picks out the five that matter most.',
      results: 'A message to yourself in Slack.',
      pause: 'On claude.ai, open your routines, choose Sector news scan and switch it off.',
      ref: 'routine:news-scan',
      status: 'ok', statusNote: 'The last run worked.'
    }, around({ days: EVERY_DAY, hour: 7 })),

    'routine-project-digest': entry({
      name: 'Friday project digest', place: 'routine', order: 2,
      schedule: 'Fridays at 16:00', cron: '0 16 * * 5',
      what: 'Summarises the week’s project updates from the shared team folder.',
      results: 'A new Google Doc in the “Weekly digests” folder.',
      links: [{ label: 'Weekly digests folder', url: 'https://drive.google.com/' }],
      pause: 'On claude.ai, open your routines, choose Friday project digest and switch it off.',
      ref: 'routine:project-digest',
      status: 'failed',
      statusNote: 'The last run stopped with an error before it saved the doc. Ask Claude to look at what went wrong.'
    }, around({ days: [5], hour: 16 })),

    'elsewhere-zapier-signups': entry({
      name: 'Event sign-ups to spreadsheet', place: 'elsewhere', where: 'Zapier', order: 1,
      schedule: 'Whenever someone fills in the sign-up form',
      what: 'Copies each new sign-up from the website form into the events spreadsheet.',
      results: 'A new row in the “Event sign-ups” Google Sheet.',
      links: [{ label: 'Event sign-ups', url: 'https://docs.google.com/spreadsheets/' }],
      pause: 'In Zapier, open Zaps and switch off “Event sign-ups to spreadsheet”.',
      ref: 'zapier:event-signups',
      status: 'ok', statusNote: 'You said it’s working (' + day(0) + ').'
    }, { lastRun: ago(5) }),

    'elsewhere-timesheet-reminder': entry({
      name: 'Timesheet reminder', place: 'elsewhere', where: 'Google Apps Script', order: 1,
      schedule: 'Fridays at 15:00',
      what: 'Emails you a reminder to fill in the week’s timesheet.',
      results: 'An email in your inbox.',
      pause: 'Open the timesheet spreadsheet, choose Extensions → Apps Script → Triggers, and delete the trigger.',
      source: 'The “Reminders” script in the timesheet spreadsheet.',
      ref: 'apps-script:timesheet-reminder',
      status: 'unknown', statusNote: 'Claude can’t see Apps Script, and you weren’t sure at the last check.'
    }),

    'elsewhere-projects-backup': entry({
      name: 'Projects folder backup', place: 'elsewhere', where: 'Your Mac', order: 1,
      schedule: 'Every day at 18:00',
      what: 'Copied the Projects folder to an external drive.',
      pause: 'Already switched off. Ask Claude if you want it back.',
      source: 'A scheduled job on your Mac.',
      ref: 'mac:projects-backup',
      status: 'off', statusNote: 'Switched off on ' + day(-12) + ', because Google Drive now backs up this folder.'
    }, { lastRun: at(-13, 18).toISOString() })
  };
  var meta = { page: Object.freeze({ checkedAt: ago(1.5) }) };

  var SETTLED = Object.freeze({ fromCache: false, hasPendingWrites: false });
  function docSnap(id, body) {
    return Object.freeze({ id: id, exists: !!body, data: function () { return body; }, metadata: SETTLED });
  }
  // Snapshots arrive after the page's own script has run, as they do on claude.ai.
  function later(fn) { setTimeout(fn, 0); }

  var db = Object.freeze({
    collection: function (path) {
      return Object.freeze({
        path: path,
        onSnapshot: function (next) {
          var rows = path === 'automations' ? automations : {};
          var docs = Object.keys(rows).sort().map(function (id) { return docSnap(id, rows[id]); });
          later(function () {
            next(Object.freeze({
              docs: docs, size: docs.length, empty: !docs.length, metadata: SETTLED,
              docChanges: function () {
                return docs.map(function (d, i) { return { type: 'added', doc: d, oldIndex: -1, newIndex: i }; });
              }
            }));
          });
          return function () {};
        }
      });
    },
    doc: function (path) {
      var parts = path.split('/');
      return Object.freeze({
        id: parts[1],
        path: path,
        onSnapshot: function (next) {
          var rows = parts[0] === 'meta' ? meta : parts[0] === 'automations' ? automations : {};
          later(function () { next(docSnap(parts[1], rows[parts[1]])); });
          return function () {};
        }
      });
    }
  });
  var user = Object.freeze({ isOwner: function () { return Promise.resolve(true); } });

  window.claude = Object.freeze({
    use: function (name) {
      return Promise.resolve(name === 'db' ? db : name === 'user' ? user : null);
    }
  });
})();
