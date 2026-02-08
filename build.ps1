# Text Rescuer - Build extension zip for download
# Run from project root. Creates landing/text-rescuer.zip so the landing page can link to it.

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$zipPath = Join-Path $root "landing\text-rescuer.zip"
$tempDir = Join-Path $root "dist-build-temp"

# Clean
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copy extension files only (no api, landing, scripts, vercel, etc.)
$toCopy = @(
  "manifest.json",
  "content.js",
  "popup.html",
  "popup.css",
  "popup.js",
  "options.html",
  "options.css",
  "options.js",
  "config.js",
  "_locales",
  "icons"
)
foreach ($item in $toCopy) {
  $src = Join-Path $root $item
  if (-not (Test-Path $src)) { Write-Warning "Skip (missing): $item"; continue }
  $dest = Join-Path $tempDir $item
  if (Test-Path $src -PathType Container) {
    Copy-Item $src $dest -Recurse -Force
  } else {
    Copy-Item $src $dest -Force
  }
}

# Create zip (PowerShell 5+)
$landingDir = Join-Path $root "landing"
if (-not (Test-Path $landingDir)) { New-Item -ItemType Directory -Path $landingDir -Force | Out-Null }
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force

# Cleanup
Remove-Item $tempDir -Recurse -Force
Write-Host "OK: $zipPath"
Write-Host "Upload this file or commit it so the landing page can link to it (e.g. ./text-rescuer.zip)."
