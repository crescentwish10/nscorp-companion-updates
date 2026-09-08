param(
  [string]$AppDir = $PSScriptRoot,
  [string]$NodeExe = "node",
  [int]$Port = 8765
)

$ErrorActionPreference = "Stop"
$env:NSCORP_COMPANION_LAUNCHER = "1"
$env:NSCORP_COMPANION_OPENED = "1"

$AppDir = [System.IO.Path]::GetFullPath($AppDir)
$logDir = Join-Path $AppDir "logs"
New-Item -ItemType Directory -Path $logDir -Force | Out-Null
$outLog = Join-Path $logDir "server.out.log"
$errLog = Join-Path $logDir "server.err.log"

Set-Location $AppDir
try {
  Start-Process "http://127.0.0.1:$Port/" | Out-Null
} catch {
  # Opening the browser is best effort; keep starting the server even when blocked.
}
$serverPath = Join-Path $AppDir "server.js"

do {
  & $NodeExe $serverPath 1>> $outLog 2>> $errLog
  $exitCode = $LASTEXITCODE
  if ($exitCode -eq 10) {
    Start-Sleep -Seconds 2
  }
} while ($exitCode -eq 10)
