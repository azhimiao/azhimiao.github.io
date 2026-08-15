#!/usr/bin/env bash
# Build a tarball to upload to the download server.
# Run from F:/nyra-website (Git Bash) or adapt paths.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-/tmp/nyra-download.tgz}"
STAGE="$(mktemp -d)"
mkdir -p "$STAGE/legal"
cp -a "$ROOT/legal/." "$STAGE/legal/"
cp "$ROOT/deploy/www-download-index.html" "$STAGE/index.html"
if [[ -f "$ROOT/downloads/nyra-latest.apk" ]]; then
  cp "$ROOT/downloads/nyra-latest.apk" "$STAGE/nyra-latest.apk"
else
  echo "WARN: downloads/nyra-latest.apk missing" >&2
fi
tar -czf "$OUT" -C "$STAGE" .
rm -rf "$STAGE"
echo "wrote $OUT"
ls -lh "$OUT"
