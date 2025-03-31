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
    const { exerciseId } = req.params;
    const exercise = await getExerciseById(exerciseId);

    if (!exercise) {
      res.status(404).json({
        message: 'Exercise not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      data: exercise,
      message: 'The exercise will be successfully completed.',
    });
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
