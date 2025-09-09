<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# MyTea - Your Daily Brew of News

A React-based news application that fetches and displays the latest articles from various categories.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

## Deployment

This application can be deployed to several platforms. Here are some free and open-source options:

### 1. Render (Free Tier)

1. Fork this repository to your GitHub account
2. Create an account at [Render](https://render.com/)
3. Create a new web service and connect it to your repository
4. Use the following configuration:
   - Build command: `npm install && npm run build`
   - Start command: `node server.ts`
   - Environment variables:
     - `NODE_ENV`: production
     - `GEMINI_API_KEY`: your Gemini API key

### 2. Docker Deployment

This project includes a Dockerfile for containerized deployment:

1. Build the Docker image:
   ```bash
   docker build -t mytea .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 -e GEMINI_API_KEY=your_api_key_here mytea
   ```

### 3. Self-hosted Deployment

1. Clone the repository to your server
2. Install Node.js (v16 or higher)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set environment variables:
   ```bash
   export GEMINI_API_KEY=your_api_key_here
   ```
5. Build the frontend:
   ```bash
   npm run build
   ```
6. Start the server:
   ```bash
   node server.ts
   ```

The application will be available at `http://localhost:8080`
