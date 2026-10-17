import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;
let isInitialized = false;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'u297792138_zeroltaman',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'u297792138_zerolt',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000,
    });
  }
  return pool;
}

export async function initDatabase() {
  if (isInitialized) return;
  try {
    const db = getDbPool();
    // 1. Create contact_leads table
    await db.query(`
      CREATE TABLE IF NOT EXISTS contact_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        platforms TEXT,
        budget VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Create leadspark_waitlist table
    await db.query(`
      CREATE TABLE IF NOT EXISTS leadspark_waitlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    isInitialized = true;
    console.log('[MySQL] Database tables verified & initialized successfully.');
  } catch (error) {
    console.warn('[MySQL] Auto-initialization warning (check DB connection & password):', (error as Error).message);
  }
}
