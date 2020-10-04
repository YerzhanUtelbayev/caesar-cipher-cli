const path = require('path')

const rootPath = __dirname

module.exports = {
  rootPath,
  getAbsolutePath (relativePath) {
    return path.join(rootPath, relativePath)
  },
  alphabetString: 'abcdefghijklmnopqrstuvwxyz',
  ACTION_TYPES: {
    ENCODE: 'encode',
    DECODE: 'decode'
  }
}
