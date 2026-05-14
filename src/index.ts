import type { ZatcaQRCodeData, ZatcaTLVField } from './types.js';

const textEncoder = new TextEncoder();

function assertRequired(value: string, field: string): void {
  if (!value || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
}

function assertMoney(value: string, field: string): void {
  assertRequired(value, field);

  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    throw new Error(`${field} must be a positive amount with up to two decimals`);
  }
}

function assertTimestamp(value: string): void {
  if (Number.isNaN(Date.parse(value))) {
    throw new Error('timestamp must be a valid ISO timestamp');
  }
}

function assertVatNumber(value: string): void {
  if (!/^\d{15}$/.test(value)) {
    throw new Error('vatRegistrationNumber must contain 15 digits');
  }
}

function encodeBase64(bytes: Uint8Array): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let output = '';

  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index];
    const second = bytes[index + 1];
    const third = bytes[index + 2];

    output += alphabet[first >> 2];
    output += alphabet[((first & 3) << 4) | ((second ?? 0) >> 4)];
    output += second === undefined ? '=' : alphabet[((second & 15) << 2) | ((third ?? 0) >> 6)];
    output += third === undefined ? '=' : alphabet[third & 63];
  }

  return output;
}

export function encodeTLV(fields: ZatcaTLVField[]): Uint8Array {
  const chunks: number[] = [];

  for (const field of fields) {
    if (!Number.isInteger(field.tag) || field.tag < 1 || field.tag > 255) {
      throw new Error('tag must be an integer from 1 to 255');
    }

    assertRequired(field.value, `tag ${field.tag}`);

    const valueBytes = textEncoder.encode(field.value);

    if (valueBytes.length > 255) {
      throw new Error(`tag ${field.tag} value exceeds 255 UTF-8 bytes`);
    }

    chunks.push(field.tag, valueBytes.length, ...valueBytes);
  }

  return Uint8Array.from(chunks);
}

export function buildQRCodePayload(data: ZatcaQRCodeData): Uint8Array {
  assertRequired(data.sellerName, 'sellerName');
  assertVatNumber(data.vatRegistrationNumber);
  assertTimestamp(data.timestamp);
  assertMoney(data.invoiceTotal, 'invoiceTotal');
  assertMoney(data.vatTotal, 'vatTotal');

  const fields: ZatcaTLVField[] = [
    { tag: 1, value: data.sellerName },
    { tag: 2, value: data.vatRegistrationNumber },
    { tag: 3, value: data.timestamp },
    { tag: 4, value: data.invoiceTotal },
    { tag: 5, value: data.vatTotal }
  ];

  if (data.invoiceHash) fields.push({ tag: 6, value: data.invoiceHash });
  if (data.ecdsaSignature) fields.push({ tag: 7, value: data.ecdsaSignature });
  if (data.ecdsaPublicKey) fields.push({ tag: 8, value: data.ecdsaPublicKey });
  if (data.zatcaSignature) fields.push({ tag: 9, value: data.zatcaSignature });

  return encodeTLV(fields);
}

export function buildQRCodeBase64(data: ZatcaQRCodeData): string {
  return encodeBase64(buildQRCodePayload(data));
}

export type { ZatcaQRCodeData, ZatcaTLVField } from './types.js';
export { canonicalizeXml, removeInvoiceSignatureArtifacts } from './xml.js';
export type { XmlCanonicalizationOptions, XmlCanonicalizationResult } from './xml.js';
export { createInvoiceHash, INVOICE_HASH_ALGORITHM } from './hash.js';
export type { InvoiceHashResult } from './hash.js';
export {
  createCertificateSignatureTag,
  createEcdsaSignatureTag,
  createInvoiceHashTag,
  createPhase2QrFields,
  createPublicKeyTag
} from './phase2.js';
export type { Phase2QrField, Phase2QrFields, Phase2QrTag } from './phase2.js';
