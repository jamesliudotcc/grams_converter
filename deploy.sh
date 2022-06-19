#!/usr/bin/env sh

# Abort on errors
set -e

npm run build

cd dist
git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:jamesliudotcc/grams_converter.git main:gh-pages

cd -
