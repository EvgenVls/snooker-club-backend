import { Exercise } from '../db/models/Exercise.js';

export const getAllExercises = async () => {
  const exercises = await Exercise.find();
  return exercises;
};

export const getExerciseById = async (exerciseId) => {
  const exercise = await Exercise.findById(exerciseId);
  return exercise;
};

export const createExercise = async (payload) => {
  const exercise = await Exercise.create(payload);
  return exercise;
};

export const deleteExercise = async (exerciseId) => {
  const exercise = await Exercise.findOneAndDelete({
    _id: exerciseId,
  });
  return exercise;
};
