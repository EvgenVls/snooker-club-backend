import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllExercises, getExerciseById } from './services/exercises.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello snooker',
    });
  });

  app.get('/exercises', async (req, res) => {
    const exercises = await getAllExercises();

    res.status(200).json({
      status: 200,
      data: exercises,
      message: 'All exercises are successfully completed.',
    });
  });

  app.get('/exercises/:exerciseId', async (req, res, next) => {
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
        message: error.message,
      });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Rote not foand',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
