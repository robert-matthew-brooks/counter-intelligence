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
  const cipher = { in: [], out: [] };
  for (const i in inputLetters) {
    cipher.in.push(inputLetters[i]);
    cipher.out.push(outputLetters[+i + displacement]);
  }

  return cipher;
}

function counterIntelligence(encodedStr) {
  const cipher = makeCipherLookup(encodedStr);

  let outputStr = '';

  for (const i in encodedStr) {
    const encodedChar = encodedStr[i].toUpperCase();
    const cipherIndex = cipher.in.indexOf(encodedChar);
    const decodedChar =
      cipherIndex !== -1 ? cipher.out[cipherIndex] : encodedChar;

    outputStr += decodedChar;
  }

  return outputStr;
}

module.exports = { makeCipherLookup, counterIntelligence };
