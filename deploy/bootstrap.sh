#!/usr/bin/env bash
# First-time bootstrap on the CogPrism/MemPrism server.
# Run as root. DNS for memprism.com + download.memprism.com must already point here.
# www.memprism.com is optional: set ENABLE_WWW=1 only when that A record exists.
set -euo pipefail

EMAIL="${CERTBOT_EMAIL:-support@memprism.com}"
ENABLE_WWW="${ENABLE_WWW:-0}"

echo "==> ports in use (reference)"
ss -lntup | egrep ':80 |:443 |:8787 |:3001 |:8791 ' || true

# :8791 is an optional loopback helper. Nginx serves the document root directly.
if ss -lnt | grep -q ':8791 '; then
  echo "NOTE: :8791 is already in use; continuing with nginx document root (no helper needed)."
else
  echo "OK: optional helper port 8791 is free (unused by default)"
fi

apt-get update
apt-get install -y nginx certbot python3-certbot-nginx rsync

mkdir -p /var/www/download.memprism.com /var/www/memprism.com /opt/nyra-download
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cp "$SCRIPT_DIR/nginx/download.memprism.com.conf" /etc/nginx/sites-available/download.memprism.com.conf
cp "$SCRIPT_DIR/nginx/memprism.com.conf" /etc/nginx/sites-available/memprism.com.conf
cp "$SCRIPT_DIR/install-release.sh" /opt/nyra-download/install-release.sh
# Keep a copy under /opt and install the unit path operators expect; do not enable
# the optional helper — nginx document root is the primary download path.
cp "$SCRIPT_DIR/systemd/nyra-download.service" /opt/nyra-download/nyra-download.service
cp "$SCRIPT_DIR/systemd/nyra-download.service" /etc/systemd/system/nyra-download.service
chmod +x /opt/nyra-download/install-release.sh
systemctl daemon-reload

# Minimal apex page until marketing site is mirrored
if [[ ! -f /var/www/memprism.com/index.html ]]; then
  cat >/var/www/memprism.com/index.html <<'HTML'
<!doctype html><html lang="zh-CN"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>MemPrism / Nyra</title>
<meta http-equiv="refresh" content="0;url=https://download.memprism.com/"/>
</head><body style="font-family:system-ui;padding:48px">
<p>MemPrism · Nyra — <a href="https://download.memprism.com/">download</a> ·
<a href="https://download.memprism.com/legal/">legal</a> ·
<a href="https://azhimiao.github.io/">site</a></p>
</body></html>
HTML
fi

if [[ ! -f /var/www/download.memprism.com/index.html ]]; then
  cp "$SCRIPT_DIR/www-download-index.html" /var/www/download.memprism.com/index.html
fi

# Default site can steal unmatched Host headers on a shared box.
rm -f /etc/nginx/sites-enabled/default

ln -sf /etc/nginx/sites-available/download.memprism.com.conf /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/memprism.com.conf /etc/nginx/sites-enabled/
nginx -t
systemctl enable --now nginx
systemctl reload nginx

for domain in memprism.com download.memprism.com; do
  getent ahostsv4 "$domain" >/dev/null || {
    echo "ERROR: $domain does not resolve; fix DNS before certbot" >&2
    exit 1
  }
done
if [[ "$ENABLE_WWW" == "1" ]]; then
  getent ahostsv4 www.memprism.com >/dev/null || {
    echo "ERROR: ENABLE_WWW=1 but www.memprism.com does not resolve" >&2
    exit 1
  }
fi

echo "==> requesting Let's Encrypt certs"
if [[ "$ENABLE_WWW" == "1" ]]; then
  certbot --nginx --cert-name memprism.com \
    -d memprism.com -d www.memprism.com --expand \
    --agree-tos -m "$EMAIL" --redirect --non-interactive
else
  certbot --nginx -d memprism.com \
    --agree-tos -m "$EMAIL" --redirect --non-interactive
fi
certbot --nginx -d download.memprism.com \
  --agree-tos -m "$EMAIL" --redirect --non-interactive

echo "==> done"
echo "Next: upload APK + legal with install-release.sh"
echo "  sudo bash /opt/nyra-download/install-release.sh /tmp/nyra-download.tgz"
echo "Optional helper (rarely needed): systemctl enable --now nyra-download"
