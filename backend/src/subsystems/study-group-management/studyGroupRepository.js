
import db from '../data-management/database.js';

//insert new study group into SQLite
const createStudyGroup = (group) => {
    const statement = db.prepare(`
        INSERT INTO study_groups (
            subject,
            meeting_time,
            location,
            max_size,
            expertise_level,
            study_preference,
            admin_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = statement.run(
        group.subject,
        group.meetingTime,
        group.location,
        group.maxSize,
        group.expertiseLevel,
        group.studyPreference,
        group.adminId
    );

    return db.prepare(
        'SELECT * FROM study_groups WHERE id = ?'
    ).get(result.lastInsertRowid);
};

//Retrieve all existing groups.
const getAllStudyGroups = () => {
    return db.prepare(
        'SELECT * FROM study_groups ORDER BY created_at DESC'
    ).all();
};

//Use group ID to retrieve one group
const getStudyGroupById = (id) => {
    return db.prepare(
        'SELECT * FROM study_groups WHERE id = ?'
    ).get(id);
};

export {
    createStudyGroup,
    getAllStudyGroups,
    getStudyGroupById
};
