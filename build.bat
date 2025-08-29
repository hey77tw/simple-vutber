@echo off
chcp 65001 >nul 2>&1
cls
echo ====================================
echo    VTuber Audio Visualizer Build Tool
echo ====================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found
    echo Please install Node.js: https://nodejs.org/
    echo After installation, restart and run this script again
    pause
    exit /b 1
)

echo SUCCESS: Node.js is installed
node --version
echo.

echo [2/4] Installing dependencies...
if not exist "node_modules" (
    echo Installing npm packages...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        echo Please check your internet connection and try again
        pause
        exit /b 1
    )
    echo SUCCESS: Dependencies installed
) else (
    echo SUCCESS: Dependencies already exist
)
echo.

echo [3/4] Testing application...
echo Testing mode (will auto-close in 5 seconds)
timeout /t 2 /nobreak >nul
start /min cmd /c "npm start && timeout /t 5 && taskkill /f /im electron.exe >nul 2>&1"
timeout /t 7 /nobreak >nul
echo SUCCESS: Test completed
echo.

echo [4/4] Building EXE file...
echo Building Windows executable...
call npm run build-win
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    echo Please check error messages and try again
    pause
    exit /b 1
)

echo.
echo ====================================
echo          BUILD COMPLETED!
echo ====================================
echo.
echo Output location: dist\VTuber Audio Visualizer Setup 1.0.0.exe
echo File size: 
dir "dist\*.exe" 2>nul | find "Setup"
echo.
echo You can now:
echo    1. Run the installer to install the app
echo    2. Share the installer with others
echo    3. Create desktop shortcuts
echo.

if exist "dist" (
    echo Open dist folder now? (Y/N)
    set /p choice=
    if /i "%choice%"=="Y" (
        explorer dist
    )
)

echo.
echo Build script completed!
pause
