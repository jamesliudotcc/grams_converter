#!/usr/bin/env sh

# Abort on errors
set -e

pnpm run build

cd dist
# TODO delete .git directory if it exists.
git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:jamesliudotcc/grams_converter.git main:gh-pages

cd -
