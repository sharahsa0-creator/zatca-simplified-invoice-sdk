import { describe, expect, it } from 'vitest';

import {
  createCertificateSignatureTag,
  createEcdsaSignatureTag,
  createInvoiceHashTag,
  createPhase2QrFields,
  createPublicKeyTag
} from '../src/phase2.js';

const SAMPLE_BASE64 = 'QUJDREVGR0g=';
const SAMPLE_BASE64_WITH_WHITESPACE = 'QUJD\nREVGR0g=';

describe('createInvoiceHashTag', () => {
  it('creates tag 6 from invoice hash', () => {
    const result = createInvoiceHashTag(SAMPLE_BASE64);

    expect(result.tag).toBe(6);
    expect(result.value).toBe(SAMPLE_BASE64);
  });
});

describe('createEcdsaSignatureTag', () => {
  it('normalizes signature base64', () => {
    const result = createEcdsaSignatureTag(SAMPLE_BASE64_WITH_WHITESPACE);

    expect(result.tag).toBe(7);
    expect(result.value).toBe(SAMPLE_BASE64);
  });
});

describe('createPublicKeyTag', () => {
  it('normalizes public key base64', () => {
    const result = createPublicKeyTag(SAMPLE_BASE64_WITH_WHITESPACE);

    expect(result.tag).toBe(8);
    expect(result.value).toBe(SAMPLE_BASE64);
  });
});

describe('createCertificateSignatureTag', () => {
  it('normalizes certificate signature base64', () => {
    const result = createCertificateSignatureTag(SAMPLE_BASE64_WITH_WHITESPACE);

    expect(result.tag).toBe(9);
    expect(result.value).toBe(SAMPLE_BASE64);
  });
});

describe('phase 2 validation', () => {
  it('rejects empty values', () => {
    expect(() => createInvoiceHashTag('')).toThrow(/base64/i);
    expect(() => createEcdsaSignatureTag('   ')).toThrow(/base64/i);
    expect(() => createPublicKeyTag('')).toThrow(/base64/i);
    expect(() => createCertificateSignatureTag('')).toThrow(/base64/i);
  });

  it('rejects invalid base64 values', () => {
    expect(() => createInvoiceHashTag('@@@')).toThrow(/base64/i);
  });

  it('does not perform signing', () => {
    const result = createPhase2QrFields({
      invoiceHash: SAMPLE_BASE64,
      ecdsaSignature: SAMPLE_BASE64,
      ecdsaPublicKey: SAMPLE_BASE64,
      certificateSignature: SAMPLE_BASE64
    });

    expect(result).toHaveLength(4);
    expect(result.map((field) => field.tag)).toEqual([6, 7, 8, 9]);
  });
});
