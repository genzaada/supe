import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export class PdfService {
  static async generateCertificatePDF(data: {
    fullName: string;
    eventName: string;
    eventDate: string;
    college: string;
    certificateNo: string;
  }): Promise<Uint8Array> {
    // A4 Landscape dimensions: 841.89 x 595.28 points
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([841.89, 595.28]);
    const { width, height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Color Palette
    const bgDark = rgb(0.043, 0.058, 0.098); // #0b0f19
    const goldColor = rgb(0.917, 0.701, 0.031); // #eab308
    const cyanColor = rgb(0.023, 0.713, 0.831); // #06b6d4
    const whiteColor = rgb(0.972, 0.98, 0.988); // #f8fafc
    const textMuted = rgb(0.58, 0.639, 0.721); // #94a3b8

    // Background fill
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: bgDark,
    });

    // Outer Decorative Gold Border
    page.drawRectangle({
      x: 20,
      y: 20,
      width: width - 40,
      height: height - 40,
      borderColor: goldColor,
      borderWidth: 3,
    });

    // Inner Decorative Cyan Border
    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderColor: cyanColor,
      borderWidth: 1,
    });

    // Top Header: Festival Title
    const festTitle = 'SUPERNOVA 2027';
    const festTitleWidth = fontBold.widthOfTextAtSize(festTitle, 28);
    page.drawText(festTitle, {
      x: (width - festTitleWidth) / 2,
      y: height - 85,
      size: 28,
      font: fontBold,
      color: cyanColor,
    });

    const festSub = 'NATIONAL LEVEL TECHNICAL FESTIVAL';
    const festSubWidth = fontRegular.widthOfTextAtSize(festSub, 11);
    page.drawText(festSub, {
      x: (width - festSubWidth) / 2,
      y: height - 105,
      size: 11,
      font: fontRegular,
      color: textMuted,
    });

    // Certificate Title
    const certTitle = 'CERTIFICATE OF MERIT & PARTICIPATION';
    const certTitleWidth = fontBold.widthOfTextAtSize(certTitle, 22);
    page.drawText(certTitle, {
      x: (width - certTitleWidth) / 2,
      y: height - 160,
      size: 22,
      font: fontBold,
      color: goldColor,
    });

    // "This is proudly presented to"
    const presText = 'This certificate is proudly awarded to';
    const presTextWidth = fontRegular.widthOfTextAtSize(presText, 14);
    page.drawText(presText, {
      x: (width - presTextWidth) / 2,
      y: height - 210,
      size: 14,
      font: fontOblique,
      color: textMuted,
    });

    // Participant Name (Large Accent Text)
    const nameText = data.fullName.toUpperCase();
    const nameWidth = fontBold.widthOfTextAtSize(nameText, 32);
    page.drawText(nameText, {
      x: (width - nameWidth) / 2,
      y: height - 260,
      size: 32,
      font: fontBold,
      color: whiteColor,
    });

    // Underline accent bar
    page.drawLine({
      start: { x: (width - 350) / 2, y: height - 275 },
      end: { x: (width + 350) / 2, y: height - 275 },
      thickness: 2,
      color: cyanColor,
    });

    // Body Paragraph
    const collegeStr = data.college ? ` representing ${data.college}` : '';
    const bodyText = `for actively participating in the national event "${data.eventName}"${collegeStr} held during Supernova 2027.`;
    const bodyWidth = fontRegular.widthOfTextAtSize(bodyText, 13);
    page.drawText(bodyText, {
      x: (width - bodyWidth) / 2,
      y: height - 320,
      size: 13,
      font: fontRegular,
      color: textMuted,
    });

    // Serial No & Date Stamp
    page.drawText(`Serial No: ${data.certificateNo}`, {
      x: 50,
      y: 60,
      size: 10,
      font: fontRegular,
      color: textMuted,
    });

    page.drawText(`Issued Date: ${data.eventDate}`, {
      x: 50,
      y: 45,
      size: 10,
      font: fontRegular,
      color: textMuted,
    });

    // Committee Heads Signatures Block
    const heads = ['Diya Chuphal', 'Richa Bagdiya', 'Hitesh Phule'];
    const startX = width - 420;
    const spacing = 130;

    heads.forEach((head, index) => {
      const posX = startX + index * spacing;
      // Signature line
      page.drawLine({
        start: { x: posX, y: 75 },
        end: { x: posX + 100, y: 75 },
        thickness: 1,
        color: goldColor,
      });

      page.drawText(head, {
        x: posX,
        y: 60,
        size: 10,
        font: fontBold,
        color: whiteColor,
      });

      page.drawText('Committee Head', {
        x: posX,
        y: 46,
        size: 8,
        font: fontRegular,
        color: textMuted,
      });
    });

    return pdfDoc.save();
  }
}
