import { createHash } from 'node:crypto';
import {
  canonicalizeXml,
  type XmlCanonicalizationOptions
} from './xml.js';

export const INVOICE_HASH_ALGORITHM = 'SHA-256' as const;

export interface InvoiceHashResult {
  canonicalXml: string;
  hashBytes: Uint8Array;
  hashBase64: string;
  hashHex: string;
}

export function createInvoiceHash(
  xml: string,
  options?: XmlCanonicalizationOptions
): InvoiceHashResult {
  const { canonicalXml } = canonicalizeXml(xml, options);

  const hashBuffer = createHash('sha256')
    .update(canonicalXml, 'utf8')
    .digest();

  return {
    canonicalXml,
    hashBytes: Uint8Array.from(hashBuffer),
    hashBase64: hashBuffer.toString('base64'),
    hashHex: hashBuffer.toString('hex')
  };
}
