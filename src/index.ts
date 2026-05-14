import { Buffer } from 'node:buffer';
import type { ZatcaQRCodeData, ZatcaTLVField } from './types.js';

function assertRequired(value: string, field: string): void {
  if (!value || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
}

export function encodeTLV(fields: ZatcaTLVField[]): Uint8Array {
  const chunks: number[] = [];

  for (const field of fields) {
    const valueBytes = Buffer.from(field.value, 'utf8');

    chunks.push(field.tag);
    chunks.push(valueBytes.length);

    for (const byte of valueBytes) {
      chunks.push(byte);
    }
  }

  return Uint8Array.from(chunks);
}

export function buildQRCodePayload(data: ZatcaQRCodeData): Uint8Array {
  assertRequired(data.sellerName, 'sellerName');
  assertRequired(data.vatRegistrationNumber, 'vatRegistrationNumber');
  assertRequired(data.timestamp, 'timestamp');
  assertRequired(data.invoiceTotal, 'invoiceTotal');
  assertRequired(data.vatTotal, 'vatTotal');

  const fields: ZatcaTLVField[] = [
    { tag: 1, value: data.sellerName },
    { tag: 2, value: data.vatRegistrationNumber },
    { tag: 3, value: data.timestamp },
    { tag: 4, value: data.invoiceTotal },
    { tag: 5, value: data.vatTotal }
  ];

  if (data.invoiceHash) {
    fields.push({ tag: 6, value: data.invoiceHash });
  }

  if (data.ecdsaSignature) {
    fields.push({ tag: 7, value: data.ecdsaSignature });
  }

  if (data.ecdsaPublicKey) {
    fields.push({ tag: 8, value: data.ecdsaPublicKey });
  }

  if (data.zatcaSignature) {
    fields.push({ tag: 9, value: data.zatcaSignature });
  }

  return encodeTLV(fields);
}

export function buildQRCodeBase64(data: ZatcaQRCodeData): string {
  const payload = buildQRCodePayload(data);
  return Buffer.from(payload).toString('base64');
}

export type { ZatcaQRCodeData, ZatcaTLVField } from './types.js';
