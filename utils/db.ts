import mongoose, { ConnectOptions } from 'mongoose';
import { DB_URL } from '../config';

const isConnected = false;

export const connectToDb = async () => {
  mongoose.set('strictQuery', true);

  // defensive programming
  if (isConnected) {
    console.log('MongoDb is already connected');

    return;
  }

  await mongoose.connect(DB_URL!, {
    dbName: 'rest-api',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => console.log('db connected'));
};
