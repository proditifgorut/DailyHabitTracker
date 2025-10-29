import { Habit } from '../types/habit';

const STORAGE_KEY = 'daily-habit-tracker';

export const loadHabits = (): Habit[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};

export const saveHabits = (habits: Habit[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits:', error);
  }
};

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;

  const sortedDates = [...completedDates].sort().reverse();
  let streak = 0;
  let currentDate = new Date();

  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    const diffTime = currentDate.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === streak) {
      streak++;
      currentDate = date;
    } else if (diffDays === streak + 1) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }

  return streak;
};
