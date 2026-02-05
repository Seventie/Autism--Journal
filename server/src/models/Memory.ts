import mongoose, { Schema, Document } from 'mongoose';

export interface IMemory extends Document {
  title: string;
  date: string;
  imageUrl?: string;
  story?: string;
  type: 'drawing' | 'photo' | 'story' | 'mood';
  tilt: 'left' | 'right';
  mood?: string;
  waterIntake?: number;
  sleep?: number;
  energy?: number;
  gratitude?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    story: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['drawing', 'photo', 'story', 'mood'],
      required: true,
    },
    tilt: {
      type: String,
      enum: ['left', 'right'],
      default: 'left',
    },
    mood: String,
    waterIntake: Number,
    sleep: Number,
    energy: Number,
    gratitude: String
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMemory>('Memory', MemorySchema);