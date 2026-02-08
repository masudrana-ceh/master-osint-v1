#!/usr/bin/env bash
set -euo pipefail

# phase_push.sh
# Usage: ./scripts/phase_push.sh <phase-name-or-number> [commit-message]
# Example: ./scripts/phase_push.sh "Phase-2" "feat: complete Phase 2 - search integration"

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <phase-name-or-number> [commit-message]"
  exit 2
fi

PHASE="$1"
shift || true
MSG="${*:-"Complete $PHASE"}"

echo "Preparing to commit and push changes for: $PHASE"

if [ ! -d .git ]; then
  echo "Not a git repository. Aborting." >&2
  exit 3
fi

# Stage all changes
git add -A

# Commit if there are changes
if git diff --cached --quiet; then
  echo "No changes to commit. Creating a lightweight tag and pushing existing HEAD."
else
  git commit -m "$MSG"
fi

# Create a timestamped tag for this phase
TAG_NAME="phase-${PHASE}-$(date +%Y%m%d%H%M%S)"
git tag -a "$TAG_NAME" -m "Tag for $PHASE"

echo "Pushing branch and tags to origin..."
git push origin HEAD
git push origin "$TAG_NAME"

echo "Done. Pushed tag: $TAG_NAME"

exit 0
