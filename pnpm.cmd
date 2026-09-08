@echo off
setlocal
cd /d "%~dp0"
set "TNT_NODE=%CD%\node-v20.18.0-win-x64\node.exe"
set "TNT_PNPM=%CD%\node-v20.18.0-win-x64\node_modules\pnpm\bin\pnpm.cjs"
if not exist "%TNT_NODE%" (
  echo ERROR: Portable Node.js was not found in node-v20.18.0-win-x64
  exit /b 1
)
if not exist "%TNT_PNPM%" (
  echo ERROR: Portable pnpm was not found in node-v20.18.0-win-x64\node_modules\pnpm
  exit /b 1
)
"%TNT_NODE%" "%TNT_PNPM%" %*
exit /b %ERRORLEVEL%
