#!/bin/bash

rm -rf dist
mkdir -p dist

cp -r assets dist/assets
cp *.html dist/
cp -r css dist/css
cp -r js dist/js
cp .htaccess dist/.htaccess