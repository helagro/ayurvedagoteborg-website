const fs = require('fs')
const fse = require('fs-extra')
const Handlebars = require('handlebars')
const minify = require('html-minifier').minify

const PARTIALS_DIR = 'components'
const TEMPLATES_DIR = 'templates'
const DESTINATION_DIR = '../dist'
const ASSETS_DIR = 'assets'

function registerPartials() {
    fs.readdirSync(PARTIALS_DIR).forEach((filename) => {
        const partialSource = fs.readFileSync(
            `${PARTIALS_DIR}/${filename}`,
            'utf8'
        )
        Handlebars.registerPartial(
            filename.split('.')[0],
            partialSource
        )
    })
}

function compileTemplates(dir = TEMPLATES_DIR) {
    fs.readdirSync(dir).forEach((filename) => {
        const path = `${dir}/${filename}`
        if (fs.statSync(path).isDirectory())
            return compileTemplates(path)

        const template = fs.readFileSync(path, 'utf8')
        const compiledTemplate =
            Handlebars.compile(template)
        const compiled = compiledTemplate({})
        const minimised = minify(compiled, {
            collapseWhitespace: true,
            removeComments: true,
        })

        const newFolderPath = dir.replace(
            TEMPLATES_DIR,
            DESTINATION_DIR
        )
        writeOutputFile(newFolderPath, filename, minimised)
    })
}

function writeOutputFile(folderPath, filename, content) {
    const filenameNoExt = filename.split('.')[0]

    // Creates folder structure if parts missing
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, {
            recursive: true,
        })

    fs.writeFileSync(
        `${folderPath}/${filenameNoExt}.html`,
        content
    )
}

function copyAssets() {
    fs.readdirSync(ASSETS_DIR).forEach((folderName) => {
        const newFolderName = `${DESTINATION_DIR}/${folderName}`

        fse.copySync(
            `${ASSETS_DIR}/${folderName}`,
            newFolderName,
            {
                overwrite: true,
                errorOnExist: false,
            }
        )
    })
}

;(() => {
    try {
        fs.rmSync(DESTINATION_DIR, { recursive: true })
    } catch (e) {
        console.log(e)
    }
    fs.mkdirSync(DESTINATION_DIR)

    registerPartials()
    compileTemplates()
    copyAssets()
})()
