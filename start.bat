@echo off
setlocal enabledelayedexpansion
title ExamPilot - AI Exam Preparation Planner

echo ===================================================
echo             ExamPilot Launcher
echo ===================================================
echo.

cd /d "%~dp0"

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js not detected in PATH.
    echo [*] Opening index.html directly in your default browser...
    start "" "%~dp0index.html"
    echo [OK] Launched ExamPilot directly via browser!
    pause
    exit /b 0
)

:: 2. Auto-install dependencies if needed
where npm >nul 2>nul
if %errorlevel% equ 0 (
    if exist "package.json" (
        if not exist "node_modules" (
            echo [*] Installing required packages via npm...
            call npm install --no-audit --no-fund
            if !errorlevel! neq 0 (
                echo [!] Warning: npm install encountered an issue, proceeding with built-in server...
            ) else (
                echo [OK] Requirements successfully installed.
            )
        ) else (
            echo [OK] Requirements already installed.
        )
    )
)

:: 3. Launch the application
echo.
echo [*] Starting ExamPilot server at http://localhost:3000 ...

:: Open browser after 2 seconds in background
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

:: Start Node.js server
node server.js

if %errorlevel% neq 0 (
    echo.
    echo [*] Falling back to opening index.html directly in browser...
    start "" "%~dp0index.html"
)

pause
