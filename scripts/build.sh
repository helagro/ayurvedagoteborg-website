#!/bin/bash

function compileSass {
    ./node_modules/.bin/sass $1 $2 --style=compressed --no-source-map
}

(
    cd src
    node build.js
)

compileSass src/sass/main.sass dist/styles/main.css
compileSass src/sass/pages/pt-consultation.sass dist/styles/pt-consultation.css
