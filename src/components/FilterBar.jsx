import { Search, Filter, X } from 'lucide-react';

const grades = [9, 10, 11, 12];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

export default function FilterBar({ filters = {}, onFilterChange, type = 'scholarship' }) {
  const { search = '', gradeLevels = [], season = '', tag = '' } = filters;

  const toggleGrade = (grade) => {
    const updated = gradeLevels.includes(grade)
      ? gradeLevels.filter((g) => g !== grade)
      : [...gradeLevels, grade];
    onFilterChange({ ...filters, gradeLevels: updated });
  };

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    search || gradeLevels.length > 0 || season || tag;

  const clearAll = () => {
    onFilterChange({ search: '', gradeLevels: [], season: '', tag: '' });
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        {/* Label */}
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="hidden sm:inline">Filters</span>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Grade Level Toggles */}
        <div className="flex flex-wrap items-center gap-1.5">
          {grades.map((grade) => {
            const isActive = gradeLevels.includes(grade);
            return (
              <button
                key={grade}
                onClick={() => toggleGrade(grade)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {grade}th
              </button>
            );
          })}
        </div>

        {/* Season Select */}
        <select
          value={season}
          onChange={(e) => handleChange('season', e.target.value)}
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition-colors focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <option value="">All Seasons</option>
          {seasons.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Tag filter (scholarships only) */}
        {type === 'scholarship' && (
          <input
            type="text"
            placeholder="Filter by tag..."
            value={tag}
            onChange={(e) => handleChange('tag', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 transition-colors focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 sm:w-auto sm:max-w-[10rem]"
          />
        )}

        {/* Clear all */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
