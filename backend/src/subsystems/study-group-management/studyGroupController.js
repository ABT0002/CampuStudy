
import * as studyGroupService from './studyGroupService.js';

const createStudyGroup = (req, res) => {
    // The authenticated user must be available on the request.
    const userId = req.user?.id;

    if (!Number.isInteger(userId)) {
        return res.status(401).json({
            error: 'You must be signed in to create a study group.'
        });
    }

    try {
        const studyGroup = studyGroupService.createStudyGroup(
            req.body,
            userId
        );

        return res.status(201).json({
            message: 'Study group created successfully.',
            studyGroup
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

const getAllStudyGroups = (req, res) => {
    try {
        const groups = studyGroupService.getAllStudyGroups();

        return res.status(200).json({
            studyGroups: groups
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Unable to retrieve study groups.'
        });
    }
};

const getStudyGroupById = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'A valid study group ID is required.'
        });
    }

    try {
        const group = studyGroupService.getStudyGroupById(id);

        if (!group) {
            return res.status(404).json({
                error: 'Study group not found.'
            });
        }

        return res.status(200).json({
            studyGroup: group
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Unable to retrieve the study group.'
        });
    }
};

export {
    createStudyGroup,
    getAllStudyGroups,
    getStudyGroupById
};
