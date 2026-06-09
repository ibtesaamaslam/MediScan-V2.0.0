import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export function getDb() {
  if (!db) {
    db = SQLite.openDatabaseSync('mediscan.db');
    db.execSync(`
      CREATE TABLE IF NOT EXISTS screening_results (
        id TEXT PRIMARY KEY,
        condition_name TEXT NOT NULL,
        confidence REAL NOT NULL,
        recommendation TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
  return db;
}

export async function saveScreeningResult(result: {
  id: string;
  condition_name: string;
  confidence: number;
  recommendation: string;
}) {
  const database = getDb();
  await database.runAsync(
    `INSERT INTO screening_results (id, condition_name, confidence, recommendation) VALUES (?, ?, ?, ?)`,
    [result.id, result.condition_name, result.confidence, result.recommendation]
  );
}
