import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import {
  createInvoiceHash,
  INVOICE_HASH_ALGORITHM
} from '../src/hash.js';

const XML_WITH_SIGNATURE_ARTIFACTS = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice
  xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"
  xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
  xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
  xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
  <ext:UBLExtensions>
    <ext:UBLExtension>
      <ext:ExtensionContent />
    </ext:UBLExtension>
  </ext:UBLExtensions>
  <cbc:ID>INV-200</cbc:ID>
  <cac:Signature>
    <cbc:ID>signature</cbc:ID>
  </cac:Signature>
  <ds:Signature>
    <ds:SignedInfo />
  </ds:Signature>
  <cbc:IssueDate>2026-05-14</cbc:IssueDate>
</Invoice>`;

const SIMPLE_XML = '<Invoice><cbc:ID>INV-200</cbc:ID></Invoice>';

describe('createInvoiceHash', () => {
  it('returns a SHA-256 invoice hash', () => {
    const result = createInvoiceHash(SIMPLE_XML);

    expect(INVOICE_HASH_ALGORITHM).toBe('SHA-256');
    expect(result.hashHex).toHaveLength(64);
    expect(result.hashBase64).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });

  it('returns stable base64 for the same XML', () => {
    const first = createInvoiceHash(SIMPLE_XML);
    const second = createInvoiceHash(SIMPLE_XML);

    expect(first.hashBase64).toBe(second.hashBase64);
  });

  it('returns stable hex for the same XML', () => {
    const first = createInvoiceHash(SIMPLE_XML);
    const second = createInvoiceHash(SIMPLE_XML);

    expect(first.hashHex).toBe(second.hashHex);
  });

  it('returns hash bytes as a Uint8Array', () => {
    const result = createInvoiceHash(SIMPLE_XML);

    expect(result.hashBytes).toBeInstanceOf(Uint8Array);
    expect(result.hashBytes).toHaveLength(32);
  });

  it('returns matching bytes, hex, and base64 for the canonical XML', () => {
    const result = createInvoiceHash(SIMPLE_XML);
    const expected = createHash('sha256').update(result.canonicalXml, 'utf8').digest();

    expect(Buffer.from(result.hashBytes).equals(expected)).toBe(true);
    expect(result.hashHex).toBe(expected.toString('hex'));
    expect(result.hashBase64).toBe(expected.toString('base64'));
  });

  it('returns the same hash for the same XML', () => {
    const first = createInvoiceHash(XML_WITH_SIGNATURE_ARTIFACTS);
    const second = createInvoiceHash(XML_WITH_SIGNATURE_ARTIFACTS);

    expect(first.hashHex).toBe(second.hashHex);
    expect(first.hashBase64).toBe(second.hashBase64);
  });

  it('hashes deterministic XML after removing signature artifacts', () => {
    const first = createInvoiceHash(XML_WITH_SIGNATURE_ARTIFACTS);
    const second = createInvoiceHash(
      XML_WITH_SIGNATURE_ARTIFACTS.replace('<ds:SignedInfo />', '<ds:SignedInfo Id="changed" />')
    );

    expect(first.canonicalXml).not.toContain('<ext:UBLExtensions');
    expect(first.canonicalXml).not.toContain('<cac:Signature');
    expect(first.canonicalXml).not.toContain('<ds:Signature');
    expect(first.hashHex).toBe(second.hashHex);
    expect(first.hashBase64).toBe(second.hashBase64);
  });
});
