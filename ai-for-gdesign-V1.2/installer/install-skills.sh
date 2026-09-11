#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "用法: ./install-skills.sh /path/to/target/skills" >&2
  exit 2
fi

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
PACKAGE_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"
DESTINATION="$1"
mkdir -p "$DESTINATION"

for skill in derive-experience-insights extract-structured-requirements generate-ux-prototype manage-design-assets; do
  rm -rf "$DESTINATION/$skill"
  cp -R "$PACKAGE_ROOT/skills/$skill" "$DESTINATION/$skill"
done

echo "已安装 4 个 AI for G Design Skill 到: $DESTINATION"
echo "资产库路径: $PACKAGE_ROOT/assets/g-design-enterprise-v1.3.0"
