#!/usr/bin/env bash
set -euo pipefail
# Run this as the Codex Cloud environment setup script. Never on the Windows PC.
if [ ! -f package-lock.json ]; then npm install --package-lock-only; fi
npm ci
npm run audio
npx --yes skills add remotion-dev/skills --skill remotion-best-practices --agent codex --yes
