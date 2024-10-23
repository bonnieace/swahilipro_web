@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

:: Check if Python is installed
python --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo Basic requirements not found, installing Basic requirements...
    
    :: Download Python Installer (adjust the URL if needed)
    SET PYTHON_INSTALLER=python-3.x.x.exe
    IF NOT EXIST "%PYTHON_INSTALLER%" (
        echo Downloading environment installer...
        curl -o %PYTHON_INSTALLER% https://www.python.org/ftp/python/3.11.5/python-3.11.5-amd64.exe

    )

    :: Silent install Python and add it to PATH
    "%PYTHON_INSTALLER%" /quiet InstallAllUsers=1 PrependPath=1

    :: Verify installation
    python --version
    IF ERRORLEVEL 1 (
        echo Failed to install Python, exiting...
        exit /b 1
    )
)

echo Environment is installed!

:: Upgrade pip to ensure it's up to date
python -m pip install --upgrade pip

:: Install swahilipro using pip
python -m pip install swahilipro

echo Installation complete.
pause
