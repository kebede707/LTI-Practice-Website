import { motion } from 'framer-motion';
import { Calendar, ExternalLink, DollarSign, Clock, GraduationCap } from 'lucide-react';
import GradeBadge from './GradeBadge';

export default function Card({
  title,
  description,
  amount,
  deadline,
  gradeLevels = [],
  tags = [],
  website,
  type = 'scholarship',
}) {
  const isScholarship = type === 'scholarship';

  const formatDeadline = (dateStr) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isScholarship
              ? 'bg-primary-50 text-primary-600'
              : 'bg-accent-400/10 text-accent-600'
          }`}
        >
          {isScholarship ? (
            <DollarSign className="h-5 w-5" />
          ) : (
            <GraduationCap className="h-5 w-5" />
          )}
        </div>

        {amount && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
            {typeof amount === 'number'
              ? `$${amount.toLocaleString()}`
              : amount}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
      )}

      {/* Meta */}
      <div className="mt-4 flex flex-col gap-3">
        {deadline && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>
              <span className="font-medium text-gray-700">Deadline:</span>{' '}
              {formatDeadline(deadline)}
            </span>
          </div>
        )}

        {/* Grade Level Badges */}
        {gradeLevels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {gradeLevels.map((grade) => (
              <GradeBadge key={grade} grade={grade} />
            ))}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Spacer to push button to bottom */}
      <div className="flex-1" />

      {/* CTA */}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {isScholarship ? 'Apply Now' : 'Learn More'}
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </motion.article>
  );
}
