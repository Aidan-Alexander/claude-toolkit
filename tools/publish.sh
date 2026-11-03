#!/bin/bash
# Rebuilds the demos and the website from the write-ups, then deploys the website to Netlify
# (aidan-claude-toolkit.netlify.app). Commit and push the write-ups to GitHub as well: the
# website links there, and the setup lines fetch from there.
# Usage: bash tools/publish.sh "what changed"
set -euo pipefail
cd "$(dirname "$0")/.."
python3 call-actions/demo/build.py
python3 automations-page/demo/build.py
python3 tools/build_site.py
netlify deploy --prod --dir site --site 0206f950-e065-412c-b045-4bc9c3f7511d --message "${1:-update}"
