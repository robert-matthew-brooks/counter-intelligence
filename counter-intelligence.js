async function makeCipherLookup(encodedStr) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // get lastChar - this maps to X
  const lastChar = encodedStr.charAt(encodedStr.length - 1).toUpperCase();

  let displacement = alphabet.indexOf(lastChar) - alphabet.indexOf('X');

  //frontend
  await setLookupTable(displacement);

  // make a lookup table of the displaced alphabets
  const lookup = { in: [], out: [] };
  for (const i in alphabet) {
    let decodedLetterIndex = +i - displacement;

    // make sure new index doesn't exceed alphabet range
    if (decodedLetterIndex < 0) decodedLetterIndex += alphabet.length;
    if (decodedLetterIndex >= alphabet.length)
      decodedLetterIndex -= alphabet.length;

    lookup.in.push(alphabet[i]);
    lookup.out.push(alphabet[decodedLetterIndex]);
  }

  return lookup;
}
async function counterIntelligence(encodedStr) {
  // frontend
  lockControls([decodeBtn, newMsgBtn]);

  let outputStr = '';

  const lookup = await makeCipherLookup(encodedStr);

  // frontend
  unlockControls([fasterBtn]);

  for (const i in encodedStr) {
    // frontend
    await highlightLetter(i);

    const encodedChar = encodedStr[i].toUpperCase();
    const lookupIndex = lookup.in.indexOf(encodedChar);

    // frontend
    await focusLookup(lookupIndex);

    const isChanged = lookupIndex !== -1;
    const decodedChar = isChanged ? lookup.out[lookupIndex] : encodedChar;

    outputStr += decodedChar;

    // frontend
    await changeLetter(i, decodedChar, isChanged);
  }

  // frontend
  lockControls([fasterBtn]);
  unlockControls([newMsgBtn]);

  return outputStr;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = { makeCipherLookup, counterIntelligence };
}
