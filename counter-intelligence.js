async function makeCipherLookup(encodedStr) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const outputLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // get lastChar - this maps to X
  const lastChar = encodedStr.charAt(encodedStr.length - 1).toUpperCase();
  const lastCharIndex = alphabet.indexOf(lastChar);

  const decodedLastChar = 'X';
  const decodedLastCharIndex = alphabet.indexOf(decodedLastChar);

  let displacement = decodedLastCharIndex - lastCharIndex;
  if (displacement < 0) displacement += alphabet.length;

  //frontend
  await setLookupTable(displacement);

  // make a lookup table of the displaced alphabets
  const lookup = { in: [], out: [] };
  for (const i in alphabet) {
    lookup.in.push(alphabet[i]);
    lookup.out.push(outputLetters[+i + displacement]);
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

  // unlock buttons
  lockControls([fasterBtn]);
  unlockControls([newMsgBtn]);

  return outputStr;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = { makeCipherLookup, counterIntelligence };
}
