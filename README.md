# MyTea

MyTea is a React + TypeScript news app that fetches U.S. headlines through serverless API routes.
It uses a card-style UI, category filters, lazy loading, and client/server caching to keep the experience fast.

## Features

- Serverless backend route for fetching news from NewsAPI (`/api/news`)
- Category filtering (`All`, Business, Entertainment, Health, Science, Sports, Technology, Politics)
- Incremental loading (`Load More`)
- Client-side cache (5 minutes)
- Server-side in-memory cache in the API route (5 minutes)
- Retry and error handling for network/API failures
- Responsive layout with animated sections and typing effect hero

## Tech Stack

- React 19
- TypeScript 5
- Vite 6
- Jest + React Testing Library
- GSAP
- Vercel Serverless Functions (`api/*.ts`)
- Tailwind utility classes (loaded via CDN in `index.html`)

## Prerequisites

- Node.js 18+
- npm
- NewsAPI key from https://newsapi.org

## Environment Variables

Create a `.env` file in the project root:

```env
NEWS_API_KEY=your_actual_api_key_here
```

You can copy from `.env.example` and replace the placeholder value.

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production assets
- `npm run preview` - Preview production build locally on port `4173`
- `npm start` - Alias for `npm run preview`
- `npm run lint` - Lint `src` (`.ts`, `.tsx`)
- `npm run lint:fix` - Auto-fix lint issues
- `npm run type-check` - Run TypeScript checks with `tsc --noEmit`
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage and JUnit output
- `npm run build:analyze` - Build and run bundle visualizer
- `npm run ci` - Run lint, type-check, test, and build

## API Routes

- `GET /api/news` - Returns normalized and deduplicated articles
- `GET /api/news?health=true` - Health check on the news endpoint
- `GET /api/health` - Basic health check endpoint

## Testing

```bash
npm run test
npm run test:coverage
```

Test files are in the `tests/` directory and `src/**/*.test.ts`.

## Deployment

### Vercel (recommended)

1. Import repo into Vercel.
2. Add `NEWS_API_KEY` in project environment variables.
3. Deploy.

### Docker

```bash
docker build -t mytea .
docker run -p 4173:4173 -e NEWS_API_KEY=your_actual_api_key_here mytea
```

### More details

See `DEPLOYMENT.md` for full deployment and CI/CD notes.

## Project Structure

```text
myTea/
  api/                  # Vercel serverless functions
  src/                  # React application code
    components/
    hooks/
    services/
    utils/
    assets/
  tests/                # Unit and component tests
  README.md
  DEPLOYMENT.md
  package.json
  vite.config.ts
```

## License

MIT. See `LICENSE`.
