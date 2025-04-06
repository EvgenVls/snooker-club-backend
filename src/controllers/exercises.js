import createHttpError from 'http-errors';

import {
  getAllExercises,
  getExerciseById,
  createExercise,
  deleteExercise,
  updateExercise,
} from '../services/exercises.js';

export const getExercisesController = async (req, res) => {
  const exercises = await getAllExercises();

  res.status(200).json({
    status: 200,
    data: exercises,
    message: 'All exercises are successfully completed.',
  });
};

export const getExerciseByIdController = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;

    const exercise = await getExerciseById(exerciseId);

    if (!exercise) {
      throw createHttpError(404, `Exercise with id=${exerciseId} not found`);
    }

    res.status(200).json({
      status: 200,
      data: exercise,
      message: `The exercise with id=${exerciseId} was found successfully.`,
    });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    const { status = 500 } = error;
    res.status(status).json({
      status,
      message: error.message,
    });
  }
};

export const creteExerciseController = async (req, res) => {
  const exercise = await createExercise(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created an exercise',
    data: exercise,
  });
};

export const deleteExerciseController = async (req, res, next) => {
  const { exerciseId } = req.params;

  const exercise = await deleteExercise(exerciseId);

  if (!exercise) {
    throw createHttpError(404, `Exercise with id=${exerciseId} not found`);
  }

  res.status(204).json({
    status: 204,
    message: `Exercise with id=${exerciseId} was deleted successfully.`,
  });
};

export const upsertExerciseController = async (req, res, next) => {
  const { exerciseId } = req.params;

  const result = await updateExercise(exerciseId, req.body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Exercise not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Exercise with id=${exerciseId} was upserted successfully`,
    data: result.exercise,
  });
};

export const patchExerciseController = async (req, res, next) => {
  const { exerciseId } = req.params;

  const result = await updateExercise(exerciseId, req.body);

  if (!result) {
    next(createHttpError(404, 'Exercise not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Exercise with id=${exerciseId} was patched sccessfully`,
    data: res.exercise,
  });
};
