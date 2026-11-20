
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
    db.prepare('DELETE FROM study_groups').run();
});

test('A valid study group can be created', () => {
    const group = studyGroupService.createStudyGroup({
        subject: 'CS 1530',
        meetingTime: 'Tuesday 3:00 PM',
        location: 'Hillman Library',
        maxSize: 5,
        expertiseLevel: 'Intermediate',
        studyPreference: 'In-person'
    }, 12);

    assert.equal(group.subject, 'CS 1530');
    assert.equal(group.location, 'Hillman Library');
    assert.equal(group.max_size, 5);
    assert.equal(group.admin_id, 12);
});

test('A study group cannot be created without a location', () => {
    assert.throws(() => {
        studyGroupService.createStudyGroup({
            subject: 'CS 1530',
            meetingTime: 'Tuesday 3:00 PM',
            location: '',
            maxSize: 5,
            expertiseLevel: 'Intermediate',
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
            expertiseLevel: 'Intermediate',
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
            expertiseLevel: 'Intermediate',
            studyPreference: 'In-person'
        }, 12);
    }, /subject is required/);
});
