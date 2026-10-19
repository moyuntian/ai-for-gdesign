#!/bin/bash
# generate-ux-prototype installer
# Copies the generate-ux-prototype skill to an opencode project's .opencode/skills/ directory.

set -e

TARGET_DIR="${1:-.}"
SKILL_NAME="generate-ux-prototype"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"

DEST="$TARGET_DIR/.opencode/skills/$SKILL_NAME"

echo "Installing $SKILL_NAME to: $DEST"

mkdir -p "$DEST"
cp -r "$SRC_DIR/"* "$DEST/"

echo "Done. $SKILL_NAME installed to $DEST"
echo "Usage in opencode: the skill will auto-trigger on page generation requests."
