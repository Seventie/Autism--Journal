
export interface Memory {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  story?: string;
  type: 'drawing' | 'story' | 'photo' | 'mood';
  tilt: 'left' | 'right';
  mood?: string;
  waterIntake?: number;
  sleep?: number;
  energy?: number;
  gratitude?: string;
}
