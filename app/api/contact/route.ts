import { NextRequest, NextResponse } from 'next/server';
import { getDbPool, initDatabase } from '@/lib/db';

const sanitize = (val: unknown) => (typeof val === 'string' ? val.replace(/<[^>]*>/g, '').trim() : '');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Bot Honeypot Trap Check
    if (body._zerolt_shield_trap || body._gotcha) {
      console.warn('[API /api/contact] Bot trap triggered. Dropping request.');
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has been received.',
      });
    }

    const { name, email, phone, platforms, budget, message, company } = body;

    const cleanEmail = sanitize(email).toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanName = sanitize(name);
    const cleanPhone = sanitize(phone);
    const cleanCompany = sanitize(company);
    const cleanBudget = sanitize(budget);
    const cleanMessage = sanitize(message);
    const platformsString = Array.isArray(platforms)
      ? platforms.map(p => sanitize(p)).join(', ')
      : sanitize(platforms);

    // 2. Server-side forwarding to zerolthelp@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/zerolthelp@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Full Name': cleanName || 'Anonymous',
          'Work Email': cleanEmail,
          'Phone / WhatsApp': cleanPhone || 'Not provided',
          'Company Name': cleanCompany || 'Not provided',
          'Selected Platforms': platformsString || 'General',
          'Budget Range': cleanBudget || 'Not specified',
          'Requirements / Scope': cleanMessage || 'General Consultation Request',
          'Security Status': 'VERIFIED HUMAN (Clean Sanitized Intake)',
          'Submission Timestamp': new Date().toLocaleString(),
          _subject: `⚡ [Zerolt Contact API]: New Inquiry from ${cleanName || cleanEmail}`,
          _replyto: cleanEmail,
          _template: 'table',
          _captcha: 'false',
        }),
      }).catch(err => {
        console.warn('[API /api/contact] Email dispatch notice:', err);
      });
    } catch {}

    // 3. Optional Local MySQL Database Storage
    let dbInsertId = null;
    try {
      await initDatabase();
      const db = getDbPool();

      const [result] = await db.execute(
        `INSERT INTO contact_leads (name, email, phone, platforms, budget, message) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          cleanName || 'Anonymous',
          cleanEmail,
          cleanPhone || '',
          platformsString,
          cleanBudget || 'Not specified',
          cleanMessage || '',
        ]
      );
      dbInsertId = (result as any).insertId || null;
    } catch (dbErr) {
      console.warn('[API /api/contact] Database storage fallback (email delivered):', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your project request has been secured and sent. A specialist will reply shortly.',
      id: dbInsertId,
    });
  } catch (error) {
    console.error('[API /api/contact] Error processing inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process inquiry. Please check connection.',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
