import express from 'express'

import {Router} from 'express'
import { generateQuestions} from '../controller/interview.controller.js';

const router = Router();

router.post("/generate-question", generateQuestions);

export default router;
























