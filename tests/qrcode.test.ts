import { describe, expect, it } from 'vitest';
import { buildQRCodeBase64, buildQRCodePayload } from '../src/index.js';
import { sampleQRCodeData } from './helpers.js';

describe('QR payloads', () => {
  it('builds deterministic Base64 output', () => {
    const first = buildQRCodeBase64(sampleQRCodeData);
    const second = buildQRCodeBase64(sampleQRCodeData);

    expect(first).toBe(second);
  });

  it('includes required tags 1 to 5', () => {
    const payload = buildQRCodePayload(sampleQRCodeData);

    expect(payload).toContain(1);
    expect(payload).toContain(2);
    expect(payload).toContain(3);
    expect(payload).toContain(4);
    expect(payload).toContain(5);
  });
});
