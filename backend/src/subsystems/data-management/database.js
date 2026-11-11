import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const defaultDbPath = path.resolve(currentDir, '../../../db/campustudy.sqlite');

// DB_PATH lets tests use a separate database, such as ':memory:'.
const dbPath = process.env.DB_PATH ?? defaultDbPath;

// The db folder is not tracked by Git, so a fresh clone won't have it.
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// SQLite leaves foreign key enforcement off unless each connection enables it.
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

export default db;
