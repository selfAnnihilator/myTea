# Multi-stage Dockerfile for MyTea

# Stage 1: Build the frontend
FROM node:18-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Production server
FROM node:18-slim AS production

WORKDIR /app

# Create a non-root user
RUN groupadd -r nodejs && useradd -r -g nodejs -s /bin/bash nodejs

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built frontend assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy server files
COPY --chown=nodejs:nodejs ./api ./api

# Change to non-root user
USER nodejs

# Expose the port the app runs on
EXPOSE 4173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4173/health || exit 1

# Start the server
CMD ["npm", "start"]