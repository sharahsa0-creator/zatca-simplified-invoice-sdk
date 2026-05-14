import { describe, expect, it } from 'vitest';
import { encodeTLV } from '../src/index.js';

describe('TLV limits', () => {
  it('rejects invalid tags', () => {
    expect(() =>
      encodeTLV([{ tag: 0, value: 'A' }])
    ).toThrow();
  });

  it('rejects values larger than 255 UTF-8 bytes', () => {
    const oversized = 'a'.repeat(256);

    expect(() =>
      encodeTLV([{ tag: 1, value: oversized }])
    ).toThrow();
  });
});
