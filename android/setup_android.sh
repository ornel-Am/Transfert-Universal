#!/bin/bash
# setup_android.sh - Configuration du build Android

echo "📱 Configuration du build Android..."

# 1. Installer pipx
sudo apt install -y pipx
pipx ensurepath
source ~/.bashrc

# 2. Installer buildozer
pipx install buildozer

# 3. Créer le dossier android
mkdir -p ~/Transfert_Universal/android
cp -r ~/Transfert_Universal/src/* ~/Transfert_Universal/android/

# 4. Générer buildozer.spec
cd ~/Transfert_Universal/android
buildozer init

# 5. Modifier buildozer.spec (si nécessaire)
sed -i 's/title = .*/title = Transfert TCP/' buildozer.spec
sed -i 's/package.name = .*/package.name = transfertapp/' buildozer.spec
sed -i 's/package.domain = .*/package.domain = org.transfert/' buildozer.spec
sed -i 's/requirements = .*/requirements = python3,kivy/' buildozer.spec
sed -i 's/android.api = .*/android.api = 31/' buildozer.spec
sed -i 's/android.arch = .*/android.arch = arm64-v8a/' buildozer.spec
sed -i 's/# android.permissions = .*/android.permissions = INTERNET,READ_EXTERNAL_STORAGE,WRITE_EXTERNAL_STORAGE/' buildozer.spec

echo "✅ Configuration Android terminée !"
echo "🚀 Pour build : cd ~/Transfert_Universal/android && buildozer -v android debug"
