import { describe, expect, it } from 'vitest';
import { buildQRCodePayload } from '../src/index.js';
import { sampleQRCodeData } from './helpers.js';

describe('Phase 2 fields', () => {
  it('accepts optional tags 6 to 9', () => {
    const payload = buildQRCodePayload({
      ...sampleQRCodeData,
      invoiceHash: 'hash',
      ecdsaSignature: 'signature',
      ecdsaPublicKey: 'public-key',
      zatcaSignature: 'zatca-signature'
    });

    expect(payload).toContain(6);
    expect(payload).toContain(7);
    expect(payload).toContain(8);
    expect(payload).toContain(9);
  });
});
