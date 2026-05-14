export interface XmlCanonicalizationOptions {
  /** Remove XML declaration before hashing. Defaults to true. */
  omitXmlDeclaration?: boolean;
  /** Normalize CRLF/CR line endings to LF. Defaults to true. */
  normalizeLineEndings?: boolean;
  /** Remove signing-related XML artifacts before hashing. Defaults to true. */
  removeSignatureArtifacts?: boolean;
  /** Trim leading/trailing whitespace after cleanup. Defaults to true. */
  trim?: boolean;
}

export interface XmlCanonicalizationResult {
  canonicalXml: string;
}

const DEFAULT_XML_CANONICALIZATION_OPTIONS: Required<XmlCanonicalizationOptions> = {
  omitXmlDeclaration: true,
  normalizeLineEndings: true,
  removeSignatureArtifacts: true,
  trim: true
};

function resolveOptions(options: XmlCanonicalizationOptions = {}): Required<XmlCanonicalizationOptions> {
  return {
    ...DEFAULT_XML_CANONICALIZATION_OPTIONS,
    ...options
  };
}

export function removeInvoiceSignatureArtifacts(xml: string): string {
  assertXmlString(xml);

  return xml
    .replace(/\s*<ext:UBLExtensions\b[\s\S]*?<\/ext:UBLExtensions>\s*/g, '\n')
    .replace(/\s*<cac:Signature\b[\s\S]*?<\/cac:Signature>\s*/g, '\n')
    .replace(/\s*<ds:Signature\b[\s\S]*?<\/ds:Signature>\s*/g, '\n')
    .replace(/\n{3,}/g, '\n\n');
}

export function canonicalizeXml(
  xml: string,
  options?: XmlCanonicalizationOptions
): XmlCanonicalizationResult {
  assertXmlString(xml);

  const resolved = resolveOptions(options);
  let canonicalXml = xml.replace(/^\uFEFF/, '');

  if (resolved.normalizeLineEndings) {
    canonicalXml = canonicalXml.replace(/\r\n?/g, '\n');
  }

  if (resolved.omitXmlDeclaration) {
    canonicalXml = canonicalXml.replace(/^\s*<\?xml[\s\S]*?\?>\s*/i, '');
  }

  if (resolved.removeSignatureArtifacts) {
    canonicalXml = removeInvoiceSignatureArtifacts(canonicalXml);
  }

  if (resolved.trim) {
    canonicalXml = canonicalXml.trim();
  }

  return { canonicalXml };
}

function assertXmlString(xml: string): void {
  if (typeof xml !== 'string' || xml.trim().length === 0) {
    throw new Error('xml must be a non-empty string');
  }
}
