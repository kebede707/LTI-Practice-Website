# Pre-Collegiate Resource Hub

A web application for discovering scholarships, pre-collegiate programs, and enrichment opportunities for high school students (grades 9–12). Built with React, Vite, and Tailwind CSS.

**Live site:** [kebede707.github.io/LTI-Practice-Website](https://kebede707.github.io/LTI-Practice-Website/)

## Features

### Public Pages

- **Home** — Landing page with an animated hero section, at-a-glance stats (number of scholarships, programs, grade levels, and total opportunity value), a 4-year interactive roadmap/timeline, and quick-link cards to each section.
- **Scholarships** — Browse all scholarships with filtering by grade level, season, and keyword search. Sort by deadline, award amount, or name. Each card shows the award amount, deadline, eligible grades, and a link to apply.
- **Programs** — Browse pre-collegiate programs, internships, and summer opportunities. Filter by grade level, season, category (Academic, STEM, Leadership, etc.), and keyword search. Sort by deadline, cost, or name.

### Admin Dashboard

Accessible at `/admin` with password authentication. The dashboard provides:

- **CRUD operations** — Add, edit, and delete scholarships and programs through a form-based UI.
- **Search** — Filter the admin table by name, description, or tags.
- **Data management** — Export all data as a JSON file, import data from a previously exported JSON file, or reset everything back to the default dataset.

All admin changes are persisted in the browser's `localStorage`, so edits survive page refreshes. The default dataset lives in `src/data/scholarships.json` and `src/data/programs.json`.

## Tech Stack

| Layer       | Tool                                                       |
| ----------- | ---------------------------------------------------------- |
| Framework   | [React 19](https://react.dev/) with JSX                   |
| Build tool  | [Vite 8](https://vite.dev/)                                |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com/)                 |
| Routing     | [React Router 7](https://reactrouter.com/)                 |
| Animations  | [Framer Motion](https://www.framer.com/motion/)            |
| Icons       | [Lucide React](https://lucide.dev/)                        |
| Deployment  | [GitHub Pages](https://pages.github.com/) via GitHub Actions |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 20 or later
- npm (comes with Node.js)

### Install and Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server starts at `http://localhost:5173`. Changes to source files will hot-reload automatically.

### Other Commands

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview

# Run the linter
npm run lint
```

## Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Actions workflow for GitHub Pages
├── public/                        # Static assets (favicon, icons)
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── Card.jsx               #   Scholarship/program display card
│   │   ├── FilterBar.jsx          #   Grade, season, category, and search filters
│   │   ├── Footer.jsx             #   Site footer
│   │   ├── GradeBadge.jsx         #   Grade level pill/badge
│   │   ├── Layout.jsx             #   Page shell (navbar + content + footer)
│   │   ├── Navbar.jsx             #   Navigation bar
│   │   ├── PageHeader.jsx         #   Section header with gradient background
│   │   └── Timeline.jsx           #   4-year interactive roadmap
│   ├── context/
│   │   ├── AuthContext.jsx         # Admin authentication state
│   │   └── DataContext.jsx         # Scholarship & program data + localStorage persistence
│   ├── data/
│   │   ├── scholarships.json      # Default scholarship dataset
│   │   └── programs.json          # Default program dataset
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Scholarships.jsx       # Scholarship listing with filters
│   │   ├── Programs.jsx           # Program listing with filters
│   │   └── Admin.jsx              # Password-protected admin dashboard
│   ├── App.jsx                    # Route definitions
│   ├── index.css                  # Global styles and Tailwind imports
│   └── main.jsx                   # App entry point
├── index.html                     # HTML shell
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies and scripts
```

## How It Works

### Data Flow

The app loads its default data from two JSON files (`src/data/scholarships.json` and `src/data/programs.json`). On first visit, this data is used directly. When an admin makes changes through the dashboard, the updated data is saved to `localStorage` so it persists across browser sessions.

The `DataContext` provider sits at the top of the component tree and supplies all pages with the current scholarships and programs arrays, along with functions to add, update, delete, import, export, and reset data.

### Routing

React Router handles client-side navigation between the four pages:

| Path            | Page          |
| --------------- | ------------- |
| `/`             | Home          |
| `/scholarships` | Scholarships  |
| `/programs`     | Programs      |
| `/admin`        | Admin         |

All routes are nested inside a `Layout` component that renders the shared navbar and footer.

### Filtering and Sorting

Both the Scholarships and Programs pages read filter state from URL search parameters (e.g., `?grade=10&season=Fall`). This means filtered views are shareable as links. Filters and sort options are combined through `useMemo` to efficiently recompute the displayed list whenever inputs change.

### Admin Authentication

The admin page uses a simple password check (defined in `AuthContext.jsx`). Authentication state is stored in `sessionStorage`, so it lasts for the browser tab's lifetime and clears when the tab is closed.

## Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages whenever code is pushed to the `main` branch.

The Vite config sets `base: '/LTI-Practice-Website/'` to match the GitHub Pages project URL path.

### Docker (optional)

A `Dockerfile` and `nginx.conf` are included for containerized deployment:

```bash
docker build -t pcrh .
docker run -p 8080:80 pcrh
```

## Adding Data

To add scholarships or programs, you have two options:

1. **Through the admin UI** — Go to `/admin`, log in, and use the "Add New" button. Changes are saved to `localStorage`.
2. **Directly in the JSON files** — Edit `src/data/scholarships.json` or `src/data/programs.json` and rebuild. This changes the default dataset that new visitors (or anyone who resets to defaults) will see.

Each scholarship entry includes fields like `name`, `amount`, `deadline`, `gradeLevels`, `season`, `tags`, and `website`. Each program entry includes fields like `name`, `organization`, `cost`, `duration`, `category`, `gradeLevels`, and `website`.
