#!/usr/bin/env sh

# Abort on errors
set -e

pushd grams_frontend > /dev/null || exit 1
npm run build

pushd dist > /dev/null || exit 1
git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:jamesliudotcc/grams_converter.git main:gh-pages

popd ; popd
