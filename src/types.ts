export interface ZatcaTLVField {
  tag: number;
  value: string;
}

export interface ZatcaQRCodeData {
  sellerName: string;
  vatRegistrationNumber: string;
  timestamp: string;
  invoiceTotal: string;
  vatTotal: string;

  invoiceHash?: string;
  ecdsaSignature?: string;
  ecdsaPublicKey?: string;
  zatcaSignature?: string;
}
