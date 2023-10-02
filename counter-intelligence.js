function makeCipherLookup(encodedStr) {
  const inputLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const outputLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // get lastChar - this maps to X
  const lastChar = encodedStr.charAt(encodedStr.length - 1).toUpperCase();
  const lastCharIndex = inputLetters.indexOf(lastChar);

  // get displacement between lastChar and X
  let displacement = 0;
  while (outputLetters[lastCharIndex + displacement] !== 'X') {
    displacement++;
  }

  // make a lookup table of the displaced alphabets
  const cipherLookup = {};
  for (const i in inputLetters) {
    cipherLookup[inputLetters[i]] = outputLetters[+i + displacement];
  }

  return cipherLookup;
}

function counterIntelligence(encodedStr) {
  let outputStr = encodedStr.toUpperCase();

  return outputStr;
}

module.exports = { makeCipherLookup, counterIntelligence };
