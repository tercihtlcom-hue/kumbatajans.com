@echo off
cd /d "%~dp0"
echo CapCut klipleri kopyalaniyor...
node scripts\copy-hero-local.mjs
echo.
if exist copy-hero-log.txt type copy-hero-log.txt
echo.
if exist public\media\hero (
  echo public\media\hero icindekiler:
  dir /b public\media\hero
) else (
  echo HATA: public\media\hero olusmadi.
)
echo.
echo Bitti. Sayfayi Ctrl+Shift+R ile yenile.
pause
