const { pipeline } = require('stream')

const program = require('./src/optionsParser')
const validate = require('./src/validator')
const CipherTransform = require('./src/transformStream')

program.parse(process.argv)

const rawOptions = program.opts()

const options = validate(rawOptions)
const transform = new CipherTransform(options)

pipeline(
  process.stdin,
  transform,
  process.stdout,
  err => {
    if (err) {
      console.log('Pipeline failed: ')
    } else {
      console.log('Pipeline succeeded.')
    }
  }
)
