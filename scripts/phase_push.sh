#!/usr/bin/env bash
set -euo pipefail

# phase_push.sh
# Usage: ./scripts/phase_push.sh <phase-name-or-number> [commit-message]
# Example: ./scripts/phase_push.sh "Phase-2" "feat: complete Phase 2 - search integration"

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <phase-name-or-number> [commit-message]"
  echo "  Add --yes as last arg to skip confirmation."
  exit 2
fi

PHASE="$1"
shift || true
SKIP_CONFIRM=0
if [ "${@: -1}" = "--yes" ]; then
  SKIP_CONFIRM=1
  set -- "${@:1:$(($#-1))}"
fi

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

echo "About to push the following to origin:"
git --no-pager log -n 3 --pretty=oneline HEAD
echo "Tag: $TAG_NAME"

if [ "$SKIP_CONFIRM" -ne 1 ]; then
  read -r -p "Confirm push for $PHASE and tag $TAG_NAME? [y/N] " REPLY
  case "$REPLY" in
    [yY][eE][sS]|[yY]) ;;
    *) echo "Aborted by user."; exit 0 ;;
  esac
fi

echo "Pushing branch and tag to origin..."
git push origin HEAD
git push origin "$TAG_NAME"

echo "Done. Pushed tag: $TAG_NAME"

exit 0
