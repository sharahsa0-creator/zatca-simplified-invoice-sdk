import { describe, expect, it } from 'vitest';
import { buildQRCodePayload } from '../src/index.js';
import { sampleQRCodeData } from './helpers.js';

describe('Validation', () => {
  it('rejects empty required fields', () => {
    expect(() =>
      buildQRCodePayload({
        ...sampleQRCodeData,
        sellerName: ''
      })
    ).toThrow();
  });

  it('rejects invalid totals', () => {
    expect(() =>
      buildQRCodePayload({
        ...sampleQRCodeData,
        invoiceTotal: 'invalid'
      })
    ).toThrow();
  });
});
