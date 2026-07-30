export function getCertificateNotificationTemplate(data: {
  fullName: string;
  eventName: string;
  certificateNo: string;
  downloadUrl: string;
}): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Certificate Issued - Supernova 2027</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #f8fafc; margin: 0; padding: 20px;">
    <div style="max-w: 600px; margin: 0 auto; background: #13192b; border: 1px solid #1e293b; border-radius: 16px; padding: 32px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="color: #eab308; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">SUPERNOVA 2027 • OFFICIAL CERTIFICATE</span>
        <h2 style="color: #ffffff; margin-top: 8px; font-size: 24px;">Congratulations, ${data.fullName}!</h2>
      </div>

      <p style="color: #94a3b8; font-size: 15px;">Your official certificate for participating in <strong>${data.eventName}</strong> has been generated.</p>

      <div style="background-color: #0b0f19; border: 1px solid #eab308; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase;">Certificate Serial Number</div>
        <div style="font-size: 20px; font-family: monospace; font-weight: bold; color: #eab308; margin-top: 4px;">${data.certificateNo}</div>
      </div>

      <div style="text-align: center; margin-top: 32px;">
        <a href="${data.downloadUrl}" style="background: linear-gradient(135deg, #eab308, #f97316); color: #090d16; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 10px; display: inline-block;">
          Download PDF Certificate
        </a>
      </div>

      <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 32px;">
        Supernova 2027 Committee. Keep this certificate for your academic & professional portfolio.
      </p>
    </div>
  </body>
  </html>
  `;
}
