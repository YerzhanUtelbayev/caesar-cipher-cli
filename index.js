const { pipeline } = require('stream')
const fs = require('fs')

const program = require('./src/optionsParser')
const validate = require('./src/validator')
const CipherTransform = require('./src/transformStream')

program.parse(process.argv)

const rawOptions = program.opts()

try {
  const options = validate(rawOptions)
  const transform = new CipherTransform(options)

  const readable = options.inputFile
    ? fs.createReadStream(options.inputFile, {
      encoding: 'utf8'
    }).on('error', (error) => {
      throw new Error(error.message)
    })
    : null

  const writeable = options.outputFile
    ? fs.createWriteStream(options.outputFile, {
      encoding: 'utf8',
      flags: 'a+'
    }).on('error', (error) => {
      throw new Error(error.message)
    })
    : null

  pipeline(
    options.inputFile ? readable : process.stdin,
    transform,
    options.outputFile ? writeable : process.stdout,
    (err) => {
      if (err) {
        console.error(`Pipeline failed: ${err.message}`)
      } else {
        console.log('Pipeline succeeded.')
      }
    }
  )
} catch (error) {
  process.stderr.write(`${error.message}\n`)
  process.exit(13)
}
