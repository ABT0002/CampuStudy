
import * as studyGroupRepository from './studyGroupRepository.js';

const createStudyGroup = (group, userId) => {
    // Check required fields
    const requiredFields = [
        'subject',
        'meetingTime',
        'location',
        'expertiseLevel',
        'studyPreference'
    ];

    for (const field of requiredFields) {
        if (
            typeof group[field] !== 'string' ||
            group[field].trim() === ''
        ) {
            throw new Error(`${field} is required.`);
        }
    }

    // Validate maximum group size
    if (
        !Number.isInteger(group.maxSize) ||
        group.maxSize <= 1
    ) {
        throw new Error(
            'Maximum group size must be an integer greater than 1.'
        );
    }

    // Ensure the user is identified
    if (!Number.isInteger(userId)) {
        throw new Error('A valid signed-in user is required.');
    }

    // Create the group and assign its creator as administrator
    return studyGroupRepository.createStudyGroup({
        ...group,
        subject: group.subject.trim(),
        meetingTime: group.meetingTime.trim(),
        location: group.location.trim(),
        expertiseLevel: group.expertiseLevel.trim(),
        studyPreference: group.studyPreference.trim(),
        adminId: userId
    });
};

const getAllStudyGroups = () => {
    return studyGroupRepository.getAllStudyGroups();
};

const getStudyGroupById = (id) => {
    return studyGroupRepository.getStudyGroupById(id);
};

export {
    createStudyGroup,
    getAllStudyGroups,
    getStudyGroupById
};
