export type Phase2QrTag = 6 | 7 | 8 | 9;

export interface Phase2QrField {
  tag: Phase2QrTag;
  value: string;
}

export interface Phase2QrFields {
  invoiceHash?: string;
  ecdsaSignature?: string;
  ecdsaPublicKey?: string;
  certificateSignature?: string;
}

export function createInvoiceHashTag(invoiceHashBase64: string): Phase2QrField {
  return {
    tag: 6,
    value: normalizeBase64(invoiceHashBase64, 'invoiceHash')
  };
}

export function createEcdsaSignatureTag(signatureBase64: string): Phase2QrField {
  return {
    tag: 7,
    value: normalizeBase64(signatureBase64, 'ecdsaSignature')
  };
}

export function createPublicKeyTag(publicKeyBase64: string): Phase2QrField {
  return {
    tag: 8,
    value: normalizeBase64(publicKeyBase64, 'ecdsaPublicKey')
  };
}

export function createCertificateSignatureTag(certificateSignatureBase64: string): Phase2QrField {
  return {
    tag: 9,
    value: normalizeBase64(certificateSignatureBase64, 'certificateSignature')
  };
}

export function createPhase2QrFields(input: Phase2QrFields): Phase2QrField[] {
  const fields: Phase2QrField[] = [];

  if (input.invoiceHash !== undefined) {
    fields.push(createInvoiceHashTag(input.invoiceHash));
  }

  if (input.ecdsaSignature !== undefined) {
    fields.push(createEcdsaSignatureTag(input.ecdsaSignature));
  }

  if (input.ecdsaPublicKey !== undefined) {
    fields.push(createPublicKeyTag(input.ecdsaPublicKey));
  }

  if (input.certificateSignature !== undefined) {
    fields.push(createCertificateSignatureTag(input.certificateSignature));
  }

  return fields;
}

function normalizeBase64(value: string, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${fieldName} must be a non-empty Base64 string`);
  }

  const normalized = value.replace(/\s+/g, '');

  if (normalized.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)) {
    throw new Error(`${fieldName} must be a valid Base64 string`);
  }

  return normalized;
}
