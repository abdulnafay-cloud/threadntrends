@echo off
setlocal
title Thread n Trends Website

cd /d "%~dp0"

set "TNT_NODE=%CD%\node-v20.18.0-win-x64\node.exe"
set "TNT_NEXT=%CD%\node_modules\next\dist\bin\next"

if not exist "%TNT_NODE%" (
  echo ERROR: The local Node.js executable was not found:
  echo %TNT_NODE%
  echo.
  pause
  exit /b 1
)

if not exist "%TNT_NEXT%" (
  echo ERROR: Next.js is not installed in this folder.
  echo Expected to find:
  echo %TNT_NEXT%
  echo.
  pause
  exit /b 1
)

echo Starting Thread n Trends...
echo The website will open at http://localhost:3500
echo Keep this window open while using the website.
echo Press Ctrl+C here when you want to stop it.
echo.

start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3500'"
"%TNT_NODE%" "%TNT_NEXT%" dev -p 3500

set "TNT_EXIT_CODE=%ERRORLEVEL%"
echo.
if not "%TNT_EXIT_CODE%"=="0" echo The website server stopped with an error.
echo Press any key to close this window.
pause >nul
exit /b %TNT_EXIT_CODE%
