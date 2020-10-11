const convert = (cipherString) => (inputString, inputNumber, getIndex) => {
  if (typeof inputString !== 'string') return

  const cipherMap = cipherString.split('')
  const shiftNumber = inputNumber % cipherMap.length
  const inputSymbolsList = inputString.split('')

  const encodedList = inputSymbolsList.map((value) => {
    const lowCaseValue = value.toLowerCase()
    const cipherMapIndex = cipherMap.indexOf(lowCaseValue)

    if (cipherMapIndex < 0) return value

    const encodedElIndex = getIndex(cipherMapIndex, cipherMap.length, shiftNumber)

    if (value === lowCaseValue) {
      return cipherMap[encodedElIndex]
    } else {
      return cipherMap[encodedElIndex].toUpperCase()
    }
  })

  return encodedList.join('')
}

class Cipher {
  constructor (cipherString) {
    this._convert = convert(cipherString)
  }

  _getShiftedIndex (mapIndex, mapLength, shiftNumber) {
    const shiftedIndex = mapIndex + shiftNumber

    if (shiftedIndex > (mapLength - 1)) {
      return shiftedIndex - mapLength
    }
    return shiftedIndex
  }

  _getUnshiftedIndex (mapIndex, mapLength, shiftNumber) {
    const shiftedIndex = mapIndex - shiftNumber

    if (shiftedIndex >= 0) {
      return shiftedIndex
    }
    return (mapLength - (-shiftedIndex))
  }

  encode (inputString, inputNumber) {
    return this._convert(inputString, inputNumber, this._getShiftedIndex)
  }

  decode (inputString, inputNumber) {
    return this._convert(inputString, inputNumber, this._getUnshiftedIndex)
  }
}

module.exports = Cipher
