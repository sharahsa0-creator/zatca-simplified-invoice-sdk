# Changelog

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
