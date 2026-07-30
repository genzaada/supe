export function getRegistrationConfirmationTemplate(data: {
  fullName: string;
  registrationId: string;
  eventName: string;
  venue: string;
  eventDate: string;
  reportingTime: string;
  amount: number;
  razorpayPaymentId?: string;
  attendanceUrl: string;
}): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Congratulations! Supernova 2026 Event Registration & Payment Receipt</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #030712; color: #f8fafc; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #0a0f1e; border: 1px solid #06b6d4; border-radius: 16px; padding: 32px; box-shadow: 0 0 30px rgba(6,182,212,0.2);">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="color: #06b6d4; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; font-family: monospace;">SUPERNOVA 2026 • OFFICIAL EVENT TICKET & RECEIPT</span>
        <h1 style="color: #ffffff; margin-top: 10px; font-size: 24px; font-weight: 800;">🎉 Congratulations, ${data.fullName}!</h1>
        <p style="color: #22d3ee; font-size: 16px; font-weight: bold; margin-top: 4px;">
          You have successfully registered for Supernova 2026 - <span style="color: #a855f7;">${data.eventName}</span>!
        </p>
      </div>

      <!-- Registration ID Box -->
      <div style="background-color: #030712; border: 1px solid #06b6d4; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
        <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block;">Official Registration ID</span>
        <div style="font-size: 26px; font-family: monospace; font-weight: bold; color: #06b6d4; margin-top: 4px;">${data.registrationId}</div>
      </div>

      <!-- Event Details Breakdown -->
      <h3 style="color: #ffffff; font-size: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 8px; margin-top: 24px;">Event Details</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #94a3b8;">Competition / Event:</td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: bold; text-align: right;">${data.eventName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8;">Event Date:</td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: bold; text-align: right;">${data.eventDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8;">Venue:</td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: bold; text-align: right;">${data.venue}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8;">Reporting Time:</td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: bold; text-align: right;">${data.reportingTime}</td>
        </tr>
      </table>

      <!-- Payment Receipt Section -->
      <h3 style="color: #ffffff; font-size: 16px; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">Official Payment Receipt</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #030712; border-radius: 8px; padding: 12px; margin-top: 12px;">
        <tr>
          <td style="padding: 10px; color: #94a3b8;">Registration Fee Paid:</td>
          <td style="padding: 10px; color: #22c55e; font-weight: bold; font-size: 16px; text-align: right;">₹${data.amount} INR</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #94a3b8;">Payment Status:</td>
          <td style="padding: 10px; color: #22c55e; font-weight: bold; text-align: right;">COMPLETED ✔</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #94a3b8;">Transaction ID:</td>
          <td style="padding: 10px; color: #94a3b8; font-family: monospace; text-align: right;">${data.razorpayPaymentId || `PAY-${data.registrationId}`}</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #94a3b8;">Issued Date:</td>
          <td style="padding: 10px; color: #94a3b8; text-align: right;">${new Date().toLocaleDateString('en-IN')}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 32px;">
        <a href="${data.attendanceUrl}" style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: #030712; font-weight: bold; font-family: monospace; text-decoration: none; padding: 14px 28px; border-radius: 10px; display: inline-block;">
          CHECK ATTENDANCE SCAN DESK
        </a>
      </div>

      <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 32px; border-t: 1px solid #1e293b; padding-top: 16px;">
        Supernova 2026 • National Technical Fest Paradigm. Please keep this email receipt for your records.
      </p>
    </div>
  </body>
  </html>
  `;
}
