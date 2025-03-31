import { Schema, model } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Exercise = model('exercise', exerciseSchema);
