#!/bin/bash
# build_all.sh - Construction complète

set -e

echo "🚀 Construction de toutes les plateformes..."

# Récupérer la version
VERSION=${1:-"1.0.0"}

# Nettoyer
rm -rf dist/*
mkdir -p dist/android dist/linux dist/windows dist/macos dist/web

# 1. Android
echo ""
echo "📱 Construction pour Android..."
cd src
buildozer -v android debug 2>/dev/null || echo "⚠️ Buildozer non installé"
if [ -f "bin/*.apk" ]; then
    cp bin/*.apk ../dist/android/transfert-v${VERSION}.apk
fi
cd ..

# 2. Desktop
echo ""
echo "🖥️ Construction pour Desktop..."
cd src
pyinstaller --onefile --windowed --name transfert main.py 2>/dev/null || echo "⚠️ PyInstaller non installé"
if [ -f "dist/transfert" ]; then
    cp dist/transfert ../dist/linux/transfert-v${VERSION}
    cp dist/transfert ../dist/windows/transfert-v${VERSION}.exe
fi
cd ..

# 3. Site web
echo ""
echo "🌐 Préparation du site web..."
cp -r web/* dist/web/

echo ""
echo "✅ Build terminé !"
echo "📁 Fichiers dans ./dist/:"
ls -la dist/
