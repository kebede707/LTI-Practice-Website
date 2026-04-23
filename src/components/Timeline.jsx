import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Award,
  BookOpen,
  Users,
  Star,
  Target,
  Rocket,
  Sparkles,
} from 'lucide-react';

const grades = [
  {
    grade: 9,
    label: '9th Grade',
    title: 'Build Your Foundation',
    color: 'emerald',
    bgClass: 'bg-emerald-500',
    bgLightClass: 'bg-emerald-50',
    borderClass: 'border-emerald-500',
    textClass: 'text-emerald-600',
    ringClass: 'ring-emerald-400',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-emerald-600',
    hex: '#10b981',
    icon: Sparkles,
    scholarships: 5,
    programs: 4,
    actions: [
      'Join extracurricular clubs that match your passions',
      'Begin community service and volunteer work',
      'Explore academic interests and potential career paths',
      'Maintain a strong GPA from the start',
      'Build relationships with teachers and mentors',
    ],
  },
  {
    grade: 10,
    label: '10th Grade',
    title: 'Explore & Grow',
    color: 'blue',
    bgClass: 'bg-blue-500',
    bgLightClass: 'bg-blue-50',
    borderClass: 'border-blue-500',
    textClass: 'text-blue-600',
    ringClass: 'ring-blue-400',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-blue-600',
    hex: '#3b82f6',
    icon: Target,
    scholarships: 8,
    programs: 6,
    actions: [
      'Enroll in AP and honors-level courses',
      'Begin SAT/ACT test preparation',
      'Attend college fairs and information sessions',
      'Apply for summer enrichment programs',
      'Take on leadership roles in organizations',
    ],
  },
  {
    grade: 11,
    label: '11th Grade',
    title: 'Take Action',
    color: 'violet',
    bgClass: 'bg-violet-500',
    bgLightClass: 'bg-violet-50',
    borderClass: 'border-violet-500',
    textClass: 'text-violet-600',
    ringClass: 'ring-violet-400',
    gradientFrom: 'from-violet-400',
    gradientTo: 'to-violet-600',
    hex: '#8b5cf6',
    icon: Star,
    scholarships: 15,
    programs: 8,
    actions: [
      'Take the SAT and/or ACT exams',
      'Visit college campuses and attend tours',
      'Start searching and applying for scholarships',
      'Pursue leadership positions in clubs and activities',
      'Apply to competitive summer programs',
    ],
  },
  {
    grade: 12,
    label: '12th Grade',
    title: 'Launch',
    color: 'amber',
    bgClass: 'bg-amber-500',
    bgLightClass: 'bg-amber-50',
    borderClass: 'border-amber-500',
    textClass: 'text-amber-600',
    ringClass: 'ring-amber-400',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-amber-600',
    hex: '#f59e0b',
    icon: Rocket,
    scholarships: 20,
    programs: 5,
    actions: [
      'Submit college applications and essays',
      'Complete and submit scholarship applications',
      'File the FAFSA for financial aid',
      'Compare financial aid offers and make your decision',
      'Celebrate your achievements and prepare for college',
    ],
  },
];

function TimelineNode({ data, index, isActive, onClick, totalNodes }) {
  const Icon = data.icon;

  return (
    <motion.button
      onClick={onClick}
      className="relative flex flex-col items-center group cursor-pointer focus:outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`${data.label}: ${data.title}`}
      aria-expanded={isActive}
    >
      {/* Pulsing ring behind active node */}
      {isActive && (
        <motion.div
          className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full ${data.bgClass} opacity-20`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Node circle */}
      <motion.div
        className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-colors duration-300 ${
          isActive
            ? `${data.bgClass} border-white text-white shadow-xl`
            : 'bg-white border-gray-200 text-gray-400 group-hover:border-gray-300'
        }`}
        animate={
          isActive
            ? { boxShadow: `0 0 30px ${data.hex}40, 0 10px 30px ${data.hex}30` }
            : { boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }
        }
        transition={{ duration: 0.4 }}
      >
        <Icon
          size={isActive ? 30 : 24}
          className={`transition-all duration-300 ${
            isActive ? 'text-white' : data.textClass + ' group-hover:scale-110'
          }`}
        />
      </motion.div>

      {/* Grade label */}
      <motion.span
        className={`mt-3 text-sm font-bold tracking-wide transition-colors duration-300 ${
          isActive ? data.textClass : 'text-gray-400'
        }`}
        animate={{ scale: isActive ? 1.05 : 1 }}
      >
        Grade {data.grade}
      </motion.span>

      {/* Title */}
      <motion.span
        className={`text-xs font-medium mt-0.5 transition-colors duration-300 ${
          isActive ? 'text-gray-700' : 'text-gray-300'
        }`}
      >
        {data.title}
      </motion.span>
    </motion.button>
  );
}

function ExpandedCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full mt-10"
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-white border shadow-xl shadow-gray-200/50`}
        style={{ borderColor: data.hex + '30' }}
      >
        {/* Top gradient bar */}
        <div
          className={`h-1.5 bg-gradient-to-r ${data.gradientFrom} ${data.gradientTo}`}
        />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-10 h-10 rounded-xl ${data.bgClass} flex items-center justify-center`}
            >
              <data.icon size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 font-display">
                {data.label}: {data.title}
              </h4>
              <p className="text-sm text-gray-500">
                Key milestones and actions for this year
              </p>
            </div>
          </div>

          {/* Actions list */}
          <ul className="space-y-3 mb-6">
            {data.actions.map((action, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                className="flex items-start gap-3"
              >
                <span
                  className={`mt-1.5 w-2 h-2 rounded-full ${data.bgClass} shrink-0`}
                />
                <span className="text-gray-700 text-sm leading-relaxed">
                  {action}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${data.bgLightClass}`}
            >
              <Award size={16} className={data.textClass} />
              <span className={`text-sm font-semibold ${data.textClass}`}>
                {data.scholarships} Scholarships
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${data.bgLightClass}`}
            >
              <BookOpen size={16} className={data.textClass} />
              <span className={`text-sm font-semibold ${data.textClass}`}>
                {data.programs} Programs
              </span>
            </motion.div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/scholarships?grade=${data.grade}`}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white ${data.bgClass} hover:opacity-90 transition-opacity shadow-md`}
            >
              View Scholarships
              <ChevronRight size={16} />
            </Link>
            <Link
              to={`/programs?grade=${data.grade}`}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 ${data.borderClass} ${data.textClass} hover:${data.bgLightClass} transition-colors`}
            >
              Browse Programs
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="w-full">
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection line background */}
          <div className="absolute top-10 left-[10%] right-[10%] h-1 bg-gray-100 rounded-full" />

          {/* Animated progress line */}
          <motion.div
            className="absolute top-10 left-[10%] h-1 rounded-full bg-gradient-to-r from-emerald-400 via-blue-500 via-violet-500 to-amber-400"
            initial={{ width: '0%' }}
            animate={{
              width: `${(activeIndex / (grades.length - 1)) * 80}%`,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Nodes */}
          <div className="relative flex justify-between px-[10%]">
            {grades.map((data, i) => (
              <TimelineNode
                key={data.grade}
                data={data}
                index={i}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(i)}
                totalNodes={grades.length}
              />
            ))}
          </div>
        </div>

        {/* Expanded content */}
        <div className="px-[5%]">
          <AnimatePresence mode="wait">
            <ExpandedCard key={activeIndex} data={grades[activeIndex]} />
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: Vertical layout */}
      <div className="md:hidden space-y-4">
        {grades.map((data, i) => {
          const isActive = activeIndex === i;
          const Icon = data.icon;

          return (
            <div key={data.grade} className="relative">
              {/* Vertical connecting line */}
              {i < grades.length - 1 && (
                <div
                  className={`absolute left-7 top-16 w-0.5 h-full transition-colors duration-500 ${
                    i < activeIndex ? data.bgClass : 'bg-gray-200'
                  }`}
                />
              )}

              {/* Clickable header */}
              <motion.button
                onClick={() => setActiveIndex(i)}
                className={`relative z-10 flex items-center gap-4 w-full text-left px-3 py-3 rounded-xl transition-colors duration-300 ${
                  isActive ? data.bgLightClass : 'hover:bg-gray-50'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Node dot */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
                    isActive
                      ? `${data.bgClass} border-white shadow-lg text-white`
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-bold transition-colors duration-300 ${
                      isActive ? data.textClass : 'text-gray-500'
                    }`}
                  >
                    Grade {data.grade}
                  </div>
                  <div className="text-xs text-gray-500">{data.title}</div>
                </div>

                <motion.div
                  animate={{ rotate: isActive ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight
                    size={18}
                    className={isActive ? data.textClass : 'text-gray-300'}
                  />
                </motion.div>
              </motion.button>

              {/* Expanded content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden ml-14"
                  >
                    <div className="pb-4 pt-1">
                      <ul className="space-y-2 mb-4">
                        {data.actions.map((action, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <span
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full ${data.bgClass} shrink-0`}
                            />
                            <span className="text-gray-600 text-sm leading-relaxed">
                              {action}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${data.bgLightClass} ${data.textClass}`}
                        >
                          <Award size={13} /> {data.scholarships} Scholarships
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${data.bgLightClass} ${data.textClass}`}
                        >
                          <BookOpen size={13} /> {data.programs} Programs
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/scholarships?grade=${data.grade}`}
                          className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold text-white ${data.bgClass} shadow-sm`}
                        >
                          Scholarships <ChevronRight size={14} />
                        </Link>
                        <Link
                          to={`/programs?grade=${data.grade}`}
                          className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold border ${data.borderClass} ${data.textClass}`}
                        >
                          Programs <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
