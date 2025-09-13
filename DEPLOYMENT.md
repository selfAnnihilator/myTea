# Deployment Guide

## Environment Variables

Before deploying, make sure to set the following environment variables:

- `NEWS_API_KEY` - Your NewsAPI key

## Deployment Options

### Vercel (Recommended)

1. Fork this repository to your GitHub account
2. Create an account at [Vercel](https://vercel.com/)
3. Create a new project and connect it to your repository
4. Add your `NEWS_API_KEY` as an environment variable in your Vercel project settings:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add a new variable with the key `NEWS_API_KEY` and your actual API key as the value
5. Deploy!

### Docker

#### Build and run locally

```bash
# Build the Docker image
docker build -t mytea .

# Run the container with environment variable
docker run -p 4173:4173 -e NEWS_API_KEY=your_actual_api_key_here mytea
```

#### Docker Compose

```bash
# Build and run with docker-compose
docker-compose up --build
```

### Self-hosted

1. Clone the repository to your server
2. Install Node.js (v18 or higher)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set the environment variable for the NewsAPI key:
   ```bash
   export NEWS_API_KEY=your_actual_api_key_here
   ```
5. Build the frontend:
   ```bash
   npm run build
   ```
6. Start the server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:4173`

## CI/CD Pipeline

This project includes GitHub Actions workflows for continuous integration and deployment:

1. `ci-cd.yml` - Runs tests, builds, and deploys to Vercel on pushes to main branch
2. `docker.yml` - Builds and pushes Docker images on releases

To use these workflows, you'll need to set the following secrets in your GitHub repository:

- `VERCEL_TOKEN` - Vercel token for deployment
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID
- `DOCKERHUB_USERNAME` - Docker Hub username
- `DOCKERHUB_TOKEN` - Docker Hub access token
- `CODECOV_TOKEN` - Codecov token for test coverage reporting

## Health Checks

The application includes health check endpoints:

- `/api/news?health=true` - Health check for the news API
- `/api/health` - Dedicated health check endpoint

These endpoints return a JSON response with the application status and uptime information.