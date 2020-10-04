const { Transform } = require('stream')
const { StringDecoder } = require('string_decoder')

const Cipher = require('./Cipher')
const { alphabetString, ACTION_TYPES } = require('../config')

class CipherTransform extends Transform {
  constructor (options) {
    super(options)
    this.options = options
    this._cipher = new Cipher(alphabetString)
    this._decoder = new StringDecoder('utf-8')
  }

  _transform (chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk)
    }
    if (chunk === '\u0003') {
      process.exit()
    }

    if (this.options.action === ACTION_TYPES.ENCODE) {
      chunk = this._cipher.encode(chunk, this.options.shiftNumber) + '\n'
    }

    if (this.options.action === ACTION_TYPES.DECODE) {
      chunk = this._cipher.decode(chunk, this.options.shiftNumber) + '\n'
    }

    callback(null, chunk)
  }
}

module.exports = CipherTransform
