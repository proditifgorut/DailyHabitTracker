import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';
import { Habit } from '../types/habit';
import { getTodayString } from '../utils/storage';

interface StatsProps {
  habits: Habit[];
}

const Stats: React.FC<StatsProps> = ({ habits }) => {
  const today = getTodayString();
  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0);
  const longestStreak = Math.max(...habits.map((h) => h.bestStreak), 0);

  const stats = [
    {
      label: 'Selesai Hari Ini',
      value: `${completedToday}/${totalHabits}`,
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-600',
    },
    {
      label: 'Tingkat Penyelesaian',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-600',
    },
    {
      label: 'Total Pencapaian',
      value: totalCompletions,
      icon: Award,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      textColor: 'text-green-600',
    },
    {
      label: 'Streak Terpanjang',
      value: `${longestStreak} hari`,
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
          <p className={`text-sm font-medium ${stat.textColor}`}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;
