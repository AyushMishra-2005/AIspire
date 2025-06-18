import express from 'express'

import {Router} from 'express'
import { generateQuestions, checkRoleAndTopic} from '../controller/interview.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const router = Router();

router.post("/generate-question", secureRoute, generateQuestions);
router.post("/checkRoleAndTopic", secureRoute, checkRoleAndTopic);

export default router;
























