import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Award,
  BookOpen,
  FileText,
  ArrowRight,
  GraduationCap,
  Users,
  DollarSign,
  Layers,
} from 'lucide-react';
import Timeline from '../components/Timeline';

/* ---------------------------------------------------------------
   CountUp — a small hook that animates a number from 0 to `end`
   ---------------------------------------------------------------- */
function useCountUp(end, duration = 2000, startOnView = true) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!startOnView || !inView || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    let raf;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, startOnView]);

  return { value, ref };
}

function StatCard({ icon: Icon, value, suffix, label, delay }) {
  const counter = useCountUp(value, 2000);

  return (
    <motion.div
      ref={counter.ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon size={26} />
        </div>
        <div className="text-3xl md:text-4xl font-bold text-gray-900 font-display">
          {counter.value}
          {suffix}
        </div>
        <div className="text-sm text-gray-500 mt-1 font-medium">{label}</div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   Floating decorative shapes for the hero
   ---------------------------------------------------------------- */
function FloatingShapes() {
  const shapes = [
    { size: 80, x: '10%', y: '20%', delay: 0, duration: 7, color: 'bg-white/10' },
    { size: 120, x: '80%', y: '15%', delay: 1, duration: 9, color: 'bg-white/5' },
    { size: 60, x: '70%', y: '70%', delay: 2, duration: 6, color: 'bg-white/10' },
    { size: 40, x: '20%', y: '75%', delay: 0.5, duration: 8, color: 'bg-white/15' },
    { size: 90, x: '50%', y: '10%', delay: 1.5, duration: 10, color: 'bg-white/5' },
    { size: 50, x: '90%', y: '55%', delay: 3, duration: 7, color: 'bg-white/8' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${s.color}`}
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, 0, -15, 0],
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------
   Quick Link Card
   ---------------------------------------------------------------- */
function QuickLinkCard({ icon: Icon, title, description, to, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className="group block bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
      >
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${color} mb-5 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={26} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
          Learn more <ArrowRight size={16} />
        </span>
      </Link>
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   Home Page
   ---------------------------------------------------------------- */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white">
        <FloatingShapes />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-primary-100 mb-6 backdrop-blur-sm border border-white/10">
              <GraduationCap size={16} />
              Pre-Collegiate Resource Hub
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 font-display">
              Your Path to College{' '}
              <span className="bg-gradient-to-r from-accent-400 to-blue-300 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-200 leading-relaxed mb-10">
              Discover scholarships, pre-collegiate programs, and resources
              tailored to your grade level and timeline.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/scholarships"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-900 font-bold text-base hover:bg-primary-50 transition-colors shadow-xl shadow-black/20"
              >
                <Award size={20} />
                Explore Scholarships
              </Link>
              <Link
                to="/programs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-base hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
              >
                <BookOpen size={20} />
                Browse Programs
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80L60 73.3C120 66.7 240 53.3 360 48C480 42.7 600 45.3 720 50.7C840 56 960 64 1080 64C1200 64 1320 56 1380 52L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              icon={Award}
              value={20}
              suffix="+"
              label="Scholarships"
              delay={0}
            />
            <StatCard
              icon={BookOpen}
              value={15}
              suffix="+"
              label="Programs"
              delay={0.1}
            />
            <StatCard
              icon={Users}
              value={4}
              suffix=""
              label="Grade Levels (9-12)"
              delay={0.2}
            />
            <StatCard
              icon={DollarSign}
              value={500}
              suffix="K+"
              label="in Opportunities"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE SECTION ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
              <Layers size={16} />
              Interactive Roadmap
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-display">
              Your 4-Year Roadmap
            </h2>
            <p className="max-w-xl mx-auto text-gray-500 text-lg leading-relaxed">
              See what opportunities are available at each stage of your high
              school journey
            </p>
          </motion.div>

          <Timeline />
        </div>
      </section>

      {/* ==================== QUICK LINKS SECTION ==================== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-display">
              Explore Resources
            </h2>
            <p className="max-w-xl mx-auto text-gray-500 text-lg">
              Everything you need to prepare for your future, all in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <QuickLinkCard
              icon={Award}
              title="Scholarships"
              description="Browse scholarships filtered by grade level, deadline, and award amount. Find the right opportunities for you."
              to="/scholarships"
              color="bg-primary-600"
              delay={0}
            />
            <QuickLinkCard
              icon={BookOpen}
              title="Programs"
              description="Discover pre-collegiate programs, summer camps, and enrichment opportunities to build your profile."
              to="/programs"
              color="bg-accent-600"
              delay={0.1}
            />
            <QuickLinkCard
              icon={FileText}
              title="Resources"
              description="Access guides, checklists, and tips for college applications, financial aid, and test preparation."
              to="/resources"
              color="bg-violet-600"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-display">
              Ready to Get Started?
            </h2>
            <p className="text-primary-200 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Your future is full of possibilities. Take the first step today by
              exploring the scholarships and programs available to you.
            </p>
            <Link
              to="/scholarships"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-900 font-bold text-base hover:bg-primary-50 transition-colors shadow-xl shadow-black/20"
            >
              Explore Scholarships
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
