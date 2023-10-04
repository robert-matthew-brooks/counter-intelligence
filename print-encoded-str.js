// a function for me to run from node to make encoded strings
// run 'node print-encoded-str', remember to end string with 'X'

function printEncodedStr(decodedStr, displacement) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let encodedStr = '';

  for (const i in decodedStr) {
    let encodedChar;
    const decodedChar = decodedStr[i];
    const decodedIndex = alphabet.indexOf(decodedChar.toLowerCase());

    if (decodedIndex === -1) {
      encodedChar = decodedChar;
    } else {
      let encodedIndex = decodedIndex + displacement;
      if (encodedIndex < 0) encodedIndex += alphabet.length;
      if (encodedIndex >= alphabet.length) encodedIndex -= alphabet.length;

      encodedChar = alphabet[encodedIndex];
    }

    if (decodedChar === decodedChar.toUpperCase())
      encodedChar = encodedChar.toUpperCase();

    encodedStr += encodedChar;
  }

  console.log(encodedStr);
}

printEncodedStr('String to encode. X', 0);
