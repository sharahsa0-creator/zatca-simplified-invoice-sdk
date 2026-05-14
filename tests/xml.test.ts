import { describe, expect, it } from 'vitest';

import {
  canonicalizeXml,
  removeInvoiceSignatureArtifacts
} from '../src/xml.js';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
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
  <cbc:ID>INV-100</cbc:ID>
  <cac:Signature>
    <cbc:ID>signature</cbc:ID>
  </cac:Signature>
  <ds:Signature>
    <ds:SignedInfo />
  </ds:Signature>
  <cbc:IssueDate>2026-05-14</cbc:IssueDate>
</Invoice>`;

describe('removeInvoiceSignatureArtifacts', () => {
  it('removes ext:UBLExtensions', () => {
    const result = removeInvoiceSignatureArtifacts(SAMPLE_XML);

    expect(result).not.toContain('<ext:UBLExtensions');
  });

  it('removes cac:Signature', () => {
    const result = removeInvoiceSignatureArtifacts(SAMPLE_XML);

    expect(result).not.toContain('<cac:Signature');
  });

  it('removes ds:Signature', () => {
    const result = removeInvoiceSignatureArtifacts(SAMPLE_XML);

    expect(result).not.toContain('<ds:Signature');
  });
});

describe('canonicalizeXml', () => {
  it('returns canonical XML string', () => {
    const result = canonicalizeXml(SAMPLE_XML);

    expect(typeof result.canonicalXml).toBe('string');
    expect(result.canonicalXml).toContain('<cbc:ID>INV-100</cbc:ID>');
  });

  it('removes XML declaration by default', () => {
    const result = canonicalizeXml(SAMPLE_XML);

    expect(result.canonicalXml.startsWith('<?xml')).toBe(false);
  });

  it('normalizes CRLF line endings', () => {
    const windowsXml = SAMPLE_XML.replace(/\n/g, '\r\n');

    const result = canonicalizeXml(windowsXml);

    expect(result.canonicalXml.includes('\r')).toBe(false);
  });
});
