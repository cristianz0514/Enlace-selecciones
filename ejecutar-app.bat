@echo off
setlocal

cd /d "%~dp0"

if not exist "node_modules" (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo.
    echo No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)

echo.
echo Iniciando FC26 Selecciones...
echo URL: http://127.0.0.1:5173
echo.

call npm run dev -- --host 127.0.0.1 --port 5173 --open /

pause
