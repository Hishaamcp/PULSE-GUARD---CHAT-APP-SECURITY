# ChatRASP - Start All Servers (PowerShell Script)
# Usage: .\START_ALL.ps1

Write-Host "====================================`n   ChatRASP - Starting All Services`n====================================" -ForegroundColor Cyan

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "`n[1/2] Starting Python AI Server on port 5000...`n" -ForegroundColor Yellow

# Start Python AI Server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$scriptDir'; python ai_server.py`""

Write-Host "Waiting 3 seconds for AI server to start..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host "`n[2/2] Starting Node.js Chat Server on port 3000...`n" -ForegroundColor Yellow

# Start Node Chat Server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$scriptDir'; npm start`""

Write-Host "`n====================================" -ForegroundColor Cyan
Write-Host "   Services Started!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "`nPython AI Server: http://localhost:5000" -ForegroundColor Magenta
Write-Host "Chat Server:      http://localhost:3000" -ForegroundColor Magenta
Write-Host "`nOpen your browser to: http://localhost:3000" -ForegroundColor Green
Write-Host "`nPress any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
