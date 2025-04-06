import { Router } from 'express';

import {
  getExercisesController,
  getExerciseByIdController,
  creteExerciseController,
  deleteExerciseController,
  upsertExerciseController,
  patchExerciseController,
} from '../controllers/exercises.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/exercises', ctrlWrapper(getExercisesController));

router.get('/exercises/:exerciseId', ctrlWrapper(getExerciseByIdController));

router.post('/exercises', ctrlWrapper(creteExerciseController));

router.delete('/exercises/:exerciseId', ctrlWrapper(deleteExerciseController));

router.put('/exercises/:exerciseId', ctrlWrapper(upsertExerciseController));

router.patch('/exercises/:exerciseId', ctrlWrapper(patchExerciseController));

export default router;
