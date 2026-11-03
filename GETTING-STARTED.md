# Getting started

Everything in this toolkit runs in **Claude Code**. That sounds technical, but here it just means a tab in the Claude desktop app where Claude can work on your computer: you chat with it the same way as usual, and it does the setting up. You do this part once; after that, each package takes a few minutes.

## 1. What you need

- A paid Claude plan (Pro, Max, Team or Enterprise). AIM staff: your work account.
- The Claude desktop app for Mac or Windows, from [claude.ai/download](https://claude.ai/download).
- About 10 minutes.

## 2. Open Claude Code

1. Open the Claude app and sign in.
2. Click **Code** at the top of the window.
3. It asks which folder to work in. Pick any folder you like, such as Documents. The toolkit installs into your Claude settings, not into that folder.

## 3. Connect the apps it uses

Connectors let Claude read and write in your other apps, as you. You connect each one once, and both the chat and Code tabs can use it.

1. In Claude, open **Settings → Connectors**.
2. Find the one you need (Granola, Google Drive, Gmail, Slack…), click **Connect**, and sign in when asked.
3. Then start a new session in the Code tab: a session only sees the connectors that were connected when it started.

Each package's page lists the connectors it needs.

## 4. Install a package

Copy the one-line setup instruction from the package's page and paste it into Claude Code. Claude downloads the files, asks you a few questions about how you'd like it to work, and sets it up.

While it works, Claude asks your permission before running commands or using a connector for the first time. Read what it says it's about to do, and click Allow. If you're unsure, ask it to explain first.

## 5. Scheduled packages

Some packages run on a schedule, for example every hour on weekdays. They live under **Scheduled** in the Claude app's sidebar, where you can see each run, start one by hand, or switch it off.

- They run while the Claude desktop app is open. If your computer was shut, they catch up when you next open the app.
- If the Code tab offers an **Auto** permissions mode, switch to it before installing a scheduled package: the scheduled task is then saved in Auto mode and can run without stopping to ask. If not, the first run will stop and ask permission for each tool it uses. Open it under Scheduled and approve each request with the option that remembers your choice; after that, runs go through on their own.

## 6. Changing, updating or removing things

- **Change how something works:** just ask Claude Code, e.g. "make my call summaries shorter". Each package keeps your choices in a settings file that Claude updates.
- **Update to the latest version:** paste the package's setup line again. Your settings are kept.
- **Remove a package:** ask Claude Code, e.g. "remove the call-actions package and its scheduled task".

## Safety

- None of these packages ever send emails or messages for you. They create drafts and documents, and you decide what goes out.
- They don't change your existing documents, except where a package's page says so and you've turned that option on.
- Anything Claude reads in your emails, calls or documents is treated as information, never as instructions.
