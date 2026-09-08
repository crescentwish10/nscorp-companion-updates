@echo off
setlocal

set "PORT=8765"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference = 'SilentlyContinue';" ^
  "$stopped = @();" ^
  "$listeners = netstat -ano | Select-String (':' + $env:PORT + '\s') | ForEach-Object { ($_ -split '\s+')[-1] } | Where-Object { $_ -match '^\d+$' } | Select-Object -Unique;" ^
  "foreach ($pidText in $listeners) { $proc = Get-Process -Id ([int]$pidText) -ErrorAction SilentlyContinue; if ($proc -and $proc.ProcessName -eq 'node') { Stop-Process -Id $proc.Id -Force; $stopped += $proc.Id; } }" ^
  "if ($stopped.Count) { Write-Host ('Stopped NSCORP Companion server PID(s): ' + (($stopped | Sort-Object -Unique) -join ', ')); } else { Write-Host 'No NSCORP Companion server was running.'; }"
