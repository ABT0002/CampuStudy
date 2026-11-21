import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Use a temporary in-memory database for testing.
process.env.DB_PATH = ':memory:';

// Import after setting DB_PATH.
const { default: db } = await import(
    '../subsystems/data-management/database.js'
);

const studyGroupService = await import(
    '../subsystems/study-group-management/studyGroupService.js'
);

beforeEach(() => {
    db.prepare('DELETE FROM group_memberships').run();
    db.prepare('DELETE FROM study_groups').run();
    db.prepare('DELETE FROM users').run();

    // Create a test user with ID 12
    db.prepare(`
        INSERT INTO users (id, email, display_name)
        VALUES (12, 'test@example.com', 'Test Student')`).run();
});


test('A valid study group can be created', () => {
    const group = studyGroupService.createStudyGroup({
        subject: 'CS 1530',
        meetingTime: 'Tuesday 3:00 PM',
        location: 'Hillman Library',
        maxSize: 5,
        expertiseLevel: 'intermediate',
        studyPreference: 'In-person'
    }, 12);

    assert.equal(group.subject, 'CS 1530');
    assert.equal(group.location, 'Hillman Library');
    assert.equal(group.max_size, 5);
    assert.equal(group.created_by, 12);

    const membership = db.prepare(`
        SELECT * FROM group_memberships
        WHERE group_id = ? AND user_id = ?`).get(group.id, 12);

    assert.ok(membership);
    assert.equal(membership.role, 'admin');
});

test('A study group cannot be created without a location', () => {
    assert.throws(() => {
        studyGroupService.createStudyGroup({
            subject: 'CS 1530',
            meetingTime: 'Tuesday 3:00 PM',
            location: '',
            maxSize: 5,
            expertiseLevel: 'intermediate',
            studyPreference: 'In-person'
        }, 12);
    }, /location is required/);
});

test('A study group cannot have a maximum size of 1', () => {
    assert.throws(() => {
        studyGroupService.createStudyGroup({
            subject: 'CS 1530',
            meetingTime: 'Tuesday 3:00 PM',
            location: 'Hillman Library',
            maxSize: 1,
            expertiseLevel: 'intermediate',
            studyPreference: 'In-person'
        }, 12);
    }, /integer greater than 1/);
});

test('A study group cannot be created without a subject', () => {
    assert.throws(() => {
        studyGroupService.createStudyGroup({
            subject: '',
            meetingTime: 'Tuesday 3:00 PM',
            location: 'Hillman Library',
            maxSize: 5,
            expertiseLevel: 'intermediate',
            studyPreference: 'In-person'
        }, 12);
    }, /subject is required/);
});
