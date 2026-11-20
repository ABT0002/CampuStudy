
import express from 'express';
import * as studyGroupController from './studyGroupController.js';

const router = express.Router();

// Create a study group
router.post('/', studyGroupController.createStudyGroup);

// Retrieve all study groups
router.get('/', studyGroupController.getAllStudyGroups);

// Retrieve one study group by ID
router.get('/:id', studyGroupController.getStudyGroupById);

export default router;
