const gradeColors = {
  9: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  10: 'bg-blue-100 text-blue-700 border-blue-200',
  11: 'bg-purple-100 text-purple-700 border-purple-200',
  12: 'bg-orange-100 text-orange-700 border-orange-200',
};

export default function GradeBadge({ grade }) {
  const colorClasses = gradeColors[grade] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${colorClasses}`}
    >
      Grade {grade}
    </span>
  );
}
