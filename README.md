# zatca-simplified-invoice-sdk

TypeScript SDK for generating ZATCA simplified invoice QR payloads.

## Features

- TLV encoder
- QR payload builder
- Base64 QR output
- QR SVG generation
- QR PNG generation
- UTF-8 byte-safe encoding
- Type-safe APIs
- XML canonicalization helper
- SHA-256 invoice hashing helper
- QR Phase 2 field normalization helpers
- Minimal dependency footprint

## Installation

```bash
npm install zatca-simplified-invoice-sdk
```

## Node.js Support

- Node.js 20+

## Usage

### QR Payload

```ts
import { buildQRCodeBase64 } from 'zatca-simplified-invoice-sdk';

const qr = buildQRCodeBase64({
  sellerName: 'Sample Store',
  vatRegistrationNumber: '300000000000003',
  timestamp: '2025-01-01T00:00:00Z',
  invoiceTotal: '100.00',
  vatTotal: '15.00'
});
```

### QR Image Generation

```ts
import {
  createQrPng,
  createQrSvg
} from 'zatca-simplified-invoice-sdk';

const payload = 'U2FtcGxlLVFSLVBheWxvYWQ=';

const svg = await createQrSvg(payload);
const png = await createQrPng(payload);
```

### XML Canonicalization + Invoice Hash

```ts
import {
  canonicalizeXml,
  createInvoiceHash
} from 'zatca-simplified-invoice-sdk';

const xml = `<Invoice><cbc:ID>INV-100</cbc:ID></Invoice>`;

const canonical = canonicalizeXml(xml);
const hash = createInvoiceHash(xml);

console.log(canonical.canonicalXml);
console.log(hash.hashBase64);
console.log(hash.hashHex);
```

### QR Phase 2 Helpers

```ts
import {
  createCertificateSignatureTag,
  createEcdsaSignatureTag,
  createInvoiceHashTag,
  createPublicKeyTag
} from 'zatca-simplified-invoice-sdk';

const invoiceHashTag = createInvoiceHashTag('QUJDREVGR0g=');
const signatureTag = createEcdsaSignatureTag('QUJDREVGR0g=');
const publicKeyTag = createPublicKeyTag('QUJDREVGR0g=');
const certificateSignatureTag = createCertificateSignatureTag('QUJDREVGR0g=');
```

## API Reference

### encodeTLV(fields)

Encodes TLV fields into a UTF-8 byte-safe Uint8Array.

### buildQRCodePayload(data)

Builds the raw TLV QR payload.

### buildQRCodeBase64(data)

Returns the Base64-encoded QR payload.

### createQrSvg(input, options?)

Returns QR image as SVG string.

### createQrPng(input, options?)

Returns QR image as PNG bytes.

### canonicalizeXml(xml, options?)

Returns canonical XML after:

- removing XML declaration
- normalizing line endings
- removing signature-related XML artifacts

### removeInvoiceSignatureArtifacts(xml)

Removes:

- `ext:UBLExtensions`
- `cac:Signature`
- `ds:Signature`

### createInvoiceHash(xml, options?)

Returns:

- canonical XML
- SHA-256 bytes
- SHA-256 base64
- SHA-256 hex

### createInvoiceHashTag(invoiceHash)

Creates normalized QR tag 6.

### createEcdsaSignatureTag(signature)

Creates normalized QR tag 7.

### createPublicKeyTag(publicKey)

Creates normalized QR tag 8.

### createCertificateSignatureTag(signature)

Creates normalized QR tag 9.

## ZATCA QR Fields

### Phase 1 Required Tags

| Tag | Field |
|---|---|
| 1 | Seller name |
| 2 | VAT registration number |
| 3 | Invoice timestamp |
| 4 | Invoice total with VAT |
| 5 | VAT total |

### Optional Phase 2 Tags

| Tag | Field |
|---|---|
| 6 | Invoice hash |
| 7 | ECDSA signature |
| 8 | ECDSA public key |
| 9 | ZATCA cryptographic stamp signature |

## Out of Scope for PR-4

The following are intentionally excluded from this release:

- Signing
- Private key handling
- CSR generation
- Certificate generation
- XAdES
- ZATCA onboarding APIs
- API integrations
- UI components

## Versioning

This package follows semantic versioning.

## Publishing Roadmap

- PR-1: QR/TLV foundation
- PR-2: XML canonicalization and invoice hash foundation
- PR-3: QR Phase 2 field helpers
- PR-4: QR image generation
- PR-5: Cryptographic signing helpers
