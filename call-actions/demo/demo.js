// Demo data for the Call actions page. It stands in for the claude.ai runtime (window.claude), so the
// real page runs here with real items from Aidan's tracker (names changed) and a few made-up ones. Nothing is saved or sent: reload to start again.
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
  const ABOUT = "../";
  const SUMMARY = "../../summarise-granola/example/";
  const demo = (label) => ({ label: label + " (demo)", url: ABOUT });

  // Real items from Aidan's own tracker, with people's names changed, and some of his real feedback.
  // The follow-ups at the end are made up.
  const calls = {
    "c-weekly": { title: "Rafael / Aidan – Weekly 1:1", date: day(-1), summaryUrl: SUMMARY, actionCount: 3, error: null, addedAt: ago(26 * HOUR) },
    "c-incub": { title: "Incubator discussion", date: day(-1), summaryUrl: SUMMARY, actionCount: 4, error: null, addedAt: ago(24 * HOUR) },
    "c-theo": { title: "Theo / Aidan", date: day(-2), summaryUrl: SUMMARY, actionCount: 3, error: null, addedAt: ago(50 * HOUR) },
    "c-ines": { title: "Ines / Aidan", date: day(-2), summaryUrl: SUMMARY, actionCount: 1, error: null, addedAt: ago(49 * HOUR) },
    "c-hanna": { title: "Hanna / Aidan – Meet with Aidan", date: day(-2), summaryUrl: SUMMARY, actionCount: 2, error: null, addedAt: ago(48 * HOUR) },
    "c-clara": { title: "Clara <> Aidan", date: day(-2), summaryUrl: SUMMARY, actionCount: 4, error: null, addedAt: ago(47 * HOUR) },
    "c-ben": { title: "Ben <> Aidan feedback", date: day(-3), summaryUrl: SUMMARY, actionCount: 2, error: null, addedAt: ago(74 * HOUR) },
    "c-round": { title: "Animal round: plan to February", date: day(-6), summaryUrl: SUMMARY, actionCount: 0, error: null, addedAt: ago(146 * HOUR) },
  };
  const fromCall = (id, n) => ({ source: "call", n, callId: id, callTitle: calls[id].title, callDate: calls[id].date, summaryUrl: calls[id].summaryUrl });

  const actions = {
    // Needs your OK: a plan
    "a-plan": Object.assign(fromCall("c-clara", 3), { text: "Ask our China contacts for founder referrals", kind: "plan", state: "needs_ok",
      claude: "Once Clara confirms who's already been asked, I'd draft a short referral ask for each contact (Gmail or Slack drafts) plus a list of who and why. About 10 minutes of your review.",
      links: [], createdAt: ago(47 * HOUR) }),
    // Drafts waiting for you
    "a-pm": Object.assign(fromCall("c-clara", 1), { text: "Draft how we'll judge the second-interview experiment", kind: "drafted", state: "open", who: "for Clara", priority: "P1",
      claude: "Drafted a first version in a new doc: what's being tested, what we can measure, nine questions for Clara and a suggested decision rule. Two [NEED] gaps to fill, then share it with Clara.",
      links: [demo("Draft doc")], createdAt: ago(47 * HOUR) }),
    "a-sched": Object.assign(fromCall("c-incub", 2), { text: "Send Marta a scheduling link for the programme design follow-up", kind: "drafted", state: "open", who: "for Marta", priority: "P1",
      claude: "Drafted a reply on her thread with your scheduling link. Check the link before sending.", links: [demo("Gmail draft")], createdAt: ago(24 * HOUR) }),
    "a-tips": Object.assign(fromCall("c-incub", 1), { text: "Collate incubation-coaching tips from calls, flagged sensitive vs shareable", kind: "drafted", state: "open",
      claude: "I made a tighter version and left the original as it was: 45 items instead of about 70, split into \"Advice for others\" (grouped by topic) and \"How we do it\", each still tagged shareable or sensitive.",
      links: [demo("Tips doc")], note: "It's very thorough but maybe a bit unwieldy, with too many items. Is that the best way to collate insights to later distil?",
      noteAt: ago(22 * HOUR), reply: "I'd keep the long dated list as the raw log while calls keep coming, and distil an advice-only version once there are three or four calls behind it.",
      createdAt: ago(24 * HOUR) }),
    "a-manual": { text: "Share instructions with Nina for her Claude to set up the same Call actions automation", kind: "drafted", source: "manual", state: "open", priority: "P2",
      claude: "I've revised the doc to follow your note: setup is now one screen with your choices pre-selected, so she can just click Next.", links: [demo("Setup doc")],
      note: "The best way to do setup is one screen with a bunch of choices, with my choice there by default.", noteAt: ago(30 * HOUR),
      reply: "Done: it's one screen now, with your choices ticked by default.", createdAt: ago(3 * DAY) },
    // Done by Claude
    "a-ines": Object.assign(fromCall("c-ines", 1), { text: "Block time for the content-role candidate vetting", kind: "did", state: "open", who: "for Ines",
      claude: "Blocked Thursday 09:30–11:45 and Friday 09:00–12:45 in your calendar as \"Content-role candidate vetting\". No guests, so nothing was sent.",
      links: [demo("Thursday hold"), demo("Friday hold")],
      note: "Block out the first half of Thursday and Friday in my calendar, where I don't already have things scheduled.", noteAt: ago(48 * HOUR),
      reply: "Done: holds in your own calendar, in the free time, with no guests.", createdAt: ago(49 * HOUR) }),
    "a-clara-li": Object.assign(fromCall("c-clara", 4), { text: "Ask Clara whether we've sent outreach from the founders' LinkedIn accounts", kind: "did", state: "open", who: "for Clara",
      claude: "Fixed: added a new section for your next 1:1 (copied from the doc's Template tab), with the point in your cell. Clara has declined the one before, so it's the one after. I also removed the earlier copy from the past meeting.",
      links: [demo("1:1 doc with Clara")],
      note: "You added it to a meeting gone by. You should have been able to tell from the dates of the sections.", noteAt: ago(40 * HOUR),
      reply: "Sorry about that. The agenda script took an undated section for the next meeting even though it had happened. It now checks the dates.", createdAt: ago(47 * HOUR) }),
    "a-channel": Object.assign(fromCall("c-weekly", 1), { text: "Find out what the founders' Slack channel is for and who owns it", kind: "did", state: "open",
      claude: "The founders-only channel is private, created in June 2025 by Dan, so he's the likely owner. My guess is the sheet marks founders who aren't in it; worth a quick check with Nina.",
      links: [demo("The channel")],
      note: "That's the one I meant. I've added it to my call with Nina to figure out what it's for and who manages it.", noteAt: ago(20 * HOUR),
      reply: "Thanks, that settles it: since it's on your agenda with Nina, there's nothing left for me to do here. Tick it off once she's told you who manages it.",
      createdAt: ago(26 * HOUR) }),
    "a-agenda": Object.assign(fromCall("c-weekly", 2), { text: "Ask Nina whether funding networks count as incubated or just supported", kind: "did", state: "open", who: "for Nina", due: day(4),
      claude: "Added to your agenda for your next 1:1 with Nina, with her call on the unsure cases folded in.", links: [demo("1:1 doc with Nina")], createdAt: ago(26 * HOUR) }),
    "a-intro": Object.assign(fromCall("c-hanna", 1), { text: "Introduce a new charity leader to the London community", kind: "did", state: "open", due: day(60),
      claude: "I added a 15-minute reminder to your calendar for the first Monday in January: \"Speak to Hanna: intro, and bring the new leader into the London community\". No guests.",
      links: [demo("Calendar hold")],
      note: "Please set a calendar reminder for me in early January to speak to Hanna about getting an intro.", noteAt: ago(47 * HOUR),
      reply: "Done: it's in your calendar for the first Monday back.", createdAt: ago(48 * HOUR) }),
    // Yours
    "a-review": Object.assign(fromCall("c-theo", 3), { text: "Review Theo's win-wins V2, especially the yellow highlights", kind: "yours", state: "open", who: "for Theo", due: day(1),
      claude: "Theo's V2 links product and market characteristics to kinds of effects; he wants your take on the yellow-highlighted bits.", links: [demo("Win-wins V2")], createdAt: ago(50 * HOUR) }),
    "a-funder": Object.assign(fromCall("c-incub", 4), { text: "Report back to Marta after my call with a funder about incubation", kind: "yours", state: "open", who: "for Marta", priority: "P2",
      claude: "Your call with the funder is on Friday at 15:00.", createdAt: ago(24 * HOUR) }),
    // Claude's turn
    "a-resources": Object.assign(fromCall("c-hanna", 2), { text: "Share new-to-manager resources with Hanna", kind: "yours", state: "working", queuedAt: ago(5 * 60000), who: "for Hanna",
      note: "Draft this for me in Slack, from my usual favourite-resources message.", noteAt: ago(6 * 60000), createdAt: ago(48 * HOUR) }),
    // Snoozed, with the reminder he asked for
    "a-winddown": Object.assign(fromCall("c-incub", 3), { text: "Share the wind-down policy with Marta once it's written", kind: "yours", state: "snoozed", who: "for Marta",
      due: day(110), snoozeUntil: day(60), snoozedAt: ago(23 * HOUR), note: "Send me a reminder in mid-January.", noteAt: ago(23 * HOUR),
      reply: "Snoozed until mid-January, so it'll come back on your list then.", createdAt: ago(24 * HOUR) }),
    "a-contact": Object.assign(fromCall("c-weekly", 3), { text: "Contact incubated orgs not on the website about what incubation means", kind: "yours", state: "snoozed",
      snoozeUntil: day(3), snoozedAt: ago(20 * HOUR),
      claude: "Get context on each first, check they know they're incubated, explain the support and the asks (mostly the annual survey), and ask if they're happy to be listed.",
      createdAt: ago(26 * HOUR) }),
    // Done and dropped, with his notes and what Claude learnt
    "a-norm": Object.assign(fromCall("c-ben", 1), { text: "Message Ben and Luke together from now on", kind: "yours", state: "dropped", doneAt: ago(70 * HOUR),
      note: "This isn't an action, this is a new norm", noteAt: ago(70 * HOUR),
      reply: "Thanks. I'll leave agreed norms and ways of working out of the action list.", createdAt: ago(74 * HOUR) }),
    "a-expect": Object.assign(fromCall("c-ben", 2), { text: "Ask Theo what the research team expects from you and Ben", kind: "yours", state: "done", doneAt: ago(72 * HOUR),
      note: "I did this already, adding it to my 1:1 doc with Theo. In future, you could add something like this as an agenda point in my 1:1 doc.", noteAt: ago(72 * HOUR),
      reply: "Noted: for things to raise with someone you have a 1:1 doc with, I'll add the point to your side of the next meeting's agenda.", createdAt: ago(74 * HOUR) }),
    "a-fund": Object.assign(fromCall("c-theo", 2), { text: "Flag Theo's interest in a new project to Nina", kind: "drafted", state: "dropped", doneAt: ago(46 * HOUR),
      claude: "It's the second bullet of a Slack draft to Nina. Cut it if you'd rather say this one in person.",
      note: "Belonged in 1:1 doc instead", noteAt: ago(46 * HOUR),
      reply: "Got it. When you say you'll discuss or flag something with someone you have a 1:1 doc with, I'll add it as an agenda point there instead of drafting a Slack message.",
      createdAt: ago(50 * HOUR) }),
    "a-ollie": Object.assign(fromCall("c-clara", 2), { text: "Ask Ollie his rate and interest in two copy pieces", kind: "drafted", state: "done", doneAt: ago(44 * HOUR), who: "for Ollie",
      claude: "Drafted a reply in your thread with Ollie (cc Clara) naming the January outreach copy and the onboarding emails, and asking his rate. Check and send.",
      note: "When drafting emails, no need to sign off with my name as I have an email signature. Please add something italicised that says \"Co-written with Claude\" by default.",
      noteAt: ago(44 * HOUR),
      reply: "Noted: email drafts won't sign off with your name, and will end with an italic \"Co-written with Claude\". I'll apply it from the next draft.",
      createdAt: ago(47 * HOUR) }),
    // From Asana
    "asana-review": { text: "Aidan Review", source: "asana", kind: "yours", state: "open", due: day(15), who: "from Theo",
      asanaParent: "Foundational Research", asanaProject: "Deep Report Tracking", asanaUrl: "https://asana.com/", asanaName: "Aidan Review",
      claude: "Your review of Theo's \"Foundational Research\" deep report, after the initial draft and before Theo revises it. Three others are reviewing too; the report is due in three weeks.",
      createdAt: ago(2 * DAY) },
    "asana-heypolo": { text: "HeyPolo – Maya", source: "asana", kind: "drafted", state: "open", priority: "P1", asanaUrl: "https://asana.com/", asanaName: "HeyPolo – Maya",
      claude: "Slack draft saved (not sent) in your DM with Maya: it suggests HeyPolo as an opt-in way for community members to see who's in a city they're passing through, for more meet-ups and co-working outside London.",
      links: [demo("Slack draft")], createdAt: ago(5 * DAY) },
    "asana-hotjar": { text: "Hotjar audit", source: "asana", kind: "yours", state: "open", priority: "P3", asanaUrl: "https://asana.com/", asanaName: "Hotjar audit",
      asanaProject: "Outreach Overhaul 2026", claude: "In \"Website / shop window overhaul\" in Outreach Overhaul 2026.", createdAt: ago(9 * DAY) },
    // Follow-ups (made up)
    "fu-demo-1": { text: "Follow up with Lena about the data-sharing agreement", source: "followup", channel: "email", kind: "drafted", state: "open",
      who: "Lena Brandt, City Health Trust", sentAt: day(-9),
      claude: "You asked whether they'd signed. No reply, and it hasn't come up on any other thread. I've drafted a short nudge on the same thread.",
      links: [demo("Your email"), demo("Draft")], createdAt: ago(5 * HOUR) },
    "fu-demo-2": { text: "Chase Leo for the venue quote", source: "followup", channel: "slack", kind: "yours", state: "open",
      who: "Leo, #events", sentAt: day(-8), claude: "You asked for the quote by Friday. Nobody has replied in the thread.",
      links: [demo("Your message")], createdAt: ago(5 * HOUR) },
  };

  const feedback = {
    "f-conservative": { text: "It's better to lean conservative, as false positives on tasks are costlier than false negatives.", createdAt: ago(3 * DAY),
      reply: "Noted: when I'm unsure whether something is your action, or worth putting in front of you, I'll leave it out. I'll apply it from the next call.", repliedAt: ago(3 * DAY - HOUR) },
    "f-long": { text: "Was too long. I fixed it, but note for future", createdAt: ago(20 * HOUR), itemId: "a-tips", itemText: "Collate incubation-coaching tips from calls, flagged sensitive vs shareable",
      reply: "Noted: I'll keep collated docs short and grouped, and offer the long version only as a raw log. I'll apply it from the next call.", repliedAt: ago(19 * HOUR) },
  };

  // When Claude last checked for calls, as each run records it, with one call not in yet.
  const run = { lastRunAt: ago(4 * 60000), callsCheckedAt: ago(4 * 60000), checkError: null,
    waiting: [{ title: "Team stand-up", why: "still going" }] };
  const store = { actions, calls, feedback, meta: { activity: { lastActiveAt: ago(20 * HOUR) }, run } };
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
    "a-plan": "Drafted a short referral ask for each contact as Gmail drafts, plus a list of who and why. About 10 minutes to check.",
  };
  function claudesTurn(coll, id) {
    const doc = store[coll][id];
    if (coll === "actions" && doc.state === "queued" && doc.request === "undo") {
      later(2500, "actions", id, { state: "working" });
      later(6000, "actions", id, { state: "dropped", undone: true, request: null, doneAt: new Date().toISOString(),
        reply: "Done: deleted the hold. (In this demo nothing was really there to delete.)" });
    } else if (coll === "actions" && doc.state === "queued") {
      later(2500, "actions", id, { state: "working" });
      const did = doc.kind === "did";
      later(6500, "actions", id, { state: "open", kind: did ? "did" : "drafted", noteUnread: false,
        claude: DONE_TEXT[id] || (did ? "Done: I've changed it as you asked. (In this demo Claude's answers are canned.)"
          : "Done: I've drafted it and left it where you'll find it, ready for you to check. (In this demo Claude's answers are canned.)"),
        links: did ? doc.links || [] : (doc.links || []).concat([demo("Draft")]) });
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
