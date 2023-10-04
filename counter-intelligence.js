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
  const lookup = { in: [], out: [] };
  for (const i in inputLetters) {
    lookup.in.push(inputLetters[i]);
    lookup.out.push(outputLetters[+i + displacement]);
  }

  return lookup;
}

function counterIntelligence(encodedStr) {
  let outputStr = '';

  const lookup = makeCipherLookup(encodedStr);

  for (const i in encodedStr) {
    const encodedChar = encodedStr[i].toUpperCase();
    const lookupIndex = lookup.in.indexOf(encodedChar);
    const decodedChar =
      lookupIndex !== -1 ? lookup.out[lookupIndex] : encodedChar;

    outputStr += decodedChar;
  }

  return outputStr;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = { makeCipherLookup, counterIntelligence };
}
