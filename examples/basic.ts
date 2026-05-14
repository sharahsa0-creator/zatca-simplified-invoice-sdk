import { buildQRCodeBase64 } from '../src/index.js';

const qr = buildQRCodeBase64({
  sellerName: 'Sample Store',
  vatRegistrationNumber: '300000000000003',
  timestamp: '2025-01-01T00:00:00Z',
  invoiceTotal: '100.00',
  vatTotal: '15.00'
});

console.log(qr);
