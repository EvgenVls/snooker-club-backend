import { Router } from 'express';

import {
  getExercisesController,
  getExerciseByIdController,
  creteExerciseController,
  deleteExerciseController,
} from '../controllers/exercises.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/exercises', ctrlWrapper(getExercisesController));

router.get('/exercises/:exerciseId', ctrlWrapper(getExerciseByIdController));

router.post('/exercises', ctrlWrapper(creteExerciseController));

router.delete('/exercise/:exerciseId', ctrlWrapper(deleteExerciseController));

export default router;
