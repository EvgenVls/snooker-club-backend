import { Exercise } from '../db/models/Exercise.js';

export const getAllExercises = async () => {
  const exercises = await Exercise.find();
  return exercises;
};

export const getExerciseById = async (exerciseId) => {
  const exercise = await Exercise.findById(exerciseId);
  return exercise;
};
