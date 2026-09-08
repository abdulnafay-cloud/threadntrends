@echo off
setlocal
cd /d "%~dp0"
echo Installing dependencies with the bundled Node.js 20 and pnpm 10...
call "%~dp0pnpm.cmd" install
if errorlevel 1 (
  echo.
  echo Dependency installation failed.
  pause
  exit /b 1
)
echo.
echo Dependencies are ready. You can now run START-WEBSITE.cmd
pause
