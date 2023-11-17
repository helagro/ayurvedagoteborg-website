const fs = require('fs')
const Handlebars = require('handlebars')

const PARTIALS_DIR = 'components'
const TEMPLATES_DIR = 'templates'
const DESTINATION_DIR = 'dist'

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

fs.readdirSync(TEMPLATES_DIR).forEach((filename) => {
  const templateSource = fs.readFileSync(
    `${TEMPLATES_DIR}/${filename}`,
    'utf8'
  )
  const compiledTemplate =
    Handlebars.compile(templateSource)

  const output = compiledTemplate({})
  console.log(output)

  const filenameNoExt = filename.split('.')[0]

  fs.writeFileSync(
    `${DESTINATION_DIR}/${filenameNoExt}.html`,
    output
  )
})
