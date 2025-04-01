import { getAllExercises, getExerciseById } from '../services/exercises.js';

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
      res.status(404).json({
        status: 404,
        message: `Exercise with id=${exerciseId} not found`,
      });
      return;
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
