#!/bin/bash

# abort on errors 
set -e

# build
npm run build

# navigate to build directory
cd dist

git init
git checkout main
git add -A
git commit -m 'deploy'
git push -f git@github.com:niitish/gh-api.git main:gh-pages

cd -