import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoDB = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pw = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pw}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    //mongodb+srv://EvgenV:<db_password>@cluster0.syo0mza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw err;
  }
};
