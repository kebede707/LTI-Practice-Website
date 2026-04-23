import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, gradient = false }) {
  return (
    <section
      className={`relative overflow-hidden px-4 py-16 sm:py-20 ${
        gradient
          ? 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white'
          : 'bg-white text-gray-900'
      }`}
    >
      {gradient && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent-400/10 blur-3xl" />
        </div>
      )}

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`mt-4 text-lg sm:text-xl ${
              gradient ? 'text-primary-100' : 'text-gray-500'
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
