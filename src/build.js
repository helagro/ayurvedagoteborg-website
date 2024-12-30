const fs = require('fs')
const fse = require('fs-extra')
const Handlebars = require('handlebars')
const { exit } = require('process')
const minify = require('html-minifier').minify

/* ------------------------ CONSTANTS ----------------------- */

const PARTIALS_DIR = 'components'
const TEMPLATES_DIR = 'templates'
const DESTINATION_DIR = '../dist'
const ASSETS_DIR = 'assets'

const CONTEXT = {
    base_address: 'https://ayurvedagoteborg.se',
}

/* -------------------- SETUP HANDLEBARS -------------------- */

function registerPartials() {
    fs.readdirSync(PARTIALS_DIR).forEach((filename) => {
        const partialSource = fs.readFileSync(`${PARTIALS_DIR}/${filename}`, 'utf8')
        Handlebars.registerPartial(filename.split('.')[0], partialSource)
    })
}

/* ------------------------- COMPILE ------------------------ */

function compileTemplates(dir = TEMPLATES_DIR) {
    fs.readdirSync(dir).forEach((filename) => {
        const path = `${dir}/${filename}`

        // Recurse if directory
        if (fs.statSync(path).isDirectory()) return compileTemplates(path)

        // Ignore non-handlebars files
        if (!filename.endsWith('.hbs')) return

        const templateFile = fs.readFileSync(path, 'utf8')

        try {
            const template = Handlebars.compile(templateFile)
            const compiled = template(CONTEXT)
            const minimised = minify(compiled, {
                collapseWhitespace: true,
                removeComments: true,
            })

            const newFolderPath = dir.replace(TEMPLATES_DIR, DESTINATION_DIR)
            writeOutputFile(newFolderPath, filename, minimised)
        } catch (e) {
            console.error(`Error compiling ${filename}`)
            console.error(e)
            exit(1)
        }
    })
}

function writeOutputFile(folderPath, filename, content) {
    const filenameNoExt = filename.split('.')[0]

    // Creates folder structure if parts missing
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, {
            recursive: true,
        })

    fs.writeFileSync(`${folderPath}/${filenameNoExt}.html`, content)
}

/* ------------------------- ASSETS ------------------------- */

function copyAssets() {
    fs.readdirSync(ASSETS_DIR).forEach((folderName) => {
        const newFolderName = `${DESTINATION_DIR}/${folderName}`

        fse.copySync(`${ASSETS_DIR}/${folderName}`, newFolderName, {
            overwrite: true,
            errorOnExist: false,
        })
    })
}

/* -------------------------- START ------------------------- */

;(() => {
    try {
        if (fs.existsSync(DESTINATION_DIR))
            fs.rmSync(DESTINATION_DIR, { recursive: true })
    } catch (e) {
        console.log(e)
    }
    fs.mkdirSync(DESTINATION_DIR)

    registerPartials()
    compileTemplates()
    copyAssets()
})()
