import { NextRequest, NextResponse } from 'next/server';
import { getDbPool, initDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Store in MySQL database (both waitlist and contact_leads for CRM tracking)
    try {
      await initDatabase();
      const db = getDbPool();

      await db.execute(
        `INSERT IGNORE INTO leadspark_waitlist (email) VALUES (?)`,
        [normalizedEmail]
      );

      await db.execute(
        `INSERT INTO contact_leads (name, email, phone, platforms, budget, message) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          'Newsletter Subscriber',
          normalizedEmail,
          'Newsletter',
          'Zerolt Insights Newsletter',
          'Subscriber',
          `New subscription to Zerolt Insights newsletter for zerolthelp@gmail.com. Subscriber email: ${normalizedEmail}`,
        ]
      );
    } catch (dbErr) {
      console.warn('[API /api/waitlist] Database save warning (proceeding with email notification):', dbErr);
    }

    // 2. Dispatch notification to Hostinger intake endpoint so zerolthelp@gmail.com is notified
    try {
      const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
      let payload = '';
      payload += '--' + boundary + '\r\n';
      payload += 'Content-Disposition: form-data; name="name"\r\n\r\nNewsletter Subscriber\r\n';
      payload += '--' + boundary + '\r\n';
      payload += `Content-Disposition: form-data; name="email"\r\n\r\n${normalizedEmail}\r\n`;
      payload += '--' + boundary + '\r\n';
      payload += 'Content-Disposition: form-data; name="phone"\r\n\r\nNewsletter\r\n';
      payload += '--' + boundary + '\r\n';
      payload += 'Content-Disposition: form-data; name="company"\r\n\r\nZerolt Insights\r\n';
      payload += '--' + boundary + '\r\n';
      payload += `Content-Disposition: form-data; name="notes"\r\n\r\nNewsletter subscription for Zerolt Insights. Send notifications to zerolthelp@gmail.com. Subscriber: ${normalizedEmail}\r\n`;
      payload += '--' + boundary + '--\r\n';

      await fetch('https://wheat-raccoon-340819.hostingersite.com/api/v1/forms/form-1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
        body: payload,
      }).catch(err => console.warn('[Hostinger Form Trigger Warning]:', err));
    } catch (notifyErr) {
      console.warn('[Hostinger Forward Warning]:', notifyErr);
    }

    return NextResponse.json({
      success: true,
      message: `You're on the VIP waitlist! We dispatched early beta details to ${normalizedEmail}.`,
    });
  } catch (error) {
    console.error('[API /api/waitlist] Error adding waitlist email:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to join waitlist.',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
