const {
  makeCipherLookup,
  counterIntelligence,
} = require('../counter-intelligence');

// mock frontend animation functions and DOM elements
decodeBtn = null;
fasterBtn = null;
newMsgBtn = null;
textBox = null;
lockControls = jest.fn();
unlockControls = jest.fn();
clearTextBox = jest.fn();
setLookupTable = jest.fn();
highlightLetter = jest.fn();
focusLookup = jest.fn();
changeLetter = jest.fn();

describe('makeCipherLookup()', () => {
  it('should return an object', async () => {
    expect(typeof (await makeCipherLookup('a'))).toBe('object');
  });

  it('should have 26 entries, one for each letter', async () => {
    const lookup = await makeCipherLookup('a');
    expect(Object.entries(lookup.in).length).toBe(26);
    expect(Object.entries(lookup.out).length).toBe(26);
  });

  it('should map to the same letter when passed X', async () => {
    const cipher = await makeCipherLookup('X');
    expect(cipher.out[cipher.in.indexOf('A')]).toBe('A');
    expect(cipher.out[cipher.in.indexOf('B')]).toBe('B');
    expect(cipher.out[cipher.in.indexOf('C')]).toBe('C');
  });

  it('should map the last input letter to X', async () => {
    const cipher = await makeCipherLookup('abc');
    expect(cipher.out[cipher.in.indexOf('C')]).toBe('X');
    expect(cipher.out[cipher.in.indexOf('D')]).toBe('Y');
    expect(cipher.out[cipher.in.indexOf('E')]).toBe('Z');
  });
});

describe('counterIntelligence()', () => {
  it('should return a string', async () => {
    expect(typeof (await counterIntelligence('a'))).toBe('string');
  });

  it('should return an uppercase string', async () => {
    const output = await counterIntelligence('uppercase');
    expect(output).toBe(output.toUpperCase());
  });

  it('should shift the last char to map to X', async () => {
    expect(await counterIntelligence('Y')).toBe('X');
  });

  it('should displace all chars by the same amount', async () => {
    expect(await counterIntelligence('BCDY')).toBe('ABCX');
  });

  it('should not decode spaces', async () => {
    expect(await counterIntelligence('NKRRU YCKKZNKGXZ D')).toBe(
      'HELLO SWEETHEART X'
    );
  });

  it('should not decode punctuation', async () => {
    expect(
      await counterIntelligence(
        'ANVNVKNA CX YRLT DY IDLLQRWR XW HXDA FJH QXVN OAXV FXAT, MJAURWP G'
      )
    ).toBe(
      'REMEMBER TO PICK UP ZUCCHINI ON YOUR WAY HOME FROM WORK, DARLING X'
    );
  });

  it('should accept lowercase chars', async () => {
    expect(await counterIntelligence('ngbk g toik jge :) d')).toBe(
      'HAVE A NICE DAY :) X'
    );
  });
});
