# Nyra download host — server runbook
# Host: same machine as CogPrism
# Public: download.memprism.com (+ optional memprism.com)
# Internal static port: 8791 (unused; gateway stays on 8787)

## Architecture

```
User ──HTTPS:443──► Nginx
                      ├─ download.memprism.com  → /var/www/download.memprism.com  (APK + legal)
                      └─ memprism.com           → /var/www/memprism.com           (optional apex)

Optional (if you want a Node/python static process instead of nginx document root):
  127.0.0.1:8791  →  static files  →  nginx proxy_pass
```

Two download channels for the product site:
1. **Web / server:** `https://download.memprism.com/nyra-latest.apk`  (primary)
2. **GitHub Pages mirror:** `https://azhimiao.github.io/downloads/nyra-latest.apk`

No concurrency limiting on the server APK path (simple static file).

## Ports already in use (do not reuse)

| Port | Service |
|------|---------|
| 80 / 443 | Nginx public |
| 8787 | Yueqi commercial gateway (loopback only) |
| 3001 | Viber / Botden (if present) |

**Chosen unused loopback port for optional static helper: `8791`.**

## One-shot (on the CogPrism / MemPrism server)

```bash
# 0) DNS first — both A records must point to this server before certbot:
#    memprism.com
#    download.memprism.com
#    (optional) www.memprism.com

sudo mkdir -p /var/www/download.memprism.com /var/www/memprism.com /opt/nyra-download
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx

# 1) Drop site files (rsync from your laptop, or scp the release tarball)
#    Expected layout under /var/www/download.memprism.com:
#      nyra-latest.apk
#      legal/   (legal center)
#      index.html (optional tiny landing that redirects to APK or legal)

# 2) Install nginx site configs from this folder
sudo cp deploy/nginx/download.memprism.com.conf /etc/nginx/sites-available/download.memprism.com.conf
sudo cp deploy/nginx/memprism.com.conf /etc/nginx/sites-available/memprism.com.conf
sudo ln -sf /etc/nginx/sites-available/download.memprism.com.conf /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/memprism.com.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 3) Issue certificates (HTTP-01). Apex + download on the same box as CogPrism.
sudo certbot --nginx \
  -d memprism.com \
  -d www.memprism.com \
  -d download.memprism.com \
  --agree-tos \
  -m support@memprism.com \
  --redirect

# 4) Confirm
curl -I https://download.memprism.com/nyra-latest.apk
curl -I https://download.memprism.com/legal/
curl -I https://memprism.com/

# 5) Auto-renew is installed by certbot. Dry-run:
sudo certbot renew --dry-run
```

## Upload APK + legal (from your Windows machine)

```powershell
# Adjust user@host
$HOST = "root@YOUR_SERVER_IP"
scp F:\nyra-website\downloads\nyra-latest.apk ${HOST}:/var/www/download.memprism.com/nyra-latest.apk
scp -r F:\nyra-website\legal ${HOST}:/var/www/download.memprism.com/legal
scp F:\nyra-website\deploy\www-download-index.html ${HOST}:/var/www/download.memprism.com/index.html
```

Or use the helper:

```bash
# on server after uploading a tarball to /tmp/nyra-download.tgz
sudo bash /opt/nyra-download/install-release.sh /tmp/nyra-download.tgz
```

## Optional: loopback static process on :8791

Only if you prefer nginx → proxy instead of nginx document root:

```bash
sudo cp deploy/systemd/nyra-download.service /etc/systemd/system/nyra-download.service
sudo systemctl daemon-reload
sudo systemctl enable --now nyra-download
curl -I http://127.0.0.1:8791/nyra-latest.apk
```

Then switch the nginx `root` blocks to `proxy_pass http://127.0.0.1:8791;`.

## GitHub channel

Keep shipping the same APK to `azhimiao.github.io/downloads/nyra-latest.apk`
(already on the Pages repo). Product site `site.config.js` points to both URLs.
