import { describe, expect, it } from 'vitest';
import { encodeTLV } from '../src/index.js';

describe('TLV encoding', () => {
  it('preserves tag ordering', () => {
    const payload = encodeTLV([
      { tag: 1, value: 'A' },
      { tag: 2, value: 'B' }
    ]);

    expect(payload[0]).toBe(1);
    expect(payload[3]).toBe(2);
  });

  it('supports UTF-8 byte length', () => {
    const payload = encodeTLV([
      { tag: 1, value: 'متجر' }
    ]);

    expect(payload[1]).toBeGreaterThan(4);
  });

  it('returns raw TLV bytes', () => {
    const payload = encodeTLV([
      { tag: 1, value: 'A' }
    ]);

    expect(Array.from(payload)).toEqual([1, 1, 65]);
  });
});
