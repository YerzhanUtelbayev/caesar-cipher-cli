const Cipher = require('./src')

const alphabetString = 'abcdefghijklmnopqrstuvwxyz'

const cipher = new Cipher(alphabetString)

const input = 'abcde'
const secret = 2

const encodedValue = cipher.encode(input, secret)
console.log(encodedValue)
const decodedValue = cipher.decode(encodedValue, secret)
console.log(decodedValue)
