import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Habit, HabitFormData } from '../types/habit';
import { habitColors, habitIcons } from '../data/habitPresets';

interface HabitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: HabitFormData) => void;
  editingHabit?: Habit | null;
}

const HabitForm: React.FC<HabitFormProps> = ({ isOpen, onClose, onSubmit, editingHabit }) => {
  const [formData, setFormData] = useState<HabitFormData>({
    name: '',
    description: '',
    color: habitColors[0].value,
    icon: habitIcons[0],
    frequency: 'daily',
    reminderTime: '',
  });

  useEffect(() => {
    if (editingHabit) {
      setFormData({
        name: editingHabit.name,
        description: editingHabit.description,
        color: editingHabit.color,
        icon: editingHabit.icon,
        frequency: editingHabit.frequency,
        reminderTime: editingHabit.reminderTime || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: habitColors[0].value,
        icon: habitIcons[0],
        frequency: 'daily',
        reminderTime: '',
      });
    }
  }, [editingHabit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const IconComponent = Icons[formData.icon as keyof typeof Icons] as React.FC<{ className?: string }>;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white md:rounded-2xl shadow-2xl z-50 overflow-y-auto md:max-w-2xl md:w-full md:max-h-[90vh] m-0 md:m-4"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingHabit ? 'Edit Kebiasaan' : 'Tambah Kebiasaan Baru'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Kebiasaan
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: Olahraga Pagi"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Jelaskan kebiasaan Anda..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Pilih Ikon
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {habitIcons.map((iconName) => {
                    const Icon = Icons[iconName as keyof typeof Icons] as React.FC<{ className?: string }>;
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: iconName })}
                        className={`p-3 rounded-xl transition-all ${
                          formData.icon === iconName
                            ? 'bg-blue-500 text-white shadow-lg scale-110'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {Icon && <Icon className="w-5 h-5 mx-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Pilih Warna
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {habitColors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`w-10 h-10 rounded-xl transition-all ${
                        formData.color === color.value ? 'ring-4 ring-offset-2 scale-110' : ''
                      }`}
                      style={{
                        backgroundColor: color.value,
                        ringColor: color.value,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Frekuensi
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frequency: 'daily' })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      formData.frequency === 'daily'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Harian
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frequency: 'weekly' })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      formData.frequency === 'weekly'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Mingguan
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waktu Pengingat (Opsional)
                </label>
                <input
                  type="time"
                  value={formData.reminderTime}
                  onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${formData.color}20` }}
                  >
                    {IconComponent && (
                      <IconComponent className="w-6 h-6" style={{ color: formData.color }} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {formData.name || 'Nama Kebiasaan'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formData.description || 'Deskripsi kebiasaan'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all"
                >
                  {editingHabit ? 'Simpan Perubahan' : 'Tambah Kebiasaan'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HabitForm;
