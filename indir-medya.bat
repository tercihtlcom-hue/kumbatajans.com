@echo off
cd /d "%~dp0"
if not exist "public\media\hero" mkdir "public\media\hero"
if not exist "public\media\sections" mkdir "public\media\sections"

echo Indiriliyor hero-1...
curl.exe -L -o "public\media\hero\hero-1.mp4" "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
echo Indiriliyor hero-2...
curl.exe -L -o "public\media\hero\hero-2.mp4" "https://videos.pexels.com/video-files/18069166/18069166-hd_1920_1080_25fps.mp4"
echo Indiriliyor hero-3...
curl.exe -L -o "public\media\hero\hero-3.mp4" "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_25fps.mp4"
echo Indiriliyor hero-4...
curl.exe -L -o "public\media\hero\hero-4.mp4" "https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4"
echo Indiriliyor process.webp...
curl.exe -L -o "public\media\sections\process.webp" "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=75&fm=webp"
echo Indiriliyor contact.webp...
curl.exe -L -o "public\media\sections\contact.webp" "https://images.unsplash.com/photo-1557683316-973673baf926?w=1400&q=75&fm=webp"

echo.
echo === Tamamlandi ===
dir /s public\media
pause
