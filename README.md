# zatca-simplified-invoice-sdk

TypeScript SDK for generating ZATCA simplified invoice QR payloads.

## Features

- TLV encoder
- QR payload builder
- Base64 QR output
- UTF-8 byte-safe encoding
- Type-safe APIs
- Minimal dependency footprint

## Installation

```bash
npm install zatca-simplified-invoice-sdk
```

## Usage

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

## Out of Scope for PR-1

The following are intentionally excluded from this MVP release:

- XML generation
- XML hashing
- ECDSA signing
- XAdES
- CSR generation
- Certificate onboarding
- ZATCA onboarding APIs
- UI components

## Roadmap

Future releases may include:

- XML hashing helpers
- ECDSA signing utilities
- XAdES helpers
- CSR generation
- Certificate onboarding flows
