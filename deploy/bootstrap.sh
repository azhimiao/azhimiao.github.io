#!/usr/bin/env bash
# First-time bootstrap on the CogPrism/MemPrism server.
# Run as root. DNS for memprism.com + download.memprism.com must already point here.
set -euo pipefail

EMAIL="${CERTBOT_EMAIL:-support@memprism.com}"
PORT_CHECK=8791

echo "==> ports in use (reference)"
ss -lntup | egrep ':80 |:443 |:8787 |:3001 |:8791 ' || true

if ss -lnt | grep -q ":${PORT_CHECK} "; then
  echo "ERROR: port ${PORT_CHECK} already in use — pick another unused port before continuing." >&2
  exit 1
fi
echo "OK: loopback helper port ${PORT_CHECK} is free"

apt-get update
apt-get install -y nginx certbot python3-certbot-nginx rsync

mkdir -p /var/www/download.memprism.com /var/www/memprism.com /opt/nyra-download
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cp "$SCRIPT_DIR/nginx/download.memprism.com.conf" /etc/nginx/sites-available/download.memprism.com.conf
cp "$SCRIPT_DIR/nginx/memprism.com.conf" /etc/nginx/sites-available/memprism.com.conf
cp "$SCRIPT_DIR/install-release.sh" /opt/nyra-download/install-release.sh
cp "$SCRIPT_DIR/systemd/nyra-download.service" /opt/nyra-download/nyra-download.service
chmod +x /opt/nyra-download/install-release.sh

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

ln -sf /etc/nginx/sites-available/download.memprism.com.conf /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/memprism.com.conf /etc/nginx/sites-enabled/
nginx -t
systemctl enable --now nginx
systemctl reload nginx

echo "==> requesting Let's Encrypt certs"
certbot --nginx \
  -d memprism.com \
  -d www.memprism.com \
  -d download.memprism.com \
  --agree-tos \
  -m "$EMAIL" \
  --redirect \
  --non-interactive

echo "==> done"
echo "Next: upload APK + legal with install-release.sh"
echo "  sudo bash /opt/nyra-download/install-release.sh /tmp/nyra-download.tgz"
