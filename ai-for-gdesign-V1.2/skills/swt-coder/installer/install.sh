#!/bin/bash
# swt-coder installer
# Copies swt-coder skill to an opencode project's .opencode/skills/ directory.

set -e

TARGET_DIR="${1:-.}"
SKILL_NAME="swt-coder"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"

DEST="$TARGET_DIR/.opencode/skills/$SKILL_NAME"

echo "Installing $SKILL_NAME to: $DEST"

mkdir -p "$DEST"
cp -r "$SRC_DIR/"* "$DEST/"

echo "Done. $SKILL_NAME installed to $DEST"
echo "Usage in opencode: the skill will auto-trigger on page generation requests."
