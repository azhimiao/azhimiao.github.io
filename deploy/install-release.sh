#!/usr/bin/env bash
# Install / refresh download.memprism.com release tree from a tarball.
# Usage: sudo bash install-release.sh /tmp/nyra-download.tgz
set -euo pipefail

TGZ="${1:?tarball path required}"
ROOT="/var/www/download.memprism.com"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="/var/www/download.memprism.com.bak.${STAMP}"

mkdir -p "$ROOT"
if [[ -d "$ROOT" && -n "$(ls -A "$ROOT" 2>/dev/null || true)" ]]; then
  cp -a "$ROOT" "$BACKUP"
  echo "backup -> $BACKUP"
fi

tmpdir="$(mktemp -d)"
tar -xzf "$TGZ" -C "$tmpdir"
# Accept either a flat tree or a single top-level folder
src="$tmpdir"
if [[ "$(find "$tmpdir" -mindepth 1 -maxdepth 1 -type d | wc -l)" -eq 1 && ! -f "$tmpdir/nyra-latest.apk" ]]; then
  src="$(find "$tmpdir" -mindepth 1 -maxdepth 1 -type d | head -n1)"
fi

rsync -a --delete \
  --exclude '.git' \
  "$src"/ "$ROOT"/

chown -R www-data:www-data "$ROOT"
find "$ROOT" -type d -exec chmod 755 {} \;
find "$ROOT" -type f -exec chmod 644 {} \;

if [[ -f "$ROOT/nyra-latest.apk" ]]; then
  sha256sum "$ROOT/nyra-latest.apk" | tee "$ROOT/nyra-latest.apk.sha256"
else
  echo "WARN: nyra-latest.apk missing in release" >&2
fi

nginx -t && systemctl reload nginx
echo "installed to $ROOT"
curl -fsSI "https://download.memprism.com/nyra-latest.apk" | head -n 5 || true
