import { describe, expect, it } from 'vitest';
import { buildQRCodeBase64, encodeTLV } from '../src/index.js';
import { sampleQRCodeData } from './helpers.js';

describe('Base64 snapshots', () => {
  it('encodes a simple TLV snapshot', () => {
    expect(encodeTLV([{ tag: 1, value: 'A' }])).toEqual(Uint8Array.from([1, 1, 65]));
  });

  it('returns a stable QR Base64 value', () => {
    expect(buildQRCodeBase64(sampleQRCodeData)).toBe(
      'AQVStoreCDzMwMDAwMDAwMDAwMDAwMDMDFDIwMjUtMDEtMDFUMDA6MDA6MDBaBAYxMDAuMDAFBTE1LjAw'
    );
  });
});
