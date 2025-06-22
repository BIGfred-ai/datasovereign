// Generate QR codes for DataSovereign Final MVP

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// URL of the deployed DataSovereign Final MVP
const websiteUrl = 'https://ulgwvahq.manus.space';

// Output directory for QR codes
const outputDir = path.join(__dirname, 'qr-codes');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate standard QR code (1000x1000px)
QRCode.toFile(
  path.join(outputDir, 'datasovereign-qrcode.png'),
  websiteUrl,
  {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1000,
    margin: 4,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  },
  function(err) {
    if (err) throw err;
    console.log('Standard QR code generated successfully');
  }
);

// Generate Impact10X branded QR code (800x800px)
QRCode.toFile(
  path.join(outputDir, 'datasovereign-impact10x-qrcode.png'),
  websiteUrl,
  {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 800,
    margin: 4,
    color: {
      dark: '#6200ea', // Primary color from the DataSovereign theme
      light: '#ffffff'
    }
  },
  function(err) {
    if (err) throw err;
    console.log('Impact10X branded QR code generated successfully');
  }
);

// Generate presentation-ready QR code (600x600px)
QRCode.toFile(
  path.join(outputDir, 'datasovereign-presentation-qrcode.png'),
  websiteUrl,
  {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 600,
    margin: 4,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  },
  function(err) {
    if (err) throw err;
    console.log('Presentation-ready QR code generated successfully');
  }
);

console.log('QR code generation process complete');
