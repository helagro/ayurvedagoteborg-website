const fs = require('fs')
const fse = require('fs-extra')
const Handlebars = require('handlebars')

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

function compileTemplates() {
    fs.readdirSync(TEMPLATES_DIR).forEach((filename) => {
        const templateSource = fs.readFileSync(
            `${TEMPLATES_DIR}/${filename}`,
            'utf8'
        )

        const compiledTemplate =
            Handlebars.compile(templateSource)
        const output = compiledTemplate({})

        const filenameNoExt = filename.split('.')[0]
        fs.writeFileSync(
            `${DESTINATION_DIR}/${filenameNoExt}.html`,
            output
        )
    })
}

function copyAssets() {
    fs.readdirSync(ASSETS_DIR).forEach((folderName) => {
        const newFolderName = `../dist/${folderName}`

        fse.copySync(ASSETS_DIR, newFolderName, {
            overwrite: true,
            errorOnExist: false,
        })
    })
}

;(() => {
    try {
        fs.rmdirSync(DESTINATION_DIR, { recursive: true })
    } catch (e) {
        console.log(e)
    }
    fs.mkdirSync(DESTINATION_DIR)

    registerPartials()
    compileTemplates()
    copyAssets()
})()
