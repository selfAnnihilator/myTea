# Use Node.js 18 as the base image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4173

# Build the frontend
RUN npm run build

# Start the backend server
CMD ["npm", "start"]
