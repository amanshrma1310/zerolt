import { NextRequest, NextResponse } from 'next/server';
import { getDbPool, initDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, platforms, budget, message } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    await initDatabase();
    const db = getDbPool();

    const platformsString = Array.isArray(platforms) ? platforms.join(', ') : (platforms || '');

    const [result] = await db.execute(
      `INSERT INTO contact_leads (name, email, phone, platforms, budget, message) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name || 'Anonymous',
        email.trim().toLowerCase(),
        phone || '',
        platformsString,
        budget || 'Not specified',
        message || '',
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your project request has been stored and a builder will reply within 4 hours.',
      id: (result as any).insertId || null,
    });
  } catch (error) {
    console.error('[API /api/contact] Error inserting lead:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process inquiry. Please check database connection.',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
