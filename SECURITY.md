# Security Policy

## Supported Versions

Only the latest published npm version is supported with security fixes.

## Reporting a Vulnerability

Please open a private security report through GitHub Security Advisories if available.

Include:

- affected version
- reproduction steps
- impact description
- proof of concept if possible

## Scope Notes

This SDK intentionally avoids:

- storing private keys
- certificate lifecycle management
- onboarding APIs
- backend persistence
- UI flows

Consumers are responsible for secure runtime handling of sensitive signing materials.
