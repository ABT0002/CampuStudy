// Creates the database file and its tables. Run with: npm run db:init
import db, { dbPath } from './database.js';

const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
    .pluck()
    .all();

console.log(`Database ready at ${dbPath}`);
console.log(`Tables: ${tables.join(', ')}`);

db.close();
