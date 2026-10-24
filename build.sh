#!/usr/bin/env bash
# Builde chaque projet (dossier avec package.json) dans _site/<nom>/, plus la page d'accueil.
set -euo pipefail
cd "$(dirname "$0")"
rm -rf _site && mkdir _site
cp index.html _site/
for pkg in */package.json; do
  name="$(dirname "$pkg")"
  echo "▶ $name"
  (cd "$name" && npm ci && npm run build)
  cp -R "$name/dist" "_site/$name"
done
