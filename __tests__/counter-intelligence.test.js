const {
  makeCipherLookup,
  counterIntelligence,
} = require('../counter-intelligence');

describe('makeCipherLookup()', () => {
  it('should return an object', () => {
    expect(typeof makeCipherLookup('a')).toBe('object');
  });

  it('should have 26 entries, one for each letter', () => {
    expect(Object.entries(makeCipherLookup('a').in).length).toBe(26);
    expect(Object.entries(makeCipherLookup('a').out).length).toBe(26);
  });

  it('should map to the same letter when passed X', () => {
    const cipher = makeCipherLookup('X');
    expect(cipher.out[cipher.in.indexOf('A')]).toBe('A');
    expect(cipher.out[cipher.in.indexOf('B')]).toBe('B');
    expect(cipher.out[cipher.in.indexOf('C')]).toBe('C');
  });

  it('should map the last input letter to X', () => {
    const cipher = makeCipherLookup('abc');
    expect(cipher.out[cipher.in.indexOf('C')]).toBe('X');
    expect(cipher.out[cipher.in.indexOf('D')]).toBe('Y');
    expect(cipher.out[cipher.in.indexOf('E')]).toBe('Z');
  });
});

describe('counterIntelligence()', () => {
  it('should return a string', () => {
    expect(typeof counterIntelligence('a')).toBe('string');
  });

  it('should return an uppercase string', () => {
    const output = counterIntelligence('uppercase');
    expect(output).toBe(output.toUpperCase());
  });

  it('should shift the last char to map to X', () => {
    expect(counterIntelligence('Y')).toBe('X');
  });

  it('should displace all chars by the same amount', () => {
    expect(counterIntelligence('BCDY')).toBe('ABCX');
  });

  it('should not decode spaces', () => {
    expect(counterIntelligence('NKRRU YCKKZNKGXZ D')).toBe(
      'HELLO SWEETHEART X'
    );
  });

  it('should not decode punctuation', () => {
    expect(
      counterIntelligence(
        'ANVNVKNA CX YRLT DY IDLLQRWR XW HXDA FJH QXVN OAXV FXAT, MJAURWP G'
      )
    ).toBe(
      'REMEMBER TO PICK UP ZUCCHINI ON YOUR WAY HOME FROM WORK, DARLING X'
    );
  });

  it('should accept lowercase chars', () => {
    expect(counterIntelligence('ngbk g toik jge :) d')).toBe(
      'HAVE A NICE DAY :) X'
    );
  });
});
