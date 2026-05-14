# Contributing

Thank you for contributing to the ZATCA Simplified Invoice SDK.

## Development

Install dependencies:

```bash
npm install
```

Run validation locally:

```bash
npm run build
npm test
npm run typecheck
```

## Pull Requests

- Keep pull requests focused and small.
- Avoid unrelated refactors.
- Add tests for new helpers.
- Update README and CHANGELOG when behavior changes.

## Scope Rules

The SDK intentionally separates:

- QR/TLV encoding
- XML canonicalization
- QR image generation
- Phase 2 field helpers

from advanced signing/onboarding flows.

Do not introduce:

- onboarding flows
- UI
- private key handling
- certificate generation
- unrelated backend integrations
