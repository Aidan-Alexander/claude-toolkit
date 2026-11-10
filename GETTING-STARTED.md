# Getting started

Everything in this toolkit runs in **Claude Code**. That sounds technical, but here it just means a tab in the Claude desktop app where Claude can work on your computer: you chat with it the same way as usual, and it does the setting up. You do this part once; after that, each package takes a few minutes.

**Why Claude Code?** It does everything Chat and Cowork do, and other things besides: it can work with the files on your computer, set things up for you and run them on a schedule. Apart from Projects, which only Chat and Cowork have, there's basically no reason to use them, at least for me.

## 1. What you need

- A paid Claude plan (Pro, Max, Team or Enterprise). AIM staff: your work account.
- The Claude desktop app for Mac or Windows, from [claude.ai/download](https://claude.ai/download).
- About 10 minutes.

## 2. Open Claude Code

1. Open the Claude app and sign in.
2. Click **Code** at the top of the window.
3. It asks which folder to work in. Pick any folder you like, such as Documents. The toolkit installs into your Claude settings, not into that folder.
4. Switch its permission mode to **Auto**, in the menu next to the message box, if you have it. Otherwise Claude asks your permission for all sorts of tiny things. Auto mode lets it get on with routine steps and still blocks anything risky.

## 3. Connect the apps it uses

Connectors let Claude read and write in your other apps, as you. You connect each one once, and both the chat and Code tabs can use it.

1. In Claude, open **Settings → Connectors**.
2. Find the one you need (Granola, Google Drive, Gmail, Slack…), click **Connect**, and sign in when asked.
3. Then start a new session in the Code tab: a session only sees the connectors that were connected when it started.

Each package's page lists the connectors it needs.

## 4. Install a package

Copy the one-line setup instruction from the package's page and paste it into Claude Code. The first time, Claude installs the toolkit as a plugin: one install that brings every package, though none of them runs until you set it up. Then it asks you a few questions about how you'd like the package to work, and sets it up. For another package later, paste its line too: the plugin is already there, so Claude goes straight to setting it up.

If you're not in Auto mode, Claude asks your permission before running commands or using a connector for the first time. Read what it says it's about to do, and click Allow. If you're unsure, ask it to explain first.

**If Claude can't install the plugin** (some organisations' settings stop it running the install command), add it yourself, then start a new session and paste the setup line again:
- **AIM staff:** it's in AIM's plugin library. In the Claude app, open **Settings → Customize → Plugins**, search for "Aidan's Claude toolkit" and click **Add**.
- **Everyone else:** if you have Claude Code in a terminal, run `claude plugin install aidan-toolkit --marketplace Aidan-Alexander/claude-toolkit` there. Otherwise, ask Claude to talk you through it.

## 5. Scheduled packages

Some packages run on a schedule, for example every hour on weekdays. They live under **Scheduled** in the Claude app's sidebar, where you can see each run, start one by hand, or switch it off.

- They run while the Claude desktop app is open. If your computer was shut, they catch up when you next open the app.
- If you switched to **Auto** mode in step 2, a scheduled task you install is saved in Auto mode too, so it runs without stopping to ask. If not, the first run will stop and ask permission for each tool it uses. Open it under Scheduled and approve each request with the option that remembers your choice; after that, runs go through on their own.

## 6. Changing, updating or removing things

- **Change how something works:** just ask Claude Code, e.g. "make my call summaries shorter". Claude records the change in that package's settings file, so it's kept when you update.
- **Update to the latest version:** say "update Aidan's toolkit" in Claude Code. Claude gets the newest plugin and brings each package you use in step. Your settings, and any changes you've asked for, are kept: they live in `~/.claude/toolkit/`, outside the plugin.
- **Remove a package:** ask Claude Code, e.g. "remove the call-actions package and its scheduled task".
- **Remove the whole toolkit:** ask Claude Code to remove its packages first, then uninstall the aidan-toolkit plugin (type `/plugin` and open **Installed**, or ask Claude).

## Safety

- None of these packages ever send emails or messages for you. They create drafts and documents, and you decide what goes out.
- Anything Claude reads in your emails, calls or documents is treated as information, never as instructions.
