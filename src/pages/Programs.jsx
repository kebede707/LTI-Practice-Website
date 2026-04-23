import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, SearchX } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import FilterBar from '../components/FilterBar';
import Card from '../components/Card';
import { useData } from '../context/DataContext';

const SORT_OPTIONS = [
  { value: 'deadline', label: 'Deadline (soonest)' },
  { value: 'cost', label: 'Cost (lowest)' },
  { value: 'name', label: 'Name (A-Z)' },
];

function parseCost(cost) {
  if (typeof cost === 'number') return cost;
  if (typeof cost === 'string') {
    const lower = cost.toLowerCase();
    if (lower === 'free' || lower === '$0' || lower === 'no cost') return 0;
    const cleaned = cost.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
  }
  return 0;
}

function parseDeadline(deadline) {
  if (!deadline) return Infinity;
  const date = new Date(deadline);
  return isNaN(date.getTime()) ? Infinity : date.getTime();
}

export default function Programs() {
  const { programs } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialGrade = searchParams.get('grade') || '';
  const initialSeason = searchParams.get('season') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    gradeLevel: initialGrade,
    season: initialSeason,
    category: initialCategory,
    search: initialSearch,
  });

  const [sortBy, setSortBy] = useState('deadline');

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);

      const params = new URLSearchParams();
      if (newFilters.gradeLevel) params.set('grade', newFilters.gradeLevel);
      if (newFilters.season) params.set('season', newFilters.season);
      if (newFilters.category) params.set('category', newFilters.category);
      if (newFilters.search) params.set('search', newFilters.search);
      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const filteredPrograms = useMemo(() => {
    let results = [...programs];

    // Filter by grade level
    if (filters.gradeLevel) {
      const grade = parseInt(filters.gradeLevel, 10);
      results = results.filter(
        (p) => p.gradeLevels && p.gradeLevels.includes(grade)
      );
    }

    // Filter by season
    if (filters.season) {
      results = results.filter(
        (p) =>
          p.season &&
          p.season.toLowerCase() === filters.season.toLowerCase()
      );
    }

    // Filter by category
    if (filters.category) {
      results = results.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by search text
    if (filters.search) {
      const query = filters.search.toLowerCase();
      results = results.filter((p) => {
        const searchable = [
          p.name,
          p.description,
          p.eligibility,
          p.organization,
          ...(p.tags || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchable.includes(query);
      });
    }

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return parseDeadline(a.deadline) - parseDeadline(b.deadline);
        case 'cost':
          return parseCost(a.cost) - parseCost(b.cost);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        default:
          return 0;
      }
    });

    return results;
  }, [filters, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Programs"
        subtitle="Explore enrichment programs, internships, and summer opportunities for students"
        gradient
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          type="program"
        />

        {/* Results toolbar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-semibold text-gray-900">
              {filteredPrograms.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-900">
              {programs.length}
            </span>{' '}
            programs
          </p>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
            <label htmlFor="sort-programs" className="sr-only">
              Sort programs
            </label>
            <select
              id="sort-programs"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:border-primary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards grid or empty state */}
        {filteredPrograms.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filters.gradeLevel}-${filters.season}-${filters.category}-${filters.search}-${sortBy}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPrograms.map((program) => (
                <motion.div key={program.id} variants={cardVariants}>
                  <Card
                    title={program.name}
                    description={program.description}
                    organization={program.organization}
                    cost={program.cost}
                    duration={program.duration}
                    deadline={program.deadline}
                    gradeLevels={program.gradeLevels}
                    tags={program.tags}
                    website={program.website}
                    season={program.season}
                    eligibility={program.eligibility}
                    type="program"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-16 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
              <SearchX className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-gray-900">
              No programs found
            </h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Try adjusting your filters or search terms to find more programs
              that match your interests.
            </p>
            <button
              onClick={() =>
                handleFilterChange({
                  gradeLevel: '',
                  season: '',
                  category: '',
                  search: '',
                })
              }
              className="mt-6 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
