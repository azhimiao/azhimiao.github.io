# Pack download.memprism.com release tarball on Windows
$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
$Out = if ($args[0]) { $args[0] } else { Join-Path $env:TEMP "nyra-download.tgz" }
$Stage = Join-Path $env:TEMP ("nyra-download-stage-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path (Join-Path $Stage "legal") | Out-Null
Copy-Item -Recurse -Force (Join-Path $Root "legal\*") (Join-Path $Stage "legal")
Copy-Item -Force (Join-Path $Root "deploy\www-download-index.html") (Join-Path $Stage "index.html")
$Apk = Join-Path $Root "downloads\nyra-latest.apk"
if (Test-Path $Apk) {
  Copy-Item -Force $Apk (Join-Path $Stage "nyra-latest.apk")
} else {
  Write-Warning "downloads/nyra-latest.apk missing"
}
if (Test-Path $Out) { Remove-Item -Force $Out }
tar -czf $Out -C $Stage .
Remove-Item -Recurse -Force $Stage
Write-Host "wrote $Out"
Get-Item $Out | Format-List FullName, Length
