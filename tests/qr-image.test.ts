import { describe, expect, it } from 'vitest';

import { createQrPng, createQrSvg } from '../src/qr-image.js';

const SAMPLE_BASE64 = 'U2FtcGxlLVFSLVBheWxvYWQ=';

const SAMPLE_QR_DATA = {
  sellerName: 'Sample Store',
  vatRegistrationNumber: '300000000000003',
  timestamp: '2026-05-14T12:00:00Z',
  invoiceTotal: '115.00',
  vatTotal: '15.00'
};

describe('createQrSvg', () => {
  it('creates SVG from Base64 payload', async () => {
    const svg = await createQrSvg(SAMPLE_BASE64);

    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  it('creates SVG from ZatcaQRCodeData', async () => {
    const svg = await createQrSvg(SAMPLE_QR_DATA);

    expect(svg).toContain('<svg');
  });

  it('rejects invalid Base64 payloads', async () => {
    await expect(createQrSvg('@@@')).rejects.toThrow(/base64/i);
  });
});

describe('createQrPng', () => {
  it('creates PNG bytes from Base64 payload', async () => {
    const png = await createQrPng(SAMPLE_BASE64);

    expect(png).toBeInstanceOf(Uint8Array);
    expect(png.length).toBeGreaterThan(0);
  });

  it('creates PNG bytes from ZatcaQRCodeData', async () => {
    const png = await createQrPng(SAMPLE_QR_DATA);

    expect(png).toBeInstanceOf(Uint8Array);
    expect(png.length).toBeGreaterThan(0);
  });
});
