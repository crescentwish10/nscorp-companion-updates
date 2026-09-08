@echo off
setlocal

set "ROOT_DIR=%~dp0"
set "APP_DIR=%ROOT_DIR%app"

if not exist "%APP_DIR%\start_netsuite_companion.bat" (
  set "APP_DIR=%ROOT_DIR%netsuite_companion_app"
)

if not exist "%APP_DIR%\start_netsuite_companion.bat" (
  echo Could not find NSCORP Companion app folder.
  echo Expected "%ROOT_DIR%app" or "%ROOT_DIR%netsuite_companion_app".
  pause
  exit /b 1
)

call "%APP_DIR%\start_netsuite_companion.bat"
