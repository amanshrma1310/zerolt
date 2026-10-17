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

    await initDatabase();
    const db = getDbPool();

    const normalizedEmail = email.trim().toLowerCase();
    await db.execute(
      `INSERT IGNORE INTO leadspark_waitlist (email) VALUES (?)`,
      [normalizedEmail]
    );

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
