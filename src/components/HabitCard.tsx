import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit, TrendingUp, Calendar } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Habit } from '../types/habit';
import { getTodayString } from '../utils/storage';

interface HabitCardProps {
  habit: Habit;
  onToggleComplete: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggleComplete, onDelete, onEdit }) => {
  const today = getTodayString();
  const isCompletedToday = habit.completedDates.includes(today);
  const IconComponent = Icons[habit.icon as keyof typeof Icons] as React.FC<{ className?: string }>;

  const completionRate = habit.completedDates.length > 0
    ? Math.round((habit.completedDates.length / Math.max(habit.completedDates.length, 30)) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${habit.color}20` }}
            >
              {IconComponent && (
                <IconComponent className="w-6 h-6" style={{ color: habit.color }} />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{habit.name}</h3>
              <p className="text-sm text-gray-500">{habit.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(habit)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              className="p-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Streak</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{habit.streak}</p>
            <p className="text-xs text-blue-600">hari</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Terbaik</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{habit.bestStreak}</p>
            <p className="text-xs text-purple-600">hari</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Total</span>
            </div>
            <p className="text-2xl font-bold text-green-700">{habit.completedDates.length}</p>
            <p className="text-xs text-green-600">kali</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-xs font-semibold text-gray-700">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.5 }}
              className="h-2 rounded-full"
              style={{ backgroundColor: habit.color }}
            />
          </div>
        </div>

        <button
          onClick={() => onToggleComplete(habit.id)}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isCompletedToday
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {isCompletedToday ? (
            <>
              <Check className="w-5 h-5" />
              <span>Selesai Hari Ini</span>
            </>
          ) : (
            <span>Tandai Selesai</span>
          )}
        </button>

        {habit.reminderTime && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <Icons.Bell className="w-4 h-4" />
            <span>Pengingat: {habit.reminderTime}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HabitCard;
