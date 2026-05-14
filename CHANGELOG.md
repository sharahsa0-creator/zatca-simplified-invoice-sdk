# Changelog

## 0.5.0

### Added

- npm release readiness improvements
- `prepublishOnly` validation hook
- ESM/CJS/default export alignment
- npm publish configuration improvements
- `CONTRIBUTING.md`
- `SECURITY.md`
- improved `.npmignore`
- README publishing guidance
- npm badges

### Scope Excluded

- ZATCA feature additions
- signing
- CSR
- certificate lifecycle management
- XAdES
- onboarding
- API integration
- UI components

## 0.4.0

### Added

- QR SVG generation helper
- QR PNG generation helper
- Support for QR image generation from:
  - Base64 payloads
  - ZatcaQRCodeData
- QR image tests
- Lightweight QR image dependency

### Scope Excluded

- Signing
- Private key handling
- CSR generation
- Certificate generation
- XAdES
- ZATCA onboarding
- API integration
- UI components

## 0.3.0

### Added

- QR Phase 2 field helper utilities
- Tag 6 invoice hash helper
- Tag 7 ECDSA signature helper
- Tag 8 ECDSA public key helper
- Tag 9 certificate signature helper
- Base64 normalization helpers for Phase 2 QR fields
- Phase 2 helper tests

### Scope Excluded

- ECDSA signing
- Private key handling
- CSR generation
- Certificate generation
- XAdES
- ZATCA onboarding
- API integration
- UI components

## 0.2.0

### Added

- XML canonicalization helper
- Signature artifact cleanup helper
- SHA-256 invoice hash helper
- Invoice hash outputs:
  - canonical XML
  - hash bytes
  - hash base64
  - hash hex
- XML canonicalization tests
- Invoice hash deterministic tests

### Scope Excluded

- ECDSA signing
- CSR generation
- Certificates
- XAdES
- ZATCA onboarding
- API integration
- UI components

## 0.1.0

Initial MVP release.

### Added

- TLV encoder
- QR payload builder
- Base64 QR output
- UTF-8 byte-safe encoding
- Validation layer
- Unit tests
- CI workflow
