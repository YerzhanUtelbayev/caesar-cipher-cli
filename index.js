const { pipeline } = require('stream')
const fs = require('fs')

const { getAbsolutePath } = require('./config')
const program = require('./src/optionsParser')
const validate = require('./src/validator')
const CipherTransform = require('./src/transformStream')

program.parse(process.argv)

const rawOptions = program.opts()

try {
  const options = validate(rawOptions)
  const transform = new CipherTransform(options)

  const readable = options.inputFile
    ? fs.createReadStream(getAbsolutePath(options.inputFile), {
      encoding: 'utf8'
    })
    : null

  const writeable = options.outputFile
    ? fs.createWriteStream(getAbsolutePath(options.outputFile), {
      encoding: 'utf8',
      flags: 'a+'
    })
    : null

  pipeline(
    options.inputFile ? readable : process.stdin,
    transform,
    options.outputFile ? writeable : process.stdout,
    (err) => {
      if (err) {
        console.error('Pipeline failed: ')
      } else {
        console.log('Pipeline succeeded.')
      }
    }
  )
} catch (error) {
  process.stderr.write(`${error.message}\n`)
}
