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
    result.shiftNumber = 1
  }

  if (input && !isValid(input)) {
    throw new ValidationError('Invalid file path was provided')
  } else if (input) {
    result.inputFile = input
  }

  if (output && !isValid(output)) {
    throw new ValidationError('Invalid file path was provided')
  } else if (output) {
    result.outputFile = output
  }

  return result
}

module.exports = validate
