// Tests database initialization and connectivity. Run with: npm test
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const initScript = path.resolve(testsDir, '../subsystems/data-management/initDb.js');
const expectedTables = ['group_memberships', 'invitations', 'study_groups', 'users'];

describe('npm run db:init', () => {
    let tempDir;
    let dbPath;

    // Runs the init script the same way `npm run db:init` does, against a throwaway file.
    const runInit = () =>
        execFileSync(process.execPath, [initScript], {
            env: { ...process.env, DB_PATH: dbPath },
            encoding: 'utf8',
        });

    before(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'campustudy-db-'));
        // A missing parent folder checks that init creates it, like on a fresh clone.
        dbPath = path.join(tempDir, 'db', 'campustudy.sqlite');
    });

    after(() => {
        fs.rmSync(tempDir, { recursive: true, force: true });
    });

    test('creates the database file and all tables on a fresh setup', () => {
        const output = runInit();

        assert.ok(fs.existsSync(dbPath), 'database file should exist');
        assert.match(output, new RegExp(`Tables: ${expectedTables.join(', ')}`));
    });

    test('is safe to run again and keeps existing data', async () => {
        const { default: Database } = await import('better-sqlite3');
        const db = new Database(dbPath);
        db.prepare("INSERT INTO users (email, display_name) VALUES ('keep@pitt.edu', 'Keep')").run();
        db.close();

        runInit();

        const reopened = new Database(dbPath, { readonly: true });
        const count = reopened.prepare('SELECT count(*) FROM users').pluck().get();
        reopened.close();
        assert.equal(count, 1);
    });
});

describe('database connection', () => {
    let db;

    before(async () => {
        // Must be set before database.js is imported, so tests never touch the real database.
        process.env.DB_PATH = ':memory:';
        ({ default: db } = await import('../subsystems/data-management/database.js'));
    });

    after(() => {
        db.close();
    });

    test('opens and answers queries', () => {
        assert.equal(db.open, true);
        assert.equal(db.prepare('SELECT 1').pluck().get(), 1);
    });

    test('has foreign key enforcement turned on', () => {
        assert.equal(db.pragma('foreign_keys', { simple: true }), 1);
    });

    test('has every expected table', () => {
        const tables = db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
            .pluck()
            .all();
        assert.deepEqual(tables, expectedTables);
    });

    test('can write and read back a full group workflow', () => {
        const addUser = db.prepare('INSERT INTO users (email, display_name) VALUES (?, ?)');
        const admin = addUser.run('admin@pitt.edu', 'Admin').lastInsertRowid;
        const student = addUser.run('student@pitt.edu', 'Student').lastInsertRowid;

        const group = db
            .prepare(
                `INSERT INTO study_groups (subject, location, max_size, created_by)
                 VALUES ('CS 1530', 'Hillman Library', 5, ?)`
            )
            .run(admin).lastInsertRowid;
        db.prepare("INSERT INTO group_memberships (group_id, user_id, role) VALUES (?, ?, 'admin')").run(group, admin);

        // Admin invites the student, the student accepts, and the group shows up in their joined list.
        const invite = db
            .prepare("INSERT INTO invitations (group_id, user_id, sent_by, kind) VALUES (?, ?, ?, 'invite')")
            .run(group, student, admin).lastInsertRowid;
        db.prepare("UPDATE invitations SET status = 'accepted', responded_at = datetime('now') WHERE id = ?").run(invite);
        db.prepare('INSERT INTO group_memberships (group_id, user_id) VALUES (?, ?)').run(group, student);

        const joined = db
            .prepare(
                `SELECT g.subject FROM study_groups g
                 JOIN group_memberships m ON m.group_id = g.id
                 WHERE m.user_id = ?`
            )
            .pluck()
            .all(student);
        assert.deepEqual(joined, ['CS 1530']);
    });

    test('rejects invalid study groups', () => {
        const insert = (subject, location, maxSize) => () =>
            db.prepare('INSERT INTO study_groups (subject, location, max_size) VALUES (?, ?, ?)').run(subject, location, maxSize);

        assert.throws(insert('', 'Hillman', 4), /CHECK constraint failed/, 'blank subject');
        assert.throws(insert('Math', null, 4), /NOT NULL constraint failed/, 'missing location');
        assert.throws(insert('Math', 'Hillman', 1), /CHECK constraint failed/, 'size of one');
        assert.throws(insert('Math', 'Hillman', 2.5), /cannot store REAL value/, 'non-integer size');
    });

    test('rejects a second pending invitation for the same user and group', () => {
        const group = db.prepare("INSERT INTO study_groups (subject, location, max_size) VALUES ('Bio', 'Benedum', 3)").run().lastInsertRowid;
        const user = db.prepare("INSERT INTO users (email, display_name) VALUES ('dup@pitt.edu', 'Dup')").run().lastInsertRowid;
        const request = db.prepare("INSERT INTO invitations (group_id, user_id, sent_by, kind) VALUES (?, ?, ?, 'request')");

        request.run(group, user, user);
        assert.throws(() => request.run(group, user, user), /UNIQUE constraint failed/);
    });

    test('rejects rows that point at missing users or groups', () => {
        assert.throws(
            () => db.prepare('INSERT INTO group_memberships (group_id, user_id) VALUES (9999, 9999)').run(),
            /FOREIGN KEY constraint failed/
        );
    });
});
