import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Bell, BellOff, Menu, X } from 'lucide-react';
import HabitCard from './components/HabitCard';
import HabitForm from './components/HabitForm';
import Stats from './components/Stats';
import EmptyState from './components/EmptyState';
import { Habit, HabitFormData } from './types/habit';
import { loadHabits, saveHabits, getTodayString, calculateStreak } from './utils/storage';
import { requestNotificationPermission, scheduleNotification } from './utils/notifications';

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadedHabits = loadHabits();
    setHabits(loadedHabits);

    const checkNotificationPermission = async () => {
      const hasPermission = await requestNotificationPermission();
      setNotificationsEnabled(hasPermission);
    };
    checkNotificationPermission();
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const handleAddHabit = (formData: HabitFormData) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      completedDates: [],
      streak: 0,
      bestStreak: 0,
    };

    setHabits([...habits, newHabit]);

    if (formData.reminderTime && notificationsEnabled) {
      scheduleNotification(formData.name, formData.reminderTime);
    }
  };

  const handleEditHabit = (formData: HabitFormData) => {
    if (!editingHabit) return;

    const updatedHabits = habits.map((habit) =>
      habit.id === editingHabit.id
        ? { ...habit, ...formData }
        : habit
    );

    setHabits(updatedHabits);
    setEditingHabit(null);

    if (formData.reminderTime && notificationsEnabled) {
      scheduleNotification(formData.name, formData.reminderTime);
    }
  };

  const handleToggleComplete = (habitId: string) => {
    const today = getTodayString();

    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const isAlreadyCompleted = habit.completedDates.includes(today);
        let newCompletedDates: string[];

        if (isAlreadyCompleted) {
          newCompletedDates = habit.completedDates.filter((date) => date !== today);
        } else {
          newCompletedDates = [...habit.completedDates, today];
        }

        const newStreak = calculateStreak(newCompletedDates);
        const newBestStreak = Math.max(newStreak, habit.bestStreak);

        return {
          ...habit,
          completedDates: newCompletedDates,
          streak: newStreak,
          bestStreak: newBestStreak,
        };
      }
      return habit;
    });

    setHabits(updatedHabits);
  };

  const handleDeleteHabit = (habitId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kebiasaan ini?')) {
      setHabits(habits.filter((habit) => habit.id !== habitId));
    }
  };

  const handleEditClick = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingHabit(null);
  };

  const toggleNotifications = async () => {
    const hasPermission = await requestNotificationPermission();
    setNotificationsEnabled(hasPermission);

    if (hasPermission) {
      habits.forEach((habit) => {
        if (habit.reminderTime) {
          scheduleNotification(habit.name, habit.reminderTime);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Daily Habit Tracker
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">Pantau kebiasaan harian Anda</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleNotifications}
                className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
                title={notificationsEnabled ? 'Notifikasi Aktif' : 'Aktifkan Notifikasi'}
              >
                {notificationsEnabled ? (
                  <Bell className="w-6 h-6 text-green-600" />
                ) : (
                  <BellOff className="w-6 h-6 text-gray-400" />
                )}
              </button>

              <button
                onClick={() => setIsFormOpen(true)}
                className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                Tambah Kebiasaan
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden mt-4"
              >
                <button
                  onClick={() => {
                    setIsFormOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Kebiasaan
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {habits.length > 0 && <Stats habits={habits} />}

        {habits.length === 0 ? (
          <EmptyState onAddHabit={() => setIsFormOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteHabit}
                  onEdit={handleEditClick}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <HabitForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingHabit ? handleEditHabit : handleAddHabit}
        editingHabit={editingHabit}
      />

      <footer className="mt-16 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            Dibuat dengan ❤️ untuk membantu Anda membangun kebiasaan yang lebih baik
          </p>
          <p className="text-sm text-gray-500 mt-2">© 2025 Daily Habit Tracker</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
