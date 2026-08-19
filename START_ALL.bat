@echo off
REM ChatRASP - Start All Servers Script
REM This batch script starts both the Python AI server and Node.js chat server in separate windows

echo.
echo ====================================
echo   ChatRASP - Starting All Services
echo ====================================
echo.

REM Get the directory where this script is located
cd /d "%~dp0"

echo [1/2] Starting Python AI Server on port 5000...
echo.
start cmd /k "python ai_server.py"

echo Waiting 3 seconds for AI server to start...
timeout /t 3 /nobreak

echo.
echo [2/2] Starting Node.js Chat Server on port 3000...
echo.
start cmd /k "npm start"

echo.
echo ====================================
echo   Services Started!
echo ====================================
echo.
echo Python AI Server: http://localhost:5000
echo Chat Server:      http://localhost:3000
echo.
echo Open your browser to: http://localhost:3000
echo.
echo Press any key to close this window...
pause
