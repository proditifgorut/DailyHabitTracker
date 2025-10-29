import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onAddHabit: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddHabit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-16 h-16 text-blue-500" />
        </div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2">Mulai Kebiasaan Baru!</h3>
      <p className="text-gray-600 text-center max-w-md mb-8">
        Belum ada kebiasaan yang ditambahkan. Mulai perjalanan Anda menuju hidup yang lebih baik dengan menambahkan kebiasaan pertama Anda.
      </p>

      <button
        onClick={onAddHabit}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Tambah Kebiasaan Pertama
      </button>
    </motion.div>
  );
};

export default EmptyState;
