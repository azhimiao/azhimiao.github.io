#!/usr/bin/env bash
# Install / refresh download.memprism.com release tree from a tarball.
# Usage: sudo bash install-release.sh /tmp/nyra-download.tgz
set -euo pipefail

TGZ="${1:?tarball path required}"
MODE="${2:-install}"
ROOT="${NYRA_DOWNLOAD_ROOT:-/var/www/download.memprism.com}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="/var/www/download.memprism.com.bak.${STAMP}"

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

backup_live_root() {
  mkdir -p "$ROOT"
  if [[ -n "$(ls -A "$ROOT" 2>/dev/null || true)" ]]; then
    cp -a "$ROOT" "$BACKUP"
    echo "backup -> $BACKUP"
  fi
}

tar -xzf "$TGZ" -C "$tmpdir"
# Accept either a flat tree or a single top-level folder
src="$tmpdir"
shopt -s nullglob dotglob
top_level=("$tmpdir"/*)
shopt -u nullglob dotglob
if [[ "${#top_level[@]}" -eq 1 && -d "${top_level[0]}" ]]; then
  src="${top_level[0]}"
fi

if [[ ! -d "$src/legal" ]]; then
  echo "ERROR: release tarball must include legal/" >&2
  exit 1
fi

if [[ -f "$src/PRESERVE_APK" ]]; then
  test -f "$ROOT/nyra-latest.apk" || {
    echo "ERROR: preserve mode requested but no live APK exists" >&2
    exit 1
  }
  echo "preserving existing nyra-latest.apk"
  if [[ "$MODE" == "--validate-only" ]]; then
    echo "DOWNLOAD_RELEASE_VALIDATE_OK"
    exit 0
  fi
  backup_live_root
  rsync -a --delete \
    --exclude '.git' \
    --exclude 'PRESERVE_APK' \
    --exclude 'nyra-latest.apk' \
    --exclude 'nyra-latest.apk.sha256' \
    "$src"/ "$ROOT"/
else
  # --delete would wipe a live APK if a normal release tarball forgot it.
  test -f "$src/nyra-latest.apk" || {
    echo "ERROR: release tarball must include nyra-latest.apk" >&2
    exit 1
  }
  if [[ "$MODE" == "--validate-only" ]]; then
    echo "DOWNLOAD_RELEASE_VALIDATE_OK"
    exit 0
  fi
  backup_live_root
  rsync -a --delete \
    --exclude '.git' \
    "$src"/ "$ROOT"/
fi

chown -R www-data:www-data "$ROOT"
find "$ROOT" -type d -exec chmod 755 {} \;
find "$ROOT" -type f -exec chmod 644 {} \;

sha256sum "$ROOT/nyra-latest.apk" | tee "$ROOT/nyra-latest.apk.sha256"

nginx -t && systemctl reload nginx
echo "installed to $ROOT"
curl -fsSI "https://download.memprism.com/nyra-latest.apk" | head -n 5 || true
curl -fsSI "https://download.memprism.com/legal/" | head -n 5 || true
