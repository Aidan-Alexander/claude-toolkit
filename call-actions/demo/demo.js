// Demo data for the Call actions page. It stands in for the claude.ai runtime (window.claude), so the
// real page runs here with made-up calls and emails. Nothing is saved or sent: reload to start again.
// Claude's side is faked and sped up: things you queue get "done" in a few seconds, with canned text.
(() => {
  "use strict";
  const HOUR = 3600000;
  const DAY = 24 * HOUR;
  const ago = (ms) => new Date(Date.now() - ms).toISOString();
  const day = (n) => {
    const d = new Date(Date.now() + n * DAY);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  };
  const ABOUT = "https://github.com/Aidan-Alexander/claude-toolkit/tree/main/call-actions#readme";
  const SUMMARY = "https://github.com/Aidan-Alexander/claude-toolkit/blob/main/summarise-granola/example-summary.md";
  const demo = (label) => ({ label: label + " (demo)", url: ABOUT });

  const calls = {
    "demo-call-1": { title: "Funder check-in: Northbridge Foundation", date: day(0), summaryUrl: SUMMARY, actionCount: 3, error: null, addedAt: ago(2 * HOUR) },
    "demo-call-2": { title: "Weekly 1:1: Priya / Sam", date: day(-1), summaryUrl: SUMMARY, actionCount: 3, error: null, addedAt: ago(26 * HOUR) },
    "demo-call-3": { title: "Hiring sync: operations lead", date: day(-2), summaryUrl: SUMMARY, actionCount: 2, error: null, addedAt: ago(50 * HOUR) },
    "demo-call-4": { title: "Board prep with Jo", date: day(-4), summaryUrl: SUMMARY, actionCount: 2, error: null, addedAt: ago(98 * HOUR) },
    "demo-call-5": { title: "Intro call: volunteer coordinator", date: day(-5), summaryUrl: SUMMARY, actionCount: 0, error: null, addedAt: ago(122 * HOUR) },
  };
  const fromCall = (id, n) => ({ source: "call", n, callId: id, callTitle: calls[id].title, callDate: calls[id].date, summaryUrl: calls[id].summaryUrl });

  const actions = {
    "demo-a1": Object.assign(fromCall("demo-call-1", 1), { text: "Send Northbridge a one-page summary of last year's results", kind: "plan", state: "needs_ok", who: "for Dana", due: day(5),
      claude: "I'd pull the headline numbers from your 2025 annual report and the pilot dashboard into a one-page doc you can attach. About 5 minutes of your time to check.", links: [], createdAt: ago(2 * HOUR) }),
    "demo-a2": Object.assign(fromCall("demo-call-1", 2), { text: "Email Dana the case study she asked for", kind: "drafted", state: "open", who: "for Dana", priority: "P1",
      claude: "Drafted a reply on your thread with Dana, linking the case study you mentioned. Ready to check and send.", links: [demo("Gmail draft")], createdAt: ago(2 * HOUR) }),
    "demo-a3": Object.assign(fromCall("demo-call-1", 3), { text: "Decide whether to apply for the larger grant tier", kind: "yours", state: "open", due: day(9),
      claude: "Dana said the deadline is the end of the month. The eligibility criteria are linked.", links: [demo("Eligibility criteria")], createdAt: ago(2 * HOUR) }),
    "demo-a4": Object.assign(fromCall("demo-call-2", 1), { text: "Give Tom feedback on the pilot report", kind: "yours", state: "open", who: "for Tom", due: day(1), createdAt: ago(26 * HOUR) }),
    "demo-a5": Object.assign(fromCall("demo-call-2", 2), { text: "Share the onboarding checklist with Priya", kind: "drafted", state: "done", doneAt: ago(20 * HOUR), createdAt: ago(26 * HOUR) }),
    "demo-a6": Object.assign(fromCall("demo-call-2", 3), { text: "Check in on the pilot sign-up numbers", kind: "yours", state: "open", due: day(60),
      claude: "You asked Claude to remind you in two months. It turns P0 the day before it's due.", createdAt: ago(26 * HOUR) }),
    "demo-a7": Object.assign(fromCall("demo-call-3", 1), { text: "Check references for the two finalists", kind: "yours", state: "open", priority: "P1", due: day(2), createdAt: ago(50 * HOUR) }),
    "demo-a8": Object.assign(fromCall("demo-call-3", 2), { text: "Draft interview questions for the final round", kind: "plan", state: "working", queuedAt: ago(HOUR),
      note: "Focus on stakeholder management", noteAt: ago(HOUR), createdAt: ago(50 * HOUR) }),
    "demo-a9": Object.assign(fromCall("demo-call-4", 1), { text: "Ask Jo which board papers need sign-off", kind: "yours", state: "open", who: "for Jo", priority: "P2", createdAt: ago(98 * HOUR) }),
    "demo-a10": Object.assign(fromCall("demo-call-4", 2), { text: "Send the board pack to all trustees", kind: "yours", state: "dropped", doneAt: ago(70 * HOUR),
      note: "The chair sends this, not me", noteAt: ago(70 * HOUR), createdAt: ago(98 * HOUR) }),
    "demo-a11": { text: "Book train tickets for the team retreat", kind: "manual", source: "manual", state: "open", priority: "P3", createdAt: ago(30 * HOUR) },
    "asana-demo-1": { text: "Review the volunteer handbook draft", source: "asana", kind: "yours", state: "open", due: day(3),
      asanaProject: "Volunteering 2027", asanaUrl: ABOUT, createdAt: ago(3 * DAY) },
    "asana-demo-2": { text: "Book the venue for the spring retreat", source: "asana", kind: "yours", state: "open", priority: "P3",
      asanaProject: "Team retreat", asanaUrl: ABOUT, createdAt: ago(6 * DAY) },
    "fu-demo-1": { text: "Follow up with Marta about the data-sharing agreement", source: "followup", channel: "email", kind: "drafted", state: "open",
      who: "Marta Silva, City Health Trust", sentAt: day(-9),
      claude: "You asked whether they'd signed. No reply, and it hasn't come up on any other thread. I've drafted a short nudge on the same thread.",
      links: [demo("Your email"), demo("Draft")], createdAt: ago(5 * HOUR) },
    "fu-demo-2": { text: "Chase Leo for the venue quote", source: "followup", channel: "slack", kind: "yours", state: "open",
      who: "Leo, #events", sentAt: day(-8), claude: "You asked for the quote by Friday. Nobody has replied in the thread.",
      links: [demo("Your message")], createdAt: ago(5 * HOUR) },
    "fu-demo-3": { text: "Follow up with the auditors about the timeline", source: "followup", channel: "email", kind: "drafted", state: "snoozed",
      who: "Kemi Ade, Brightline Audit", sentAt: day(-12), snoozeUntil: day(4), snoozedAt: ago(3 * DAY),
      claude: "Drafted a nudge on your thread with Kemi.", links: [demo("Draft")], createdAt: ago(4 * DAY) },
  };

  const feedback = {
    "demo-f1": { text: "Don't draft emails to my manager, I'd rather write those myself", createdAt: ago(72 * HOUR),
      reply: "Noted: I'll leave emails to your manager with you, and list them as yours instead. I'll apply it from the next call.", repliedAt: ago(71 * HOUR) },
  };

  const store = { actions, calls, feedback, meta: { activity: { lastActiveAt: ago(20 * HOUR) } } };
  const listeners = [];

  function snapshot(coll, opts) {
    let docs = Object.entries(store[coll] || {}).map(([id, data]) => ({ id, data: () => Object.assign({}, data) }));
    if (opts.orderBy) {
      const [field, dir] = opts.orderBy;
      docs.sort((a, b) => {
        const x = a.data()[field] || "", y = b.data()[field] || "";
        return (x < y ? -1 : x > y ? 1 : 0) * (dir === "desc" ? -1 : 1);
      });
    }
    if (opts.limit) docs = docs.slice(0, opts.limit);
    return { docs, metadata: { fromCache: false } };
  }
  function changed(coll) {
    for (const l of listeners) if (l.coll === coll) setTimeout(() => l.cb(snapshot(coll, l.opts)), 0);
  }
  function docRef(coll, id) {
    return {
      get: () => Promise.resolve({ exists: !!(store[coll] && store[coll][id]), data: () => Object.assign({}, (store[coll] || {})[id]) }),
      set: (data) => { (store[coll] = store[coll] || {})[id] = Object.assign({}, data); changed(coll); return Promise.resolve(); },
      update: (fields) => {
        if (!store[coll] || !store[coll][id]) return Promise.reject({ code: "not_found" });
        store[coll][id] = Object.assign({}, store[coll][id], fields);
        changed(coll);
        claudesTurn(coll, id);
        return Promise.resolve();
      },
    };
  }
  function query(coll, opts) {
    return {
      orderBy: (field, dir) => query(coll, Object.assign({}, opts, { orderBy: [field, dir || "asc"] })),
      limit: (n) => query(coll, Object.assign({}, opts, { limit: n })),
      doc: (id) => docRef(coll, id),
      add: (data) => {
        const id = "demo-" + Math.random().toString(36).slice(2, 9);
        (store[coll] = store[coll] || {})[id] = Object.assign({}, data);
        changed(coll);
        claudesTurn(coll, id);
        return Promise.resolve({ id });
      },
      onSnapshot: (cb) => {
        const l = { coll, opts, cb };
        listeners.push(l);
        setTimeout(() => cb(snapshot(coll, opts)), 150);
        return () => listeners.splice(listeners.indexOf(l), 1);
      },
    };
  }
  const db = {
    collection: (name) => query(name, {}),
    doc: (path) => { const [coll, id] = path.split("/"); return docRef(coll, id); },
  };

  // Claude's side, faked and sped up.
  function later(ms, coll, id, fields) {
    setTimeout(() => {
      if (!store[coll][id]) return;
      store[coll][id] = Object.assign({}, store[coll][id], fields, { updatedAt: new Date().toISOString() });
      changed(coll);
    }, ms);
  }
  const DONE_TEXT = {
    "demo-a1": "Made the one-page summary from the annual report and the pilot dashboard, in a new doc in your Drive. About 5 minutes to check before you attach it.",
  };
  function claudesTurn(coll, id) {
    const doc = store[coll][id];
    if (coll === "actions" && doc.state === "queued") {
      later(2500, "actions", id, { state: "working" });
      later(6500, "actions", id, { state: "open", kind: "drafted", noteUnread: false,
        claude: DONE_TEXT[id] || "Done: I've drafted it and left it where you'll find it, ready for you to check. (In this demo Claude's answers are canned.)",
        links: (doc.links || []).concat([demo("Draft")]) });
    } else if (coll === "actions" && doc.noteUnread && doc.state !== "queued") {
      later(3000, "actions", id, { noteUnread: false,
        reply: "Thanks, noted. (In this demo Claude's replies are canned; the real one reads your note on its next check.)" });
    } else if (coll === "feedback" && !doc.reply) {
      later(3000, "feedback", id, { reply: "Noted: I'll apply that from the next call. (In this demo Claude's replies are canned.)", repliedAt: new Date().toISOString() });
    }
  }

  const user = { isOwner: () => Promise.resolve(true) };
  window.claude = { use: (name) => Promise.resolve(name === "db" ? db : name === "user" ? user : null) };
})();
