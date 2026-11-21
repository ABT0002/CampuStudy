import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const defaultDbPath = path.resolve(currentDir, '../../../db/campustudy.sqlite');
const schemaPath = path.join(currentDir, 'schema.sql');

// DB_PATH lets tests use a separate database, such as ':memory:'.
const dbPath = process.env.DB_PATH ?? defaultDbPath;

// The db folder is not tracked by Git, so a fresh clone won't have it.
if (dbPath !== ':memory:') {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS study_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        meeting_time TEXT NOT NULL,
        location TEXT NOT NULL,
        max_size INTEGER NOT NULL CHECK (max_size > 1),
        expertise_level TEXT NOT NULL,
        study_preference TEXT NOT NULL,
        admin_id INTEGER NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

// SQLite leaves foreign key enforcement off unless each connection enables it.
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

// Create any missing tables. The schema uses IF NOT EXISTS, so this is safe on every start.
db.exec(fs.readFileSync(schemaPath, 'utf8'));

export { dbPath };
export default db;
