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
2. Run the app:
   ```bash
   npm run dev
   ```

## Deployment

This application can be deployed to several platforms. Here are some free and open-source options:

### 1. Vercel (Recommended - Free Tier)

1. Fork this repository to your GitHub account
2. Create an account at [Vercel](https://vercel.com/)
3. Create a new project and connect it to your repository
4. Use the default configuration (Vercel will automatically detect the Vite project)
5. Deploy!

The frontend will be served statically with no downtime, and the API will be handled through Vercel's serverless functions.

### 2. Docker Deployment

This project includes a Dockerfile for containerized deployment:

1. Build the Docker image:
   ```bash
   docker build -t mytea .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 mytea
   ```

### 3. Self-hosted Deployment

1. Clone the repository to your server
2. Install Node.js (v16 or higher)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the frontend:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   node server.js
   ```

The application will be available at `http://localhost:8080`
