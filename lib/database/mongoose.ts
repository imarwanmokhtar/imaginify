import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

interface GlobalWithMongoose {
  mongoose?: MongooseConnection;
}

// Initialize the global mongoose connection if it doesn't exist
const globalWithMongoose = global as unknown as GlobalWithMongoose;

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

let cached: MongooseConnection = globalWithMongoose.mongoose;

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'imaginify',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};