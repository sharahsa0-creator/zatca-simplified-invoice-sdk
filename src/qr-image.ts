import QRCode from 'qrcode';
import type { ZatcaQRCodeData } from './types.js';
import { buildQRCodeBase64 } from './index.js';

export type QrImageInput = string | ZatcaQRCodeData;

export interface QrImageOptions {
  margin?: number;
  scale?: number;
}

export async function createQrSvg(input: QrImageInput, options: QrImageOptions = {}): Promise<string> {
  const payload = resolvePayload(input);
  const svg = await QRCode.toString(payload, {
    type: 'svg',
    margin: options.margin,
    scale: options.scale
  });

  return svg;
}

export async function createQrPng(input: QrImageInput, options: QrImageOptions = {}): Promise<Uint8Array> {
  const payload = resolvePayload(input);
  const buffer = await QRCode.toBuffer(payload, {
    type: 'png',
    margin: options.margin,
    scale: options.scale
  });

  return Uint8Array.from(buffer);
}

function resolvePayload(input: QrImageInput): string {
  if (typeof input === 'string') {
    return assertBase64Payload(input);
  }

  return buildQRCodeBase64(input);
}

function assertBase64Payload(value: string): string {
  const normalized = value.trim();

  if (normalized.length === 0) {
    throw new Error('QR payload must be a non-empty Base64 string');
  }

  if (normalized.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)) {
    throw new Error('QR payload must be a valid Base64 string');
  }

  return normalized;
}
