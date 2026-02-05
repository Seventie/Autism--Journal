// server/src/config/database.ts
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scrapbook';
    
    await mongoose.connect(mongoURI);
    
    console.log('✨ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};