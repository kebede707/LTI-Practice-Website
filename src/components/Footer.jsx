import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'Programs', to: '/programs' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-accent-400" />
              <span className="font-display text-lg font-bold">
                Pre-Collegiate Resource Hub
              </span>
            </div>
            <p className="mt-3 text-sm text-primary-200">
              Built for students, by students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-300">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-300">
              About
            </h3>
            <p className="mt-3 text-sm text-primary-200">
              A curated collection of scholarships and pre-collegiate programs to
              help high school students prepare for their futures.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-700 pt-6 text-center text-sm text-primary-300">
          &copy; {new Date().getFullYear()} Pre-Collegiate Resource Hub. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
