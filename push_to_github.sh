#!/bin/bash
# push_to_github.sh - Pousser le projet sur GitHub

echo "🚀 Push du projet sur GitHub..."

# 1. Vérifier si Git est initialisé
if [ ! -d ".git" ]; then
    echo "📦 Initialisation de Git..."
    git init
fi

# 2. Ajouter tous les fichiers
git add .
git commit -m "Version initiale - Transfert Universal" 2>/dev/null || echo "✅ Rien à commiter"

# 3. Configurer le remote
git remote remove origin 2>/dev/null
git remote add origin https://github.com/ornel-Am/Transfert.git

# 4. Pousser
git branch -M main
git pull origin main --allow-unrelated-histories --no-edit 2>/dev/null
git push -u origin main

# 5. Créer un tag
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0

# 6. Vérifier les workflows
echo ""
echo "📊 Workflows GitHub Actions :"
gh run list --repo "ornel-Am/Transfert"

echo ""
echo "✅ Terminé !"
echo "🔗 https://github.com/ornel-Am/Transfert"
