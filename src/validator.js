const path = require('path')
const fs = require('fs')
const isValid = require('is-valid-path')

class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}

const validate = ({ shift, action, input, output }) => {
  const result = {}
  const shiftNumber = parseInt(shift, 10)
  if (action && (action === 'encode' || action === 'decode')) {
    result.action = action
  } else {
    throw new ValidationError('Provide one of action types "encode"/"decode"')
  }

  if (typeof shiftNumber === 'number' && !isNaN(shiftNumber)) {
    result.shiftNumber = shiftNumber
  } else {
    throw new ValidationError('Provide shift number. It should be integer')
  }

  if (input && !isValid(input)) {
    throw new ValidationError('Invalid file path was provided')
  } else if (input) {
    const inputPath = path.resolve(String(input))
    if (!fs.existsSync(inputPath)) {
      throw new ValidationError(`Path ${input} doesn't exist`)
    }
    result.inputFile = inputPath
  }

  if (output && !isValid(output)) {
    throw new ValidationError('Invalid file path was provided')
  } else if (output) {
    const outputPath = path.resolve(String(output))
    if (!fs.existsSync(outputPath)) {
      throw new ValidationError(`Path ${output} doesn't exist`)
    }
    result.outputFile = outputPath
  }

  return result
}

module.exports = validate
