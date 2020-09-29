const alphabetString = 'abcdefghijklmnopqrstuvwxyz';

const encode = (inputString, inputNumber = 1) => {
  if (typeof inputString !== 'string') return;

  const alphabet = alphabetString.split('');
  const lastElIndex = alphabet.length - 1;
  const shiftNumber = inputNumber % lastElIndex;
  const inputSymbolsList = inputString.split('');

  const encodedList = inputSymbolsList.map((value) => {
    const lowCaseValue = value.toLowerCase();
    const alphabetIndex = alphabet.indexOf(lowCaseValue);

    if (alphabetIndex === -1) return lowCaseValue;

    const shiftedIndex = alphabetIndex + shiftNumber;

    const encodedElIndex =
      shiftedIndex > lastElIndex ? shiftedIndex - lastElIndex : shiftedIndex;

    if (value === lowCaseValue) {
      return alphabet[encodedElIndex];
    } else {
      return alphabet[encodedElIndex].toUpperCase();
    }
  });

  return encodedList.join('');
};
