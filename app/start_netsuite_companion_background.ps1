param(
  [string]$AppDir = $PSScriptRoot,
  [string]$NodeExe = "node",
  [int]$Port = 8765
)

$ErrorActionPreference = "Stop"
$AppDir = [System.IO.Path]::GetFullPath($AppDir)
$launcher = Join-Path $AppDir "launch_netsuite_companion_hidden.ps1"
$argumentList = "-NoProfile -ExecutionPolicy Bypass -File `"$launcher`" -AppDir `"$AppDir`" -NodeExe `"$NodeExe`" -Port $Port"

Start-Process -FilePath "powershell.exe" -WindowStyle Hidden -ArgumentList $argumentList | Out-Null
