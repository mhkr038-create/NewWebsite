import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and verification code are required.' }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER || 'mhkr038@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    // If Gmail App Password is configured, dispatch real email
    if (gmailPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      const mailOptions = {
        from: `"Digital Simple Solution Security" <${gmailUser}>`,
        to: email,
        subject: `🔐 Your Admin Password Reset Code: ${code}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #ffffff; padding: 40px 20px; text-align: center;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 32px;">
              <h2 style="color: #38bdf8; margin-top: 0;">Password Reset Request</h2>
              <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
                You requested a password reset for the <strong>digitalsimplesolution</strong> Administrator Portal.
              </p>
              <p style="color: #9ca3af; font-size: 13px;">Use the 6-digit security verification code below:</p>
              
              <div style="background-color: #030712; border: 1px solid #0284c7; border-radius: 12px; padding: 18px; margin: 24px 0; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #38bdf8; font-family: monospace;">
                ${code}
              </div>

              <p style="color: #6b7280; font-size: 12px; margin-bottom: 0;">
                This code is valid for <strong>10 minutes</strong>. If you did not initiate this request, you can safely ignore this email.
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: `Verification code sent to ${email}` });
    }

    // Fallback if environment variable not set yet
    console.log(`[AUTH CODE DISPATCHED TO ${email}]: ${code}`);
    return NextResponse.json({ 
      success: true, 
      simulated: true,
      message: `Code generated for ${email}. Set GMAIL_APP_PASSWORD in .env.local to send live emails.` 
    });
  } catch (error: any) {
    console.error('Failed to send reset email:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to dispatch email via Gmail SMTP.' },
      { status: 500 }
    );
  }
}
