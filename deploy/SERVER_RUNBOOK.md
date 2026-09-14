# Nyra download host — server runbook
# Host: same machine as CogPrism
# Public: download.memprism.com (+ optional memprism.com)
# Preferred unified runbook: F:/server-clone/inventory/go-live/SERVER-DEPLOY-NYRA-BOTDEN.md
# Internal static port: 8791 (optional helper; unused by default; gateway stays on 8787)

## Architecture

```
User ──HTTPS:443──► Nginx
                      ├─ download.memprism.com  → /var/www/download.memprism.com  (APK + legal)
                      └─ memprism.com           → /var/www/memprism.com           (optional apex)

Optional (rarely needed):
  127.0.0.1:8791  →  python http.server  →  nginx proxy_pass
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
| 3001 / 3002 | BOTDEN API / Web (if present) |

**Chosen unused loopback port for optional static helper: `8791`.** Busy `:8791` must not block nginx docroot deploy.

## One-shot (on the CogPrism / MemPrism server)

```bash
# 0) DNS first — these A records must point to this server before certbot:
#    memprism.com
#    download.memprism.com
#    (optional) www.memprism.com  → only then use ENABLE_WWW=1

# Prefer bootstrap.sh from this folder (or the unified /tmp/nyra-deploy kit):
sudo bash bootstrap.sh
# If www DNS exists:
# sudo ENABLE_WWW=1 bash bootstrap.sh

# 1) Upload a complete release tarball (APK + legal required), then:
sudo bash /opt/nyra-download/install-release.sh /tmp/nyra-download.tgz

# 2) Confirm
curl -I https://download.memprism.com/nyra-latest.apk
curl -I https://download.memprism.com/legal/
curl -I https://memprism.com/
curl -I https://memprism.com/legal/

# 3) Auto-renew dry-run
sudo certbot renew --dry-run
```

Do **not** put `www.memprism.com` into certbot unless its DNS already resolves here.

Prefer the tarball path over `scp -r legal …/legal` (nesting risk: `legal/legal`).

## Upload APK + legal (from your Windows machine)

```powershell
# Prefer packing, then one upload:
cd F:\nyra-website\deploy
.\pack-release.ps1 C:\Temp\nyra-download.tgz
scp C:\Temp\nyra-download.tgz root@YOUR_SERVER_IP:/tmp/nyra-download.tgz
```

Or use the unified preparer:

```powershell
cd F:\server-clone\inventory\go-live
.\06-prepare-server-bundle.ps1
```

## Optional: loopback static process on :8791

Only if you prefer nginx → proxy instead of nginx document root:

```bash
sudo systemctl enable --now nyra-download
curl -I http://127.0.0.1:8791/nyra-latest.apk
```

Then switch the nginx `root` blocks to `proxy_pass http://127.0.0.1:8791;` carefully (do not leave duplicate `location /` blocks).

## GitHub channel

Keep shipping the same APK to `azhimiao.github.io/downloads/nyra-latest.apk`.
Product site `site.config.js` points to both URLs. SHA-256 on both channels must match.
