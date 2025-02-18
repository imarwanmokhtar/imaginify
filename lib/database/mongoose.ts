import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: { mongoose: MongooseConnection } | undefined;
}

let cached: MongooseConnection = global.mongoose?.mongoose || { conn: null, promise: null };

if(!cached) {
  if (!global.mongoose) global.mongoose = { mongoose: { conn: null, promise: null } };
  cached = global.mongoose.mongoose;
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginify', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}