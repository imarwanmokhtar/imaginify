import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

interface GlobalWithMongoose extends NodeJS.Global {
  mongoose: MongooseConnection;
}

let cached: MongooseConnection = (global as GlobalWithMongoose).mongoose;

if(!cached) {
  cached = (global as GlobalWithMongoose).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;
  if(!MONGODB_URL) throw new Error('MONGODB_URL is not defined');
  try {
    if(!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URL, { bufferCommands: false });
    }
    cached.conn = await cached.promise;
  } catch (error) {
    throw error;
  }
  return cached.conn;
}