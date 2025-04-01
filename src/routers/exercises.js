import { Router } from 'express';

import {
  getExercisesController,
  getExerciseByIdController,
} from '../controllers/exercises.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/exercises', ctrlWrapper(getExercisesController));

router.get('/exercises/:exerciseId', ctrlWrapper(getExerciseByIdController));

export default router;
