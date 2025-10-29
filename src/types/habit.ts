export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  frequency: 'daily' | 'weekly';
  reminderTime?: string;
  createdAt: string;
  completedDates: string[];
  streak: number;
  bestStreak: number;
}

export interface HabitFormData {
  name: string;
  description: string;
  color: string;
  icon: string;
  frequency: 'daily' | 'weekly';
  reminderTime?: string;
}
