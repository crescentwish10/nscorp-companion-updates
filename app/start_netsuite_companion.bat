@echo off
setlocal

set "APP_DIR=%~dp0"
set "APP_DIR=%APP_DIR:~0,-1%"
set "PORT=8765"
set "BUNDLED_NODE_EXE=%APP_DIR%\runtime\node\bin\node.exe"
set "PACKAGE_NODE_EXE=%APP_DIR%\..\runtime\node\node.exe"
set "CODEX_NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "LAUNCHER_PS1=%APP_DIR%\launch_netsuite_companion_hidden.ps1"
set "STARTER_PS1=%APP_DIR%\start_netsuite_companion_background.ps1"

if exist "%BUNDLED_NODE_EXE%" (
  set "NODE_EXE=%BUNDLED_NODE_EXE%"
) else if exist "%PACKAGE_NODE_EXE%" (
  set "NODE_EXE=%PACKAGE_NODE_EXE%"
) else if exist "%CODEX_NODE_EXE%" (
  set "NODE_EXE=%CODEX_NODE_EXE%"
) else (
  set "NODE_EXE=node"
)

if not exist "%LAUNCHER_PS1%" (
  echo Missing launcher: "%LAUNCHER_PS1%"
  pause
  exit /b 1
)

if not exist "%STARTER_PS1%" (
  echo Missing launcher: "%STARTER_PS1%"
  pause
  exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%STARTER_PS1%" -AppDir "%APP_DIR%" -NodeExe "%NODE_EXE%" -Port %PORT%
