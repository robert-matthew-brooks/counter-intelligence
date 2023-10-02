const {
  makeCipherLookup,
  counterIntelligence,
} = require('../counter-intelligence');

describe('makeCipherLookup()', () => {
  it('should return an object', () => {
    expect(typeof makeCipherLookup('a')).toBe('object');
  });

  it('should have 26 entries, one for each letter', () => {
    expect(Object.entries(makeCipherLookup('a')).length).toBe(26);
  });

  it('should map to the same letter when passed X', () => {
    const cipherLookup = makeCipherLookup('X');
    expect(cipherLookup['A']).toBe('A');
    expect(cipherLookup['B']).toBe('B');
    expect(cipherLookup['C']).toBe('C');
  });

  it('should map the last input letter to X', () => {
    const cipherLookup = makeCipherLookup('abc');
    expect(cipherLookup['C']).toBe('X');
    expect(cipherLookup['D']).toBe('Y');
    expect(cipherLookup['E']).toBe('Z');
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

  it('should not encrypt punctuation', () => {
    expect(counterIntelligence('!?.,')).toBe('!?.,');
  });
});
