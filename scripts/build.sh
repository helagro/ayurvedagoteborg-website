#!/bin/bash

function compileSass {
    ./node_modules/.bin/sass $1 $2 --style=compressed --no-source-map
}

(
    cd src
    node build.js
)

compileSass src/sass/main.sass dist/styles/main.css

for file in src/sass/pages/*.sass; do
    filename=$(basename "$file" .sass)
    compileSass "$file" "dist/styles/$filename.css"
done
