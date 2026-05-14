export interface SimplifiedInvoiceInput {
  sellerName: string;
  vatNumber: string;
  timestamp: Date | string;
  invoiceTotal: number;
  vatTotal: number;
}

export interface QrPayloadResult {
  base64: string;
  tlv: Uint8Array;
}
