import QRCode from 'qrcode';

export async function generateQRCodeDataURL(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    margin: 2,
    color: {
      dark: '#06b6d4',
      light: '#0b0f19',
    },
  });
}
